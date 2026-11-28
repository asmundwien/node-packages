/** Require Effect Match for chained literal ternaries over the same value.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/effect/rules/prefer-effect-match.ts
*/
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import type { CreateRule, ESTree } from "../../types.ts";

const equalityOperators = new Set(["!=", "!==", "==", "==="]);

function isLiteral(node: ESTree.Node): boolean {
  return node.type === AST_NODE_TYPES.Literal ||
    (node.type === AST_NODE_TYPES.TemplateLiteral && node.expressions.length === 0);
}

const preferEffectMatchRule: CreateRule = {
	create(context) {
		function comparedValue(node: ESTree.Expression): string | undefined {
			if (
				node.type !== AST_NODE_TYPES.BinaryExpression ||
				!equalityOperators.has(node.operator)
			) {
				return undefined;
			}

			const { left, right } = node;

			if (isLiteral(left)) {return context.sourceCode.getText(right);}

			if (isLiteral(right)) {return context.sourceCode.getText(left);}

			return undefined;
		}

		return {
			ConditionalExpression(node) {
				const { alternate: firstAlternate, parent, test } = node;
				const value = comparedValue(test);

				if (value === undefined) {return;}

				if (
					parent.type === AST_NODE_TYPES.ConditionalExpression &&
					parent.alternate === node &&
					comparedValue(parent.test) === value
				) {
					return;
				}

				let alternate = firstAlternate;
				let literalChecks = 1;

				while (alternate.type === AST_NODE_TYPES.ConditionalExpression) {
					if (comparedValue(alternate.test) !== value) {break;}

					literalChecks += 1;
					alternate = alternate.alternate;
				}

				if (literalChecks > 1) {
					context.report({ messageId: "preferMatch", node });
				}
			},
		};
	},
	meta: {
		docs: {
			description:
				"Use Match from Effect for chained literal ternaries over the same value.",
		},
		messages: {
			preferMatch:
				"Use Match from Effect instead of a chained literal ternary.",
		},
		schema: [],
		type: "problem",
	},
};

export { preferEffectMatchRule };
