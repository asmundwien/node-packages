import { AST_NODE_TYPES as nodeTypes } from "@typescript-eslint/utils";

import {
	type TypeAliasEnvironment as LexicalTypeAliasEnvironment,
	createTypeAliasEnvironment,
	hasVisibleTypeBinding,
	visibleTypeAlias,
} from "./type-alias-resolution.ts";

import type { ESTree } from "../types.ts";


const BUILT_INS = new Set([
	"Record",
	"Readonly",
	"Partial",
	"Required",
	"Pick",
	"Omit",
	"PropertyKey",
	"NonNullable",
]);

const TRANSPARENT_WRAPPERS = new Set(["Readonly", "Partial", "Required", "NonNullable"]);

type TypeAliasEnvironment = ReadonlyMap<string, ResolvedType>;

interface ResolvedType {
	readonly type: ESTree.TypeNode;
	readonly substitutions: TypeAliasEnvironment;
}

interface UnsafeDictionary {
	readonly kind: "unsafe-dictionary";
	readonly unsafeValue: "any" | "empty-object" | "object" | "union" | "unknown";
}

type WideningTargetKind =
	| "anonymous object"
	| "generic container"
	| "object"
	| "open dictionary"
	| "unknown";

interface WideningTarget {
	readonly kind: WideningTargetKind;
}

interface TypeEnvironment {
	readonly interfaces: ReadonlyMap<string, readonly ESTree.TSInterfaceDeclaration[]>;
	readonly typeAliases: LexicalTypeAliasEnvironment;
}

function declaredStatement(statement: ESTree.Statement): ESTree.Node | null {
	return statement.type === nodeTypes.ExportNamedDeclaration ||
		statement.type === nodeTypes.ExportDefaultDeclaration
		? (statement.declaration ?? null)
		: statement;
}

function createTypeEnvironment(
	program: ESTree.Program,
	visitorKeys: Readonly<Record<string, readonly string[]>>,
): TypeEnvironment {
	const interfaces = new Map<string, ESTree.TSInterfaceDeclaration[]>();

	for (const statement of program.body) {
		const declaration = declaredStatement(statement);

		if (declaration?.type !== nodeTypes.TSInterfaceDeclaration) {continue;}

		const declarations = interfaces.get(declaration.id.name) ?? [];
		declarations.push(declaration);
		interfaces.set(declaration.id.name, declarations);
	}

	return {
		interfaces,
		typeAliases: createTypeAliasEnvironment(program, visitorKeys),
	};
}

function typeReferenceName(type: ESTree.TSTypeReference): string | null {
	return type.typeName.type === nodeTypes.Identifier ? type.typeName.name : null;
}

function isBuiltIn(
	name: string,
	use: ESTree.Node,
	environment: TypeEnvironment,
): boolean {
	return (
		BUILT_INS.has(name) &&
		!hasVisibleTypeBinding(name, use, environment.typeAliases)
	);
}

function unwrapTransparentType(type: ESTree.TypeNode): ESTree.TypeNode {
	let current = type;

	while (
    current.type === nodeTypes.TSTypeOperator && current.operator === "readonly" && current.typeAnnotation !== undefined
	) {
		current = current.typeAnnotation;
	}

	return current;
}

function isNeverType(type: ESTree.TypeNode): boolean {
	return unwrapTransparentType(type).type === nodeTypes.TSNeverKeyword;
}

function isEffectivelyEmptyMember(member: ESTree.TypeElement): boolean {
	return (
		member.type === nodeTypes.TSPropertySignature &&
    member.optional &&
		member.typeAnnotation !== undefined &&
		isNeverType(member.typeAnnotation.typeAnnotation)
	);
}

function isEffectivelyEmptyTypeLiteral(type: ESTree.TSTypeLiteral): boolean {
	return type.members.every(isEffectivelyEmptyMember);
}

