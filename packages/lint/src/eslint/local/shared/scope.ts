import type { ESTree, SourceCode, Variable } from "../types.ts";

type Scope = ReturnType<SourceCode["getScope"]>;

/**
Resolve an identifier to its binding by walking lexical scopes upward.
*/
export function resolveVariable(
	sourceCode: SourceCode,
	identifier: ESTree.Identifier,
): Variable | null {
	let scope: Scope | null | undefined = sourceCode.getScope(identifier);

	while (scope != null) {
		const variable = scope.set.get(identifier.name);

		if (variable !== undefined) {return variable;}

		scope = scope.upper;
	}

	return null;
}
