import type { ESTree, SourceCode, Variable } from "../types.ts";

/**
Unwrap syntax-only wrappers when inspecting array methods and accumulator references.
*/
export function unwrapArrayExpression(node: ESTree.Node): ESTree.Node {
  let current = node;

  while (
    current.type === "ChainExpression" ||
    current.type === "TSAsExpression" ||
    current.type === "TSTypeAssertion" ||
    current.type === "TSNonNullExpression" ||
    current.type === "TSSatisfiesExpression"
  ) {
    current = current.expression;
  }

  return current;
}

/**
Resolve a local binding by scope, not by identifier spelling.
*/
export function resolveArrayBinding(sourceCode: SourceCode, node: ESTree.Node): Variable | null {
  type Scope = ReturnType<SourceCode["getScope"]>;

  const current = unwrapArrayExpression(node);

  if (current.type !== "Identifier") {return null;}

  let scope: Scope | null = sourceCode.getScope(current);

  while (scope != null) {
    const variable = scope.set.get(current.name);

    if (variable !== undefined) {return variable;}

    scope = scope.upper;
  }

  return null;
}

/**
Read static method names, including computed string literals, without evaluating expressions.
*/
export function arrayMethodTarget(
  node: ESTree.Node,
): { readonly name: string; readonly object: ESTree.Node } | null {
  const current = unwrapArrayExpression(node);

  if (current.type !== "MemberExpression") {return null;}

  const property = current.property;

  if (!current.computed && property.type === "Identifier") {
    return { name: property.name, object: current.object };
  }

  if (current.computed && property.type === "Literal" && typeof property.value === "string") {
    return { name: property.value, object: current.object };
  }

  return null;
}

function isArrayAnnotation(type: ESTree.TypeNode): boolean {
  if (type.type === "TSArrayType" || type.type === "TSTupleType") {return true;}

  if (type.type === "TSTypeOperator" && type.operator === "readonly") {
    return type.typeAnnotation !== undefined && isArrayAnnotation(type.typeAnnotation);
  }

  return (
    type.type === "TSTypeReference" && type.typeName.type === "Identifier" &&
    (type.typeName.name === "Array" || type.typeName.name === "ReadonlyArray")
  );
}

/**
Recognize local array evidence; unknown receivers and iterator pipelines are deliberately excluded.
*/
export function isKnownArrayExpression(
  sourceCode: SourceCode,
  node: ESTree.Node,
  visited = new Set<Variable>(),
): boolean {
  const current = unwrapArrayExpression(node);

  if (current.type === "ArrayExpression") {return true;}

  if (current.type === "CallExpression") {
    const method = arrayMethodTarget(current.callee);

    return (
      method !== null &&
      ["map", "filter", "flatMap", "slice", "concat", "toSorted", "toReversed", "toSpliced"].includes(method.name) &&
      isKnownArrayExpression(sourceCode, method.object, visited)
    );
  }

  if (current.type !== "Identifier") {return false;}

  const variable = resolveArrayBinding(sourceCode, current);

  if (variable === null || visited.has(variable)) {return false;}

  visited.add(variable);

  if (variable.references.some(reference => reference.isWrite() && reference.init !== true)) {return false;}

  for (const identifier of variable.identifiers) {
    const annotation = identifier.typeAnnotation?.typeAnnotation;

    if (annotation !== undefined) {return isArrayAnnotation(annotation);}
  }

  for (const definition of variable.defs) {
    if (
      definition.type === "Variable" &&
      definition.node.id.type === "Identifier" && definition.node.init !== null &&
      definition.parent.kind === "const"
    ) {
      return isKnownArrayExpression(sourceCode, definition.node.init, visited);
    }
  }

  return false;
}