function isEffectivelyEmptyInterface(
	declarations: readonly ESTree.TSInterfaceDeclaration[],
): boolean {
	if (declarations.length !== 1) {return false;}

	const [type] = declarations;

	return (
		type?.extends.length === 0 &&
		(type.body.body.every(isEffectivelyEmptyMember))
	);
}

function aliasSubstitution(
	alias: ESTree.TSTypeAliasDeclaration,
	type: ESTree.TSTypeReference,
	base: TypeAliasEnvironment,
): TypeAliasEnvironment | null {
	const parameters = alias.typeParameters?.params ?? [];
	const typeArguments = type.typeArguments?.params ?? [];
	const next = new Map(base);

	for (const [index, parameter] of parameters.entries()) {
		const explicitArgument = typeArguments[index];
		const argument = explicitArgument ?? parameter.default;

		if (argument === undefined) {return null;}

		// Explicit arguments use the caller's bindings; defaults use earlier callee parameters.
		const argumentSubstitutions = explicitArgument === undefined ? new Map(next) : base;
		next.set(parameter.name.name, { substitutions: argumentSubstitutions, type: argument });
	}

	return next;
}

function unsafeIntersectionValue(
	type: ESTree.TSIntersectionType,
	environment: TypeEnvironment,
	substitutions: TypeAliasEnvironment,
	resolvingAliases: ReadonlySet<string>,
): UnsafeDictionary["unsafeValue"] | null {
	let firstUnsafe: UnsafeDictionary["unsafeValue"] | null = null;
	let isUnsafeIntersection = type.types.length > 0;

	for (const member of type.types) {
		const unsafe = unsafeDirectValue(member, environment, substitutions, resolvingAliases);

		if (unsafe === "any") {return "any";}

		firstUnsafe ??= unsafe;

		if (unsafe === null) {isUnsafeIntersection = false;}
	}

	return isUnsafeIntersection ? firstUnsafe : null;
}

function unsafeDirectValue(
	type: ESTree.TypeNode,
	environment: TypeEnvironment,
	substitutions: TypeAliasEnvironment,
	resolvingAliases: ReadonlySet<string>,
): UnsafeDictionary["unsafeValue"] | null {
	const unwrapped = unwrapTransparentType(type);

	if (unwrapped.type === nodeTypes.TSUnknownKeyword) {return "unknown";}

	if (unwrapped.type === nodeTypes.TSAnyKeyword) {return "any";}

	if (unwrapped.type === nodeTypes.TSObjectKeyword) {return "object";}

	if (unwrapped.type === nodeTypes.TSTypeLiteral && isEffectivelyEmptyTypeLiteral(unwrapped))
		{return "empty-object";}

	if (unwrapped.type === nodeTypes.TSUnionType) {
		return unwrapped.types.some(
			(member) => unsafeDirectValue(member, environment, substitutions, resolvingAliases) !== null,
		)
			? "union"
			: null;
	}

	if (unwrapped.type === nodeTypes.TSIntersectionType) {
		return unsafeIntersectionValue(unwrapped, environment, substitutions, resolvingAliases);
	}

	if (unwrapped.type !== nodeTypes.TSTypeReference) {return null;}

	const name = typeReferenceName(unwrapped);

	if (name === null) {return null;}

	if (TRANSPARENT_WRAPPERS.has(name) && isBuiltIn(name, unwrapped, environment)) {
		const wrapped = unwrapped.typeArguments?.params[0];

		return wrapped === undefined
			? null
			: unsafeDirectValue(wrapped, environment, substitutions, resolvingAliases);
	}

	const substitution = substitutions.get(name);

	if (substitution !== undefined) {
		return unsafeDirectValue(
			substitution.type,
			environment,
			substitution.substitutions,
			resolvingAliases,
		);
	}

	const interfaceDeclarations = environment.interfaces.get(name);

	if (interfaceDeclarations !== undefined) {
		return isEffectivelyEmptyInterface(interfaceDeclarations) ? "empty-object" : null;
	}

	const alias = visibleTypeAlias(name, unwrapped, environment.typeAliases);

	if (alias === null || resolvingAliases.has(name)) {return null;}

	const nextSubstitutions = aliasSubstitution(alias, unwrapped, substitutions);

	if (nextSubstitutions === null) {return null;}

	const nextResolving = new Set(resolvingAliases);
	nextResolving.add(name);

	return unsafeDirectValue(alias.typeAnnotation, environment, nextSubstitutions, nextResolving);
}

