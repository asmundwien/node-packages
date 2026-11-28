import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { resolveVariable } from "./scope.ts";

import type { ESTree, SourceCode } from "../types.ts";

function isGlobalReflect(sourceCode: SourceCode, expression: ESTree.Expression): boolean {
  if (expression.type !== AST_NODE_TYPES.Identifier || expression.name !== "Reflect") {return false;}

  const variable = resolveVariable(sourceCode, expression);

  return variable === null || variable.defs.length === 0;
}

/**
Reports whether a call target names one method on the global Reflect object.
*/
function isGlobalReflectMethodCall(
  sourceCode: SourceCode,
  callee: ESTree.Expression,
  methodName: string,
): boolean {
  if (callee.type !== AST_NODE_TYPES.MemberExpression || !isGlobalReflect(sourceCode, callee.object)) {return false;}

  const property = callee.property;

  return callee.computed
    ? property.type === AST_NODE_TYPES.Literal && property.value === methodName
    : property.type === AST_NODE_TYPES.Identifier && property.name === methodName;
}

export { isGlobalReflectMethodCall };
