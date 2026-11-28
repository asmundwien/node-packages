import { RuleTester } from "../../test/rule-tester.ts";
import { noWidenThenAssertRule } from "../no-widen-then-assert.ts";


const tester = new RuleTester();
const error = { messageId: "widenThenAssert" };

tester.run("local/no-widen-then-assert", noWidenThenAssertRule, {
  invalid: [
    { code: "type Known<T> = T; declare const source: Known<string>; const widened: unknown = source; const parsed = widened as string;", errors: [error] },
    { code: "type Input = unknown; function parse() { type Input = string; declare const source: Input; const widened: unknown = source; return widened as string; }", errors: [error] },
  		{
  			code: "function parse(source: string) { const alias = source; const widened: unknown = alias; return widened as string; }",
  			errors: [error],
  		},
  		{
  			code: "const widened: unknown = 'first', parsed = widened as string;",
  			errors: [error],
  		},
  		{
  			code: "const source = { id: 'first' }; const alias = source; const widened: unknown = alias; const parsed = widened as { readonly id: string };",
  			errors: [error],
  		},
  		{
  			code: "const widened: object = { id: 'first' }; const parsed = widened as { readonly id: string };",
  			errors: [error],
  		},
  		{
  			code: "type Model = { readonly id: string }; declare const source: Model; const widened: object = source; const parsed = widened as Model;",
  			errors: [error],
  		},
  		{
  			code: "const widened: Record<string, unknown> = { id: 'first' }; const parsed = widened as Record<string, string>;",
  			errors: [error],
  		},
  		{
  			code: "const widened: Readonly<Record<PropertyKey, any>> = { id: 'first' }; const parsed = widened as Readonly<Record<string, string>>;",
  			errors: [error],
  		},
  		{
  			code: "const widened: { [key: string]: unknown } = { id: 'first' }; const parsed = widened as { readonly id: string };",
  			errors: [error],
  		},
  		{
  			code: "const source = { id: 'second' }; const widened: unknown = source; const parsed = widened as { readonly id: string };",
  			errors: [error],
  		},
  	],
  valid: [
    "declare const input: unknown; const { value } = { value: input }; const widened: unknown = value; const parsed = widened as string;",
    "declare const input: unknown; const [value] = [input]; const widened: unknown = value; const parsed = widened as string;",
    "type Input = unknown; declare const source: Input; const widened: unknown = source; const parsed = widened as string;",
    "type Input<T> = T; declare const source: Input<object>; const widened: unknown = source; const parsed = widened as { id: string };",
    "type Input = Record<string, unknown>; declare const source: Input; const widened: unknown = source; const parsed = widened as { id: string };",
    "type Input = { [key: string]: unknown }; declare const source: Input; const widened: unknown = source; const parsed = widened as { id: string };",
    "type Input = Other; type Other = Input; declare const source: Input; const widened: unknown = source; const parsed = widened as string;",
    "type Input = string; function parse() { type Input = unknown; declare const source: Input; const widened: unknown = source; return widened as string; }",
    "declare const input: unknown; type Input = unknown; const source = input as Input; const widened: unknown = source; const parsed = widened as string;",
    "const source = 'known'; source = readInput(); const alias = source; const widened: unknown = alias; const parsed = widened as string;",
  		"const source = { id: 'first' }; const widened: unknown = source;",
  		"declare const input: unknown; const parsed = input as { readonly id: string };",
  		"const source = { id: 'outer' }; function parse() { const widened: unknown = source; return widened as { readonly id: string }; }",
  		"const source = { id: 'outer' }; const widened: unknown = source; function parse() { return widened as { readonly id: string }; }",
  		"const parsed = widened as string; const widened: unknown = 'later';",
  		"const widened: unknown = widened as string;",
  		"const first = second; const second = first; const widened: unknown = first; const parsed = widened as string;",
  		"let source = 'mutable'; const widened: unknown = source; const parsed = widened as string;",
  		"const widened: unknown = 'outer'; function parse(widened: unknown) { return widened as string; }",
  		"const widened: object = { id: 'first' }; const parsed = widened as string;",
  		"const widened: Record<string, unknown> = { id: 'first' }; const parsed = widened as Record<string, unknown>;",
  		"const widened: Record<string, unknown> = { id: 'first' }; const parsed = widened as Record<'id', unknown>;",
  		"const widened: { [key: string]: unknown } = { id: 'first' }; const parsed = widened as { [key: string]: string };",
  	],
});
