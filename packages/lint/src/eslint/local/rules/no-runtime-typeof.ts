/** Disallow runtime typeof checks that narrow unparsed values instead of decoding them.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-runtime-typeof.ts
*/
/**
Return whether typeof safely probes for the existence of a possibly absent binding.
*/
import type { CreateRule, ESTree } from "../types.ts";

function isExistenceProbe(node: ESTree.UnaryExpression): boolean {
	const parent = node.parent;

	if ((parent.type !== "BinaryExpression") || !["===", "!==", "==", "!="].includes(parent.operator)) {return false;}

	const other = parent.left === node ? parent.right : parent.left;

	return other.type === "Literal" && other.value === "undefined";
}


type RuntimeFunction = ESTree.ArrowFunctionExpression | ESTree.FunctionLike;

function isRuntimeFunction(node: ESTree.Node): node is RuntimeFunction {
	return (
		node.type === "ArrowFunctionExpression" ||
		node.type === "FunctionDeclaration" ||
		node.type === "FunctionExpression"
	);
}

function isInsideTypeGuard(node: ESTree.Node): boolean {
	if (node.type === "Program") {return false;}

	let current = node.parent;

	while (current.type !== "Program") {
		if (isRuntimeFunction(current)) {
			return current.returnType?.typeAnnotation.type === "TSTypePredicate";
		}

		current = current.parent;
	}

	return false;
}

export const noRuntimeTypeofRule: CreateRule<[{ allowInTypeGuards?: boolean }]> = {
	meta: {
		defaultOptions: [{ allowInTypeGuards: false }],
		type: "problem",
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
				type: "object",
				properties: {
					allowInTypeGuards: { type: "boolean" },
				},
				additionalProperties: false,
			},
		],
	},
	create(context) {
		return {
			UnaryExpression(node) {
				const isAllowInTypeGuards = context.options[0].allowInTypeGuards === true;

				if (
					node.operator === "typeof" &&
					!isExistenceProbe(node) &&
					(!isAllowInTypeGuards || !isInsideTypeGuard(node))
				) {
					context.report({ node, messageId: "runtimeTypeof" });
				}
			},
		};
	},
};

