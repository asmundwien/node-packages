/** Detect immutable local bindings that erase a known type and are later asserted back to a narrower type.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-widen-then-assert.ts
*/
import { AST_NODE_TYPES, TSESLint } from "@typescript-eslint/utils";

import { resolveVariable } from "../shared/scope.ts";
import {
  type TypeAliasEnvironment,
  createTypeAliasEnvironment,
  doesResolvedTypeMatch,
  visibleTypeAlias,
} from "../shared/type-alias-resolution.ts";

import type { CreateRule, ESTree, SourceCode, Variable } from "../types.ts";

type BroadTypeKind = "top" | "object" | "record";

interface KnownValueEvidence {
  readonly type: ESTree.TypeNode | null;
}

const functionBoundaryTypes = new Set([
  "ArrowFunctionExpression",
  "FunctionDeclaration",
  "FunctionExpression",
  "TSDeclareFunction",
  "TSEmptyBodyFunctionExpression",
]);

function typeReferenceName(type: ESTree.TSTypeReference): string | null {
  return type.typeName.type === AST_NODE_TYPES.Identifier ? type.typeName.name : null;
}

function isUnknownOrAnyType(type: ESTree.TypeNode): boolean {
  const unwrapped = type;

  return unwrapped.type === AST_NODE_TYPES.TSUnknownKeyword || unwrapped.type === AST_NODE_TYPES.TSAnyKeyword;
}

function isBroadRecordKeyType(type: ESTree.TypeNode): boolean {
  const unwrapped = type;

  if (
    unwrapped.type === AST_NODE_TYPES.TSStringKeyword ||
    unwrapped.type === AST_NODE_TYPES.TSNumberKeyword ||
    unwrapped.type === AST_NODE_TYPES.TSSymbolKeyword
  ) {
    return true;
  }

  if (unwrapped.type === AST_NODE_TYPES.TSUnionType) {return unwrapped.types.every(isBroadRecordKeyType);}

  return unwrapped.type === AST_NODE_TYPES.TSTypeReference && typeReferenceName(unwrapped) === "PropertyKey";
}

function isBroadRecordType(type: ESTree.TypeNode): boolean {
  const unwrapped = type;

  if (unwrapped.type === AST_NODE_TYPES.TSTypeReference) {
    if (typeReferenceName(unwrapped) === "Readonly") {
      const [inner] = unwrapped.typeArguments?.params ?? [];

      return inner !== undefined && isBroadRecordType(inner);
    }

    if (typeReferenceName(unwrapped) !== "Record") {return false;}

    const parameters = unwrapped.typeArguments?.params ?? [];

    return (
      parameters.length === 2 &&
      parameters[0] !== undefined &&
      parameters[1] !== undefined &&
      isBroadRecordKeyType(parameters[0]) &&
      isUnknownOrAnyType(parameters[1])
    );
  }

  if (unwrapped.type !== AST_NODE_TYPES.TSTypeLiteral || unwrapped.members.length !== 1) {return false;}

  const [member] = unwrapped.members;
  const [parameter] = member?.type === AST_NODE_TYPES.TSIndexSignature ? member.parameters : [];

  return (
    member?.type === AST_NODE_TYPES.TSIndexSignature &&
    member.parameters.length === 1 &&
    parameter !== undefined &&
    "typeAnnotation" in parameter &&
    parameter.typeAnnotation !== undefined &&
    member.typeAnnotation !== undefined &&
    isBroadRecordKeyType(parameter.typeAnnotation.typeAnnotation) &&
    isUnknownOrAnyType(member.typeAnnotation.typeAnnotation)
  );
}

function broadTypeKind(type: ESTree.TypeNode): BroadTypeKind | null {
  const unwrapped = type;

  if (unwrapped.type === AST_NODE_TYPES.TSUnknownKeyword || unwrapped.type === AST_NODE_TYPES.TSAnyKeyword) {return "top";}

  if (unwrapped.type === AST_NODE_TYPES.TSObjectKeyword) {return "object";}

  return isBroadRecordType(unwrapped) ? "record" : null;
}

function assertedExpression(
  node: ESTree.TSAsExpression | ESTree.TSTypeAssertion,
): ESTree.Expression {
  return node.expression;
}

function assertionFromExpression(
  expression: ESTree.Expression,
): ESTree.TSAsExpression | ESTree.TSTypeAssertion | null {
  const unwrapped = expression;

  return unwrapped.type === AST_NODE_TYPES.TSAsExpression || unwrapped.type === AST_NODE_TYPES.TSTypeAssertion
    ? unwrapped
    : null;
}

