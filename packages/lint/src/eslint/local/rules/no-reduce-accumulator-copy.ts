/** Reject copies of growing reducer accumulators, including array and object spreads.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-reduce-accumulator-copy.ts
*/
import {
  arrayMethodTarget,
  isKnownArrayExpression,
  resolveArrayBinding,
  unwrapArrayExpression,
} from "../shared/array-method.ts";

import type { CreateRule, ESTree, SourceCode, Variable } from "../types.ts";


function enclosingReducer(node: ESTree.Node) {
  let parent: ESTree.Node | undefined = node.parent;

  while (parent != null) {
    if (parent?.type === "FunctionDeclaration") {return null;}

    if (parent?.type === "ArrowFunctionExpression" || parent.type === "FunctionExpression") {
      const callback = parent;
      let owner: ESTree.Node | undefined = callback.parent;

      while (owner != null && unwrapArrayExpression(owner) === callback) {owner = owner.parent;}

      if (owner?.type !== "CallExpression") {return null;}

      const method = arrayMethodTarget(owner.callee);
      const firstArgument = owner.arguments[0];

      if (
        method === null || (method.name !== "reduce" && method.name !== "reduceRight") ||
        owner.arguments.length > 2 || firstArgument === undefined ||
        unwrapArrayExpression(firstArgument) !== callback
      ) {return null;}

      const firstParameter = callback.params[0];
      const accumulator = firstParameter?.type === "AssignmentPattern" ? firstParameter.left : firstParameter;

      return accumulator?.type === "Identifier" ? { callback, accumulator, initialValue: owner.arguments[1] } : null;
    }

    parent = parent.parent;
  }

  return null;
}

function referencesAccumulator(
  sourceCode: SourceCode,
  node: ESTree.Node,
  accumulator: Variable,
  visited = new Set<Variable>(),
): boolean {
  const variable = resolveArrayBinding(sourceCode, node);

  if (variable === null || visited.has(variable)) {return false;}

  if (variable === accumulator) {return true;}

  visited.add(variable);

  if (variable.references.some(reference => reference.isWrite() && !reference.init)) {return false;}

  for (const definition of variable.defs) {
    if (
      definition.type === "Variable" && definition.node.type === "VariableDeclarator" &&
      definition.node.id.type === "Identifier" && definition.node.init !== null &&
      definition.node.parent?.type === "VariableDeclaration" && definition.node.parent.kind === "const"
    ) {
      return referencesAccumulator(sourceCode, definition.node.init, accumulator, visited);
    }
  }

  return false;
}

function isGlobalCopyOwner(sourceCode: SourceCode, node: ESTree.Node, name: string): boolean {
  node = unwrapArrayExpression(node);

  if (node.type !== "Identifier" || node.name !== name) {return false;}

  const variable = resolveArrayBinding(sourceCode, node);

  return variable === null || variable.defs.length === 0;
}

export const noReduceAccumulatorCopyRule: CreateRule = {
  meta: {
    schema: [],
    type: "problem",
    docs: { description: "Disallow copying growing reducer accumulators with spreads, Object.assign, Array.from, or array copy methods." },
    messages: {
      accumulatorCopy: "Do not copy the reducer accumulator on every iteration; growing copies can cause quadratic work. Mutate a fresh, locally owned accumulator and return it, or use an iterator pipeline/flatMap.",
    },
  },
  create(context) {
    return {
      SpreadElement(node) {
        if (node.parent?.type !== "ArrayExpression" && node.parent?.type !== "ObjectExpression") {return;}

        const reducer = enclosingReducer(node);

        if (reducer === null) {return;}

        const accumulator = context.sourceCode.getDeclaredVariables(reducer.callback).find(variable =>
          variable.identifiers.some(identifier => identifier.range[0] === reducer.accumulator.range[0]),
        );

        if (accumulator === undefined) {return;}

        if (referencesAccumulator(context.sourceCode, node.argument, accumulator)) {
          context.report({ node, messageId: "accumulatorCopy" });
        }
      },
      CallExpression(node) {
        const method = arrayMethodTarget(node.callee);

        if (method === null) {return;}

        const reducer = enclosingReducer(node);

        if (reducer === null) {return;}

        const accumulator = context.sourceCode.getDeclaredVariables(reducer.callback).find(variable =>
          variable.identifiers.some(identifier => identifier.range[0] === reducer.accumulator.range[0]),
        );

        if (accumulator === undefined) {return;}

        const isAccumulator = (expression: ESTree.Node) =>
          referencesAccumulator(context.sourceCode, expression, accumulator);

        let isCopiesAccumulator = false;

        if (method.name === "assign" && isGlobalCopyOwner(context.sourceCode, method.object, "Object")) {
          const target = node.arguments[0];
          isCopiesAccumulator = (
            target !== undefined && unwrapArrayExpression(target).type === "ObjectExpression" &&
            node.arguments.slice(1).some(isAccumulator)
          );
        } else if (method.name === "from" && isGlobalCopyOwner(context.sourceCode, method.object, "Array")) {
          const source = node.arguments[0];
          isCopiesAccumulator = source !== undefined && isAccumulator(source);
        } else if (["concat", "slice", "toSpliced", "toSorted", "toReversed", "with"].includes(method.name)) {
          const initialValue = reducer.initialValue;

          const arrayAccumulator = initialValue !== undefined &&
            isKnownArrayExpression(context.sourceCode, initialValue);

          isCopiesAccumulator = arrayAccumulator && isAccumulator(method.object);
        }

        if (isCopiesAccumulator) {context.report({ node, messageId: "accumulatorCopy" });}
      },
    };
  },
};

