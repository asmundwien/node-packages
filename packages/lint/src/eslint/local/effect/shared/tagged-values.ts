import { AST_NODE_TYPES, TSESLint } from "@typescript-eslint/utils";

import { resolveVariable } from "../../shared/scope.ts";

import type { ESTree, SourceCode } from "../../types.ts";

const broadEffectCatchMethods = new Set(["catch", "catchAll", "catchIf"]);

const equalityOperators = new Set(["!=", "!==", "==", "==="]);

function isStringLiteral(
	node: ESTree.Node | null | undefined,
): node is ESTree.StringLiteral {
	return node?.type === AST_NODE_TYPES.Literal && typeof node.value === "string";
}

function isTagMember(
	node: ESTree.Node | null | undefined,
): node is ESTree.MemberExpression {
	return node?.type === AST_NODE_TYPES.MemberExpression &&
		((!node.computed &&
			node.property.type === AST_NODE_TYPES.Identifier &&
			node.property.name === "_tag") ||
			(node.computed &&
				isStringLiteral(node.property) &&
				node.property.value === "_tag"));
}

function tagMemberFromComparison(
	node: ESTree.BinaryExpression,
): ESTree.MemberExpression | undefined {
	if (!equalityOperators.has(node.operator)) {return undefined;}

	if (isTagMember(node.left) && isStringLiteral(node.right)) {return node.left;}

	if (isTagMember(node.right) && isStringLiteral(node.left)) {return node.right;}

	return undefined;
}

function isBroadEffectCatchCall(
	node: ESTree.Node | null | undefined,
): node is ESTree.CallExpression {
	return node?.type === AST_NODE_TYPES.CallExpression &&
		node.callee.type === AST_NODE_TYPES.MemberExpression &&
		node.callee.object.type === AST_NODE_TYPES.Identifier &&
		node.callee.object.name === "Effect" &&
		!node.callee.computed &&
		node.callee.property.type === AST_NODE_TYPES.Identifier &&
		broadEffectCatchMethods.has(node.callee.property.name);
}

function isInsideBroadEffectHandler(node: ESTree.Node): boolean {
	if (node.type === AST_NODE_TYPES.Program) {return false;}

	let { parent: current } = node;

	while (current.type !== AST_NODE_TYPES.Program) {
		if (
			current.type === AST_NODE_TYPES.ArrowFunctionExpression ||
			current.type === AST_NODE_TYPES.FunctionExpression
		) {
			return (
				isBroadEffectCatchCall(current.parent) &&
				current.parent.arguments.includes(current)
			);
		}

		current = current.parent;
	}

	return false;
}

function isReasonTagMember(node: ESTree.MemberExpression): boolean {
	return node.object.type === AST_NODE_TYPES.MemberExpression &&
		((!node.object.computed &&
			node.object.property.type === AST_NODE_TYPES.Identifier &&
			node.object.property.name === "reason") ||
			(node.object.computed &&
				isStringLiteral(node.object.property) &&
				node.object.property.value === "reason"));
}

function propertyName(property: ESTree.Property): string | undefined {
	if (!property.computed && property.key.type === AST_NODE_TYPES.Identifier) {
		return property.key.name;
	}

	if (
		property.key.type === AST_NODE_TYPES.Literal &&
		typeof property.key.value === "string"
	) {
		return property.key.value;
	}

	return undefined;
}

function isEffectMatchImport(
	sourceCode: SourceCode,
	identifier: ESTree.Identifier,
): boolean {
	const variable = resolveVariable(sourceCode, identifier);

	if (variable === null) {return false;}

	return variable.defs.some((definition) => {
		if (
			definition.type !== TSESLint.Scope.DefinitionType.ImportBinding ||
			definition.parent.type !== AST_NODE_TYPES.ImportDeclaration ||
			definition.parent.importKind === "type"
		) {
			return false;
		}

		const { node, parent } = definition;

		if (node.type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
			return parent.source.value === "effect/Match";
		}

		if (node.type !== AST_NODE_TYPES.ImportSpecifier || node.importKind === "type") {
			return false;
		}

		const importedName = node.imported.type === AST_NODE_TYPES.Identifier
			? node.imported.name
			: node.imported.value;

		return parent.source.value === "effect" && importedName === "Match";
	});
}

function isMatchPatternObject(
	sourceCode: SourceCode,
	node: ESTree.ObjectExpression,
): boolean {
	const { parent: call } = node;

	if (call.type !== AST_NODE_TYPES.CallExpression || !call.arguments.includes(node)) {
		return false;
	}

	const { callee } = call;

	return (
		callee.type === AST_NODE_TYPES.MemberExpression &&
		callee.object.type === AST_NODE_TYPES.Identifier &&
		!callee.computed &&
		callee.property.type === AST_NODE_TYPES.Identifier &&
		(callee.property.name === "when" || callee.property.name === "not") &&
		isEffectMatchImport(sourceCode, callee.object)
	);
}

export {
	isInsideBroadEffectHandler,
	isMatchPatternObject,
	isReasonTagMember,
	isStringLiteral,
	isTagMember,
	propertyName,
	tagMemberFromComparison,
};
