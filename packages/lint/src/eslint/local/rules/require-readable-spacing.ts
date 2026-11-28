/** Require blank lines between logical statement groups while keeping bindings and overloads grouped.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/require-readable-spacing.ts
*/
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { createPaddingLineRule } from "../vendor/eslint-stylistic/padding-line-between-statements.ts";

import type { CreateRule, ESTree, SourceCode } from "../types.ts";
import type { NodeTestObject } from "../vendor/eslint-stylistic/padding-line-between-statements.ts";

/**
A `const`/`let`/`var`/`using` declaration, optionally exported, written on one line.
*/
function isSinglelineBinding(node: ESTree.Node): boolean {
  const declaration = node.type === AST_NODE_TYPES.ExportNamedDeclaration ? node.declaration : node;

  return declaration?.type === AST_NODE_TYPES.VariableDeclaration && node.loc.start.line === node.loc.end.line;
}

/**
Comments above a statement belong to it; a comment trailing the previous line does not.
*/
function hasLeadingComment(node: ESTree.Node, sourceCode: SourceCode): boolean {
  const previousLine = sourceCode.getTokenBefore(node)?.loc.end.line;

  return sourceCode
    .getCommentsBefore(node)
    .some((comment) => comment.loc.start.line !== previousLine);
}

const singlelineBinding: NodeTestObject = {
  test(node) { return isSinglelineBinding(node); },
};

const undocumentedSinglelineBinding: NodeTestObject = {
  test(node, sourceCode) { return isSinglelineBinding(node) && !hasLeadingComment(node, sourceCode); },
};

const paddingRule = createPaddingLineRule(
  [
    { blankLine: "always", next: "*", prev: "import" },
    { blankLine: "always", next: { selector: "Program > :not(ImportDeclaration)" }, prev: "*" },
    { blankLine: "always", next: "*", prev: { selector: "Program > :not(ImportDeclaration)" } },
    { blankLine: "always", next: ["function", "class", "interface", "type"], prev: "*" },
    { blankLine: "always", next: "*", prev: ["function", "class", "interface", "type"] },
    { blankLine: "always", next: ["multiline-const", "multiline-let", "multiline-var", "multiline-using"], prev: "*" },
    { blankLine: "always", next: "*", prev: ["multiline-const", "multiline-let", "multiline-var", "multiline-using"] },
    { blankLine: "always", next: ["return", "if", "switch", "try", "for", "while", "do"], prev: "*" },
    { blankLine: "always", next: "*", prev: "block-like" },
    { blankLine: "any", next: "import", prev: "import" },
    // Consecutive single-line bindings form one group at any scope, including module scope. A binding with its own leading comment starts a new group.
    { blankLine: "any", next: "undocumented-singleline-binding", prev: "singleline-binding" },
    { blankLine: "any", next: {
      selector:
        ':matches(TSDeclareFunction, FunctionDeclaration, ExportNamedDeclaration[declaration.type="TSDeclareFunction"], ExportNamedDeclaration[declaration.type="FunctionDeclaration"])',
    }, prev: {
      selector:
        ':matches(TSDeclareFunction, ExportNamedDeclaration[declaration.type="TSDeclareFunction"])',
    } },
  ],
  {
    "singleline-binding": singlelineBinding,
    "undocumented-singleline-binding": undocumentedSinglelineBinding,
  },
);

/**
Restore structural blank lines with whitespace-only fixes; keep single-line binding groups and overloads grouped.
*/
export const requireReadableSpacingRule: CreateRule = {
  ...paddingRule,
  meta: {
    ...paddingRule.meta,
    docs: {
      description: "Require readable spacing between declarations and logical statement groups.",
    },
    schema: [],
  },
};
