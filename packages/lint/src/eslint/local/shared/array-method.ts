import { AST_NODE_TYPES, TSESLint } from "@typescript-eslint/utils";

import { resolveVariable } from "./scope.ts";
import { createTypeAliasEnvironment, hasVisibleTypeBinding } from "./type-alias-resolution.ts";

import type { ESTree, SourceCode, Variable } from "../types.ts";

/**
Unwrap syntax-only wrappers when inspecting array methods and accumulator references.
*/
function unwrapArrayExpression(node: ESTree.Node): ESTree.Node {
  let current = node;

  while (
    current.type === AST_NODE_TYPES.ChainExpression ||
    current.type === AST_NODE_TYPES.TSAsExpression ||
    current.type === AST_NODE_TYPES.TSTypeAssertion ||
    current.type === AST_NODE_TYPES.TSNonNullExpression ||
    current.type === AST_NODE_TYPES.TSSatisfiesExpression
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

  return current.type === AST_NODE_TYPES.Identifier ? resolveVariable(sourceCode, current) : null;
}

/**
Read static method names, including computed string literals, without evaluating expressions.
*/
function arrayMethodTarget(
  node: ESTree.Node,
): { readonly name: string; readonly object: ESTree.Node } | null {
  const current = unwrapArrayExpression(node);

  if (current.type !== AST_NODE_TYPES.MemberExpression) {return null;}

  const property = current.property;

  if (!current.computed && property.type === AST_NODE_TYPES.Identifier) {
    return { name: property.name, object: current.object };
  }

  if (current.computed && property.type === AST_NODE_TYPES.Literal && typeof property.value === "string") {
    return { name: property.value, object: current.object };
  }

  return null;
}

function isArrayAnnotation(sourceCode: SourceCode, type: ESTree.TypeNode): boolean {
  if (type.type === AST_NODE_TYPES.TSArrayType || type.type === AST_NODE_TYPES.TSTupleType) {return true;}

  if (type.type === AST_NODE_TYPES.TSTypeOperator && type.operator === "readonly") {
    return type.typeAnnotation !== undefined && isArrayAnnotation(sourceCode, type.typeAnnotation);
  }

  return (
    type.type === AST_NODE_TYPES.TSTypeReference && type.typeName.type === AST_NODE_TYPES.Identifier &&
    (type.typeName.name === "Array" || type.typeName.name === "ReadonlyArray") &&
    !hasVisibleTypeBinding(
      type.typeName.name,
      type,
      createTypeAliasEnvironment(sourceCode.ast, sourceCode.visitorKeys),
    )
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

  if (current.type === AST_NODE_TYPES.ArrayExpression) {return true;}

  if (current.type === AST_NODE_TYPES.CallExpression) {
    const method = arrayMethodTarget(current.callee);

    return (
      method !== null &&
      ["map", "filter", "flatMap", "slice", "concat", "toSorted", "toReversed", "toSpliced", "with"].includes(method.name) &&
      isKnownArrayExpression(sourceCode, method.object, visited)
    );
  }

  if (current.type !== AST_NODE_TYPES.Identifier) {return false;}

  const variable = resolveVariable(sourceCode, current);

  if (variable === null || visited.has(variable)) {return false;}

  visited.add(variable);

  if (variable.references.some(reference => reference.isWrite() && reference.init !== true)) {return false;}

  for (const identifier of variable.identifiers) {
    const annotation = identifier.typeAnnotation?.typeAnnotation;

    if (annotation !== undefined) {return isArrayAnnotation(sourceCode, annotation);}
  }

  for (const definition of variable.defs) {
    if (
      definition.type === TSESLint.Scope.DefinitionType.Variable &&
      definition.node.id.type === AST_NODE_TYPES.Identifier && definition.node.init !== null &&
      definition.parent.kind === "const"
    ) {
      return isKnownArrayExpression(sourceCode, definition.node.init, visited);
    }
  }

  return false;
}

export { arrayMethodTarget, isKnownArrayExpression, resolveArrayBinding, unwrapArrayExpression };
