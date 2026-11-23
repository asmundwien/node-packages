import { noManualTaggedConstructionRule } from "../no-manual-tagged-construction.ts";
import { RuleTester } from "../../../test/rule-tester.ts";


const tester = new RuleTester();

tester.run(
	"local-effect/no-manual-tagged-construction",
	noManualTaggedConstructionRule,
	{
		valid: [
			'Match.when({ _tag: "Ready" }, handleReady);',
			'Match.not({ "_tag": "Pending" });',
			"Ready.make({ value });",
			"new NotFound({ id });",
			"({ _tag: tag, value });",
		],
		invalid: [
			{
				code: 'const value = { _tag: "Ready", payload };',
				errors: [{ messageId: "manualConstruction" }],
			},
			{
				code: 'const value = { ["_tag"]: "Ready" };',
				errors: [{ messageId: "manualConstruction" }],
			},
		],
	},
);
