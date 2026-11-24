/** Require every non-const type assertion to state the invariant TypeScript cannot express.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/rules/require-safety-comment-for-type-assertion.ts
*/
import type { CreateRule, ESTree, SourceCode } from "../types.ts";

type TypeAssertion = ESTree.TSAsExpression | ESTree.TSTypeAssertion;

interface SafetyCommentOptions {
  readonly markers?: readonly string[];
}

const DEFAULT_SAFETY_MARKERS = ["SAFETY"] as const;

const commentOwnerKinds = new Set([
  "ExpressionStatement",
  "PropertyDefinition",
  "ReturnStatement",
  "ThrowStatement",
  "VariableDeclaration",
]);

function isConstAssertion(node: TypeAssertion): boolean {
  return (
    node.typeAnnotation.type === "TSTypeReference" &&
    node.typeAnnotation.typeName.type === "Identifier" &&
    node.typeAnnotation.typeName.name === "const"
  );
}

function configuredSafetyMarkers(option: SafetyCommentOptions | undefined): readonly string[] {
  const configured = option?.markers;

  if (configured === undefined) {return DEFAULT_SAFETY_MARKERS;}

  const markers: string[] = [];

  for (const marker of configured) {
    const trimmed = marker.trim();

    if (trimmed.length > 0) {markers.push(trimmed);}
  }

  return markers.length > 0 ? markers : DEFAULT_SAFETY_MARKERS;
}

function markerPattern(markers: readonly string[]): RegExp {
  const alternation = markers
    .map((marker) => marker.replaceAll(/[.*+?^${}()|[\]\\]/gu, String.raw`\$&`))
    .join("|");

  return new RegExp(
    String.raw`(?:^|[^\p{L}\p{N}_])(?:${alternation})\s*:\s*\S`,
    "u",
  );
}

function hasSafetyJustificationBefore(
  sourceCode: SourceCode,
  owner: ESTree.Node,
  assertion: TypeAssertion,
  pattern: RegExp,
): boolean {
  return sourceCode
    .getCommentsBefore(owner)
    .some(
      (comment) => comment.range[1] <= assertion.range[0] && pattern.test(comment.value),
    );
}

function hasSafetyComment(
  sourceCode: SourceCode,
  node: TypeAssertion,
  pattern: RegExp,
): boolean {
  let current: ESTree.Node = node;

  while (current.type !== "Program") {
    if (hasSafetyJustificationBefore(sourceCode, current, node, pattern)) {return true;}

    if (commentOwnerKinds.has(current.type)) {
      const exportDeclaration = current.parent;

      return (
        exportDeclaration.type === "ExportNamedDeclaration" &&
        exportDeclaration.declaration === current &&
        hasSafetyJustificationBefore(sourceCode, exportDeclaration, node, pattern)
      );
    }

    current = current.parent;
  }

  return false;
}

export const requireSafetyCommentForTypeAssertionRule: CreateRule<[SafetyCommentOptions]> = {
  meta: {
    defaultOptions: [{ markers: ["SAFETY"] }],
    type: "problem",
    docs: {
      description:
        "Require a nearby SAFETY comment for every TypeScript type assertion except const assertions.",
    },
    messages: {
      missingSafetyComment:
        "This type assertion has no `{{marker}}:` justification. State the checked invariant immediately before the assertion or its containing statement.",
    },
    schema: [
      {
        type: "object",
        properties: {
          markers: {
            type: "array",
            items: { type: "string", minLength: 1 },
            minItems: 1,
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const patterns = new Map<string, RegExp>();

    const checkAssertion = (node: TypeAssertion) => {
      if (isConstAssertion(node)) {return;}

      const markers = configuredSafetyMarkers(context.options[0]);
      const patternKey = markers.join("\0");
      const pattern = patterns.get(patternKey) ?? markerPattern(markers);
      patterns.set(patternKey, pattern);

      if (hasSafetyComment(context.sourceCode, node, pattern)) {return;}

      context.report({
        node,
        messageId: "missingSafetyComment",
        data: { marker: markers[0] ?? DEFAULT_SAFETY_MARKERS[0] },
      });
    };

    return {
      TSAsExpression: checkAssertion,
      TSTypeAssertion: checkAssertion,
    };
  },
};

