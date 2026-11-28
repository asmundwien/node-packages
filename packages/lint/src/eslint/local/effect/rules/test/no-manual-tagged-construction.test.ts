import { RuleTester } from "../../../test/rule-tester.ts";
import { noManualTaggedConstructionRule } from "../no-manual-tagged-construction.ts";

const tester = new RuleTester();

tester.run(
	"local-effect/no-manual-tagged-construction",
	noManualTaggedConstructionRule,
	{
		invalid: [
			{
				code: 'const value = { _tag: "Ready", payload };',
				errors: [{ messageId: "manualConstruction" }],
			},
			{
				code: 'const value = { ["_tag"]: "Ready" };',
				errors: [{ messageId: "manualConstruction" }],
			},
			{
				code: 'const Match = { when: consume }; Match.when({ _tag: "Ready" }, handleReady);',
				errors: [{ messageId: "manualConstruction" }],
			},
			{
				code: 'import { Match } from "effect"; function handle(Match) { Match.when({ _tag: "Ready" }, handleReady); }',
				errors: [{ messageId: "manualConstruction" }],
			},
			{
				code: 'import { Match as Pattern } from "effect"; { Pattern.not({ _tag: "Pending" }); const Pattern = custom; }',
				errors: [{ messageId: "manualConstruction" }],
			},
			{
				code: 'import { Match } from "other"; Match.when({ _tag: "Ready" }, handleReady);',
				errors: [{ messageId: "manualConstruction" }],
			},
			{
				code: 'Match.when({ _tag: "Ready" }, handleReady);',
				errors: [{ messageId: "manualConstruction" }],
			},
			{
				code: 'import type { Match } from "effect"; Match.not({ _tag: "Pending" });',
				errors: [{ messageId: "manualConstruction" }],
			},
			{
				code: 'import { type Match } from "effect"; Match.not({ _tag: "Pending" });',
				errors: [{ messageId: "manualConstruction" }],
			},
		],
		valid: [
			'import { Match } from "effect"; Match.when({ _tag: "Ready" }, handleReady);',
			'import { Match } from "effect"; Match.not({ "_tag": "Pending" });',
			'import { Match as Pattern } from "effect"; Pattern.when({ _tag: "Ready" }, handleReady);',
			'import { Match as Pattern } from "effect"; Pattern.not({ _tag: "Pending" });',
			'import * as Pattern from "effect/Match"; Pattern.when({ _tag: "Ready" }, handleReady);',
			"Ready.make({ value });",
			"new NotFound({ id });",
			"({ _tag: tag, value });",
		],
	},
);
