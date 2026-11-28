// Token and AST helpers for the ESLint Stylistic padding matcher.
import { AST_NODE_TYPES, AST_TOKEN_TYPES } from "@typescript-eslint/utils";

import type { Comment, ESTree, Location, SourceCode, Token as SyntaxToken } from "../../types.ts";

type Token = SyntaxToken | Comment;

/**
Line terminators recognized by the upstream padding matcher.
*/
const LINEBREAKS = new Set(["\r\n", "\r", "\n", "\u{2028}", "\u{2029}"]);

/**
Test a closing brace without treating comment text as punctuation.
*/
function isClosingBraceToken(token: Token): boolean {
  return token.type === AST_TOKEN_TYPES.Punctuator && token.value === "}";
}

/**
Test a semicolon without treating comment text as punctuation.
*/
function isSemicolonToken(token: Token): boolean {
  return token.type === AST_TOKEN_TYPES.Punctuator && token.value === ";";
}

/**
Filter the optional final semicolon when identifying block-like statements.
*/
function isNotSemicolonToken(token: Token): boolean {
  return !isSemicolonToken(token);
}

/**
Compare token/node boundaries, including attached comments.
*/
function isTokenOnSameLine(left: { loc: Location }, right: { loc: Location }): boolean {
  return left.loc.end.line === right.loc.start.line;
}

/**
Recognize declarations and expressions used by the upstream IIFE matcher.
*/
function isFunction(node: ESTree.Node): boolean {
  return node.type === AST_NODE_TYPES.FunctionDeclaration ||
    node.type === AST_NODE_TYPES.FunctionExpression ||
    node.type === AST_NODE_TYPES.ArrowFunctionExpression;
}

/**
Preserve the upstream multiline statement heuristic.
*/
function isSingleLine(node: ESTree.Node): boolean {
  return node.loc.start.line === node.loc.end.line;
}

/**
Unwrap optional chaining before checking IIFE syntax.
*/
function skipChainExpression(node: ESTree.Node): ESTree.Node {
  return node.type === AST_NODE_TYPES.ChainExpression ? node.expression : node;
}

/**
Only a program or function-body expression can begin a directive prologue.
*/
function isTopLevelExpressionStatement(
  node: ESTree.Node,
): node is ESTree.ExpressionStatement {
  return node.type === AST_NODE_TYPES.ExpressionStatement &&
    (node.parent.type === AST_NODE_TYPES.Program ||
      (node.parent.type === AST_NODE_TYPES.BlockStatement && isFunction(node.parent.parent)));
}

/**
A single wrapping pair suffices to exclude a string from directive syntax.
*/
function isParenthesized(node: ESTree.Node, sourceCode: SourceCode): boolean {
  const before = sourceCode.getTokenBefore(node);
  const after = sourceCode.getTokenAfter(node);

  return before?.value === "(" && after?.value === ")";
}

export { isClosingBraceToken, isFunction, isNotSemicolonToken, isParenthesized, isSemicolonToken, isSingleLine, isTokenOnSameLine, isTopLevelExpressionStatement, LINEBREAKS, skipChainExpression };
