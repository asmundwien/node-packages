import { AST_NODE_TYPES as nodeTypes, TSESLint } from "@typescript-eslint/utils";

import { resolveVariable } from "../../shared/scope.ts";

import type { ESTree, SourceCode } from "../../types.ts";

const broadEffectCatchMethods = new Set(["catch", "catchAll", "catchIf"]);

const equalityOperators = new Set(["!=", "!==", "==", "==="]);

function isStringLiteral(
	node: ESTree.Node | null | undefined,
): node is ESTree.StringLiteral {
	return node?.type === nodeTypes.Literal && typeof node.value === "string";
}

function isTagMember(
	node: ESTree.Node | null | undefined,
): node is ESTree.MemberExpression {
	return node?.type === nodeTypes.MemberExpression &&
		((!node.computed &&
			node.property.type === nodeTypes.Identifier &&
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
	return node?.type === nodeTypes.CallExpression &&
		node.callee.type === nodeTypes.MemberExpression &&
		node.callee.object.type === nodeTypes.Identifier &&
		node.callee.object.name === "Effect" &&
		!node.callee.computed &&
		node.callee.property.type === nodeTypes.Identifier &&
		broadEffectCatchMethods.has(node.callee.property.name);
}

function isInsideBroadEffectHandler(node: ESTree.Node): boolean {
	if (node.type === nodeTypes.Program) {return false;}

	let { parent: current } = node;

	while (current.type !== nodeTypes.Program) {
		if (
			current.type === nodeTypes.ArrowFunctionExpression ||
			current.type === nodeTypes.FunctionExpression
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
	return node.object.type === nodeTypes.MemberExpression &&
		((!node.object.computed &&
			node.object.property.type === nodeTypes.Identifier &&
			node.object.property.name === "reason") ||
			(node.object.computed &&
				isStringLiteral(node.object.property) &&
				node.object.property.value === "reason"));
}

function propertyName(property: ESTree.Property): string | undefined {
	if (!property.computed && property.key.type === nodeTypes.Identifier) {
		return property.key.name;
	}

	if (
		property.key.type === nodeTypes.Literal &&
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
			definition.parent.type !== nodeTypes.ImportDeclaration ||
			definition.parent.importKind === "type"
		) {
			return false;
		}

		const { node, parent } = definition;

		if (node.type === nodeTypes.ImportNamespaceSpecifier) {
			return parent.source.value === "effect/Match";
		}

		if (node.type !== nodeTypes.ImportSpecifier || node.importKind === "type") {
			return false;
		}

		const importedName = node.imported.type === nodeTypes.Identifier
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

	if (call.type !== nodeTypes.CallExpression || !call.arguments.includes(node)) {
		return false;
	}

	const { callee } = call;

	return (
		callee.type === nodeTypes.MemberExpression &&
		callee.object.type === nodeTypes.Identifier &&
		!callee.computed &&
		callee.property.type === nodeTypes.Identifier &&
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
