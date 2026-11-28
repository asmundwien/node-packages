/** Reject copies of growing reducer accumulators, including array and object spreads.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-reduce-accumulator-copy.ts
*/
import { AST_NODE_TYPES, TSESLint } from "@typescript-eslint/utils";

import {
  arrayMethodTarget,
  isKnownArrayExpression,
  resolveArrayBinding,
  unwrapArrayExpression,
} from "../shared/array-method.ts";

import type { CreateRule, ESTree, SourceCode, Variable } from "../types.ts";


function enclosingReducer(sourceCode: SourceCode, node: ESTree.Node) {
  if (node.type === AST_NODE_TYPES.Program) {return null;}

  let parent = node.parent;

  while (parent.type !== AST_NODE_TYPES.Program) {
    if (parent.type === AST_NODE_TYPES.FunctionDeclaration) {return null;}

    if (parent.type === AST_NODE_TYPES.ArrowFunctionExpression || parent.type === AST_NODE_TYPES.FunctionExpression) {
      const callback = parent;
      let owner = callback.parent;

      while (owner.type !== AST_NODE_TYPES.Program && unwrapArrayExpression(owner) === callback) {owner = owner.parent;}

      if (owner.type !== AST_NODE_TYPES.CallExpression) {return null;}

      const method = arrayMethodTarget(owner.callee);
      const firstArgument = owner.arguments[0];

      if (
        firstArgument === undefined || method === null || owner.arguments.length > 2 ||
        (method.name !== "reduce" && method.name !== "reduceRight") ||
        unwrapArrayExpression(firstArgument) !== callback
      ) {return null;}

      const firstParameter = callback.params[0];
      const accumulatorParameter = firstParameter?.type === AST_NODE_TYPES.AssignmentPattern ? firstParameter.left : firstParameter;

      if (accumulatorParameter?.type !== AST_NODE_TYPES.Identifier) {return null;}

      const accumulator = sourceCode.getDeclaredVariables(callback).find(variable =>
        variable.identifiers.some(identifier => identifier.range[0] === accumulatorParameter.range[0]),
      );

      return accumulator === undefined ? null : { accumulator, initialValue: owner.arguments[1] };
    }

    parent = parent.parent;
  }

  return null;
}

function constInitializer(variable: Variable): ESTree.Node | null {
  for (const definition of variable.defs) {
    if (
      definition.type === TSESLint.Scope.DefinitionType.Variable &&
      definition.node.id.type === AST_NODE_TYPES.Identifier && definition.node.init !== null &&
      definition.node.parent.kind === "const"
    ) {
      return definition.node.init;
    }
  }

  return null;
}

function isAccumulatorReference(
  sourceCode: SourceCode,
  node: ESTree.Node,
  accumulator: Variable,
): boolean {
  const visited = new Set<Variable>();
  let current = node;

  for (;;) {
    const variable = resolveArrayBinding(sourceCode, current);

    if (variable === null || visited.has(variable)) {return false;}

    if (variable === accumulator) {return true;}

    visited.add(variable);

    if (variable.references.some(reference => reference.isWrite() && reference.init !== true)) {return false;}

    const initializer = constInitializer(variable);

    if (initializer === null) {return false;}

    current = initializer;
  }
}

function isGlobalCopyOwner(sourceCode: SourceCode, node: ESTree.Node, name: string): boolean {
  const expression = unwrapArrayExpression(node);

  if (expression.type !== AST_NODE_TYPES.Identifier || expression.name !== name) {return false;}

  const variable = resolveArrayBinding(sourceCode, expression);

  return variable === null || variable.defs.length === 0;
}

export const noReduceAccumulatorCopyRule: CreateRule = {
  create(context) {
    return {
          CallExpression(node) {
            const method = arrayMethodTarget(node.callee);
    
            if (method === null) {return;}
    
            const reducer = enclosingReducer(context.sourceCode, node);
    
            if (reducer === null) {return;}
    
            const { accumulator } = reducer;
            let isAccumulatorCopy = false;
    
            if (method.name === "assign" && isGlobalCopyOwner(context.sourceCode, method.object, "Object")) {
              const target = node.arguments[0];
    
              if (target !== undefined && unwrapArrayExpression(target).type === AST_NODE_TYPES.ObjectExpression) {
                for (let index = 1; index < node.arguments.length; index += 1) {
                  const argument = node.arguments[index];
    
                  if (argument !== undefined && isAccumulatorReference(context.sourceCode, argument, accumulator)) {
                    isAccumulatorCopy = true;
                    break;
                  }
                }
              }
            } else if (method.name === "from" && isGlobalCopyOwner(context.sourceCode, method.object, "Array")) {
              const source = node.arguments[0];
              isAccumulatorCopy = source !== undefined && isAccumulatorReference(context.sourceCode, source, accumulator);
            } else if (["concat", "slice", "toSpliced", "toSorted", "toReversed", "with"].includes(method.name)) {
              const initialValue = reducer.initialValue;
    
              const isArrayAccumulator = initialValue !== undefined &&
                isKnownArrayExpression(context.sourceCode, initialValue);
    
              isAccumulatorCopy = isArrayAccumulator && isAccumulatorReference(context.sourceCode, method.object, accumulator);
            }
    
            if (isAccumulatorCopy) {context.report({ messageId: "accumulatorCopy", node });}
          },
          SpreadElement(node) {
            if (node.parent.type !== AST_NODE_TYPES.ArrayExpression && node.parent.type !== AST_NODE_TYPES.ObjectExpression) {return;}
    
            const reducer = enclosingReducer(context.sourceCode, node);
    
            if (reducer === null) {return;}
    
            if (isAccumulatorReference(context.sourceCode, node.argument, reducer.accumulator)) {
              context.report({ messageId: "accumulatorCopy", node });
            }
          },
        };
  },
  meta: {
      docs: { description: "Disallow copying growing reducer accumulators with spreads, Object.assign, Array.from, or array copy methods." },
      messages: {
        accumulatorCopy: "Do not copy the reducer accumulator on every iteration; growing copies can cause quadratic work. Mutate a fresh, locally owned accumulator and return it, or use an iterator pipeline/flatMap.",
      },
      schema: [],
      type: "problem",
    },
};