function normalizedTypeText(sourceText: string, type: ESTree.TypeNode): string {
  return sourceText.slice(type.range[0], type.range[1]).replaceAll(/\s+/gu, "");
}

function haveSameTypeSyntax(
  sourceText: string,
  left: ESTree.TypeNode | null,
  right: ESTree.TypeNode,
): boolean {
  return (
    left !== null &&
    normalizedTypeText(sourceText, left) ===
      normalizedTypeText(sourceText, right)
  );
}

function isDefinitelyObjectType(type: ESTree.TypeNode): boolean {
  const unwrapped = type;

  switch (unwrapped.type) {
    case AST_NODE_TYPES.TSArrayType:
    case AST_NODE_TYPES.TSConstructorType:
    case AST_NODE_TYPES.TSFunctionType:
    case AST_NODE_TYPES.TSMappedType:
    case AST_NODE_TYPES.TSObjectKeyword:
    case AST_NODE_TYPES.TSTupleType: {
      return true;
    }

    case AST_NODE_TYPES.TSTypeLiteral: {
      return unwrapped.members.length > 0;
    }

    case AST_NODE_TYPES.TSIntersectionType: {
      return unwrapped.types.every(isDefinitelyObjectType);
    }

    case AST_NODE_TYPES.TSTypeOperator: {
      return unwrapped.operator === "readonly" && unwrapped.typeAnnotation !== undefined && isDefinitelyObjectType(unwrapped.typeAnnotation);
    }

    default: {
      return false;
    }
  }
}

function isDefinitelyNarrowerRecordType(type: ESTree.TypeNode): boolean {
  const unwrapped = type;

  if (unwrapped.type === AST_NODE_TYPES.TSTypeLiteral) {
    return unwrapped.members.some((member) => member.type !== AST_NODE_TYPES.TSIndexSignature);
  }

  if (unwrapped.type !== AST_NODE_TYPES.TSTypeReference) {return false;}

  if (typeReferenceName(unwrapped) === "Readonly") {
    const [inner] = unwrapped.typeArguments?.params ?? [];

    return inner !== undefined && isDefinitelyNarrowerRecordType(inner);
  }

  if (typeReferenceName(unwrapped) !== "Record") {return false;}

  const parameters = unwrapped.typeArguments?.params ?? [];

  return (
    parameters.length === 2 && parameters[1] !== undefined && !isUnknownOrAnyType(parameters[1])
  );
}

function functionBoundary(node: ESTree.Node): ESTree.Node | null {
  if (node.type === AST_NODE_TYPES.Program) {return null;}

  let current = node.parent;

  while (current.type !== AST_NODE_TYPES.Program) {
    if (functionBoundaryTypes.has(current.type)) {return current;}

    current = current.parent;
  }

  return null;
}


function variableDeclarator(variable: Variable): ESTree.VariableDeclarator | null {
  for (const definition of variable.defs) {
    if (definition.type === TSESLint.Scope.DefinitionType.Variable) {
      return definition.node;
    }
  }

  return null;
}

function hasInformativeType(type: ESTree.TypeNode, environment: TypeAliasEnvironment): boolean {
  return doesResolvedTypeMatch(type, environment, (resolved) => {
    const hasUnresolvedAlias = resolved.type === AST_NODE_TYPES.TSTypeReference &&
      resolved.typeName.type === AST_NODE_TYPES.Identifier &&
      visibleTypeAlias(resolved.typeName.name, resolved, environment) !== null;

    return !hasUnresolvedAlias && broadTypeKind(resolved) === null;
  });
}

function knownValueEvidence(
  sourceCode: SourceCode,
  expression: ESTree.Expression,
  widenedVariable: Variable,
  environment: TypeAliasEnvironment,
): KnownValueEvidence | null {
  const boundary = functionBoundary(expression);
  const visitedVariables = new Set([widenedVariable]);
  let current = expression;

  for (;;) {
    if (current.type === AST_NODE_TYPES.TSAsExpression || current.type === AST_NODE_TYPES.TSTypeAssertion) {
      return hasInformativeType(current.typeAnnotation, environment) ? { type: current.typeAnnotation } : null;
    }

    if (current.type === AST_NODE_TYPES.Literal || current.type === AST_NODE_TYPES.TemplateLiteral || current.type === AST_NODE_TYPES.ArrayExpression ||
      current.type === AST_NODE_TYPES.ArrowFunctionExpression ||
      current.type === AST_NODE_TYPES.ClassExpression ||
      current.type === AST_NODE_TYPES.FunctionExpression ||
      current.type === AST_NODE_TYPES.NewExpression ||
      current.type === AST_NODE_TYPES.ObjectExpression) {
      return { type: null };
    }

    if (current.type !== AST_NODE_TYPES.Identifier) {return null;}

    const variable = resolveVariable(sourceCode, current);

    if (variable === null || visitedVariables.has(variable)) {return null;}

    visitedVariables.add(variable);

    const annotatedIdentifier = variable.identifiers.find(
      (identifier) => identifier.typeAnnotation !== undefined,
    );

    if (annotatedIdentifier?.typeAnnotation !== undefined) {
      const annotation = annotatedIdentifier.typeAnnotation.typeAnnotation;

      return functionBoundary(annotatedIdentifier) === boundary &&
        hasInformativeType(annotation, environment)
        ? { type: annotation } : null;
    }

    const declarator = variableDeclarator(variable);

    if (declarator === null ||
      declarator.id.type !== AST_NODE_TYPES.Identifier ||
      declarator.parent.kind !== "const" ||
      declarator.init === null ||
      variable.references.some((reference) => reference.isWrite() && reference.init !== true) ||
      functionBoundary(declarator) !== boundary) {return null;}

    current = declarator.init;
  }
}

