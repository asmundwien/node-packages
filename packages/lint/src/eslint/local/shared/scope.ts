import { AST_NODE_TYPES, TSESLint } from "@typescript-eslint/utils";

import type { ESTree, SourceCode, Variable } from "../types.ts";

/**
Resolve a runtime identifier to its value binding, skipping type-only declarations.
*/
function resolveVariable(
	sourceCode: SourceCode,
	identifier: ESTree.Identifier,
): Variable | null {
	type Scope = ReturnType<SourceCode["getScope"]>;

	let scope: Scope | null = sourceCode.getScope(identifier);

	while (scope !== null) {
		const variable = scope.set.get(identifier.name);

		if (variable?.isValueVariable === true && (
			variable.defs.length === 0 || variable.defs.some((definition) => {
				return definition.type !== TSESLint.Scope.DefinitionType.ImportBinding || (
					definition.parent.importKind !== "type" &&
					(definition.node.type !== AST_NODE_TYPES.ImportSpecifier || definition.node.importKind !== "type")
				);
			})
		)) {return variable;}

		scope = scope.upper;
	}

	return null;
}

export { resolveVariable };
