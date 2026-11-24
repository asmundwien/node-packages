/** Require Effect Match for chained literal ternaries over the same value.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/effect/rules/prefer-effect-match.ts
*/
import type { CreateRule, ESTree } from "../../types.ts";

const equalityOperators = new Set(["==", "===", "!=", "!=="]);

function isLiteral(node: ESTree.Node): boolean {
  return node.type === "Literal" ||
    (node.type === "TemplateLiteral" && node.expressions.length === 0);
}

export const preferEffectMatchRule: CreateRule = {
	meta: {
		type: "problem",
		schema: [],
		docs: {
			description:
				"Use Match from Effect for chained literal ternaries over the same value.",
		},
		messages: {
			preferMatch:
				"Use Match from Effect instead of a chained literal ternary.",
		},
	},
	create(context) {
		const comparedValue = (node: ESTree.Expression): string | undefined => {
			if (
				node.type !== "BinaryExpression" ||
				!equalityOperators.has(node.operator)
			) {
				return undefined;
			}

			if (isLiteral(node.left)) {return context.sourceCode.getText(node.right);}

			if (isLiteral(node.right)) {return context.sourceCode.getText(node.left);}

			return undefined;
		};

		return {
			ConditionalExpression(node) {
				if (node.parent.type === "ConditionalExpression") {return;}

				const value = comparedValue(node.test);

				if (value === undefined) {return;}

				let alternate = node.alternate;
				let literalChecks = 1;

				while (alternate.type === "ConditionalExpression") {
					if (comparedValue(alternate.test) !== value) {return;}

					literalChecks += 1;
					alternate = alternate.alternate;
				}

				if (literalChecks > 1) {
					context.report({ node, messageId: "preferMatch" });
				}
			},
		};
	},
};
