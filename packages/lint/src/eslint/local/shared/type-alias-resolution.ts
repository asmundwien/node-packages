import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { forEachChild, lexicalTypeParameterScope } from "./lexical-type-parameters.ts";

import type { ESTree } from "../types.ts";


type VisitorKeys = Readonly<Record<string, readonly string[]>>;

type TypeScope = ESTree.Node;

interface TypeBinding {
	readonly declaration: ESTree.TSTypeAliasDeclaration | ESTree.TSInterfaceDeclaration | null;
	readonly name: string;
	readonly scope: TypeScope;
}

type ResolutionPath = ReadonlySet<ESTree.TSTypeAliasDeclaration | ESTree.TSTypeParameter>;

interface Substitution {
	readonly resolvingAliases: ResolutionPath;
	readonly substitutions: Substitutions;
	readonly type: ESTree.TypeNode;
}

type Substitutions = ReadonlyMap<string, Substitution>;

interface TypeAliasEnvironment {
	readonly aliases: readonly ESTree.TSTypeAliasDeclaration[];
	readonly bindingsByName: ReadonlyMap<string, readonly TypeBinding[]>;
	readonly visitorKeys: VisitorKeys;
}

type ResolvedTypeMatcher = (
	type: ESTree.TypeNode,
	isMatchingType: (child: ESTree.TypeNode) => boolean,
) => boolean;

const environmentsByProgram = new WeakMap<ESTree.Program, TypeAliasEnvironment>();


function enclosingTypeScope(node: ESTree.Node): TypeScope {
	if (node.type === AST_NODE_TYPES.Program) {return node;}

	let current = node.parent;

	while (current.type !== AST_NODE_TYPES.Program) {
		if (
			current.type === AST_NODE_TYPES.BlockStatement ||
			current.type === AST_NODE_TYPES.TSModuleBlock ||
			current.type === AST_NODE_TYPES.StaticBlock ||
			current.type === AST_NODE_TYPES.SwitchStatement
		) {
			return current;
		}

		current = current.parent;
	}

	return current;
}

function declaredTypeBinding(node: ESTree.Node): {
	readonly declaration: ESTree.TSTypeAliasDeclaration | ESTree.TSInterfaceDeclaration | null;
	readonly name: string;
} | null {
	if (
		node.type === AST_NODE_TYPES.TSTypeAliasDeclaration ||
		node.type === AST_NODE_TYPES.TSInterfaceDeclaration
	) {
		return { declaration: node, name: node.id.name };
	}

	if (
		node.type === AST_NODE_TYPES.TSEnumDeclaration ||
		node.type === AST_NODE_TYPES.ClassDeclaration ||
		node.type === AST_NODE_TYPES.ClassExpression
	) {
		return node.id === null ? null : { declaration: null, name: node.id.name };
	}

	if (
		node.type === AST_NODE_TYPES.ImportSpecifier ||
		node.type === AST_NODE_TYPES.ImportDefaultSpecifier ||
		node.type === AST_NODE_TYPES.ImportNamespaceSpecifier
	) {
		return { declaration: null, name: node.local.name };
	}

	return null;
}


/**
Collect every lexical type alias and competing type binding in a program.
*/
function createTypeAliasEnvironment(
	program: ESTree.Program,
	visitorKeys: VisitorKeys,
): TypeAliasEnvironment {
	const cached = environmentsByProgram.get(program);

	if (cached !== undefined) {return cached;}

	const bindingsByName = new Map<string, TypeBinding[]>();
	const aliases: ESTree.TSTypeAliasDeclaration[] = [];

	function collectTypeBindings(node: ESTree.Node) {
		const declared = declaredTypeBinding(node);

		if (declared !== null) {
			const bindings = bindingsByName.get(declared.name) ?? [];
			bindings.push({
				...declared,
				scope: node.type === AST_NODE_TYPES.ClassExpression ? node : enclosingTypeScope(node),
			});
			bindingsByName.set(declared.name, bindings);

			if (declared.declaration?.type === AST_NODE_TYPES.TSTypeAliasDeclaration) {
				aliases.push(declared.declaration);
			}
		}

		forEachChild(node, visitorKeys, collectTypeBindings);
	}

	collectTypeBindings(program);
	const environment = { aliases, bindingsByName, visitorKeys };
	environmentsByProgram.set(program, environment);

	return environment;
}

function ancestorDistance(ancestor: ESTree.Node, node: ESTree.Node): number | null {
	let current = node;
	let distance = 0;

	while (current !== ancestor) {
		if (current.type === AST_NODE_TYPES.Program) {return null;}

		current = current.parent;
		distance += 1;
	}

	return distance;
}

