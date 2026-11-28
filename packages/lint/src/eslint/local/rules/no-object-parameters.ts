/** Ban the broad object type on function inputs, including local aliases to object.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-object-parameters.ts
*/
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import {
	functionParameterBindingName,
	functionParameterTypeAnnotation,
} from "../shared/function-parameters.ts";
import {
	type TypeAliasEnvironment,
	createTypeAliasEnvironment,
	doesResolvedTypeMatch,
} from "../shared/type-alias-resolution.ts";

import type { CreateRule, ESTree } from "../types.ts";



export const noObjectParametersRule: CreateRule = {
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
    
    		function isResolvedObjectType(type: ESTree.TypeNode): boolean {
    			return environment !== null &&
    			doesResolvedTypeMatch(type, environment, (resolved, isMatchingType) => {
    				return resolved.type === AST_NODE_TYPES.TSObjectKeyword || (
    					resolved.type === AST_NODE_TYPES.TSUnionType && resolved.types.some(isMatchingType)
    				);
    			});
    		}
    
    		function checkParameters(node: ParameterOwner) {
    			for (const parameter of node.params) {
    				const annotation = functionParameterTypeAnnotation(parameter);
    
    				if (annotation === null || annotation === undefined || !isResolvedObjectType(annotation.typeAnnotation)) {continue;}
    
    				context.report({
            data: { parameter: functionParameterBindingName(parameter, context.sourceCode) },
            messageId: "objectParameter",
            node: annotation.typeAnnotation,
          });
    			}
    		}
    
    		return {
        			ArrowFunctionExpression: checkParameters,
        			FunctionDeclaration: checkParameters,
        			FunctionExpression: checkParameters,
        			Program(node) {
        				environment = createTypeAliasEnvironment(
        					node,
        					context.sourceCode.visitorKeys,
        				);
        			},
        			TSCallSignatureDeclaration: checkParameters,
        			TSConstructSignatureDeclaration: checkParameters,
        			TSConstructorType: checkParameters,
        			TSDeclareFunction: checkParameters,
        			TSEmptyBodyFunctionExpression: checkParameters,
        			TSFunctionType: checkParameters,
        			TSMethodSignature: checkParameters,
        		};
  },
  meta: {
      docs: {
      			description:
      				"Disallow object function parameters; inputs must use an owner-provided type and be parsed at their boundary.",
      		},
      messages: {
      			objectParameter:
      				"Parameter `{{parameter}}` uses the broad `object` type. Accept a named owner type; parse external input at its boundary before calling this function.",
      		},
      schema: [],
      type: "problem",
    },
};

