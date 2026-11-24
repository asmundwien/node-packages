/** Ban the case-insensitive substring "shape" in every JavaScript and TypeScript symbol name.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-shape-in-symbol-names.ts
*/
/**
Return whether an identifier names a statically accessed member owned by another value.
*/
import { AST_NODE_TYPES as nodeTypes } from "@typescript-eslint/utils";

import type { CreateRule, ESTree } from "../types.ts";

function isBorrowedMemberName(node: ESTree.Node): boolean {
  if (node.type === nodeTypes.Program) {return false;}

  const parent = node.parent;

  return parent.type === nodeTypes.MemberExpression && parent.property === node && !parent.computed;
}

const FORBIDDEN_SYMBOL_NAME = "shape";

function hasForbiddenSymbolName(name: string): boolean {
  return name.toLowerCase().includes(FORBIDDEN_SYMBOL_NAME);
}

export const noForbiddenTermInSymbolNamesRule: CreateRule = {
  create(context) {
    function reportForbiddenSymbolName(node: ESTree.Node & { name: string }) {
      if (!hasForbiddenSymbolName(node.name) || isBorrowedMemberName(node)) {return;}

      context.report({
              data: { name: node.name },
              messageId: "forbiddenSymbolName",
              node,
            });
    }

    return {
          Identifier: reportForbiddenSymbolName,
          JSXIdentifier: reportForbiddenSymbolName,
          PrivateIdentifier: reportForbiddenSymbolName,
        };
  },
  meta: {
      docs: {
        description:
          'Disallow the case-insensitive substring "shape" in JavaScript, TypeScript, private, and JSX symbol names.',
      },
      messages: {
        forbiddenSymbolName:
          'Rename symbol "{{name}}" for its domain role; "shape" describes structure rather than ownership.',
      },
      schema: [],
      type: "problem",
    },
};

