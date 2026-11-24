/** Ban conditional empty-object spreads without changing their omission semantics.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-conditional-empty-object-spread.ts
*/
import { AST_NODE_TYPES as nodeTypes } from "@typescript-eslint/utils";

import type { CreateRule, ESTree } from "../types.ts";

function isEmptyObjectExpression(node: ESTree.Expression): boolean {
  return node.type === nodeTypes.ObjectExpression && node.properties.length === 0;
}

function isConditionalEmptyObjectSpread(node: ESTree.Expression): boolean {
  const conditional = node;

  return (
    conditional.type === nodeTypes.ConditionalExpression &&
    (isEmptyObjectExpression(conditional.consequent) ||
      isEmptyObjectExpression(conditional.alternate))
  );
}

export const noConditionalEmptyObjectSpreadRule: CreateRule = {
  create(context) {
    return {
      SpreadElement(node) {
        if (node.parent.type !== nodeTypes.ObjectExpression) {return;}

        if (isConditionalEmptyObjectSpread(node.argument)) {
          context.report({ messageId: "avoid", node });
        }
      },
    };
  },
  meta: {
      docs: {
        description:
          "Disallow object spreads that conditionally spread an empty object to omit fields.",
      },
      messages: {
        avoid:
          "This conditional spread hides property omission behind an empty object. Build the object in separate statements and add the property only when present.",
      },
      schema: [],
      type: "suggestion",
    },
};

