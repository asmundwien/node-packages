import type { ESTree, SourceCode } from "../types.ts";

export type FunctionParameter = ESTree.Parameter | ESTree.MemberExpression;

/**
Return whether a type is or contains TypeScript's absorbing unknown top type.
*/
export function containsUnknownType(type: ESTree.TypeNode): boolean {
	return type.type === "TSUnknownKeyword" ? true : type.type === "TSUnionType" && type.types.some(containsUnknownType);
}

/**
Return the TypeScript annotation attached to a function parameter or its wrapped binding.
*/
export function functionParameterTypeAnnotation(
	parameter: FunctionParameter,
): ESTree.TSTypeAnnotation | null | undefined {
	if (parameter.type === "TSParameterProperty") {
		return functionParameterTypeAnnotation(parameter.parameter);
	}

	if (parameter.type === "RestElement") {
		return parameter.typeAnnotation ?? functionParameterTypeAnnotation(parameter.argument);
	}

	if (parameter.type === "AssignmentPattern") {
		return parameter.typeAnnotation ?? functionParameterTypeAnnotation(parameter.left);
	}

	return "typeAnnotation" in parameter ? parameter.typeAnnotation : undefined;
}

/**
Return only a function parameter's local binding, excluding its annotation and default value.
*/
export function functionParameterBindingName(
	parameter: FunctionParameter,
	sourceCode: SourceCode,
): string {
	if (parameter.type === "TSParameterProperty") {
		return functionParameterBindingName(parameter.parameter, sourceCode);
	}

	if (parameter.type === "AssignmentPattern") {
		return functionParameterBindingName(parameter.left, sourceCode);
	}

	if (parameter.type === "RestElement") {
		return functionParameterBindingName(parameter.argument, sourceCode);
	}

	if (parameter.type === "Identifier") {return parameter.name;}

	const sourceText = sourceCode.getText(parameter);
	const annotationStart = "typeAnnotation" in parameter ? parameter.typeAnnotation?.range[0] : undefined;

	return annotationStart === undefined
		? sourceText
		: sourceText.slice(0, annotationStart - parameter.range[0]).trimEnd();
}
