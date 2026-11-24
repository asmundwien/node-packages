/** Keep local Effect service constructor imports out of runtime modules.
Adopted from https://github.com/dmmulroy/anti-slop/blob/13909c9e07590f5a85d93c62712259fe14a883f7/src/effect/rules/no-service-constructor-imports.ts
*/
import { AST_NODE_TYPES as nodeTypes } from "@typescript-eslint/utils";

import type { CreateRule, ESTree } from "../../types.ts";

const SERVICE_CONSTRUCTOR_NAME = /^make[A-Z]/u;
const TEST_FILE = /\.(?:test|spec)\.[cm]?[jt]sx?$/u;

function isProjectLocalImport(source: string): boolean {
	return source.startsWith("./") || source.startsWith("../");
}

function getImportedName(specifier: ESTree.ImportSpecifier): string {
	return specifier.imported.type === nodeTypes.Identifier ? specifier.imported.name : specifier.imported.value;
}

/**
Keep dependency-bearing Effect service constructors local to their owning capability modules.
*/
const noServiceConstructorImportsRule: CreateRule = {
	create(context) {
		const isTestFile = TEST_FILE.test(context.filename.replaceAll("\\", "/"));

		return {
			ImportDeclaration(node) {
				if (isTestFile || !isProjectLocalImport(node.source.value)) {return;}

				for (const specifier of node.specifiers) {
					if (specifier.type !== nodeTypes.ImportSpecifier) {continue;}

					const importedName = getImportedName(specifier);

					if (!SERVICE_CONSTRUCTOR_NAME.test(importedName)) {continue;}

					context.report({
						data: { name: importedName },
						messageId: "serviceConstructorImport",
						node: specifier,
					});
				}
			},
		};
	},
	meta: {
		docs: {
			description:
				"Disallow project-local make<CapabilityName> imports outside test and spec files.",
		},
		messages: {
			serviceConstructorImport:
				'Do not import Effect service constructor "{{name}}" into runtime code. Import the owning Layer, yield the contextual service, and allow its requirements to propagate to the composition root.',
		},
		schema: [],
		type: "problem",
	},
};

export { noServiceConstructorImportsRule };
