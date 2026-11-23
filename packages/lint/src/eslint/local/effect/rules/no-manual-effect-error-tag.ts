/** Require tagged Effect error handlers instead of manual tag branches in broad catch handlers.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/effect/rules/no-manual-effect-error-tag.ts
*/
import {
	isInsideBroadEffectHandler,
	isReasonTagMember,
	isTagMember,
	tagMemberFromComparison,
} from "../shared/tagged-values.ts";

import type { CreateRule } from "../../types.ts";


export const noManualEffectErrorTagRule: CreateRule = {
	meta: {
		type: "problem",
		schema: [],
		docs: {
			description:
				"Use Effect tagged error handlers instead of manually branching on `_tag` in a catch handler.",
		},
		messages: {
			tag: "Use Effect.catchTag or Effect.catchTags instead of manually discriminating a tagged error in a broad Effect catch handler.",
			reason:
				"Use Effect.catchReason or Effect.catchReasons instead of manually discriminating a tagged `reason` in a broad Effect catch handler.",
		},
	},
	create(context) {
		return {
			BinaryExpression(node) {
				const tagMember = tagMemberFromComparison(node);

				if (
					tagMember === undefined ||
					!isInsideBroadEffectHandler(node)
				) {
					return;
				}

				context.report({
					node,
					messageId: isReasonTagMember(tagMember) ? "reason" : "tag",
				});
			},
			SwitchStatement(node) {
				if (
					!isTagMember(node.discriminant) ||
					!isInsideBroadEffectHandler(node)
				) {
					return;
				}

				context.report({
					node,
					messageId: isReasonTagMember(node.discriminant) ? "reason" : "tag",
				});
			},
		};
	},
};
