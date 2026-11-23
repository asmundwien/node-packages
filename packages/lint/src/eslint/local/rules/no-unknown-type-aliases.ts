/** Ban named aliases that merely conceal TypeScript's unknown top type.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-unknown-type-aliases.ts
*/
import {
	type TypeAliasEnvironment,
	createTypeAliasEnvironment,
	resolvedTypeMatches,
} from "../shared/type-alias-resolution.ts";

import type { CreateRule, ESTree } from "../types.ts";



export const noUnknownTypeAliasesRule: CreateRule = {
	meta: {
    schema: [],
		type: "problem",
		docs: {
			description:
				"Disallow type aliases whose resolved type is unknown; unknown must remain visible at an allowed boundary.",
		},
		messages: {
			unknownAlias:
				"Type alias `{{alias}}` hides `unknown`. Keep `unknown` explicit at the parsing boundary or on an allowed `cause` field; otherwise use the parsed owner type.",
		},
	},
	create(context) {
		let environment: TypeAliasEnvironment | null = null;

		const resolvesToUnknown = (type: ESTree.TypeNode): boolean => {
			return environment !== null &&
			resolvedTypeMatches(type, environment, (resolved, matches) => resolved.type === "TSUnknownKeyword" ? true : resolved.type === "TSUnionType" && resolved.types.some(matches));
		};

		return {
			Program(node) {
				environment = createTypeAliasEnvironment(
					node,
					context.sourceCode.visitorKeys,
				);
			},
			TSTypeAliasDeclaration(node) {
				if (!resolvesToUnknown(node.typeAnnotation)) {return;}

				context.report({
					node: node.id,
					messageId: "unknownAlias",
					data: { alias: node.id.name },
				});
			},
		};
	},
};

