import { RuleTester } from "../../test/rule-tester.ts";
import { noKnownValueWideningRule } from "../no-known-value-widening.ts";


const tester = new RuleTester();

const error = { messageId: "widening" };

const prelude = "type Command = () => void; const startCommand = () => {};";

tester.run("local/no-known-value-widening", noKnownValueWideningRule, {
  invalid: [
    { code: "const source = { value: 'known' }; const alias = source; const widened: unknown = alias;", errors: [error] },
    { code: "function isString(value: unknown): value is string { return true; } type Known<T> = T; declare const source: Known<string>; isString(source);", errors: [error] },
    { code: "function isString(value: unknown): value is string { return true; } const read = (): string => 'known'; isString(read());", errors: [error] },
    { code: "function isString(value: unknown): value is string { return true; } type Value = unknown; function check() { type Value = string; declare const source: Value; isString(source); }", errors: [error] },
    { code: "const source = { start: () => {} }; const alias = source; const commands: Record<string, () => void> = alias;", errors: [error] },
    { code: "const source = {}; const alias = source; const widened: unknown = alias;", errors: [error] },
    { code: "function isString(value: unknown): value is string { return true; } const source = 'known'; const first = source; const alias = first; isString(alias);", errors: [error] },
  		{ code: "const value: unknown = {};", errors: [error] },
  		{ code: "const value: object = {};", errors: [error] },
  		{ code: "let value: unknown; value = {};", errors: [error] },
  		{ code: "function create(): unknown { return {}; }", errors: [error] },
  		{
  			code: `${prelude} const commands: Record<string, Command> = { start: startCommand };`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} const commands: { [key: string]: Command } = { start: startCommand };`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} const commands: { [K in string]: Command } = { start: startCommand };`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} const commands: { start: Command } = { start: startCommand };`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} const commands = { start: startCommand } as Record<string, Command>;`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} const commands = ({ start: startCommand } as Record<string, Command>) as object;`,
  			errors: 1,
  		},
  		{
  			code: `${prelude} class Registry { commands: Record<string, Command> = { start: startCommand }; }`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} let commands: Record<string, Command>; commands = { start: startCommand };`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} function create(): Record<string, Command> { return { start: startCommand }; }`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} function create(): { start: Command } { return { start: startCommand }; }`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} const source = { start: startCommand }; const commands: Record<string, Command> = source;`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} type Open = Record<string, Command>; const source = { start: startCommand }; const commands: Open = source;`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} type Open = { [key: string]: Command }; const source = { start: startCommand }; const commands: Open = source;`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} type Open = { [key in string]: Command }; const source = { start: startCommand }; const commands: Open = source;`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} type Open = Readonly<Record<string, Command>>; const source = { start: startCommand }; const commands: Open = source;`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} function outer() { type Open = Record<string, Command>; const commands: Open = { start: startCommand }; }`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} type Index<T> = Record<string, T>; const commands: Index<Command> = { start: startCommand };`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} type Identity<T> = T; const commands: Identity<Record<string, Command>> = { start: startCommand };`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} type Index<T> = Record<string, T>; type CommandsByName = Index<Command>; const commands: CommandsByName = { start: startCommand };`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} type Index<T = Command> = Record<string, T>; const commands: Index = { start: startCommand };`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} type Key = string; const commands: Record<Key, Command> = { start: startCommand };`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} const commands: Record<PropertyKey, Command> = { start: startCommand };`,
  			errors: [error],
  		},
  		{
  			code: `${prelude} const commands: Record<string | 'start', Command> = { start: startCommand };`,
  			errors: [error],
  		},
  		{ code: "const value: unknown = 1;", errors: [error] },
  		{ code: "const value: object = [];", errors: [error] },
  		{
  			code: "function isString(value: unknown): value is string { return true; } isString('known');",
  			errors: [error],
  		},
  		{
  			code: "function isString(value: unknown): value is string { return true; } const known = 'known'; isString(known);",
  			errors: [error],
  		},
  		{
  			code: "function isString(value: string | unknown): value is string { return true; } isString('known');",
  			errors: [error],
  		},
  		{
  			code: "function isString(value: unknown): value is string { return true; } function check(known: string): boolean { return isString(known); }",
  			errors: [error],
  		},
  		{
  			code: "const isString = (value: unknown): value is string => true; const known: string = getValue(); isString(known);",
  			errors: [error],
  		},
  		{
  			code: "type User = { readonly id: string }; function isUser(value: unknown): value is User { return true; } function parse(): User { return { id: 'known' }; } const user = parse(); isUser(user);",
  			errors: [error],
  		},
  	],
  valid: [
    "declare const input: unknown; const { value } = { value: input }; const widened: unknown = value;",
    "declare const input: unknown; const [value] = [input]; const widened: unknown = value;",
    "function isString(value: unknown): value is string { return true; } declare const input: unknown; const { value } = { value: input }; isString(value);",
    "function isString(value: unknown): value is string { return true; } declare const input: unknown; const [value] = [input]; isString(value);",
    "function isString(value: unknown): value is string { return true; } type Input = unknown; declare const input: Input; isString(input);",
    "function isString(value: unknown): value is string { return true; } type Input<T> = T; declare const input: Input<object>; isString(input);",
    "function isString(value: unknown): value is string { return true; } type Input = Record<string, unknown>; declare const input: Input; isString(input);",
    "function isString(value: unknown): value is string { return true; } type Input = { [key: string]: unknown }; declare const input: Input; isString(input);",
    "function isString(value: unknown): value is string { return true; } type Input = Other; type Other = Input; declare const input: Input; isString(input);",
    "function isString(value: unknown): value is string { return true; } type Input = string; function check() { type Input = unknown; declare const input: Input; isString(input); }",
    "function isString(value: unknown): value is string { return true; } const read: () => unknown = (): string => 'known'; isString(read());",
    "const source = {}; const alias = source; const commands: Record<string, () => void> = alias;",
    "type Index<T> = Record<string, T>; const source = {}; const first = source; const alias = first; const commands: Index<() => void> = alias;",
    "const source = {}; const alias = source; function create(): Record<string, string> { return alias; }",
    "const source = {}; const alias = source; const commands = alias as Record<string, string>;",
    "let source = { start: () => {} }; source = {}; const alias = source; const commands: Record<string, () => void> = alias;",
    "const first = second; const second = first; const commands: Record<string, string> = first;",
    "const source = { start: () => {} }; source = {}; const alias = source; const commands: Record<string, () => void> = alias;",
    "function isString(value: unknown): value is string { return true; } const source = 'known'; source = readInput(); const alias = source; isString(alias);",
    "function isString(value: unknown): value is string { return true; } const first = second; const second = first; isString(first);",
  		`${prelude} const commands: Record<string, Command> = {};`,
  		`${prelude} type Index<T> = Record<string, T>; const commands: Index<Command> = {};`,
  		`${prelude} class Registry { commands: Record<string, Command> = {}; }`,
  		`${prelude} class Registry { accessor commands: Record<string, Command> = {}; }`,
  		`${prelude} let commands: Record<string, Command>; commands = {};`,
  		`${prelude} function create(): Record<string, Command> { return {}; }`,
  		`${prelude} const create = (): Record<string, Command> => ({});`,
  		`${prelude} const commands = {} as Record<string, Command>;`,
  		`${prelude} const commands = <Record<string, Command>>{};`,
  		`${prelude} const commands = { start: startCommand };`,
  		`${prelude} const commands = { start: startCommand } as const;`,
  		`${prelude} const commands = { start: startCommand } satisfies Record<string, Command>;`,
  		`${prelude} type Commands = Record<string, Command>; const commands = { start: startCommand } as const satisfies Commands;`,
  		`${prelude} interface Commands { readonly start: Command } const commands: Commands = { start: startCommand };`,
  		`${prelude} type Commands = { readonly start: Command }; const commands: Commands = { start: startCommand };`,
  		`${prelude} type PermissionLevels = { readonly [Level in Permission]: number }; const levels: PermissionLevels = { admin: 1 };`,
  		`${prelude} function create() { return { start: startCommand }; }`,
  		`${prelude} interface Commands { readonly start: Command } function create(): Commands { return { start: startCommand }; }`,
  		`${prelude} declare function make(): Record<string, Command>; const commands: Record<string, Command> = make();`,
  		`${prelude} import { Commands } from './types'; const commands: Commands = { start: startCommand };`,
  		`${prelude} type Diet = 'vegan' | 'omnivore'; const labels: Record<Diet, string> = { vegan: 'V', omnivore: 'O' };`,
  		`${prelude} type Diet = 'vegan' | 'omnivore'; type Labels = Record<Diet, string>; const labels: Labels = { vegan: 'V', omnivore: 'O' };`,
  		`${prelude} type Diet = 'vegan' | 'omnivore'; const labels: Readonly<Record<Diet, string>> = { vegan: 'V', omnivore: 'O' };`,
  		`${prelude} const labels: Record<'a' | 'b', number> = { a: 1, b: 2 };`,
  		`${prelude} type Index<Key extends PropertyKey, Value> = Record<Key, Value>; const commands: Index<'start', Command> = { start: startCommand };`,
  		"function isString(value: unknown): value is string { return true; } declare const input: unknown; isString(input);",
  		"function isString(value: string | unknown): value is string { return true; } declare const input: string | unknown; isString(input);",
  		"function isString(value: unknown): value is string { return true; } declare function readInput(): unknown; isString(readInput());",
  	],
});