function dictionaryValueTypes(
	type: ESTree.TypeNode,
	environment: TypeEnvironment,
	substitutions: TypeAliasEnvironment,
	resolvingAliases: ReadonlySet<string>,
): readonly ResolvedType[] {
	const unwrapped = unwrapTransparentType(type);

	if (unwrapped.type === nodeTypes.TSTypeLiteral) {
		return unwrapped.members.flatMap((member): readonly ResolvedType[] => {
			return member.type === nodeTypes.TSIndexSignature && member.typeAnnotation !== undefined
				? [{ substitutions, type: member.typeAnnotation.typeAnnotation }]
				: [];
		},
		);
	}

	if (unwrapped.type === nodeTypes.TSMappedType) {
		return unwrapped.typeAnnotation === undefined
			? []
			: [{ substitutions, type: unwrapped.typeAnnotation }];
	}

	if (unwrapped.type !== nodeTypes.TSTypeReference) {return [];}

	const name = typeReferenceName(unwrapped);

	if (name === null) {return [];}

	const substitution = substitutions.get(name);

	if (substitution !== undefined) {
		return dictionaryValueTypes(
			substitution.type,
			environment,
			substitution.substitutions,
			resolvingAliases,
		);
	}

	if (TRANSPARENT_WRAPPERS.has(name) && isBuiltIn(name, unwrapped, environment)) {
		const wrapped = unwrapped.typeArguments?.params[0];

		return wrapped === undefined
			? []
			: dictionaryValueTypes(wrapped, environment, substitutions, resolvingAliases);
	}

	if (name === "Record" && isBuiltIn(name, unwrapped, environment)) {
		const value = unwrapped.typeArguments?.params[1] ?? null;

		return value === null ? [] : [{ substitutions, type: value }];
	}

	if (
		(name === "Pick" || name === "Omit") &&
		isBuiltIn(name, unwrapped, environment)
	) {
		const source = unwrapped.typeArguments?.params[0];

		return source === undefined
			? []
			: dictionaryValueTypes(source, environment, substitutions, resolvingAliases);
	}

	const alias = visibleTypeAlias(name, unwrapped, environment.typeAliases);

	if (alias === null || resolvingAliases.has(name)) {return [];}

	const nextSubstitutions = aliasSubstitution(alias, unwrapped, substitutions);

	if (nextSubstitutions === null) {return [];}

	const nextResolving = new Set(resolvingAliases);
	nextResolving.add(name);

	return dictionaryValueTypes(alias.typeAnnotation, environment, nextSubstitutions, nextResolving);
}

function classifyUnsafeDictionaryValue(
	valueType: ESTree.TypeNode,
	environment: TypeEnvironment,
): UnsafeDictionary | null {
	const unsafeValue = unsafeDirectValue(valueType, environment, new Map(), new Set());

	return unsafeValue === null ? null : { kind: "unsafe-dictionary", unsafeValue };
}

function classifyUnsafeDictionary(
	type: ESTree.TypeNode,
	environment: TypeEnvironment,
): UnsafeDictionary | null {
	const valueTypes = dictionaryValueTypes(type, environment, new Map(), new Set());

	for (const valueType of valueTypes) {
		const unsafeValue = unsafeDirectValue(
			valueType.type,
			environment,
			valueType.substitutions,
			new Set(),
		);

		if (unsafeValue !== null) {return { kind: "unsafe-dictionary", unsafeValue };}
	}

	return null;
}

