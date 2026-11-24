/** Disallow nested TypeScript type assertions, while permitting chains made only of const assertions.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-chained-type-assertions.ts
*/
import type { CreateRule, ESTree } from "../types.ts";

type TypeAssertionExpression = ESTree.TSAsExpression | ESTree.TSTypeAssertion;

function isTypeAssertionExpression(node: ESTree.Node): node is TypeAssertionExpression {
  return node.type === "TSAsExpression" || node.type === "TSTypeAssertion";
}

function isTransparentExpression(
  node: ESTree.Node,
): node is ESTree.TSSatisfiesExpression | ESTree.TSNonNullExpression {
  return node.type === "TSSatisfiesExpression" || node.type === "TSNonNullExpression";
}

function isConstAssertion(node: TypeAssertionExpression): boolean {
  const { typeAnnotation } = node;

  return (
    typeAnnotation.type === "TSTypeReference" &&
    typeAnnotation.typeName.type === "Identifier" &&
    typeAnnotation.typeName.name === "const"
  );
}

function isOutermostAssertionInChain(node: TypeAssertionExpression): boolean {
  let current: ESTree.Node = node;
  let parent = current.parent;

  while (isTransparentExpression(parent) && parent.expression === current) {
    current = parent;
    parent = current.parent;
  }

  return !isTypeAssertionExpression(parent) || parent.expression !== current;
}

function isForbiddenAssertionChain(node: TypeAssertionExpression): boolean {
  let assertionCount = 0;
  let hasNonConstAssertion = false;
  let current: ESTree.Expression = node;

  while (isTypeAssertionExpression(current) || isTransparentExpression(current)) {
    if (isTypeAssertionExpression(current)) {
      assertionCount += 1;
      hasNonConstAssertion ||= !isConstAssertion(current);
    }

    current = current.expression;
  }

  return assertionCount > 1 && hasNonConstAssertion;
}

export const noChainedTypeAssertionsRule: CreateRule = {
  meta: {
    schema: [],
    type: "problem",
    docs: {
      description:
        "Disallow chained TypeScript as and angle-bracket assertions through parentheses, satisfies and non-null expressions.",
    },
    messages: {
      chained:
        "This assertion chain discards type evidence. Keep the original precise type, or parse untrusted input at its boundary before narrowing it.",
    },
  },
  create(context) {
    const checkTypeAssertion = (node: TypeAssertionExpression) => {
      if (!isOutermostAssertionInChain(node) || !isForbiddenAssertionChain(node)) {return;}

      context.report({ node, messageId: "chained" });
    };

    return {
      TSAsExpression: checkTypeAssertion,
      TSTypeAssertion: checkTypeAssertion,
    };
  },
};