function nearestTypeBindings(
	name: string,
	use: ESTree.Node,
	environment: TypeAliasEnvironment,
): readonly TypeBinding[] {
	const candidates = environment.bindingsByName.get(name) ?? [];
	const parameterScope = lexicalTypeParameterScope(name, use, environment.visitorKeys);
	const parameterDistance = parameterScope === undefined ? Infinity : ancestorDistance(parameterScope, use) ?? Infinity;
	let nearestDistance = Infinity;
	let nearest: TypeBinding[] = [];

	for (const candidate of candidates) {
		const distance = ancestorDistance(candidate.scope, use);

		if (distance === null || distance >= parameterDistance || distance > nearestDistance) {continue;}

		if (distance === nearestDistance) {
			nearest.push(candidate);
			continue;
		}

		nearestDistance = distance;
		nearest = [candidate];
	}

	return nearest;
}

/**
Resolve the nearest visible alias with this name, respecting lexical shadowing.
*/
function visibleTypeAlias(
	name: string,
	use: ESTree.Node,
	environment: TypeAliasEnvironment,
): ESTree.TSTypeAliasDeclaration | null {
	const bindings = nearestTypeBindings(name, use, environment);

	const declaration = bindings.length === 1 ? bindings[0]?.declaration : null;

	return declaration?.type === AST_NODE_TYPES.TSTypeAliasDeclaration ? declaration : null;
}

function visibleTypeInterfaces(
	name: string,
	use: ESTree.Node,
	environment: TypeAliasEnvironment,
): readonly ESTree.TSInterfaceDeclaration[] {
	const declarations: ESTree.TSInterfaceDeclaration[] = [];

	for (const binding of nearestTypeBindings(name, use, environment)) {
		if (binding.declaration?.type !== AST_NODE_TYPES.TSInterfaceDeclaration) {return [];}

		declarations.push(binding.declaration);
	}

	return declarations;
}

/**
Return whether a local declaration shadows a built-in type at this use.
*/
function hasVisibleTypeBinding(
	name: string,
	use: ESTree.Node,
	environment: TypeAliasEnvironment,
): boolean {
	return (
		lexicalTypeParameterScope(name, use, environment.visitorKeys) !== undefined ||
		nearestTypeBindings(name, use, environment).length > 0
	);
}

function typeReferenceName(type: ESTree.TSTypeReference): string | null {
	return type.typeName.type === AST_NODE_TYPES.Identifier ? type.typeName.name : null;
}

function aliasSubstitutions(
	alias: ESTree.TSTypeAliasDeclaration,
	reference: ESTree.TSTypeReference,
	base: Substitutions,
	resolvingAliases: ResolutionPath,
): Substitutions | null {
	const parameters = alias.typeParameters?.params ?? [];
	const typeArguments = reference.typeArguments?.params ?? [];
	const next = new Map<string, Substitution>();

	for (const [index, parameter] of parameters.entries()) {
		const explicitArgument = typeArguments[index];
		const argument = explicitArgument ?? parameter.default;

		if (argument === undefined || (explicitArgument === undefined && resolvingAliases.has(parameter))) {return null;}

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

/**
Match a type after resolving visible aliases and substituting their type parameters.
*/
function doesResolvedTypeMatch(
	type: ESTree.TypeNode,
	environment: TypeAliasEnvironment,
	isMatchingResolvedType: ResolvedTypeMatcher,
): boolean {
	function doesMatch(
		typeToMatch: ESTree.TypeNode,
		initialSubstitutions: Substitutions,
		initialResolvingAliases: ResolutionPath,
	): boolean {
		let current = typeToMatch;
		let substitutions = initialSubstitutions;
		let resolvingAliases = initialResolvingAliases;

		for (;;) {
      if (current.type !== AST_NODE_TYPES.TSTypeReference) { break; }

      const name = typeReferenceName(current);

      if (name === null) { break; }

      const substitution = substitutions.get(name);

      if (substitution !== undefined && (current.typeArguments?.params.length ?? 0) === 0) {
        ({ type: current, substitutions, resolvingAliases } = substitution);
        continue;
      }

      const alias = visibleTypeAlias(name, current, environment);

      if (alias === null || resolvingAliases.has(alias)) { break; }

      const nextSubstitutions = aliasSubstitutions(alias, current, substitutions, resolvingAliases);

      if (nextSubstitutions === null) { break; }

      const nextResolving = new Set(resolvingAliases);
      nextResolving.add(alias);
      current = alias.typeAnnotation;
      substitutions = nextSubstitutions;
      resolvingAliases = nextResolving;
		}

    return isMatchingResolvedType(current, (child) =>
      doesMatch(child, substitutions, resolvingAliases),
    );
	}

	return doesMatch(type, new Map(), new Set());
}

export {
	type TypeAliasEnvironment,
	createTypeAliasEnvironment,
	doesResolvedTypeMatch,
	hasVisibleTypeBinding,
	visibleTypeAlias,
	visibleTypeInterfaces,
};
