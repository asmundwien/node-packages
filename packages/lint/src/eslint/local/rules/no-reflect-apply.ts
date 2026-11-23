/** Ban Reflect.apply, which bypasses ordinary typed function calls.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-reflect-apply.ts
*/
import { isGlobalReflectMethodCall } from "../shared/reflect-method.ts";

import type { CreateRule } from "../types.ts";


export const noReflectApplyRule: CreateRule = {
  meta: {
    schema: [],
    type: "problem",
    docs: {
      description:
        "Disallow Reflect.apply; call typed functions directly or model dynamic dispatch behind an interface.",
    },
    messages: {
      reflectApply:
        "Replace `Reflect.apply` with a typed function call. Model dynamic dispatch behind a named interface.",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === "Super") {return;}

        if (isGlobalReflectMethodCall(context.sourceCode, node.callee, "apply")) {
          context.report({ node, messageId: "reflectApply" });
        }
      },
    };
  },
};

