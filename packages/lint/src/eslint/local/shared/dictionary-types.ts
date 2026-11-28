import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import {
	type TypeAliasEnvironment as LexicalTypeAliasEnvironment,
	createTypeAliasEnvironment,
	hasVisibleTypeBinding,
	visibleTypeAlias,
	visibleTypeInterfaces,
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

type ResolutionPath = ReadonlySet<ESTree.TSTypeAliasDeclaration | ESTree.TSTypeParameter>;

interface ResolvedType {
	readonly resolvingAliases: ResolutionPath;
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
	readonly typeAliases: LexicalTypeAliasEnvironment;
}


function createTypeEnvironment(
	program: ESTree.Program,
	visitorKeys: Readonly<Record<string, readonly string[]>>,
): TypeEnvironment {
	return {
		typeAliases: createTypeAliasEnvironment(program, visitorKeys),
	};
}

function typeReferenceName(type: ESTree.TSTypeReference): string | null {
	return type.typeName.type === AST_NODE_TYPES.Identifier ? type.typeName.name : null;
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
    current.type === AST_NODE_TYPES.TSTypeOperator && current.operator === "readonly" && current.typeAnnotation !== undefined
	) {
		current = current.typeAnnotation;
	}

	return current;
}

function isNeverType(type: ESTree.TypeNode): boolean {
	return unwrapTransparentType(type).type === AST_NODE_TYPES.TSNeverKeyword;
}

