/** Ban function contracts that return unknown instead of a parsed domain type.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-unknown-returns.ts
*/
import {
  type TypeAliasEnvironment,
  createTypeAliasEnvironment,
  resolvedTypeMatches,
} from "../shared/type-alias-resolution.ts";

import type { CreateRule, ESTree } from "../types.ts";




export const noUnknownReturnsRule: CreateRule = {
  meta: {
    schema: [],
    type: "problem",
    docs: {
      description:
        "Disallow functions whose explicit return contract is unknown or Promise<unknown>.",
    },
    messages: {
      unknownReturn:
        "This function exposes `unknown` to its caller. Parse the value at its boundary and return a named domain type.",
    },
  },
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

    const resolvesToUnknown = (type: ESTree.TypeNode): boolean => {
      return environment !== null &&
      resolvedTypeMatches(type, environment, (resolved, matches) => {
        if (resolved.type === "TSUnknownKeyword") {return true;}

        if (resolved.type === "TSUnionType") {return resolved.types.some(matches);}

        if (
          resolved.type !== "TSTypeReference" ||
          resolved.typeName.type !== "Identifier" ||
          (resolved.typeName.name !== "Promise" &&
            resolved.typeName.name !== "PromiseLike")
        ) {
          return false;
        }

        const value = resolved.typeArguments?.params[0];

        return value !== undefined && matches(value);
      });
    };

    const checkReturnType = (node: FunctionWithReturnType) => {
      const annotation = node.returnType;

      if (annotation === undefined || !resolvesToUnknown(annotation.typeAnnotation)) {return;}

      context.report({ node: annotation.typeAnnotation, messageId: "unknownReturn" });
    };

    return {
      Program(node) {
        environment = createTypeAliasEnvironment(
          node,
          context.sourceCode.visitorKeys,
        );
      },
      ArrowFunctionExpression: checkReturnType,
      FunctionDeclaration: checkReturnType,
      FunctionExpression: checkReturnType,
      TSCallSignatureDeclaration: checkReturnType,
      TSConstructSignatureDeclaration: checkReturnType,
      TSConstructorType: checkReturnType,
      TSDeclareFunction: checkReturnType,
      TSEmptyBodyFunctionExpression: checkReturnType,
      TSFunctionType: checkReturnType,
      TSMethodSignature: checkReturnType,
    };
  },
};

