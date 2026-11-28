import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import type { ESTree } from "../types.ts";

type VisitorKeys = Readonly<Record<string, readonly string[]>>;


/**
Visit parser-owned child fields without allocating a child list.
*/
function forEachChild(
	node: ESTree.Node,
	visitorKeys: VisitorKeys,
	visit: (child: ESTree.Node) => void,
): void {
	// SAFETY: Parser visitor keys select only child nodes, arrays of nullable child nodes, or absent fields.
	const fields = node as ESTree.Node & Readonly<Record<string, ESTree.Node | readonly (ESTree.Node | null)[] | null | undefined>>;
	const keys = visitorKeys[node.type];

	if (keys === undefined) {return;}

	for (const key of keys) {
		const value = fields[key];

		if (value === null || value === undefined) {continue;}

		if ("type" in value) {
			visit(value);
		} else {
			for (const child of value) {
				if (child !== null) {visit(child);}
			}
		}
	}
}

function hasInferTypeParameter(
	node: ESTree.Node,
	name: string,
	visitorKeys: VisitorKeys,
): boolean {
	if (node.type === AST_NODE_TYPES.TSConditionalType) {return false;}

	if (node.type === AST_NODE_TYPES.TSInferType) {return node.typeParameter.name.name === name;}

	let hasMatchingParameter = false;

	forEachChild(node, visitorKeys, (child) => {
		if (!hasMatchingParameter) {hasMatchingParameter = hasInferTypeParameter(child, name, visitorKeys);}
	});

	return hasMatchingParameter;
}

/**
Find the nearest lexical scope that binds this type parameter name.
*/
function lexicalTypeParameterScope(
	name: string,
	node: ESTree.Node,
	visitorKeys: VisitorKeys,
): ESTree.Node | undefined {
	let descendant: ESTree.Node = node;
	let current = node;

	while (current.type !== AST_NODE_TYPES.Program) {
		if (
			"typeParameters" in current &&
			current.typeParameters?.params.some((parameter) => parameter.name.name === name) === true
		) {
			return current;
		}

		if (
			current.type === AST_NODE_TYPES.TSMappedType &&
			current.key.name === name &&
			(descendant === current.nameType || descendant === current.typeAnnotation)
		) {
			return current;
		}

		if (
			current.type === AST_NODE_TYPES.TSConditionalType &&
			descendant === current.trueType &&
			hasInferTypeParameter(current.extendsType, name, visitorKeys)
		) {
			return current;
		}

		descendant = current;
		current = current.parent;
	}

	return undefined;
}

export { forEachChild, lexicalTypeParameterScope };