function isEffectivelyEmptyMember(member: ESTree.TypeElement): boolean {
	return (
		member.type === AST_NODE_TYPES.TSPropertySignature &&
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
	return declarations.length > 0 && declarations.every(
		(declaration) => declaration.extends.length === 0 && declaration.body.body.every(isEffectivelyEmptyMember),
	);
}

function aliasSubstitution(
	alias: ESTree.TSTypeAliasDeclaration,
	type: ESTree.TSTypeReference,
	base: TypeAliasEnvironment,
	resolvingAliases: ResolutionPath,
): TypeAliasEnvironment | null {
	const parameters = alias.typeParameters?.params ?? [];
	const typeArguments = type.typeArguments?.params ?? [];
	const next = new Map<string, ResolvedType>();

	for (const [index, parameter] of parameters.entries()) {
		const explicitArgument = typeArguments[index];
		const argument = explicitArgument ?? parameter.default;

		if (argument === undefined || (explicitArgument === undefined && resolvingAliases.has(parameter))) {return null;}

		// Explicit arguments use the caller's bindings; defaults use earlier callee parameters.
		const argumentSubstitutions = explicitArgument === undefined ? new Map(next) : base;
		let argumentResolvingAliases = resolvingAliases;

		if (explicitArgument === undefined) {
			const defaultResolvingAliases = new Set(resolvingAliases);
			defaultResolvingAliases.add(parameter);
			argumentResolvingAliases = defaultResolvingAliases;
		}

		next.set(parameter.name.name, {
			resolvingAliases: argumentResolvingAliases,
			substitutions: argumentSubstitutions,
			type: argument,
		});
	}

	return next;
}

function unsafeIntersectionValue(
	type: ESTree.TSIntersectionType,
	environment: TypeEnvironment,
	substitutions: TypeAliasEnvironment,
	resolvingAliases: ResolutionPath,
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
	resolvingAliases: ResolutionPath,
): UnsafeDictionary["unsafeValue"] | null {
	const unwrapped = unwrapTransparentType(type);

	if (unwrapped.type === AST_NODE_TYPES.TSUnknownKeyword) {return "unknown";}

	if (unwrapped.type === AST_NODE_TYPES.TSAnyKeyword) {return "any";}

	if (unwrapped.type === AST_NODE_TYPES.TSObjectKeyword) {return "object";}

	if (unwrapped.type === AST_NODE_TYPES.TSTypeLiteral && isEffectivelyEmptyTypeLiteral(unwrapped))
		{return "empty-object";}

	if (unwrapped.type === AST_NODE_TYPES.TSUnionType) {
		return unwrapped.types.some(
			(member) => unsafeDirectValue(member, environment, substitutions, resolvingAliases) !== null,
		)
			? "union"
			: null;
	}

	if (unwrapped.type === AST_NODE_TYPES.TSIntersectionType) {
		return unsafeIntersectionValue(unwrapped, environment, substitutions, resolvingAliases);
	}

	if (unwrapped.type !== AST_NODE_TYPES.TSTypeReference) {return null;}

	const name = typeReferenceName(unwrapped);

	if (name === null) {return null;}

	if (TRANSPARENT_WRAPPERS.has(name) && isBuiltIn(name, unwrapped, environment)) {
		const wrapped = unwrapped.typeArguments?.params[0];

		return wrapped === undefined
			? null
			: unsafeDirectValue(wrapped, environment, substitutions, resolvingAliases);
	}

	const substitution = substitutions.get(name);

	if (substitution !== undefined && (unwrapped.typeArguments?.params.length ?? 0) === 0) {
		return unsafeDirectValue(
			substitution.type,
			environment,
			substitution.substitutions,
			substitution.resolvingAliases,
		);
	}

	const interfaceDeclarations = visibleTypeInterfaces(name, unwrapped, environment.typeAliases);

	if (interfaceDeclarations.length > 0) {
		return isEffectivelyEmptyInterface(interfaceDeclarations) ? "empty-object" : null;
	}

	const alias = visibleTypeAlias(name, unwrapped, environment.typeAliases);

	if (alias === null || resolvingAliases.has(alias)) {return null;}

	const nextSubstitutions = aliasSubstitution(alias, unwrapped, substitutions, resolvingAliases);

	if (nextSubstitutions === null) {return null;}

	const nextResolving = new Set(resolvingAliases);
	nextResolving.add(alias);

	return unsafeDirectValue(alias.typeAnnotation, environment, nextSubstitutions, nextResolving);
}

function dictionaryValueTypes(
	type: ESTree.TypeNode,
	environment: TypeEnvironment,
	substitutions: TypeAliasEnvironment,
	resolvingAliases: ResolutionPath,
): readonly ResolvedType[] {
	const unwrapped = unwrapTransparentType(type);

	if (unwrapped.type === AST_NODE_TYPES.TSIntersectionType) {
		return unwrapped.types.flatMap((member) =>
			dictionaryValueTypes(member, environment, substitutions, resolvingAliases),
		);
	}

	if (unwrapped.type === AST_NODE_TYPES.TSTypeLiteral) {
		return unwrapped.members.flatMap((member): readonly ResolvedType[] => {
			return member.type === AST_NODE_TYPES.TSIndexSignature && member.typeAnnotation !== undefined
				? [{ resolvingAliases, substitutions, type: member.typeAnnotation.typeAnnotation }]
				: [];
		},
		);
	}

	if (unwrapped.type === AST_NODE_TYPES.TSMappedType) {
		return unwrapped.typeAnnotation === undefined
			? []
			: [{ resolvingAliases, substitutions, type: unwrapped.typeAnnotation }];
	}

	if (unwrapped.type !== AST_NODE_TYPES.TSTypeReference) {return [];}

	const name = typeReferenceName(unwrapped);

	if (name === null) {return [];}

	const substitution = substitutions.get(name);

	if (substitution !== undefined && (unwrapped.typeArguments?.params.length ?? 0) === 0) {
		return dictionaryValueTypes(
			substitution.type,
			environment,
			substitution.substitutions,
			substitution.resolvingAliases,
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

		return value === null ? [] : [{ resolvingAliases, substitutions, type: value }];
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

	if (alias === null || resolvingAliases.has(alias)) {return [];}

	const nextSubstitutions = aliasSubstitution(alias, unwrapped, substitutions, resolvingAliases);

	if (nextSubstitutions === null) {return [];}

	const nextResolving = new Set(resolvingAliases);
	nextResolving.add(alias);

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
			valueType.resolvingAliases,
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

	if (unwrapped.type === AST_NODE_TYPES.TSUnknownKeyword) {return { kind: "unknown" };}

	if (unwrapped.type === AST_NODE_TYPES.TSObjectKeyword) {return { kind: "object" };}

	if (unwrapped.type === AST_NODE_TYPES.TSTypeLiteral) {
		if (unwrapped.members.length === 0) {return null;}

		return unwrapped.members.some((member) => member.type === AST_NODE_TYPES.TSIndexSignature)
			? { kind: "open dictionary" }
			: { kind: "anonymous object" };
	}

	if (unwrapped.type === AST_NODE_TYPES.TSMappedType) {return { kind: "open dictionary" };}

	if (unwrapped.type !== AST_NODE_TYPES.TSTypeReference) {return null;}

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
		const substitutions = aliasSubstitution(alias, unwrapped, new Map(), new Set());

		const resolved =
			substitutions === null
				? null
				: classifyAliasBroadTarget(
						alias.typeAnnotation,
						environment,
						substitutions,
						new Set([alias]),
					);

		return resolved?.kind === "open dictionary" ? { kind: "generic container" } : null;
	}

	const substitutions = aliasSubstitution(alias, unwrapped, new Map(), new Set());

	if (substitutions === null) {return null;}

	const resolved = classifyAliasBroadTarget(
		alias.typeAnnotation,
		environment,
		substitutions,
		new Set([alias]),
	);

	return resolved;
}

function hasBroadRecordKey(
	type: ESTree.TSTypeReference,
	environment: TypeEnvironment,
	substitutions: TypeAliasEnvironment,
	resolvingAliases: ResolutionPath = new Set(),
): boolean {
	const key = type.typeArguments?.params[0];

	return key === undefined || isBroadMappedKey(key, environment, substitutions, resolvingAliases);
}

function isBroadMappedKey(
	type: ESTree.TypeNode,
	environment: TypeEnvironment,
	substitutions: TypeAliasEnvironment,
	visitedAliases: ResolutionPath = new Set(),
): boolean {
	const unwrapped = unwrapTransparentType(type);

	if (
		unwrapped.type === AST_NODE_TYPES.TSStringKeyword ||
		unwrapped.type === AST_NODE_TYPES.TSNumberKeyword ||
		unwrapped.type === AST_NODE_TYPES.TSSymbolKeyword
	) {
		return true;
	}

	if (unwrapped.type === AST_NODE_TYPES.TSUnionType) {
		return unwrapped.types.some((member) =>
			isBroadMappedKey(member, environment, substitutions, visitedAliases),
		);
	}

	if (unwrapped.type !== AST_NODE_TYPES.TSTypeReference) {return false;}

	const name = typeReferenceName(unwrapped);

	if (name === null) {return false;}

	const substitution = substitutions.get(name);

	if (substitution !== undefined && (unwrapped.typeArguments?.params.length ?? 0) === 0) {
		return isBroadMappedKey(
			substitution.type,
			environment,
			substitution.substitutions,
			substitution.resolvingAliases,
		);
	}

	if (name === "PropertyKey" && isBuiltIn(name, unwrapped, environment)) {return true;}

	const alias = visibleTypeAlias(name, unwrapped, environment.typeAliases);

	if (
		alias === null ||
		(alias.typeParameters?.params.length ?? 0) > 0 ||
		visitedAliases.has(alias)
	) {
		return false;
	}

	const nextSubstitutions = aliasSubstitution(alias, unwrapped, substitutions, visitedAliases);

	if (nextSubstitutions === null) {return false;}

	const nextVisited = new Set(visitedAliases);
	nextVisited.add(alias);

	return isBroadMappedKey(alias.typeAnnotation, environment, nextSubstitutions, nextVisited);
}

function classifyAliasBroadTarget(
	type: ESTree.TypeNode,
	environment: TypeEnvironment,
	substitutions: TypeAliasEnvironment,
	resolvingAliases: ResolutionPath,
): WideningTarget | null {
	const unwrapped = unwrapTransparentType(type);

	if (unwrapped.type === AST_NODE_TYPES.TSUnknownKeyword) {return { kind: "unknown" };}

	if (unwrapped.type === AST_NODE_TYPES.TSObjectKeyword) {return { kind: "object" };}

	if (unwrapped.type === AST_NODE_TYPES.TSTypeLiteral) {
		return unwrapped.members.some((member) => member.type === AST_NODE_TYPES.TSIndexSignature)
			? { kind: "open dictionary" }
			: null;
	}

	if (unwrapped.type === AST_NODE_TYPES.TSMappedType) {
		return isBroadMappedKey(unwrapped.constraint, environment, substitutions, resolvingAliases)
			? { kind: "open dictionary" }
			: null;
	}

	if (unwrapped.type !== AST_NODE_TYPES.TSTypeReference) {return null;}

	const name = typeReferenceName(unwrapped);

	if (name === null) {return null;}

	const substitution = substitutions.get(name);

	if (substitution !== undefined && (unwrapped.typeArguments?.params.length ?? 0) === 0) {
		return classifyAliasBroadTarget(
			substitution.type,
			environment,
			substitution.substitutions,
			substitution.resolvingAliases,
		);
	}

	if (TRANSPARENT_WRAPPERS.has(name) && isBuiltIn(name, unwrapped, environment)) {
		const wrapped = unwrapped.typeArguments?.params[0];

		return wrapped === undefined
			? null
			: classifyAliasBroadTarget(wrapped, environment, substitutions, resolvingAliases);
	}

	if (name === "Record" && isBuiltIn(name, unwrapped, environment)) {
		return hasBroadRecordKey(unwrapped, environment, substitutions, resolvingAliases)
			? { kind: "open dictionary" }
			: null;
	}

	const alias = visibleTypeAlias(name, unwrapped, environment.typeAliases);

	if (alias === null || resolvingAliases.has(alias)) {return null;}

	const nextSubstitutions = aliasSubstitution(alias, unwrapped, substitutions, resolvingAliases);

	if (nextSubstitutions === null) {return null;}

	const nextResolving = new Set(resolvingAliases);
	nextResolving.add(alias);

	return classifyAliasBroadTarget(
		alias.typeAnnotation,
		environment,
		nextSubstitutions,
		nextResolving,
	);
}

function isKnownEvidenceExpression(expression: ESTree.Expression): boolean {
	let current = expression;

	while (
		current.type === AST_NODE_TYPES.TSAsExpression ||
		current.type === AST_NODE_TYPES.TSTypeAssertion ||
		current.type === AST_NODE_TYPES.TSNonNullExpression ||
		current.type === AST_NODE_TYPES.TSSatisfiesExpression
	) {
		current = current.expression;
	}

	return current.type === AST_NODE_TYPES.ObjectExpression ? true : (
		current.type === AST_NODE_TYPES.ArrayExpression ||
		current.type === AST_NODE_TYPES.ArrowFunctionExpression ||
		current.type === AST_NODE_TYPES.ClassExpression ||
		current.type === AST_NODE_TYPES.FunctionExpression ||
		current.type === AST_NODE_TYPES.NewExpression ||
		current.type === AST_NODE_TYPES.Literal ||
		current.type === AST_NODE_TYPES.TemplateLiteral ||
		current.type === AST_NODE_TYPES.UnaryExpression
	);
}

export {
	type TypeEnvironment,
	type WideningTarget,
	classifyUnsafeDictionary,
	classifyUnsafeDictionaryValue,
	classifyWideningTarget,
	createTypeEnvironment,
	isKnownEvidenceExpression,
};
