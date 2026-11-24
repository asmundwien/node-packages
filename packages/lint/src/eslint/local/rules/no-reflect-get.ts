/** Ban Reflect.get, which bypasses ordinary property access and useful type evidence.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-reflect-get.ts
*/
import { AST_NODE_TYPES as nodeTypes } from "@typescript-eslint/utils";

import { isGlobalReflectMethodCall } from "../shared/reflect-method.ts";

import type { CreateRule } from "../types.ts";


export const noReflectGetRule: CreateRule = {
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === nodeTypes.Super) {return;}

        if (isGlobalReflectMethodCall(context.sourceCode, node.callee, "get")) {
          context.report({ messageId: "reflectGet", node });
        }
      },
    };
  },
  meta: {
      docs: {
        description:
          "Disallow Reflect.get; use typed property access or parse dynamic input into a domain type.",
      },
      messages: {
        reflectGet:
          "Replace `Reflect.get` with typed property access. Parse dynamic input into a named domain type before reading it.",
      },
      schema: [],
      type: "problem",
    },
};

