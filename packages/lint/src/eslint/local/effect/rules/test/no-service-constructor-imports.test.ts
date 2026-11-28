import { RuleTester } from "../../../test/rule-tester.ts";
import { noServiceConstructorImportsRule } from "../no-service-constructor-imports.ts";

const tester = new RuleTester();

tester.run(
	"local-effect/no-service-constructor-imports",
	noServiceConstructorImportsRule,
	{
		invalid: [
			{
				code: 'import { makeIssueService } from "../../src/eslint/local/effect/rules/issue-service.ts";',
				errors: [
					{
						data: { name: "makeIssueService" },
						messageId: "serviceConstructorImport",
					},
				],
				filename: "src/runtime.ts",
				output: null,
			},
			{
				code: 'import { makeIssueService as createIssueService } from "../issue-service.ts";',
				errors: [
					{
						data: { name: "makeIssueService" },
						messageId: "serviceConstructorImport",
					},
				],
				filename: "src/runtime.ts",
				output: null,
			},
		],
		valid: [
			{
				code: 'import { makeIssueService } from "../../src/eslint/local/effect/rules/issue-service.ts";',
				filename: "src/issue-service.test.ts",
			},
			{
				code: 'import { makeIssueService } from "../issue-service.ts";',
				filename: "src/issue-service.spec.tsx",
			},
			{
				code: 'import { makeExecutionMemo } from "alchemy/Runtime/ExecutionMemo";',
				filename: "src/runtime.ts",
			},
			{
				code: 'import { issueServiceLayer } from "../../src/eslint/local/effect/rules/issue-service.ts";\nWorkspaceName.make("name");',
				filename: "src/runtime.ts",
			},
			{
				code: 'import { makeissueService } from "../../src/eslint/local/effect/rules/issue-service.ts";',
				filename: "src/runtime.ts",
			},
		],
	},
);
