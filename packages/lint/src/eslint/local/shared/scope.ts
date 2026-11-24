import type { ESTree, SourceCode, Variable } from "../types.ts";

/**
Resolve an identifier to its binding by walking lexical scopes upward.
*/
export function resolveVariable(
	sourceCode: SourceCode,
	identifier: ESTree.Identifier,
): Variable | null {
	type Scope = ReturnType<SourceCode["getScope"]>;

	let scope: Scope | null = sourceCode.getScope(identifier);

	while (scope != null) {
		const variable = scope.set.get(identifier.name);

		if (variable !== undefined) {return variable;}

		scope = scope.upper;
	}

	return null;
}
