/** Disallow runtime typeof checks except undefined comparisons and explicitly enabled type-predicate bodies.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-runtime-typeof.ts
*/
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import type { CreateRule, ESTree } from "../types.ts";

/**
Return whether a typeof result is compared with the literal string "undefined".
*/
function isExistenceProbe(node: ESTree.UnaryExpression): boolean {
	const parent = node.parent;

	if ((parent.type !== AST_NODE_TYPES.BinaryExpression) || !["===", "!==", "==", "!="].includes(parent.operator)) {return false;}

	const other = parent.left === node ? parent.right : parent.left;

	return other.type === AST_NODE_TYPES.Literal && other.value === "undefined";
}


type RuntimeFunction = ESTree.ArrowFunctionExpression | ESTree.FunctionLike;

function isRuntimeFunction(node: ESTree.Node): node is RuntimeFunction {
	return (
		node.type === AST_NODE_TYPES.ArrowFunctionExpression ||
		node.type === AST_NODE_TYPES.FunctionDeclaration ||
		node.type === AST_NODE_TYPES.FunctionExpression
	);
}

function isInsideTypeGuard(node: ESTree.Node): boolean {
	if (node.type === AST_NODE_TYPES.Program) {return false;}

	let current = node.parent;

	while (current.type !== AST_NODE_TYPES.Program) {
		if (isRuntimeFunction(current)) {
			return current.returnType?.typeAnnotation.type === AST_NODE_TYPES.TSTypePredicate;
		}

		current = current.parent;
	}

	return false;
}

export const noRuntimeTypeofRule: CreateRule<[{ allowInTypeGuards?: boolean }]> = {
	create(context) {
		const isTypeGuardAllowed = context.options[0].allowInTypeGuards === true;

		return {
			UnaryExpression(node) {
				if (
					node.operator === "typeof" &&
					!isExistenceProbe(node) &&
					(!isTypeGuardAllowed || !isInsideTypeGuard(node))
				) {
					context.report({ messageId: "runtimeTypeof", node });
				}
			},
		};
	},
	meta: {
		defaultOptions: [{ allowInTypeGuards: false }],
		docs: {
			description:
				"Disallow runtime typeof checks; external values must be decoded into meaningful types at their I/O boundary.",
		},
		messages: {
			runtimeTypeof:
				"A `typeof` check narrows a representation without establishing its contract. Parse input at its I/O boundary, then branch on the domain value.",
		},
		schema: [
			{
				additionalProperties: false,
				properties: {
					allowInTypeGuards: { type: "boolean" },
				},
				type: "object",
			},
		],
		type: "problem",
	},
};

