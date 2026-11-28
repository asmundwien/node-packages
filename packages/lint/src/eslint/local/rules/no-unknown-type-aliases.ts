/** Ban named aliases that merely conceal TypeScript's unknown top type.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-unknown-type-aliases.ts
*/
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import {
	type TypeAliasEnvironment,
	createTypeAliasEnvironment,
	doesResolvedTypeMatch,
} from "../shared/type-alias-resolution.ts";

import type { CreateRule } from "../types.ts";



export const noUnknownTypeAliasesRule: CreateRule = {
  create(context) {
    let environment: TypeAliasEnvironment | null = null;
    
    
    		return {
    			Program(node) {
    				environment = createTypeAliasEnvironment(
    					node,
    					context.sourceCode.visitorKeys,
    				);
    			},
    			TSTypeAliasDeclaration(node) {
    				if (environment === null || !doesResolvedTypeMatch(
    					node.typeAnnotation,
    					environment,
    					(resolved, isMatchingType) => resolved.type === AST_NODE_TYPES.TSUnknownKeyword || resolved.type === AST_NODE_TYPES.TSUnionType && resolved.types.some(isMatchingType),
    				)) {return;}
    
    				context.report({
            data: { alias: node.id.name },
            messageId: "unknownAlias",
            node: node.id,
          });
    			},
    		};
  },
  meta: {
      docs: {
      			description:
      				"Disallow type aliases whose resolved type is unknown; unknown must remain visible at an allowed boundary.",
      		},
      messages: {
      			unknownAlias:
      				"Type alias `{{alias}}` hides `unknown`. Keep `unknown` explicit at the parsing boundary or on an allowed `cause` field; otherwise use the parsed owner type.",
      		},
      schema: [],
      type: "problem",
    },
};

