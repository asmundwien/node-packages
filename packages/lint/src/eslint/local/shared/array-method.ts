import { AST_NODE_TYPES as nodeTypes, TSESLint as tsEslint } from "@typescript-eslint/utils";

import { resolveVariable } from "./scope.ts";

import type { ESTree, SourceCode, Variable } from "../types.ts";

/**
Unwrap syntax-only wrappers when inspecting array methods and accumulator references.
*/
function unwrapArrayExpression(node: ESTree.Node): ESTree.Node {
  let current = node;

  while (
    current.type === nodeTypes.ChainExpression ||
    current.type === nodeTypes.TSAsExpression ||
    current.type === nodeTypes.TSTypeAssertion ||
    current.type === nodeTypes.TSNonNullExpression ||
    current.type === nodeTypes.TSSatisfiesExpression
  ) {
    current = current.expression;
  }

  return current;
}

/**
Resolve a local binding by scope, not by identifier spelling.
*/
function resolveArrayBinding(sourceCode: SourceCode, node: ESTree.Node): Variable | null {
  const current = unwrapArrayExpression(node);

  return current.type === nodeTypes.Identifier ? resolveVariable(sourceCode, current) : null;
}

/**
Read static method names, including computed string literals, without evaluating expressions.
*/
function arrayMethodTarget(
  node: ESTree.Node,
): { readonly name: string; readonly object: ESTree.Node } | null {
  const current = unwrapArrayExpression(node);

  if (current.type !== nodeTypes.MemberExpression) {return null;}

  const property = current.property;

  if (!current.computed && property.type === nodeTypes.Identifier) {
    return { name: property.name, object: current.object };
  }

  if (current.computed && property.type === nodeTypes.Literal && typeof property.value === "string") {
    return { name: property.value, object: current.object };
  }

  return null;
}

function isArrayAnnotation(type: ESTree.TypeNode): boolean {
  if (type.type === nodeTypes.TSArrayType || type.type === nodeTypes.TSTupleType) {return true;}

  if (type.type === nodeTypes.TSTypeOperator && type.operator === "readonly") {
    return type.typeAnnotation !== undefined && isArrayAnnotation(type.typeAnnotation);
  }

  return (
    type.type === nodeTypes.TSTypeReference && type.typeName.type === nodeTypes.Identifier &&
    (type.typeName.name === "Array" || type.typeName.name === "ReadonlyArray")
  );
}

/**
Recognize local array evidence; unknown receivers and iterator pipelines are deliberately excluded.
*/
function isKnownArrayExpression(
  sourceCode: SourceCode,
  node: ESTree.Node,
  visited = new Set<Variable>(),
): boolean {
  const current = unwrapArrayExpression(node);

  if (current.type === nodeTypes.ArrayExpression) {return true;}

  if (current.type === nodeTypes.CallExpression) {
    const method = arrayMethodTarget(current.callee);

    return (
      method !== null &&
      ["map", "filter", "flatMap", "slice", "concat", "toSorted", "toReversed", "toSpliced"].includes(method.name) &&
      isKnownArrayExpression(sourceCode, method.object, visited)
    );
  }

  if (current.type !== nodeTypes.Identifier) {return false;}

  const variable = resolveVariable(sourceCode, current);

  if (variable === null || visited.has(variable)) {return false;}

  visited.add(variable);

  if (variable.references.some(reference => reference.isWrite() && reference.init !== true)) {return false;}

  for (const identifier of variable.identifiers) {
    const annotation = identifier.typeAnnotation?.typeAnnotation;

    if (annotation !== undefined) {return isArrayAnnotation(annotation);}
  }

  for (const definition of variable.defs) {
    if (
      definition.type === tsEslint.Scope.DefinitionType.Variable &&
      definition.node.id.type === nodeTypes.Identifier && definition.node.init !== null &&
      definition.parent.kind === "const"
    ) {
      return isKnownArrayExpression(sourceCode, definition.node.init, visited);
    }
  }

  return false;
}

export { arrayMethodTarget, isKnownArrayExpression, resolveArrayBinding, unwrapArrayExpression };
