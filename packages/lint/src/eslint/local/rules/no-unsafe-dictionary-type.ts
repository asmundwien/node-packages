/** Disallow object-dictionary contracts whose direct value type is an unsafe escape hatch.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-unsafe-dictionary-type.ts
*/

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import {
	type TypeEnvironment,
	classifyUnsafeDictionary,
	classifyUnsafeDictionaryValue,
	createTypeEnvironment,
} from "../shared/dictionary-types.ts";
import { visibleTypeAlias } from "../shared/type-alias-resolution.ts";

import type { CreateRule, ESTree } from "../types.ts";


const typeNodeKinds: ReadonlySet<string> = new Set([
	"JSDocNonNullableType",
	"JSDocNullableType",
	"JSDocUnknownType",
	"TSAnyKeyword",
	"TSArrayType",
	"TSBigIntKeyword",
	"TSBooleanKeyword",
	"TSConditionalType",
	"TSConstructorType",
	"TSFunctionType",
	"TSImportType",
	"TSIndexedAccessType",
	"TSInferType",
	"TSIntersectionType",
	"TSIntrinsicKeyword",
	"TSLiteralType",
	"TSMappedType",
	"TSNamedTupleMember",
	"TSNeverKeyword",
	"TSNullKeyword",
	"TSNumberKeyword",
	"TSObjectKeyword",
	"TSStringKeyword",
	"TSSymbolKeyword",
	"TSTemplateLiteralType",
	"TSThisType",
	"TSTupleType",
	"TSTypeLiteral",
	"TSTypeOperator",
	"TSTypePredicate",
	"TSTypeQuery",
	"TSTypeReference",
	"TSUndefinedKeyword",
	"TSUnionType",
	"TSUnknownKeyword",
	"TSVoidKeyword",
]);

function isTypeNode(node: ESTree.Node): node is ESTree.TypeNode {
	return typeNodeKinds.has(node.type);
}

function typeReferenceName(type: ESTree.TSTypeReference): string | null {
	return type.typeName.type === AST_NODE_TYPES.Identifier ? type.typeName.name : null;
}

function isInsideTypeAliasDeclaration(node: ESTree.TypeNode): boolean {
	let current = node.parent;

	while (current.type !== AST_NODE_TYPES.Program) {
		if (current.type === AST_NODE_TYPES.TSTypeAliasDeclaration) {return true;}

		current = current.parent;
	}

	return false;
}

function isPlainAliasConsumerUse(node: ESTree.TypeNode, environment: TypeEnvironment): boolean {
	if (node.type !== AST_NODE_TYPES.TSTypeReference || (node.typeArguments?.params.length ?? 0) > 0) {return false;}

	const name = typeReferenceName(node);

	const alias = name === null ? null : visibleTypeAlias(name, node, environment.typeAliases);

	return alias !== null &&
		!isInsideTypeAliasDeclaration(node) &&
		((alias.typeParameters?.params.length ?? 0) === 0 ||
			classifyUnsafeDictionary(alias.typeAnnotation, environment) !== null);
}

function isInsideTypeParameterConstraint(node: ESTree.TypeNode): boolean {
	let child: ESTree.Node = node;
	let parent = node.parent;

	while (parent.type !== AST_NODE_TYPES.Program) {
		if (parent.type === AST_NODE_TYPES.TSTypeParameter && parent.constraint === child) {return true;}

		child = parent;
		parent = child.parent;
	}

	return false;
}

function shouldReportType(node: ESTree.TypeNode, environment: TypeEnvironment): boolean {
	if (isInsideTypeParameterConstraint(node) || isPlainAliasConsumerUse(node, environment)) {return false;}

	let current = node.parent;

	while (current.type !== AST_NODE_TYPES.Program) {
		if (isTypeNode(current) && classifyUnsafeDictionary(current, environment) !== null)
			{return false;}

		current = current.parent;
	}

	return true;
}

export const noUnsafeDictionaryTypeRule: CreateRule = {
  create(context) {
    let environment: TypeEnvironment | null = null;
    
    		function reportIfUnsafe(node: ESTree.TypeNode) {
    			if (environment === null) {return;}
    
    			const unsafe = classifyUnsafeDictionary(node, environment);
    
    			if (unsafe === null || !shouldReportType(node, environment)) {return;}
    
    			context.report({ data: { value: unsafe.unsafeValue }, messageId: "unsafeDictionary", node });
    		}
    
    		return {
        			Program(node) {
        				environment = createTypeEnvironment(
        					node,
        					context.sourceCode.visitorKeys,
        				);
        			},
        			TSIndexSignature(node) {
        				if (
        					environment === null ||
        					node.typeAnnotation === undefined ||
        					node.parent.type === AST_NODE_TYPES.TSTypeLiteral
        				)
        					{return;}
        
        				const unsafe = classifyUnsafeDictionaryValue(
        					node.typeAnnotation.typeAnnotation,
        					environment,
        				);
        
        				if (unsafe !== null) {
        					context.report({ data: { value: unsafe.unsafeValue }, messageId: "unsafeDictionary", node });
        				}
        			},
        			TSIntersectionType: reportIfUnsafe,
        			TSMappedType: reportIfUnsafe,
        			TSTypeLiteral: reportIfUnsafe,
        			TSTypeReference: reportIfUnsafe,
        		};
  },
  meta: {
      docs: {
      			description:
      				"Disallow object-dictionary contracts whose direct value type is unknown, any, object, {}, or a union/alias containing one of those escape hatches.",
      		},
      messages: {
      			unsafeDictionary:
      				"This dictionary's {{value}} value type gives callers no concrete value contract. Use an owner/schema-derived value type; parse external payloads before insertion.",
      		},
      schema: [],
      type: "problem",
    },
};

