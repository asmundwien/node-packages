/** Reject eager array filter/map pipelines; lazy iterator helpers remain allowed.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-array-filter-map.ts
*/
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { arrayMethodTarget, isKnownArrayExpression, unwrapArrayExpression } from "../shared/array-method.ts";

import type { CreateRule } from "../types.ts";


export const noArrayFilterMapRule: CreateRule = {
  create(context) {
    return {
      CallExpression(node) {
        const outer = arrayMethodTarget(node.callee);

        if (outer === null || (outer.name !== "map" && outer.name !== "filter")) {return;}

        const innerCall = unwrapArrayExpression(outer.object);

        if (innerCall.type !== AST_NODE_TYPES.CallExpression) {return;}

        const inner = arrayMethodTarget(innerCall.callee);

        if (inner === null || inner.name !== (outer.name === "map" ? "filter" : "map") || !isKnownArrayExpression(context.sourceCode, inner.object)) {return;}

        context.report({ data: { first: inner.name, second: outer.name }, messageId: "arrayFilterMap", node });
      },
    };
  },
  meta: {
      docs: { description: "Disallow adjacent array filter/map passes in favor of lazy iterator helpers or a single transformation." },
      messages: {
        arrayFilterMap: "Avoid consecutive array `{{first}}` and `{{second}}` passes. Prefer `.values().{{first}}(...).{{second}}(...).toArray()` where iterator helpers are supported, or a single `flatMap`/mutating reducer. Preserve callback ordering, indexes, and filtering semantics.",
      },
      schema: [],
      type: "suggestion",
    },
};

