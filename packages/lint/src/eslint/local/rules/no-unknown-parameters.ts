/** Disallow unknown inputs except explicitly named error-cause enrichment.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-unknown-parameters.ts
*/
import {
  containsUnknownType,
  functionParameterBindingName,
  functionParameterTypeAnnotation,
} from "../shared/function-parameters.ts";

import type { CreateRule, ESTree } from "../types.ts";

type ParameterOwner =
  | ESTree.ArrowFunctionExpression
  | ESTree.FunctionLike
  | ESTree.TSCallSignatureDeclaration
  | ESTree.TSConstructSignatureDeclaration
  | ESTree.TSConstructorType
  | ESTree.TSFunctionType
  | ESTree.TSMethodSignature;

function isTypePredicateSubject(owner: ParameterOwner, parameterName: string): boolean {
  const predicate = owner.returnType?.typeAnnotation;

  return (
    predicate?.type === "TSTypePredicate" &&
    predicate.parameterName.type === "Identifier" &&
    predicate.parameterName.name === parameterName
  );
}

export const noUnknownParametersRule: CreateRule = {
  meta: {
    schema: [],
    type: "problem",
    docs: {
      description:
        "Disallow explicitly unknown function parameters except `cause` and type-predicate subjects; decode unknown input at its I/O boundary instead.",
    },
    messages: {
      unknownParameter:
        "Parameter `{{parameter}}` leaves input unparsed. Accept a named domain type; run the expected schema or parser at the I/O boundary before calling this function.",
    },
  },
  create(context) {
    const checkParameters = (node: ParameterOwner) => {
      for (const parameter of node.params) {
        const annotation = functionParameterTypeAnnotation(parameter);

        if (annotation === null || annotation === undefined || !containsUnknownType(annotation.typeAnnotation)) {continue;}

        const name = functionParameterBindingName(parameter, context.sourceCode);

        if (name === "cause" || isTypePredicateSubject(node, name)) {continue;}

        context.report({
          node: annotation.typeAnnotation,
          messageId: "unknownParameter",
          data: { parameter: name },
        });
      }
    };

    return {
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

