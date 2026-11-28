import { RuleTester } from "../../../test/rule-tester.ts";
import { preferEffectMatchRule } from "../prefer-effect-match.ts";

const tester = new RuleTester();

tester.run("local-effect/prefer-effect-match", preferEffectMatchRule, {
	invalid: [
		{
			code: 'kind === "a" ? first : kind === "b" ? second : fallback;',
			errors: [{ messageId: "preferMatch" }],
		},
		{
			code: '`a` !== kind ? first : `b` === kind ? second : fallback;',
			errors: [{ messageId: "preferMatch" }],
		},
		{
			code: 'condition ? (kind === "a" ? first : kind === "b" ? second : fallback) : other;',
			errors: [{ messageId: "preferMatch" }],
		},
		{
			code: 'condition ? other : kind === "a" ? first : kind === "b" ? second : fallback;',
			errors: [{ messageId: "preferMatch" }],
		},
		{
			code: '(kind === "a" ? first : kind === "b" ? second : fallback) ? yes : no;',
			errors: [{ messageId: "preferMatch" }],
		},
		{
			code: 'kind === "a" ? (kind === "b" ? first : kind === "c" ? second : fallback) : other;',
			errors: [{ messageId: "preferMatch" }],
		},
		{
			code: 'other === "x" ? unrelated : kind === "a" ? first : kind === "b" ? second : fallback;',
			errors: [{ messageId: "preferMatch" }],
		},
		{
			code: 'kind === "a" ? first : kind === "b" ? second : kind === "c" ? third : fallback;',
			errors: [{ messageId: "preferMatch" }],
		},
		{
			code: 'kind === "a" ? first : kind === "b" ? second : condition ? third : fourth;',
			errors: [{ messageId: "preferMatch" }],
		},
		{
			code: 'kind === "a" ? first : kind === "b" ? second : other === "c" ? third : other === "d" ? fourth : fallback;',
			errors: [{ messageId: "preferMatch" }, { messageId: "preferMatch" }],
		},
	],
	valid: [
		'kind === "a" ? first : fallback;',
		'kind === "a" ? first : other === "b" ? second : fallback;',
		"condition ? first : otherCondition ? second : fallback;",
	],
});
