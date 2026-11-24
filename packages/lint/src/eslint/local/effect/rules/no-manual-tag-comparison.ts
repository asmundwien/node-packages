/** Require Effect Match or Predicate helpers for tagged-value comparisons.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/effect/rules/no-manual-tag-comparison.ts
*/
import {
	isInsideBroadEffectHandler,
	isTagMember,
	tagMemberFromComparison,
} from "../shared/tagged-values.ts";

import type { CreateRule } from "../../types.ts";

const noManualTagComparisonRule: CreateRule = {
	create(context) {
		return {
			BinaryExpression(node) {
				if (
					tagMemberFromComparison(node) === undefined ||
					isInsideBroadEffectHandler(node)
				) {
					return;
				}

				context.report({ messageId: "manualComparison", node });
			},
			SwitchStatement(node) {
				if (
					!isTagMember(node.discriminant) ||
					isInsideBroadEffectHandler(node)
				) {
					return;
				}

				context.report({ messageId: "manualSwitch", node });
			},
		};
	},
	meta: {
		docs: {
			description:
				"Use Effect Match or Predicate helpers instead of manually branching on `_tag`.",
		},
		messages: {
			manualComparison:
				"Use Match.tag/Match.tags for tagged-value branching, or Predicate.isTagged for a simple reusable predicate.",
			manualSwitch:
				"Use Match.value(value).pipe(Match.tag/Match.tags/Match.tagsExhaustive) or the tagged enum `$match` helper instead of switching on `_tag`.",
		},
		schema: [],
		type: "problem",
	},
};

export { noManualTagComparisonRule };