function widenedBinding(
  variable: Variable,
  sourceCode: SourceCode,
  environment: TypeAliasEnvironment,
): {
  readonly broadKind: BroadTypeKind;
  readonly evidence: KnownValueEvidence;
  readonly declaredAt: number;
  readonly boundary: ESTree.Node | null;
} | null {
  const declarator = variableDeclarator(variable);

  if (
    declarator === null ||
    declarator.parent.kind !== "const" ||
    declarator.id.type !== AST_NODE_TYPES.Identifier ||
    declarator.init === null ||
    variable.references.some((reference) => reference.isWrite() && reference.init !== true)
  ) {
    return null;
  }

  const boundary = functionBoundary(declarator);
  const declaredType = declarator.id.typeAnnotation?.typeAnnotation;
  const initializerAssertion = assertionFromExpression(declarator.init);

  const initializerBroadKind =
    initializerAssertion === null ? null : broadTypeKind(initializerAssertion.typeAnnotation);

  const declaredBroadKind = declaredType === undefined ? null : broadTypeKind(declaredType);
  const broadKind = declaredBroadKind ?? initializerBroadKind;

  if (broadKind === null) {return null;}

  const originalExpression =
    initializerAssertion === null || initializerBroadKind === null
      ? declarator.init
      : assertedExpression(initializerAssertion);

  const evidence = knownValueEvidence(sourceCode, originalExpression, variable, environment);

  return evidence === null ? null : { boundary, broadKind, declaredAt: declarator.range[1], evidence };
}

function isNarrowerAssertion(
  sourceText: string,
  broadKind: BroadTypeKind,
  evidence: KnownValueEvidence,
  assertedType: ESTree.TypeNode,
): boolean {
  if (broadTypeKind(assertedType) !== null) {return false;}

  if ((broadKind === "top") || haveSameTypeSyntax(sourceText, evidence.type, assertedType)) {return true;}

  if (broadKind === "object") {return isDefinitelyObjectType(assertedType);}

  return isDefinitelyNarrowerRecordType(assertedType);
}

export const noWidenThenAssertRule: CreateRule = {
  create(context) {
    let environment: TypeAliasEnvironment | null = null;

    function checkAssertion(node: ESTree.TSAsExpression | ESTree.TSTypeAssertion) {
      const expression = assertedExpression(node);

      if (expression.type !== AST_NODE_TYPES.Identifier) {return;}

      const variable = resolveVariable(context.sourceCode, expression);

      if (variable === null || environment === null) {return;}

      const widened = widenedBinding(variable, context.sourceCode, environment);

      if (
        widened === null ||
        node.range[0] <= widened.declaredAt ||
        functionBoundary(node) !== widened.boundary ||
        !isNarrowerAssertion(
          context.sourceCode.text,
          widened.broadKind,
          widened.evidence,
          node.typeAnnotation,
        )
      ) {
        return;
      }

      context.report({
              data: { name: expression.name },
              messageId: "widenThenAssert",
              node,
            });
    }

    return {
      Program(node) {
        environment = createTypeAliasEnvironment(node, context.sourceCode.visitorKeys);
      },
      TSAsExpression: checkAssertion,
      TSTypeAssertion: checkAssertion,
    };
  },
  meta: {
      docs: {
        description:
          "Disallow local const flows that explicitly widen a known value before asserting the widened binding to a narrower type.",
      },
      messages: {
        widenThenAssert:
          'Binding "{{name}}" discards type evidence and later recreates it with an assertion. Keep the precise type from initialization through use; parse boundary input once.',
      },
      schema: [],
      type: "problem",
    },
};

