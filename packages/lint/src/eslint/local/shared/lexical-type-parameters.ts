import { AST_NODE_TYPES as nodeTypes } from "@typescript-eslint/utils";

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

function collectInferTypeParameterNames(
	node: ESTree.Node,
	visitorKeys: VisitorKeys,
	names: Set<string>,
): void {
	function collect(current: ESTree.Node) {
		if (current.type === nodeTypes.TSInferType) {names.add(current.typeParameter.name.name);}

		forEachChild(current, visitorKeys, collect);
	}

	collect(node);
}

/**
Collect type binders that are in scope at a node and can shadow module aliases.
*/
function lexicalTypeParameterNames(
	node: ESTree.Node,
	visitorKeys: VisitorKeys,
): ReadonlySet<string> {
	const names = new Set<string>();
	let descendant: ESTree.Node = node;
	let current = node;

	while (current.type !== nodeTypes.Program) {
		if ("typeParameters" in current && current.typeParameters !== undefined) {
			for (const parameter of current.typeParameters.params) {
				names.add(parameter.name.name);
			}
		}

		if (
			current.type === nodeTypes.TSMappedType &&
			(descendant === current.nameType || descendant === current.typeAnnotation)
		) {
			names.add(current.key.name);
		}

		if (current.type === nodeTypes.TSConditionalType && descendant === current.trueType) {
			collectInferTypeParameterNames(current.extendsType, visitorKeys, names);
		}

		descendant = current;
		current = current.parent;
	}

	return names;
}

export { forEachChild, lexicalTypeParameterNames };