function classifyWideningTarget(
	type: ESTree.TypeNode,
	environment: TypeEnvironment,
): WideningTarget | null {
	const unwrapped = unwrapTransparentType(type);

	if (unwrapped.type === nodeTypes.TSUnknownKeyword) {return { kind: "unknown" };}

	if (unwrapped.type === nodeTypes.TSObjectKeyword) {return { kind: "object" };}

	if (unwrapped.type === nodeTypes.TSTypeLiteral) {
		if (unwrapped.members.length === 0) {return null;}

		return unwrapped.members.some((member) => member.type === nodeTypes.TSIndexSignature)
			? { kind: "open dictionary" }
			: { kind: "anonymous object" };
	}

	if (unwrapped.type === nodeTypes.TSMappedType) {return { kind: "open dictionary" };}

	if (unwrapped.type !== nodeTypes.TSTypeReference) {return null;}

	const name = typeReferenceName(unwrapped);

	if (name === null) {return null;}

	if (TRANSPARENT_WRAPPERS.has(name) && isBuiltIn(name, unwrapped, environment)) {
		const wrapped = unwrapped.typeArguments?.params[0];

		return wrapped === undefined ? null : classifyWideningTarget(wrapped, environment);
	}

	if (name === "Record" && isBuiltIn(name, unwrapped, environment)) {
		return hasBroadRecordKey(unwrapped, environment, new Map())
			? { kind: "open dictionary" }
			: null;
	}

	const alias = visibleTypeAlias(name, unwrapped, environment.typeAliases);

	if (alias === null) {return null;}

	if ((alias.typeParameters?.params.length ?? 0) > 0) {
		const substitutions = aliasSubstitution(alias, unwrapped, new Map());

		const resolved =
			substitutions === null
				? null
				: classifyAliasBroadTarget(
						alias.typeAnnotation,
						environment,
						substitutions,
						new Set([name]),
					);

		return resolved?.kind === "open dictionary" ? { kind: "generic container" } : null;
	}

	const substitutions = aliasSubstitution(alias, unwrapped, new Map());

	if (substitutions === null) {return null;}

	const resolved = classifyAliasBroadTarget(
		alias.typeAnnotation,
		environment,
		substitutions,
		new Set([name]),
	);

	return resolved;
}

function hasBroadRecordKey(
	type: ESTree.TSTypeReference,
	environment: TypeEnvironment,
	substitutions: TypeAliasEnvironment,
): boolean {
	const key = type.typeArguments?.params[0];

	return key === undefined || isBroadMappedKey(key, environment, substitutions);
}

function isBroadMappedKey(
	type: ESTree.TypeNode,
	environment: TypeEnvironment,
	substitutions: TypeAliasEnvironment,
	visitedAliases: ReadonlySet<string> = new Set(),
): boolean {
	const unwrapped = unwrapTransparentType(type);

	if (
		unwrapped.type === nodeTypes.TSStringKeyword ||
		unwrapped.type === nodeTypes.TSNumberKeyword ||
		unwrapped.type === nodeTypes.TSSymbolKeyword
	) {
		return true;
	}

	if (unwrapped.type === nodeTypes.TSUnionType) {
		return unwrapped.types.some((member) =>
			isBroadMappedKey(member, environment, substitutions, visitedAliases),
		);
	}

	if (unwrapped.type !== nodeTypes.TSTypeReference) {return false;}

	const name = typeReferenceName(unwrapped);

	if (name === null) {return false;}

	const substitution = substitutions.get(name);

	if (substitution !== undefined) {
		return isBroadMappedKey(
			substitution.type,
			environment,
			substitution.substitutions,
			visitedAliases,
		);
	}

	if (name === "PropertyKey" && isBuiltIn(name, unwrapped, environment)) {return true;}

	const alias = visibleTypeAlias(name, unwrapped, environment.typeAliases);

	if (
		alias === null ||
		(alias.typeParameters?.params.length ?? 0) > 0 ||
		visitedAliases.has(name)
	) {
		return false;
	}

	const nextVisited = new Set(visitedAliases);
	nextVisited.add(name);

	return isBroadMappedKey(alias.typeAnnotation, environment, substitutions, nextVisited);
}

