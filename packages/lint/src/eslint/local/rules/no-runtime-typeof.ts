/** Disallow runtime typeof checks except undefined comparisons and explicitly enabled type-predicate bodies.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-runtime-typeof.ts
*/
import { AST_NODE_TYPES as nodeTypes } from "@typescript-eslint/utils";

import type { CreateRule, ESTree } from "../types.ts";

/**
Return whether a typeof result is compared with the literal string "undefined".
*/
function isExistenceProbe(node: ESTree.UnaryExpression): boolean {
	const parent = node.parent;

	if ((parent.type !== nodeTypes.BinaryExpression) || !["===", "!==", "==", "!="].includes(parent.operator)) {return false;}

	const other = parent.left === node ? parent.right : parent.left;

	return other.type === nodeTypes.Literal && other.value === "undefined";
}


type RuntimeFunction = ESTree.ArrowFunctionExpression | ESTree.FunctionLike;

function isRuntimeFunction(node: ESTree.Node): node is RuntimeFunction {
	return (
		node.type === nodeTypes.ArrowFunctionExpression ||
		node.type === nodeTypes.FunctionDeclaration ||
		node.type === nodeTypes.FunctionExpression
	);
}

function isInsideTypeGuard(node: ESTree.Node): boolean {
	if (node.type === nodeTypes.Program) {return false;}

	let current = node.parent;

	while (current.type !== nodeTypes.Program) {
		if (isRuntimeFunction(current)) {
			return current.returnType?.typeAnnotation.type === nodeTypes.TSTypePredicate;
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

