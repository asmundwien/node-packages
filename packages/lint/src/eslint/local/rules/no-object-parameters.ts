/** Ban the broad object type on function inputs, including local aliases to object.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-object-parameters.ts
*/
import {
	functionParameterBindingName,
	functionParameterTypeAnnotation,
} from "../shared/function-parameters.ts";
import {
	type TypeAliasEnvironment,
	createTypeAliasEnvironment,
	resolvedTypeMatches,
} from "../shared/type-alias-resolution.ts";

import type { CreateRule, ESTree } from "../types.ts";



export const noObjectParametersRule: CreateRule = {
	meta: {
    schema: [],
		type: "problem",
		docs: {
			description:
				"Disallow object function parameters; inputs must use an owner-provided type and be parsed at their boundary.",
		},
		messages: {
			objectParameter:
				"Parameter `{{parameter}}` uses the broad `object` type. Accept a named owner type; parse external input at its boundary before calling this function.",
		},
	},
	create(context) {
		type ParameterOwner =
			| ESTree.ArrowFunctionExpression
			| ESTree.FunctionLike
			| ESTree.TSCallSignatureDeclaration
			| ESTree.TSConstructSignatureDeclaration
			| ESTree.TSConstructorType
			| ESTree.TSFunctionType
			| ESTree.TSMethodSignature;

		let environment: TypeAliasEnvironment | null = null;

		const resolvesToObject = (type: ESTree.TypeNode): boolean => {
			return environment !== null &&
			resolvedTypeMatches(type, environment, (resolved, matches) => {
				return resolved.type === "TSObjectKeyword" ? true : (
					resolved.type === "TSUnionType" && resolved.types.some(matches)
				);
			});
		};

		const checkParameters = (node: ParameterOwner) => {
			for (const parameter of node.params) {
				const annotation = functionParameterTypeAnnotation(parameter);

				if (annotation === null || annotation === undefined || !resolvesToObject(annotation.typeAnnotation)) {continue;}

				context.report({
					node: annotation.typeAnnotation,
					messageId: "objectParameter",
					data: { parameter: functionParameterBindingName(parameter, context.sourceCode) },
				});
			}
		};

		return {
			Program(node) {
				environment = createTypeAliasEnvironment(
					node,
					context.sourceCode.visitorKeys,
				);
			},
			ArrowFunctionExpression: checkParameters,
			FunctionDeclaration: checkParameters,
			FunctionExpression: checkParameters,
			TSCallSignatureDeclaration: checkParameters,
			TSConstructSignatureDeclaration: checkParameters,
			TSConstructorType: checkParameters,
			TSDeclareFunction: checkParameters,
			TSEmptyBodyFunctionExpression: checkParameters,
			TSFunctionType: checkParameters,
			TSMethodSignature: checkParameters,
		};
	},
};

