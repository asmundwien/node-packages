/** Ban recognized Vitest and Jest module-mocking calls so tests pass doubles through explicit dependencies.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-module-mocking.ts
*/
import { AST_NODE_TYPES, TSESLint } from "@typescript-eslint/utils";

import { resolveVariable } from "../shared/scope.ts";

import type { CreateRule, ESTree, SourceCode } from "../types.ts";



const moduleMockMethods = new Set(["doMock", "mock", "unstable_mockModule"]);

const testFrameworkNames = {
  jest: true,
  vi: true,
  vitest: true,
} satisfies Record<string, true>;

function importedName(node: ESTree.Node): string | null {
  if (node.type !== AST_NODE_TYPES.ImportSpecifier) {return null;}

  return node.imported.type === AST_NODE_TYPES.Identifier ? node.imported.name : node.imported.value;
}

function isTestFrameworkObject(
  sourceCode: SourceCode,
  expression: ESTree.Expression,
): expression is ESTree.Identifier {
  if (expression.type !== AST_NODE_TYPES.Identifier) {return false;}

  const variable = resolveVariable(sourceCode, expression);

  if (variable === null || variable.defs.length === 0) {
    return Object.hasOwn(testFrameworkNames, expression.name);
  }

  return variable.defs.some((definition) => {
    if (
      definition.type !== TSESLint.Scope.DefinitionType.ImportBinding ||
      definition.parent.type !== AST_NODE_TYPES.ImportDeclaration ||
      definition.parent.importKind === "type" ||
      (definition.node.type === AST_NODE_TYPES.ImportSpecifier && definition.node.importKind === "type")
    ) {
      return false;
    }

    const source = definition.parent.source.value;
    const name = importedName(definition.node);

    return (source === "vitest" && (name === "vi" || name === "vitest")) || (source === "@jest/globals" && name === "jest");
  });
}

function moduleMockCall(sourceCode: SourceCode, callee: ESTree.Expression): boolean {
  if (!("property" in callee) || !("object" in callee) || !("computed" in callee) || !isTestFrameworkObject(sourceCode, callee.object)) {return false;}

  const property = callee.property;

  const method = callee.computed
    ? (property.type === AST_NODE_TYPES.Literal &&
      (property.value === "doMock" ||
        property.value === "mock" ||
        property.value === "unstable_mockModule")
      ? property.value
      : null)
    : (property.type === AST_NODE_TYPES.Identifier
      ? property.name
      : null);

  return method !== null && moduleMockMethods.has(method);
}

export const noModuleMockingRule: CreateRule = {
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === AST_NODE_TYPES.Super) {return;}

        if (moduleMockCall(context.sourceCode, node.callee)) {
          context.report({ messageId: "moduleMock", node });
        }
      },
    };
  },
  meta: {
      docs: {
        description:
          "Disallow Vitest and Jest module mocking; tests must replace dependencies through real interfaces.",
      },
      messages: {
        moduleMock:
          "Replace module mocking with dependency injection through a real interface, service layer, or faithful test implementation.",
      },
      schema: [],
      type: "problem",
    },
};

