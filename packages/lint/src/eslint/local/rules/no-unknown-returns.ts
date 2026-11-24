/** Ban function contracts that return unknown instead of a parsed domain type.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-unknown-returns.ts
*/
import { AST_NODE_TYPES as nodeTypes } from "@typescript-eslint/utils";

import {
  type TypeAliasEnvironment,
  createTypeAliasEnvironment,
  doesResolvedTypeMatch,
} from "../shared/type-alias-resolution.ts";

import type { CreateRule, ESTree } from "../types.ts";




export const noUnknownReturnsRule: CreateRule = {
  create(context) {
    type FunctionWithReturnType =
      | ESTree.ArrowFunctionExpression
      | ESTree.FunctionLike
      | ESTree.TSCallSignatureDeclaration
      | ESTree.TSConstructSignatureDeclaration
      | ESTree.TSConstructorType
      | ESTree.TSFunctionType
      | ESTree.TSMethodSignature;

    let environment: TypeAliasEnvironment | null = null;

    function isResolvedUnknownType(type: ESTree.TypeNode): boolean {
      return environment !== null &&
      doesResolvedTypeMatch(type, environment, (resolved, isMatchingType) => {
        if (resolved.type === nodeTypes.TSUnknownKeyword) {return true;}

        if (resolved.type === nodeTypes.TSUnionType) {return resolved.types.some(isMatchingType);}

        if (
          resolved.type !== nodeTypes.TSTypeReference ||
          resolved.typeName.type !== nodeTypes.Identifier ||
          (resolved.typeName.name !== "Promise" &&
            resolved.typeName.name !== "PromiseLike")
        ) {
          return false;
        }

        const value = resolved.typeArguments?.params[0];

        return value !== undefined && isMatchingType(value);
      });
    }

    function checkReturnType(node: FunctionWithReturnType) {
      const annotation = node.returnType;

      if (annotation === undefined || !isResolvedUnknownType(annotation.typeAnnotation)) {return;}

      context.report({ messageId: "unknownReturn", node: annotation.typeAnnotation });
    }

    return {
          ArrowFunctionExpression: checkReturnType,
          FunctionDeclaration: checkReturnType,
          FunctionExpression: checkReturnType,
          Program(node) {
            environment = createTypeAliasEnvironment(
              node,
              context.sourceCode.visitorKeys,
            );
          },
          TSCallSignatureDeclaration: checkReturnType,
          TSConstructSignatureDeclaration: checkReturnType,
          TSConstructorType: checkReturnType,
          TSDeclareFunction: checkReturnType,
          TSEmptyBodyFunctionExpression: checkReturnType,
          TSFunctionType: checkReturnType,
          TSMethodSignature: checkReturnType,
        };
  },
  meta: {
      docs: {
        description:
          "Disallow functions whose explicit return contract is unknown or Promise<unknown>.",
      },
      messages: {
        unknownReturn:
          "This function exposes `unknown` to its caller. Parse the value at its boundary and return a named domain type.",
      },
      schema: [],
      type: "problem",
    },
};

