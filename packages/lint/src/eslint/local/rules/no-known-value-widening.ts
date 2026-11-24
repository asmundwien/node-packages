/** Detect sound syntactic cases where a known value is explicitly widened and loses evidence.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/no-known-value-widening.ts
*/

import { AST_NODE_TYPES as nodeTypes, TSESLint as tsEslint } from "@typescript-eslint/utils";

import {
	type TypeEnvironment,
	type WideningTarget,
	classifyUnsafeDictionaryValue,
	classifyWideningTarget,
	createTypeEnvironment,
	isKnownEvidenceExpression,
} from "../shared/dictionary-types.ts";
import {
	functionParameterBindingName,
	functionParameterTypeAnnotation,
	hasUnknownType,
} from "../shared/function-parameters.ts";
import { resolveVariable } from "../shared/scope.ts";

import type { CreateRule, ESTree, SourceCode, Variable } from "../types.ts";


type FunctionExpression = ESTree.ArrowFunctionExpression | ESTree.FunctionLike;

function unwrapExpression(expression: ESTree.Expression): ESTree.Expression {
	let current = expression;

	while (
		current.type === nodeTypes.TSAsExpression ||
		current.type === nodeTypes.TSSatisfiesExpression ||
		current.type === nodeTypes.TSTypeAssertion ||
		current.type === nodeTypes.TSNonNullExpression
	) {
		current = current.expression;
	}

	return current;
}

function variableDeclarator(variable: Variable): ESTree.VariableDeclarator | null {
	if (variable.defs.length !== 1) {return null;}

	const [definition] = variable.defs;

	return definition?.type === tsEslint.Scope.DefinitionType.Variable
		? definition.node
		: null;
}

function isStableConstVariable(variable: Variable, declarator: ESTree.VariableDeclarator): boolean {
	return (
		declarator.parent.kind === "const" &&
		variable.references.every((reference) => reference.init === true || !reference.isWrite())
	);
}

function hasKnownEvidence(
	sourceCode: SourceCode,
	expression: ESTree.Expression,
): boolean {
	const visitedVariables = new Set<Variable>();
	let current = expression;

	for (;;) {
		if (isKnownEvidenceExpression(current)) {return true;}

		const unwrapped = unwrapExpression(current);

		if (unwrapped.type !== nodeTypes.Identifier) {return false;}

		const variable = resolveVariable(sourceCode, unwrapped);

		if (variable === null || visitedVariables.has(variable)) {return false;}

		const declarator = variableDeclarator(variable);

		if (
			declarator === null ||
			declarator.init === null ||
			!isStableConstVariable(variable, declarator)
		) {
			return false;
		}

		visitedVariables.add(variable);
		current = declarator.init;
	}
}

function isFunctionExpression(node: ESTree.Node): node is FunctionExpression {
	return (
		node.type === nodeTypes.ArrowFunctionExpression ||
		node.type === nodeTypes.FunctionDeclaration ||
		node.type === nodeTypes.FunctionExpression ||
		node.type === nodeTypes.TSDeclareFunction ||
		node.type === nodeTypes.TSEmptyBodyFunctionExpression
	);
}

function localFunctionForCall(
	sourceCode: SourceCode,
	callee: ESTree.Expression,
): FunctionExpression | null {
	const unwrapped = unwrapExpression(callee);

	if (isFunctionExpression(unwrapped)) {return unwrapped;}

	if (unwrapped.type !== nodeTypes.Identifier) {return null;}

	const variable = resolveVariable(sourceCode, unwrapped);

	if (variable === null || variable.defs.length !== 1) {return null;}

	const [definition] = variable.defs;

	if (definition === undefined) {return null;}

	if (definition.type === tsEslint.Scope.DefinitionType.FunctionName && isFunctionExpression(definition.node)) {
		return definition.node;
	}

	if (definition.type !== tsEslint.Scope.DefinitionType.Variable) {
		return null;
	}

	const initializer = definition.node.init;

	if (initializer === null) {return null;}

	const unwrappedInitializer = unwrapExpression(initializer);

	return isFunctionExpression(unwrappedInitializer) ? unwrappedInitializer : null;
}

function variableTypeAnnotation(
	sourceCode: SourceCode,
	variable: Variable,
): ESTree.TSTypeAnnotation | null {
	if (variable.defs.length !== 1) {return null;}

	const [definition] = variable.defs;

	if (definition === undefined) {return null;}

	if (
		definition.type === tsEslint.Scope.DefinitionType.Variable &&
		definition.node.id.type === nodeTypes.Identifier
	) {
		return definition.node.id.typeAnnotation ?? null;
	}

	if (definition.type !== tsEslint.Scope.DefinitionType.Parameter || !isFunctionExpression(definition.node)) {
		return null;
	}

	const parameter = definition.node.params.find(
		(candidate) =>
			functionParameterBindingName(candidate, sourceCode) === variable.name,
	);

	return parameter === undefined ? null : (functionParameterTypeAnnotation(parameter) ?? null);
}

