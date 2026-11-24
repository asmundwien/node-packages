import { AST_NODE_TYPES as nodeTypes } from "@typescript-eslint/utils";

import { forEachChild, lexicalTypeParameterNames } from "./lexical-type-parameters.ts";

import type { ESTree } from "../types.ts";


type VisitorKeys = Readonly<Record<string, readonly string[]>>;

type TypeScope = ESTree.Node;

interface TypeBinding {
	readonly alias: ESTree.TSTypeAliasDeclaration | null;
	readonly name: string;
	readonly scope: TypeScope;
}

interface Substitution {
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
	if (node.type === nodeTypes.Program) {return node;}

	let current = node.parent;

	while (current.type !== nodeTypes.Program) {
		if (
			current.type === nodeTypes.BlockStatement ||
			current.type === nodeTypes.TSModuleBlock ||
			current.type === nodeTypes.StaticBlock ||
			current.type === nodeTypes.SwitchStatement
		) {
			return current;
		}

		current = current.parent;
	}

	return current;
}

function declaredTypeBinding(node: ESTree.Node): {
	readonly alias: ESTree.TSTypeAliasDeclaration | null;
	readonly name: string;
} | null {
	if (node.type === nodeTypes.TSTypeAliasDeclaration) {
		return { alias: node, name: node.id.name };
	}

	if (
		node.type === nodeTypes.TSInterfaceDeclaration ||
		node.type === nodeTypes.TSEnumDeclaration ||
		node.type === nodeTypes.ClassDeclaration ||
		node.type === nodeTypes.ClassExpression
	) {
		return node.id === null ? null : { alias: null, name: node.id.name };
	}

	if (
		node.type === nodeTypes.ImportSpecifier ||
		node.type === nodeTypes.ImportDefaultSpecifier ||
		node.type === nodeTypes.ImportNamespaceSpecifier
	) {
		return { alias: null, name: node.local.name };
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
			bindings.push({ ...declared, scope: enclosingTypeScope(node) });
			bindingsByName.set(declared.name, bindings);

			if (declared.alias !== null) {aliases.push(declared.alias);}
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
		if (current.type === nodeTypes.Program) {return null;}

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
	let nearestDistance = Infinity;
	let nearest: TypeBinding[] = [];

	for (const candidate of candidates) {
		const distance = ancestorDistance(candidate.scope, use);

		if (distance === null || distance > nearestDistance) {continue;}

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
	if (lexicalTypeParameterNames(use, environment.visitorKeys).has(name)) {return null;}

	const bindings = nearestTypeBindings(name, use, environment);

	return bindings.length === 1 ? (bindings[0]?.alias ?? null) : null;
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
		lexicalTypeParameterNames(use, environment.visitorKeys).has(name) ||
		nearestTypeBindings(name, use, environment).length > 0
	);
}

function typeReferenceName(type: ESTree.TSTypeReference): string | null {
	return type.typeName.type === nodeTypes.Identifier ? type.typeName.name : null;
}

function aliasSubstitutions(
	alias: ESTree.TSTypeAliasDeclaration,
	reference: ESTree.TSTypeReference,
	base: Substitutions,
): Substitutions | null {
	const parameters = alias.typeParameters?.params ?? [];
	const typeArguments = reference.typeArguments?.params ?? [];
	const next = new Map(base);

	for (const [index, parameter] of parameters.entries()) {
		const explicitArgument = typeArguments[index];
		const argument = explicitArgument ?? parameter.default;

		if (argument === undefined) {return null;}

		const argumentSubstitutions = explicitArgument === undefined ? new Map(next) : base;
		next.set(parameter.name.name, { substitutions: argumentSubstitutions, type: argument });
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
		initialResolvingAliases: ReadonlySet<ESTree.TSTypeAliasDeclaration>,
	): boolean {
		let current = typeToMatch;
		let substitutions = initialSubstitutions;
		let resolvingAliases = initialResolvingAliases;

		for (;;) {
      if (current.type !== nodeTypes.TSTypeReference) { break; }

      const name = typeReferenceName(current);

      if (name === null) { break; }

      const substitution = substitutions.get(name);

      if (substitution !== undefined && (current.typeArguments?.params.length ?? 0) === 0) {
        ({ type: current, substitutions } = substitution);
        continue;
      }

      const alias = visibleTypeAlias(name, current, environment);

      if (alias === null || resolvingAliases.has(alias)) { break; }

      const nextSubstitutions = aliasSubstitutions(alias, current, substitutions);

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
	type ResolvedTypeMatcher,
	type TypeAliasEnvironment,
	createTypeAliasEnvironment,
	doesResolvedTypeMatch,
	hasVisibleTypeBinding,
	visibleTypeAlias,
};
