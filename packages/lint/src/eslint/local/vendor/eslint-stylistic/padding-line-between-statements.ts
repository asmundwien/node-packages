/** Apply configurable blank-line policies between statements.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/vendor/eslint-stylistic/padding-line-between-statements.ts
*/
// Vendored from ESLint Stylistic; see LICENSE in this directory.
import { AST_NODE_TYPES as nodeTypes } from "@typescript-eslint/utils";

import {
  isClosingBraceToken,
  isFunction,
  isNotSemicolonToken,
  isParenthesized,
  isSemicolonToken,
  isSingleLine,
  isTokenOnSameLine,
  isTopLevelExpressionStatement,
  LINEBREAKS,
  skipChainExpression,
} from './padding-line-ast.ts'

import type { Comment, Context as RuleContext, CreateRule, ESTree, Location, SourceCode, Token as SyntaxToken } from '../../types.ts'
import type {
  PaddingType,
  SelectorOption,
  StatementMatcher,
} from './padding-line-options.d.ts'

type ASTNode = ESTree.Node

type Token = SyntaxToken | Comment

const CJS_EXPORT = /^(?:module\s*\.\s*)?exports(?:\s*\.|\s*\[|$)/u
const CJS_IMPORT = /^require\(/u

/**
Statement matchers include TypeScript syntax and caller-defined selectors.
Grammar reference: https://github.com/eslint/eslint/blob/main/lib/rules/padding-line-between-statements.js
*/

type NodeTest = (
  node: ASTNode,
  sourceCode: SourceCode,
) => boolean

interface NodeTestObject {
  test: NodeTest
}

/**
A policy entry may name a caller-defined statement type (registered through
`createPaddingLineRule`) anywhere the upstream statement types are accepted.
*/
type PolicyStatementOption<Extra extends string = never> =
  | StatementMatcher
  | Extra
  | [StatementMatcher | Extra, ...(StatementMatcher | Extra)[]]

type PolicyOptions<Extra extends string = never> = {
  blankLine: PaddingType
  prev: PolicyStatementOption<Extra>
  next: PolicyStatementOption<Extra>
}[]

const LT = `[${Array.from(LINEBREAKS).join('')}]`

const PADDING_LINE_SEQUENCE = new RegExp(
  String.raw`^(\s*?${LT})\s*${LT}(\s*;?)$`,
  'u',
)

function isSelectorOption(option: PolicyStatementOption<string>): option is SelectorOption {
  return typeof option === 'object' && !Array.isArray(option)
}

/**
Creates tester which check if a node starts with specific keyword with the appropriate AST_NODE_TYPES.
@param keyword The keyword to test.
@returns the created tester.
@private
*/
function createKeywordTester(
  type: ASTNode["type"] | ASTNode["type"][],
  keyword: string,
): NodeTestObject {
  return {
    test(node, sourceCode): boolean {
      const isSameKeyword = sourceCode.getFirstToken(node)?.value === keyword

      const isSameType = Array.isArray(type)
        ? type.includes(node.type)
        : type === node.type

      return isSameKeyword && isSameType
    },
  }
}

/**
Creates tester which check if a node is specific type.
@param type The node type to test.
@returns the created tester.
@private
*/
function createNodeTypeTester(type: ASTNode["type"]): NodeTestObject {
  return {
    test(node): boolean { return node.type === type; },
  }
}

/**
Checks the given node is an expression statement of IIFE.
@param node The node to check.
@returns `true` if the node is an expression statement of IIFE.
@private
*/
function isIIFEStatement(node: ASTNode): boolean {
  if (node.type === nodeTypes.ExpressionStatement) {
    let expression = skipChainExpression(node.expression)

    if (expression.type === nodeTypes.UnaryExpression)
      {expression = skipChainExpression(expression.argument)}

    if (expression.type === nodeTypes.CallExpression) {
      let callee: ASTNode = expression.callee

      while (callee.type === nodeTypes.SequenceExpression) {
        const lastExpression = callee.expressions.at(-1)

        if (lastExpression === undefined)
          {throw new Error('Padding rule invariant: sequence expression is empty')}

        callee = lastExpression
      }

      return isFunction(callee)
    }
  }

  return false
}

/**
Checks the given node is a CommonJS require statement
@param node The node to check.
@returns `true` if the node is a CommonJS require statement.
@private
*/
function isCJSRequire(node: ASTNode): boolean {
  if (node.type === nodeTypes.VariableDeclaration) {
    const declaration = node.declarations[0]

    if (declaration.init !== null) {
      let call = declaration.init

      while (call.type === nodeTypes.MemberExpression)
        {call = call.object}

      if (
        call.type === nodeTypes.CallExpression
        && call.callee.type === nodeTypes.Identifier
      ) {
        return call.callee.name === 'require'
      }
    }
  }

  return false
}

/**
Checks whether the given node is a block-like statement.
This checks the last token of the node is the closing brace of a block.
@param sourceCode The source code to get tokens.
@param node The node to check.
@returns `true` if the node is a block-like statement.
@private
*/
function isBlockLikeStatement(
  node: ASTNode,
  sourceCode: SourceCode,
): boolean {
  // Do-while with a block is a block-like statement.
  if (
    node.type === nodeTypes.DoWhileStatement
    && node.body.type === nodeTypes.BlockStatement
  ) {
    return true
  }

  /**
  IIFE is a block-like statement specially from JSCS#disallowPaddingNewLinesAfterBlocks.
  */
  if (isIIFEStatement(node))
    {return true}

  // Checks the last token is a closing brace of blocks.
  const lastToken = sourceCode.getLastToken(node, isNotSemicolonToken)

  const belongingNode = lastToken !== null && isClosingBraceToken(lastToken)
    ? sourceCode.getNodeByRangeIndex(lastToken.range[0])
    : null

  return (
    belongingNode !== null
    && (belongingNode.type === nodeTypes.BlockStatement
      || belongingNode.type === nodeTypes.SwitchStatement)
  )
}

/**
Check whether the given node is a directive or not.
@param node The node to check.
@param sourceCode The source code object to get tokens.
@returns `true` if the node is a directive.
*/
function isDirective(
  node: ASTNode,
  sourceCode: SourceCode,
): boolean {
  return (
    isTopLevelExpressionStatement(node)
    && node.expression.type === nodeTypes.Literal
    && typeof node.expression.value === 'string'
    && !isParenthesized(node.expression, sourceCode)
  )
}

/**
Check whether the given node is a part of directive prologue or not.
@param node The node to check.
@param sourceCode The source code object to get tokens.
@returns `true` if the node is a part of directive prologue.
*/
function isDirectivePrologue(
  node: ASTNode,
  sourceCode: SourceCode,
): boolean {
  if (
    isDirective(node, sourceCode)
    && node.parent !== undefined
    && 'body' in node.parent
    && Array.isArray(node.parent.body)
  ) {
    for (const sibling of node.parent.body) {
      if (sibling === node)
        {break}

      if (!isDirective(sibling, sourceCode))
        {return false}
    }

    return true
  }

  return false
}

/**
Checks the given node is a CommonJS export statement
@param node The node to check.
@returns `true` if the node is a CommonJS export statement.
@private
*/
function isCJSExport(node: ASTNode): boolean {
  if (node.type === nodeTypes.ExpressionStatement) {
    const expression = node.expression

    if (expression.type === nodeTypes.AssignmentExpression) {
      let left = expression.left

      if (left.type === nodeTypes.MemberExpression) {
        while (left.object.type === nodeTypes.MemberExpression)
          {left = left.object}

        return (
          left.object.type === nodeTypes.Identifier
          && (left.object.name === 'exports'
            || (left.object.name === 'module'
              && left.property.type === nodeTypes.Identifier
              && left.property.name === 'exports'))
        )
      }
    }
  }

  return false
}

/**
Check whether the given node is an expression
@param node The node to check.
@param sourceCode The source code object to get tokens.
@returns `true` if the node is an expression
*/
function isExpression(
  node: ASTNode,
  sourceCode: SourceCode,
): boolean {
  return (
    node.type === nodeTypes.ExpressionStatement
    && !isDirectivePrologue(node, sourceCode)
  )
}

/**
Gets the actual last token.

If a semicolon is semicolon-less style's semicolon, this ignores it.
For example:

    foo()
    ;[1, 2, 3].forEach(bar)
@param sourceCode The source code to get tokens.
@param node The node to get.
@returns The actual last token.
@private
*/
function getActualLastToken(
  node: ASTNode,
  sourceCode: SourceCode,
): Token {
  const semiToken = sourceCode.getLastToken(node)

  if (semiToken === null) {
    throw new Error('Padding rule invariant: statement has no tokens')
  }

  const previousToken = sourceCode.getTokenBefore(semiToken)
  const nextToken = sourceCode.getTokenAfter(semiToken)

  const isSemicolonLessStyle
    = previousToken !== null
      && nextToken !== null
      && previousToken.range[0] >= node.range[0]
      && isSemicolonToken(semiToken)
      && !isTokenOnSameLine(previousToken, semiToken)
      && isTokenOnSameLine(semiToken, nextToken)

  return isSemicolonLessStyle ? previousToken : semiToken
}

/**
This returns the concatenation of the first 2 captured strings.
@param _ Unused. Whole matched string.
@param trailingSpaces The trailing spaces of the first line.
@param indentSpaces The indentation spaces of the last line.
@returns The concatenation of trailingSpaces and indentSpaces.
@private
*/
function replacerToRemovePaddingLines(
  _: string,
  trailingSpaces: string,
  indentSpaces: string,
): string {
  return trailingSpaces + indentSpaces
}

function getReportLoc(node: ASTNode, sourceCode: SourceCode): Location {
  if (isSingleLine(node))
    {return node.loc}

  const line = node.loc.start.line
  const sourceLine = sourceCode.lines[line - 1]

  if (sourceLine === undefined)
    {throw new Error('Padding rule invariant: statement source line is missing')}

  return {
    start: node.loc.start,
    end: {
      line,
      column: sourceLine.length,
    },
  }
}

/**
Check and report statements for `any` configuration.
It does nothing.

@private
*/
function verifyForAny(): void {
  // Empty
}

/**
Check and report statements for `never` configuration.
This autofix removes blank lines between the given 2 statements.
However, if comments exist between 2 blank lines, it does not remove those blank lines automatically.
@param context The rule context to report.
@param _ Unused. The previous node to check.
@param nextNode The next node to check.
@param paddingLines The array of token pairs that blank
lines exist between the pair.

@private
*/
function verifyForNever(
  context: RuleContext,
  _: ASTNode,
  nextNode: ASTNode,
  paddingLines: [Token, Token][],
): void {
  if (paddingLines.length === 0)
    {return}

  context.report({
    node: nextNode,
    messageId: 'unexpectedBlankLine',
    loc: getReportLoc(nextNode, context.sourceCode),
    fix(fixer) {
      if (paddingLines.length >= 2)
        {return null}

      const paddingPair = paddingLines[0]

      if (paddingPair === undefined)
        {throw new Error('Padding rule invariant: reported padding pair is missing')}

      const [previousToken, nextToken] = paddingPair
      const start = previousToken.range[1]
      const end = nextToken.range[0]

      const text = context
        .sourceCode
        .text
        .slice(start, end)
        .replace(PADDING_LINE_SEQUENCE, replacerToRemovePaddingLines)

      return fixer.replaceTextRange([start, end], text)
    },
  })
}

/**
Check and report statements for `always` configuration.
This autofix inserts a blank line between the given 2 statements.
If the `prevNode` has trailing comments, it inserts a blank line after the
trailing comments.
@param context The rule context to report.
@param prevNode The previous node to check.
@param nextNode The next node to check.
@param paddingLines The array of token pairs that blank
lines exist between the pair.

@private
*/
function verifyForAlways(
  context: RuleContext,
  prevNode: ASTNode,
  nextNode: ASTNode,
  paddingLines: [Token, Token][],
): void {
  if (paddingLines.length > 0)
    {return}

  context.report({
    node: nextNode,
    messageId: 'expectedBlankLine',
    loc: getReportLoc(nextNode, context.sourceCode),
    fix(fixer) {
      const sourceCode = context.sourceCode
      let previousToken = getActualLastToken(prevNode, sourceCode)

      const nextToken
        = sourceCode.getFirstTokenBetween(previousToken, nextNode, {
          includeComments: true,

          /**
          Skip the trailing comments of the previous node.
          This inserts a blank line after the last trailing comment.
          
          For example:
          
              foo(); // trailing comment.
              // comment.
              bar();
          
          Get fixed to:
          
              foo(); // trailing comment.
          
              // comment.
              bar();
          @param token The token to check.
          @returns `true` if the token is not a trailing comment.
          @private
          */
          filter(token) {
            if (isTokenOnSameLine(previousToken, token)) {
              previousToken = token

              return false
            }

            return true
          },
        }) ?? nextNode

      const insertText = isTokenOnSameLine(previousToken, nextToken)
        ? '\n\n'
        : '\n'

      return fixer.insertTextAfter(previousToken, insertText)
    },
  })
}

/**
Types of blank lines.
`any`, `never`, and `always` are defined.
Those have `verify` method to check and report statements.
@private
*/
const PaddingTypes = {
  any: { verify: verifyForAny },
  never: { verify: verifyForNever },
  always: { verify: verifyForAlways },
}

const MaybeMultilineStatementType = {
  'block-like': { test: isBlockLikeStatement },
  'expression': { test: isExpression },
  'return': createKeywordTester(nodeTypes.ReturnStatement, 'return'),
  'export': createKeywordTester(
    [
      nodeTypes.ExportAllDeclaration,
      nodeTypes.ExportDefaultDeclaration,
      nodeTypes.ExportNamedDeclaration,
    ],
    'export',
  ),
  'var': createKeywordTester(nodeTypes.VariableDeclaration, 'var'),
  'let': createKeywordTester(nodeTypes.VariableDeclaration, 'let'),
  'const': createKeywordTester(nodeTypes.VariableDeclaration, 'const'),
  'using': {
    test(node) {
      return node.type === nodeTypes.VariableDeclaration
        && (node.kind === 'using' || node.kind === 'await using');
    },
  },
  'type': createKeywordTester(nodeTypes.TSTypeAliasDeclaration, 'type'),
} satisfies Record<string, NodeTestObject>

/**
Types of statements.
Those have `test` method to check it matches to the given statement.
@private
*/
const StatementTypes = new Map<string, NodeTestObject>(Object.entries({
  '*': { test(): boolean { return true; } },
  'exports': { test: isCJSExport },
  'require': { test: isCJSRequire },
  'directive': { test: isDirectivePrologue },
  'iife': { test: isIIFEStatement },

  'block': createNodeTypeTester(nodeTypes.BlockStatement),
  'empty': createNodeTypeTester(nodeTypes.EmptyStatement),
  'function': createNodeTypeTester(nodeTypes.FunctionDeclaration),
  'ts-method': createNodeTypeTester(nodeTypes.TSMethodSignature),

  'break': createKeywordTester(nodeTypes.BreakStatement, 'break'),
  'case': createKeywordTester(nodeTypes.SwitchCase, 'case'),
  'class': createKeywordTester(nodeTypes.ClassDeclaration, 'class'),
  'continue': createKeywordTester(nodeTypes.ContinueStatement, 'continue'),
  'debugger': createKeywordTester(nodeTypes.DebuggerStatement, 'debugger'),
  'default': createKeywordTester(
    [nodeTypes.SwitchCase, nodeTypes.ExportDefaultDeclaration],
    'default',
  ),
  'do': createKeywordTester(nodeTypes.DoWhileStatement, 'do'),
  'for': createKeywordTester(
    [
      nodeTypes.ForStatement,
      nodeTypes.ForInStatement,
      nodeTypes.ForOfStatement,
    ],
    'for',
  ),
  'if': createKeywordTester(nodeTypes.IfStatement, 'if'),
  'import': createKeywordTester(nodeTypes.ImportDeclaration, 'import'),
  'switch': createKeywordTester(nodeTypes.SwitchStatement, 'switch'),
  'throw': createKeywordTester(nodeTypes.ThrowStatement, 'throw'),
  'try': createKeywordTester(nodeTypes.TryStatement, 'try'),
  'while': createKeywordTester(
    [nodeTypes.WhileStatement, nodeTypes.DoWhileStatement],
    'while',
  ),
  'with': createKeywordTester(nodeTypes.WithStatement, 'with'),

  'cjs-export': {
    test(node, sourceCode) {
      return node.type === nodeTypes.ExpressionStatement
        && node.expression.type === nodeTypes.AssignmentExpression
        && CJS_EXPORT.test(sourceCode.getText(node.expression.left));
    },
  },
  'cjs-import': {
    test(node, sourceCode) {
      return node.type === nodeTypes.VariableDeclaration
        && node.declarations.length > 0
        && node.declarations[0].init !== null
        && CJS_IMPORT.test(sourceCode.getText(node.declarations[0].init));
    },
  },

  'enum': createKeywordTester(
    nodeTypes.TSEnumDeclaration,
    'enum',
  ),
  'interface': createKeywordTester(
    nodeTypes.TSInterfaceDeclaration,
    'interface',
  ),
  'function-overload': createNodeTypeTester(nodeTypes.TSDeclareFunction),
} satisfies Record<string, NodeTestObject>))

for (const [name, matcher] of Object.entries(MaybeMultilineStatementType)) {
  StatementTypes.set(name, matcher)
  StatementTypes.set(`singleline-${name}`, {
    ...matcher,
    test(node, sourceCode) { return matcher.test(node, sourceCode) && isSingleLine(node); },
  })
  StatementTypes.set(`multiline-${name}`, {
    ...matcher,
    test(node, sourceCode) { return matcher.test(node, sourceCode) && !isSingleLine(node); },
  })
}

/**
Build the vendored padding rule with caller-owned, typed policy options.
`statementTypes` registers caller-defined statement types, looked up before
the upstream table, for syntax the upstream matchers do not distinguish.
*/
function createPaddingLineRule<Extra extends string = never>(
  options: PolicyOptions<NoInfer<Extra>>,
  statementTypes?: Record<Extra, NodeTestObject>,
): CreateRule {
const customStatementTypes: Partial<Record<string, NodeTestObject>> = statementTypes ?? {}

return {
  meta: {
    type: 'layout',
    docs: {
      description: 'Require or disallow padding lines between statements',
    },
    fixable: 'whitespace',
    hasSuggestions: false,
    // This is intentionally an array schema as you can pass 0..n config objects
    schema: {
      $defs: {
        paddingType: {
          type: 'string',
          enum: Object.keys(PaddingTypes),
        },
        statementType: {
          type: 'string',
          enum: StatementTypes.keys().toArray(),
        },
        selectorOption: {
          type: 'object',
          properties: {
            selector: {
              type: 'string',
            },
            lineMode: {
              type: 'string',
              enum: ['any', 'singleline', 'multiline'],
            },
          },
          required: ['selector'],
          additionalProperties: false,
        },
        statementMatcher: {
          anyOf: [
            { $ref: '#/$defs/statementType' },
            { $ref: '#/$defs/selectorOption' },
          ],
        },
        statementOption: {
          anyOf: [
            { $ref: '#/$defs/statementMatcher' },
            {
              type: 'array',
              items: { $ref: '#/$defs/statementMatcher' },
              minItems: 1,
              uniqueItems: true,
              additionalItems: false,
            },
          ],
        },
      },
      type: 'array',
      additionalItems: false,
      items: {
        type: 'object',
        properties: {
          blankLine: { $ref: '#/$defs/paddingType' },
          prev: { $ref: '#/$defs/statementOption' },
          next: { $ref: '#/$defs/statementOption' },
        },
        additionalProperties: false,
        required: ['blankLine', 'prev', 'next'],
      },
    },
    messages: {
      unexpectedBlankLine: 'Unexpected blank line before this statement.',
      expectedBlankLine: 'Expected blank line before this statement.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode

    const selectorMatchedNodes = new Map<string, Set<ASTNode>>()
    const pendingPairs: { prevNode: ASTNode, nextNode: ASTNode }[] = []

    function collectSelectorOption(option: PolicyStatementOption<Extra>): void {
      if (Array.isArray(option)) {
        for (const item of option)
          {collectSelectorOption(item)}

        return
      }

      if (!isSelectorOption(option))
        {return}

      selectorMatchedNodes.set(option.selector, new Set())
    }

    for (const configure of options) {
      collectSelectorOption(configure.prev)
      collectSelectorOption(configure.next)
    }

    type Scope = {
      upper: Scope
      prevNode: ASTNode | null
    } | null

    let scopeInfo: Scope = null

    /**
    Processes to enter to new scope.
    This manages the current previous statement.
    
    @private
    */
    function enterScope(): void {
      scopeInfo = {
        upper: scopeInfo,
        prevNode: null,
      }
    }

    /**
    Processes to exit from the current scope.
    
    @private
    */
    function exitScope(): void {
      if (scopeInfo !== null)
        {scopeInfo = scopeInfo.upper}
    }

    /**
    Checks whether the given node matches the given type.
    @param node The statement node to check.
    @param type The statement type to check.
    @returns `true` if the statement node matched the type.
    @private
    */
    function match(node: ASTNode, type: PolicyStatementOption<Extra>): boolean {
      let innerStatementNode = node

      while (innerStatementNode.type === nodeTypes.LabeledStatement)
        {innerStatementNode = innerStatementNode.body}

      if (Array.isArray(type)) {
        for (const alternative of type) {
          if (match(innerStatementNode, alternative)) {return true;}
        }

        return false;
      }

      if (isSelectorOption(type)) {
        const matchedNodes = selectorMatchedNodes.get(type.selector)

        if (matchedNodes === undefined || !matchedNodes.has(innerStatementNode))
          {return false}

        const lineMode = type.lineMode

        if (lineMode === 'singleline')
          {return isSingleLine(innerStatementNode)}

        if (lineMode === 'multiline')
          {return !isSingleLine(innerStatementNode)}

        return true
      }

      const statementType = customStatementTypes[type] ?? StatementTypes.get(type)

      if (statementType === undefined) {
        throw new Error(`Padding rule invariant: unsupported statement type ${type}`)
      }

      return statementType.test(innerStatementNode, sourceCode)
    }

    /**
    Finds the last matched configure from options.
    @param prevNode The previous statement to match.
    @param nextNode The current statement to match.
    @returns The tester of the last matched configure.
    @private
    */
    function getPaddingType(
      prevNode: ASTNode,
      nextNode: ASTNode,
    ): (typeof PaddingTypes)[keyof typeof PaddingTypes] {
      for (let index = options.length - 1; index >= 0; index -= 1) {
        const configure = options[index]

        if (configure === undefined)
          {throw new Error('Padding rule invariant: configuration entry is missing')}

        if (
          match(prevNode, configure.prev)
          && match(nextNode, configure.next)
        ) {
          return PaddingTypes[configure.blankLine]
        }
      }

      return PaddingTypes.any
    }

    /**
    Gets padding line sequences between the given 2 statements.
    Comments are separators of the padding line sequences.
    @param prevNode The previous statement to count.
    @param nextNode The current statement to count.
    @returns The array of token pairs.
    @private
    */
    function getPaddingLineSequences(
      prevNode: ASTNode,
      nextNode: ASTNode,
    ): [Token, Token][] {
      const pairs: [Token, Token][] = []
      let previousToken = getActualLastToken(prevNode, sourceCode)

      if (nextNode.loc.start.line - previousToken.loc.end.line >= 2) {
        do {
          const token = sourceCode.getTokenAfter(previousToken, {
            includeComments: true,
          })

          if (token === null) {
            throw new Error('Padding rule invariant: missing token between statements')
          }

          if (token.loc.start.line - previousToken.loc.end.line >= 2)
            {pairs.push([previousToken, token])}

          previousToken = token
        } while (previousToken.range[0] < nextNode.range[0])
      }

      return pairs
    }

    /**
    Verify padding lines between the given node and the previous node.
    @param node The node to verify.
    
    @private
    */
    function verify(node: ASTNode): void {
      if (
        node.parent === undefined ||
        ![
          nodeTypes.BlockStatement,
          nodeTypes.Program,
          nodeTypes.StaticBlock,
          nodeTypes.SwitchCase,
          nodeTypes.SwitchStatement,
          nodeTypes.TSInterfaceBody,
          nodeTypes.TSModuleBlock,
          nodeTypes.TSTypeLiteral,
        ].includes(node.parent.type)
      ) {
        return
      }

      // Save this node as the current previous statement.
      const activeScope = scopeInfo

      if (activeScope === null) {
        throw new Error('Padding rule invariant: statement has no enclosing scope')
      }

      const previousNode = activeScope.prevNode

      // Verify.
      if (previousNode !== null)
        {pendingPairs.push({ prevNode: previousNode, nextNode: node })}

      activeScope.prevNode = node
    }

    function verifyPendingPairs(): void {
      for (const { prevNode, nextNode } of pendingPairs) {
        const type = getPaddingType(prevNode, nextNode)
        const paddingLines = getPaddingLineSequences(prevNode, nextNode)

        type.verify(context, prevNode, nextNode, paddingLines)
      }
    }

    /**
    Verify padding lines between the given node and the previous node.
    Then process to enter to new scope.
    @param node The node to verify.
    
    @private
    */
    function verifyThenEnterScope(node: ASTNode): void {
      verify(node)
      enterScope()
    }

    const selectorMatchListeners = Object.fromEntries(
      Array.from(selectorMatchedNodes.keys(), selector => {
        return [
          selector,
          (node: ASTNode): void => {
            selectorMatchedNodes.get(selector)?.add(node)
          },
        ];
      }),
    )

    return {
      'Program': enterScope,
      'Program:exit'() {
        verifyPendingPairs()
        exitScope()
      },
      'BlockStatement': enterScope,
      'BlockStatement:exit': exitScope,
      'SwitchStatement': enterScope,
      'SwitchStatement:exit': exitScope,
      'SwitchCase': verifyThenEnterScope,
      'SwitchCase:exit': exitScope,
      'StaticBlock': enterScope,
      'StaticBlock:exit': exitScope,

      'TSInterfaceBody': enterScope,
      'TSInterfaceBody:exit': exitScope,
      'TSModuleBlock': enterScope,
      'TSModuleBlock:exit': exitScope,
      'TSTypeLiteral': enterScope,
      'TSTypeLiteral:exit': exitScope,
      'TSDeclareFunction': verifyThenEnterScope,
      'TSDeclareFunction:exit': exitScope,
      'TSMethodSignature': verifyThenEnterScope,
      'TSMethodSignature:exit': exitScope,

      ':statement': verify,
      ...selectorMatchListeners,
    }
  },
}
}

export { createPaddingLineRule };

export type { NodeTestObject, PolicyOptions, PolicyStatementOption };