function classifyAliasBroadTarget(
	type: ESTree.TypeNode,
	environment: TypeEnvironment,
	substitutions: TypeAliasEnvironment,
	resolvingAliases: ReadonlySet<string>,
): WideningTarget | null {
	const unwrapped = unwrapTransparentType(type);

	if (unwrapped.type === nodeTypes.TSUnknownKeyword) {return { kind: "unknown" };}

	if (unwrapped.type === nodeTypes.TSObjectKeyword) {return { kind: "object" };}

	if (unwrapped.type === nodeTypes.TSTypeLiteral) {
		return unwrapped.members.some((member) => member.type === nodeTypes.TSIndexSignature)
			? { kind: "open dictionary" }
			: null;
	}

	if (unwrapped.type === nodeTypes.TSMappedType) {
		return isBroadMappedKey(unwrapped.constraint, environment, substitutions)
			? { kind: "open dictionary" }
			: null;
	}

	if (unwrapped.type !== nodeTypes.TSTypeReference) {return null;}

	const name = typeReferenceName(unwrapped);

	if (name === null) {return null;}

	const substitution = substitutions.get(name);

	if (substitution !== undefined) {
		return classifyAliasBroadTarget(
			substitution.type,
			environment,
			substitution.substitutions,
			resolvingAliases,
		);
	}

	if (TRANSPARENT_WRAPPERS.has(name) && isBuiltIn(name, unwrapped, environment)) {
		const wrapped = unwrapped.typeArguments?.params[0];

		return wrapped === undefined
			? null
			: classifyAliasBroadTarget(wrapped, environment, substitutions, resolvingAliases);
	}

	if (name === "Record" && isBuiltIn(name, unwrapped, environment)) {
		return hasBroadRecordKey(unwrapped, environment, substitutions)
			? { kind: "open dictionary" }
			: null;
	}

	const alias = visibleTypeAlias(name, unwrapped, environment.typeAliases);

	if (alias === null || resolvingAliases.has(name)) {return null;}

	const nextSubstitutions = aliasSubstitution(alias, unwrapped, substitutions);

	if (nextSubstitutions === null) {return null;}

	const nextResolving = new Set(resolvingAliases);
	nextResolving.add(name);

	return classifyAliasBroadTarget(
		alias.typeAnnotation,
		environment,
		nextSubstitutions,
		nextResolving,
	);
}

function isPopulatedObjectExpression(expression: ESTree.Expression): boolean {
	let current = expression;

	while (
		current.type === nodeTypes.TSAsExpression ||
		current.type === nodeTypes.TSTypeAssertion ||
		current.type === nodeTypes.TSNonNullExpression
	) {
		current = current.expression;
	}

	return current.type === nodeTypes.ObjectExpression && current.properties.length > 0;
}

function isKnownEvidenceExpression(expression: ESTree.Expression): boolean {
	let current = expression;

	while (
		current.type === nodeTypes.TSAsExpression ||
		current.type === nodeTypes.TSTypeAssertion ||
		current.type === nodeTypes.TSNonNullExpression ||
		current.type === nodeTypes.TSSatisfiesExpression
	) {
		current = current.expression;
	}

	return current.type === nodeTypes.ObjectExpression ? true : (
		current.type === nodeTypes.ArrayExpression ||
		current.type === nodeTypes.ArrowFunctionExpression ||
		current.type === nodeTypes.ClassExpression ||
		current.type === nodeTypes.FunctionExpression ||
		current.type === nodeTypes.NewExpression ||
		current.type === nodeTypes.Literal ||
		current.type === nodeTypes.TemplateLiteral ||
		current.type === nodeTypes.UnaryExpression
	);
}

export {
	type TypeEnvironment,
	type UnsafeDictionary,
	type WideningTarget,
	type WideningTargetKind,
	classifyUnsafeDictionary,
	classifyUnsafeDictionaryValue,
	classifyWideningTarget,
	createTypeEnvironment,
	isKnownEvidenceExpression,
	isPopulatedObjectExpression,
};