function hasInformativeType(
	type: ESTree.TypeNode,
	environment: TypeEnvironment,
): boolean {
	return classifyUnsafeDictionaryValue(type, environment) === null;
}

function hasKnownCallArgumentEvidence(
	sourceCode: SourceCode,
	expression: ESTree.Expression,
	environment: TypeEnvironment,
): boolean {
	const visitedVariables = new Set<Variable>();
	let current = expression;

	for (;;) {
		if (current.type === nodeTypes.TSNonNullExpression || current.type === nodeTypes.TSSatisfiesExpression) {
			current = current.expression;
			continue;
		}

		if (current.type === nodeTypes.TSAsExpression || current.type === nodeTypes.TSTypeAssertion) {
			return hasInformativeType(current.typeAnnotation, environment);
		}

		if (current.type === nodeTypes.CallExpression) {
			const owner = localFunctionForCall(sourceCode, current.callee);
			const returnType = owner?.returnType?.typeAnnotation;

			return returnType !== undefined && hasInformativeType(returnType, environment);
		}

		if (current.type !== nodeTypes.Identifier) {return isKnownEvidenceExpression(current);}

		const variable = resolveVariable(sourceCode, current);

		if (variable === null || visitedVariables.has(variable)) {return false;}

		const annotation = variableTypeAnnotation(sourceCode, variable);

		if (annotation !== null) {
			return hasInformativeType(annotation.typeAnnotation, environment);
		}

		const declarator = variableDeclarator(variable);

		if (
			declarator === null ||
			declarator.init === null ||
			!isStableConstVariable(variable, declarator)
		) {
			return false;
		}

		visitedVariables.add(variable);
		current = declarator.init;
	}
}

function typePredicateSubjectIndex(
	sourceCode: SourceCode,
	owner: FunctionExpression,
): number | null {
	const predicate = owner.returnType?.typeAnnotation;

	if (predicate?.type !== nodeTypes.TSTypePredicate || predicate.parameterName.type !== nodeTypes.Identifier) {
		return null;
	}

	const predicateParameterName = predicate.parameterName.name;

	const index = owner.params.findIndex(
		(parameter) =>
			functionParameterBindingName(parameter, sourceCode) === predicateParameterName,
	);

	return index === -1 ? null : index;
}

function annotationTarget(
	annotation: ESTree.TSTypeAnnotation | null | undefined,
	environment: TypeEnvironment,
): WideningTarget | null {
	return annotation === null || annotation === undefined
		? null
		: classifyWideningTarget(annotation.typeAnnotation, environment);
}

function enclosingFunction(node: ESTree.Node): FunctionExpression | null {
	if (node.type === nodeTypes.Program) {return null;}

	let current = node.parent;

	while (current.type !== nodeTypes.Program) {
		if (
			current.type === nodeTypes.ArrowFunctionExpression ||
			current.type === nodeTypes.FunctionDeclaration ||
			current.type === nodeTypes.FunctionExpression
		) {
			return current;
		}

		current = current.parent;
	}

	return null;
}

function sourceKeyName(sourceCode: SourceCode, key: ESTree.PropertyName): string {
	if (key.type === nodeTypes.Identifier || key.type === nodeTypes.PrivateIdentifier) {return key.name;}

	if (key.type === nodeTypes.Literal) {return String(key.value);}

	return sourceCode.getText(key);
}

function functionName(sourceCode: SourceCode, owner: FunctionExpression | null): string {
	if (owner === null) {return "anonymous function";}

	if ("id" in owner && owner.id != null) {return owner.id.name;}

	const parent = owner.parent;

	if (parent.type === nodeTypes.VariableDeclarator && parent.id.type === nodeTypes.Identifier)
		{return parent.id.name;}

	if (parent.type === nodeTypes.MethodDefinition) {return sourceKeyName(sourceCode, parent.key);}

	return "anonymous function";
}

function isEmptyObjectExpression(expression: ESTree.Expression): boolean {
	const unwrapped = unwrapExpression(expression);

	return unwrapped.type === nodeTypes.ObjectExpression && unwrapped.properties.length === 0;
}

function isDictionaryAccumulatorTarget(destination: WideningTarget): boolean {
	return destination.kind === "open dictionary" || destination.kind === "generic container";
}

function hasParentAssertion(node: ESTree.TSAsExpression | ESTree.TSTypeAssertion): boolean {
	return node.parent.type === nodeTypes.TSAsExpression || node.parent.type === nodeTypes.TSTypeAssertion;
}

