import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import type { ESTree, SourceCode } from "../types.ts";

type FunctionParameter = ESTree.Parameter | ESTree.MemberExpression;

/**
Return whether a type is or contains TypeScript's absorbing unknown top type.
*/
function hasUnknownType(type: ESTree.TypeNode): boolean {
	return type.type === AST_NODE_TYPES.TSUnknownKeyword || type.type === AST_NODE_TYPES.TSUnionType && type.types.some(hasUnknownType);
}

/**
Return the TypeScript annotation attached to a function parameter or its wrapped binding.
*/
function functionParameterTypeAnnotation(
	parameter: FunctionParameter,
): ESTree.TSTypeAnnotation | null | undefined {
	let current: FunctionParameter | ESTree.RestElement["argument"] = parameter;

	for (;;) {
		if (current.type === AST_NODE_TYPES.TSParameterProperty) {
			current = current.parameter;
			continue;
		}

		if (current.type !== AST_NODE_TYPES.RestElement && current.type !== AST_NODE_TYPES.AssignmentPattern) {
			const annotation = "typeAnnotation" in current ? current.typeAnnotation : undefined;

			return annotation?.type === AST_NODE_TYPES.TSTypeAnnotation ? annotation : undefined;
		}

		const annotation = current.typeAnnotation ?? undefined;

		if (annotation !== undefined) {return annotation;}

		current = current.type === AST_NODE_TYPES.RestElement ? current.argument : current.left;
	}
}

/**
Return only a function parameter's local binding, excluding its annotation and default value.
*/
function functionParameterBindingName(
	parameter: FunctionParameter,
	sourceCode: SourceCode,
): string {
	let current: FunctionParameter | ESTree.RestElement["argument"] = parameter;

	while (current.type === AST_NODE_TYPES.TSParameterProperty || current.type === AST_NODE_TYPES.AssignmentPattern || current.type === AST_NODE_TYPES.RestElement) {
		if (current.type === AST_NODE_TYPES.TSParameterProperty) {
			current = current.parameter;
		} else {
			current = current.type === AST_NODE_TYPES.AssignmentPattern ? current.left : current.argument;
		}
	}

	if (current.type === AST_NODE_TYPES.Identifier) {return current.name;}

	const sourceText = sourceCode.getText(current);
	const annotationStart = "typeAnnotation" in current ? current.typeAnnotation?.range[0] : undefined;

	return annotationStart === undefined
		? sourceText
		: sourceText.slice(0, annotationStart - current.range[0]).trimEnd();
}

export {
	functionParameterBindingName,
	functionParameterTypeAnnotation,
	hasUnknownType,
};
