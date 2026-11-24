import { RuleTester } from "../../../test/rule-tester.ts";
import { noManualTagComparisonRule } from "../no-manual-tag-comparison.ts";

const tester = new RuleTester();

tester.run("local-effect/no-manual-tag-comparison", noManualTagComparisonRule, {
	invalid: [
		{
			code: 'value._tag === "Ready";',
			errors: [{ messageId: "manualComparison" }],
		},
		{
			code: '"Ready" !== value["_tag"];',
			errors: [{ messageId: "manualComparison" }],
		},
		{
			code: "switch (value._tag) { case \"Ready\": handleReady(value); }",
			errors: [{ messageId: "manualSwitch" }],
		},
		{
			code: 'Effect.catchAll((error) => (() => error._tag === "NotFound")());',
			errors: [{ messageId: "manualComparison" }],
		},
		{
			code: 'Effect.catchTag("Wrapper", (error) => error.reason._tag === "Timeout" ? retry : fail);',
			errors: [{ messageId: "manualComparison" }],
		},
	],
	valid: [
		"Predicate.isTagged(\"Ready\")(value);",
		'import { Match } from "effect"; Match.value(value).pipe(Match.tag("Ready", handleReady));',
		'if (value.status === "Ready") handleReady(value);',
		'Effect.catch((error) => error._tag === "NotFound" ? recover : fail);',
	],
});
