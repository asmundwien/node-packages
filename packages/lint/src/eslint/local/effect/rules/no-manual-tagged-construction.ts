/** Require existing Effect constructors instead of literal tagged objects.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/effect/rules/no-manual-tagged-construction.ts
*/
import {
	isMatchPatternObject,
	isStringLiteral,
	propertyName,
} from "../shared/tagged-values.ts";

import type { CreateRule } from "../../types.ts";


export const noManualTaggedConstructionRule: CreateRule = {
	meta: {
		type: "problem",
		schema: [],
		docs: {
			description:
				"Construct tagged values with their existing Effect constructor instead of writing `_tag` manually.",
		},
		messages: {
			manualConstruction:
				"Use the existing Schema tagged `.make`, tagged class/error constructor, or Data.taggedEnum variant constructor instead of writing a literal `_tag` object.",
		},
	},
	create(context) {
		return {
			ObjectExpression(node) {
				if (isMatchPatternObject(node)) {return;}

				const tag = node.properties.find(
					(property) => {
						return property.type === "Property" &&
						propertyName(property) === "_tag" &&
						isStringLiteral(property.value);
					},
				);

				if (tag !== undefined) {
					context.report({ node: tag, messageId: "manualConstruction" });
				}
			},
		};
	},
};
