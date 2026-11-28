import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { Rule } from 'eslint';

type SourceCode = TSESLint.SourceCode;

type Variable = TSESLint.Scope.Variable;

type Context<Options extends readonly unknown[] = readonly unknown[]> = Pick<TSESLint.RuleContext<string, Options>, 'sourceCode' | 'filename' | 'options' | 'report'>;

type VisitorObject = TSESLint.RuleListener;

interface CreateRule<Options extends readonly unknown[] = []> {
  meta: Rule.RuleMetaData;
  create: (context: Context<Options>) => VisitorObject;
}

type Token = TSESTree.Token;

type Comment = TSESTree.Comment;

type Location = TSESTree.SourceLocation;

export type { Comment, Context, CreateRule, Location, SourceCode, Token, Variable };

export type { TSESTree as ESTree } from '@typescript-eslint/utils';