export const noKnownValueWideningRule: CreateRule = {
  create(context) {
    let environment: TypeEnvironment | null = null;
    
    		function reportFlow(
    			expression: ESTree.Expression,
    			destination: WideningTarget | null,
    			subject: string,
    		) {
    			if (destination === null) {return;}
    
    			if (
    				isDictionaryAccumulatorTarget(destination) &&
    				isEmptyObjectExpression(expression)
    			) {
    				return;
    			}
    
    			if (!hasKnownEvidence(context.sourceCode, expression)) {return;}
    
    			context.report({
            data: { subject, target: destination.kind },
            messageId: "widening",
            node: expression,
          });
    		}
    
    		function targetFromAnnotation(annotation: ESTree.TSTypeAnnotation | null | undefined) {
    			return environment === null ? null : annotationTarget(annotation, environment);
    		}
    
    		return {
        			AccessorProperty(node) {
        				if (node.value === null) {return;}
        
        				reportFlow(
        					node.value,
        					targetFromAnnotation(node.typeAnnotation),
        					`property \`${sourceKeyName(context.sourceCode, node.key)}\``,
        				);
        			},
        			ArrowFunctionExpression(node) {
        				if (node.body.type === nodeTypes.BlockStatement) {return;}
        
        				reportFlow(
        					node.body,
        					targetFromAnnotation(node.returnType),
        					`return value of \`${functionName(context.sourceCode, node)}\``,
        				);
        			},
        			AssignmentExpression(node) {
        				if (node.operator !== "=" || node.left.type !== nodeTypes.Identifier) {return;}
        
        				const variable = resolveVariable(context.sourceCode, node.left);
        
        				if (variable === null) {return;}
        
        				const declarator = variableDeclarator(variable);
        
        				if (declarator === null || declarator.id.type !== nodeTypes.Identifier) {return;}
        
        				reportFlow(
        					node.right,
        					targetFromAnnotation(declarator.id.typeAnnotation),
        					`binding \`${declarator.id.name}\``,
        				);
        			},
        			CallExpression(node) {
        				if (environment === null) {return;}
        
        				const owner = localFunctionForCall(context.sourceCode, node.callee);
        
        				if (owner === null) {return;}
        
        				const parameterIndex = typePredicateSubjectIndex(context.sourceCode, owner);
        
        				if (parameterIndex === null) {return;}
        
        				const parameter = owner.params[parameterIndex];
        				const argument = node.arguments[parameterIndex];
        
        				if (parameter === undefined || argument === undefined || argument.type === nodeTypes.SpreadElement) {
        					return;
        				}
        
        				const parameterAnnotation = functionParameterTypeAnnotation(parameter);
        
        				if (parameterAnnotation === null ||
        					parameterAnnotation === undefined ||
        					!hasUnknownType(parameterAnnotation.typeAnnotation) || !hasKnownCallArgumentEvidence(
        						context.sourceCode,
        						argument,
        						environment,
        					)) {
        					return;
        				}
        
        				context.report({
                data: {
                						subject: `argument for parameter \`${functionParameterBindingName(parameter, context.sourceCode)}\` of \`${functionName(context.sourceCode, owner)}\``,
                						target: "unknown",
                					},
                messageId: "widening",
                node: argument,
              });
        			},
        			Program(node) {
        				environment = createTypeEnvironment(
        					node,
        					context.sourceCode.visitorKeys,
        				);
        			},
        			PropertyDefinition(node) {
        				if (node.value === null) {return;}
        
        				reportFlow(
        					node.value,
        					targetFromAnnotation(node.typeAnnotation),
        					`property \`${sourceKeyName(context.sourceCode, node.key)}\``,
        				);
        			},
        			ReturnStatement(node) {
        				if (node.argument === null) {return;}
        
        				const owner = enclosingFunction(node);
        				reportFlow(
        					node.argument,
        					targetFromAnnotation(owner?.returnType),
        					`return value of \`${functionName(context.sourceCode, owner)}\``,
        				);
        			},
        			TSAsExpression(node) {
        				if (environment === null || hasParentAssertion(node)) {return;}
        
        				reportFlow(
        					node.expression,
        					classifyWideningTarget(node.typeAnnotation, environment),
        					"assertion",
        				);
        			},
        			TSTypeAssertion(node) {
        				if (environment === null || hasParentAssertion(node)) {return;}
        
        				reportFlow(
        					node.expression,
        					classifyWideningTarget(node.typeAnnotation, environment),
        					"assertion",
        				);
        			},
        			VariableDeclarator(node) {
        				if (node.init === null || node.id.type !== nodeTypes.Identifier) {return;}
        
        				reportFlow(
        					node.init,
        					targetFromAnnotation(node.id.typeAnnotation),
        					`binding \`${node.id.name}\``,
        				);
        			},
        		};
  },
  meta: {
      docs: {
      			description:
      				"Disallow syntactically established values from flowing into explicitly broad or anonymous target types that discard useful evidence.",
      		},
      messages: {
      			widening:
      				"The explicit {{target}} type on {{subject}} discards known type evidence. Keep inference, validate with `satisfies`, or use a named owner contract.",
      		},
      schema: [],
      type: "problem",
    },
};

