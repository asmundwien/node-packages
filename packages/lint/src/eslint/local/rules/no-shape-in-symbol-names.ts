/** Ban the case-insensitive substring "shape" in every JavaScript and TypeScript symbol name.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-shape-in-symbol-names.ts
*/
/**
Return whether an identifier names a statically accessed member owned by another value.
*/
import type { CreateRule, ESTree } from "../types.ts";

function isBorrowedMemberName(node: ESTree.Node): boolean {
  if (node.type === "Program") {return false;}

  const parent = node.parent;

  return parent.type === "MemberExpression" && parent.property === node && !parent.computed;
}

const FORBIDDEN_SYMBOL_NAME = "shape";

function containsForbiddenSymbolName(name: string): boolean {
  return name.toLowerCase().includes(FORBIDDEN_SYMBOL_NAME);
}

export const noForbiddenTermInSymbolNamesRule: CreateRule = {
  meta: {
    schema: [],
    type: "problem",
    docs: {
      description:
        'Disallow the case-insensitive substring "shape" in JavaScript, TypeScript, private, and JSX symbol names.',
    },
    messages: {
      forbiddenSymbolName:
        'Rename symbol "{{name}}" for its domain role; "shape" describes structure rather than ownership.',
    },
  },
  create(context) {
    const reportForbiddenSymbolName = (node: ESTree.Node & { name: string }) => {
      if (!containsForbiddenSymbolName(node.name) || isBorrowedMemberName(node)) {return;}

      context.report({
        node,
        messageId: "forbiddenSymbolName",
        data: { name: node.name },
      });
    };

    return {
      Identifier: reportForbiddenSymbolName,
      PrivateIdentifier: reportForbiddenSymbolName,
      JSXIdentifier: reportForbiddenSymbolName,
    };
  },
};

