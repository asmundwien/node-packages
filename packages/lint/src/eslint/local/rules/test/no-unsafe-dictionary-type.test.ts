import { RuleTester } from "../../test/rule-tester.ts";
import { noUnsafeDictionaryTypeRule } from "../no-unsafe-dictionary-type.ts";


const tester = new RuleTester();

const error = { messageId: "unsafeDictionary" };

tester.run("local/no-unsafe-dictionary-type", noUnsafeDictionaryTypeRule, {
  invalid: [
  		{ code: "type A = Record<string, unknown>;", errors: [error] },
  		{ code: "type A = { [key: string]: any };", errors: [error] },
  		{ code: "type A = { [index: number]: Command; [key: string]: unknown | Command };", errors: 1 },
  		{ code: "type A = { [K in PropertyKey]: object };", errors: [error] },
  		{ code: "type A = { [K in PropertyKey]: NonNullable<unknown> };", errors: [error] },
  		{ code: "type A = { [key: string]: NonNullable<unknown> };", errors: [error] },
  		{ code: "type A = Record<string, {}>;", errors: [error] },
  		{ code: "interface Escape {} type A = Record<string, Escape>;", errors: [error] },
  		{
  			code: "interface Escape { readonly __brand?: never } type A = Record<string, Escape>;",
  			errors: [error],
  		},
  		{
  			code: "type Escape = { readonly __brand?: never }; type A = Record<string, Escape>;",
  			errors: [error],
  		},
  		{ code: "type A = Record<string, { readonly __brand?: never }>;", errors: [error] },
  		{ code: "type A = Record<string, string | unknown>;", errors: [error] },
  		{ code: "interface Escape {} type A = Record<string, string | Escape>;", errors: [error] },
  		{ code: "type A = Record<string, unknown & {}>;", errors: [error] },
  		{
  			code: "interface Owner { readonly id: string } type A = Record<string, any & Owner>;",
  			errors: [error],
  		},
  		{ code: "type Escape = unknown; type A = Record<string, Escape>;", errors: [error] },
  		{ code: "type Dict = Record<string, unknown>;", errors: [error] },
  		{ code: "type A = Readonly<Partial<Required<(Record<string, unknown>)>>>;", errors: [error] },
  		{ code: "type A = { readonly [key: string]: unknown };", errors: [error] },
  		{ code: "type A = { readonly [K in string]: unknown };", errors: [error] },
  		{ code: "type Source = Record<string, unknown>; type A = Pick<Source, string>;", errors: 2 },
  		{ code: "type Source = Record<string, unknown>; type A = Omit<Source, never>;", errors: 2 },
  		{ code: "type Index<T> = Record<string, T>; type A = Index<unknown>;", errors: 1 },
  		{ code: "interface A { [key: string]: unknown }", errors: [error] },
  		{ code: "type A = Readonly<Record<string, unknown>>;", errors: 1 },
  		{ code: "type A = Record<string, Readonly<unknown>>;", errors: [error] },
  		{ code: "type A = Record<string, Partial<unknown>>;", errors: [error] },
  		{ code: "type A = Record<string, Required<unknown>>;", errors: [error] },
  		{ code: "type Escape = Readonly<unknown>; type A = Record<string, Escape>;", errors: 1 },
  		{
  			code: "type Wrapped<T> = Readonly<T>; type A = Record<string, Wrapped<unknown>>;",
  			errors: 1,
  		},
  		{ code: "type A = Record<string, NonNullable<unknown>>;", errors: [error] },
  		{ code: "type Escape = NonNullable<unknown>; type A = Record<string, Escape>;", errors: 1 },
  		{
  			code: "type Unsafe = Record<string, unknown>; const x: Unsafe = {}; const y: Unsafe = {};",
  			errors: 1,
  		},
  		{
  			code: "type Unsafe = Record<string, unknown>; type AlsoUnsafe = Unsafe; const x: Unsafe = {};",
  			errors: 2,
  		},
  		{ code: "type Index<T = unknown> = Record<string, T>; type A = Index;", errors: 1 },
  		{
  			code: "type Index<T, U = T> = Record<string, U>; type A = Index<string, unknown>;",
  			errors: 1,
  		},
  		{ code: "type Index<T, U = T> = Record<string, U>; type A = Index<unknown>;", errors: 1 },
  		{
  			code: "type Inner<T, U> = Record<string, U>; type Outer<T> = Inner<string, T>; type Result = Outer<unknown>;",
  			errors: 1,
  		},
  		{
  			code: "type Inner<T, U> = Record<string, U>; type Outer<T> = Inner<string, T>; type Middle<T> = Outer<T>; type Result = Middle<unknown>;",
  			errors: 1,
  		},
  		{
  			code: "type Value<T> = T; type Inner<T, U> = Record<string, U>; type Outer<T> = Inner<string, Value<T>>; type Result = Outer<unknown>;",
  			errors: 1,
  		},
  		{
  			code: "type Inner<T, U> = Record<string, U>; type Outer<T> = Inner<string, Readonly<T | number>>; type Result = Outer<unknown>;",
  			errors: 1,
  		},
  		{
  			code: "type Inner<T, U = T> = Record<string, U>; type Outer<T> = Inner<unknown>; type Result = Outer<string>;",
  			errors: 2,
  		},
  		{
  			code: "type Value<T> = T; type Inner<T, U = Value<T>> = Record<string, U>; type Outer<T> = Inner<unknown>; type Result = Outer<string>;",
  			errors: 2,
  		},
  		{
  			code: "type Value<T> = T; type Index<T, U = Value<T>> = Record<string, U>; type A = Index<unknown>;",
  			errors: 1,
  		},
  		{
  			code: "type Marker<T> = { readonly __brand?: never }; type Index<T, U = Marker<T>> = Record<string, U>; type A = Index<Item>;",
  			errors: 1,
  		},
  		{
  			code: "function outer() { type Identity<T> = T; type A = Record<string, Identity<unknown>>; }",
  			errors: 1,
  		},
  		{
  			code: "function local() { type Record<K, V> = { key: K; value: V }; type A = Record<string, unknown>; } function global() { type A = Record<string, unknown>; }",
  			errors: 1,
  		},
  		{
  			code: "type Value = unknown; type Hidden = Value; type Box<Value> = Hidden; type Result = Record<string, Box<string>>;",
  			errors: [error],
  		},
  		{
  			code: "type Identity<T> = T; type Result = Record<string, Identity<Identity<unknown>>>;",
  			errors: [error],
  		},
  		{
  			code: "type Identity<T = Identity<unknown>> = T; type Result = Record<string, Identity>;",
  			errors: [error],
  		},
  		{
  			code: "type Identity<T> = T; type Index<T> = Identity<Identity<Record<string, T>>>; declare const values: Index<unknown>;",
  			errors: [error],
  		},
  		{
  			code: "type Identity<T> = T; type Index<T = unknown, U = Identity<T>> = Record<string, U>; declare const values: Index;",
  			errors: [error],
  		},
  		{
  			code: "type Index<T = unknown> = Record<string, T>; const values: Index = {}; function consume(values: Index): Index { return values; }",
  			errors: [error, error, error],
  		},
  		{
  			code: "type Index<T = string> = Record<string, unknown>; declare const values: Index;",
  			errors: [error],
  		},
  		{
  			code: "type Tagged<T> = Record<string, T> & { tag: string }; declare const values: Tagged<unknown>;",
  			errors: [error],
  		},
  		{
  			code: "type Tagged<T = unknown> = Readonly<Record<string, T> & { tag: string }>; declare const values: Tagged;",
  			errors: [error],
  		},
  		{
  			code: "type Tagged = Record<string, unknown> & { tag: string };",
  			errors: [error],
  		},
  		{
  			code: "type Loop<T> = Loop<T> & Record<string, T>; declare const values: Loop<unknown>;",
  			errors: [error],
  		},
  		{
  			code: "function outer() { interface Value {} type Result = Record<string, Value>; }",
  			errors: [error],
  		},
  		{
  			code: "type Value = string; function outer() { interface Value {} type Result = Record<string, Value>; }",
  			errors: [error],
  		},
  		{
  			code: "interface Value { id: string } namespace Inner { interface Value {} type Result = Record<string, Value>; }",
  			errors: [error],
  		},
  		{
  			code: "function outer() { interface Value {} interface Value { readonly __brand?: never } type Result = Record<string, Value>; }",
  			errors: [error],
  		},
  		{
  			code: "interface Value {} function outer() { interface Value { id: string } } function sibling() { type Result = Record<string, Value>; }",
  			errors: [error],
  		},
  		{
  			code: "function outer<T>() { { type T = unknown; type Result = Record<string, T>; } }",
  			errors: [error],
  		},
  		{
  			code: "type Value = unknown; const Owner = class Value { consume(values: Record<string, Value>) {} }; type Result = Record<string, Value>;",
  			errors: [error],
  		},
  		{
  			code: "type Item = unknown; type Nested<Input> = Input extends (Input extends infer Item ? Item : never) ? Record<string, Item> : never;",
  			errors: [error],
  		},
  	],
  valid: [
  		"type Commands = Record<string, Command>;",
  		"type Metadata = Record<PropertyKey, JsonValue>;",
  		"type PermissionLevels = Record<Permission, number>;",
  		"type Indexed = { [key: string]: Command };",
  		"type CompatibleIndexes = { [index: number]: Command; [key: string]: Command | OtherCommand };",
  		"type Exhaustive = { [K in Permission]: number };",
  		"type Allowed = Record<string, { payload: unknown }>;",
  		"type AlsoAllowed = Record<string, Result<Data, unknown>>;",
  		"type Index<T> = Record<string, T>; type EntityIndex<T extends Entity> = Record<string, T>;",
  		"type Safe = Index<Command>; type Index<T> = Record<string, T>;",
  		"type A = Map<string, unknown>; type B = ReadonlyMap<string, unknown>; type C = WeakMap<object, unknown>;",
  		"import { Record } from './local'; type A = Record<string, unknown>;",
  		"type Record<K, V> = { key: K; value: V }; type A = Record<string, unknown>;",
  		"type Readonly<T> = { value: T }; type A = Record<string, Readonly<unknown>>;",
  		"type NonNullable<T> = { value: T }; type A = Record<string, NonNullable<unknown>>;",
  		"type Value<T> = T; type Index<T = Command, U = Value<T>> = Record<string, U>; type A = Index;",
  		"type Inner<T, U> = Record<string, U>; type Outer<T> = Inner<unknown, T>; type Result = Outer<string>;",
  		"type Inner<T, U> = Record<string, U>; type Outer<T> = Inner<unknown, T>; type Middle<T> = Outer<T>; type Result = Middle<string>;",
  		"type Value<T> = T; type Inner<T, U> = Record<string, U>; type Outer<T> = Inner<unknown, Value<T>>; type Result = Outer<string>;",
  		"type Inner<T, U = T> = Record<string, U>; type Outer<T> = Inner<string>; type Result = Outer<unknown>;",
  		"type Value<T> = T; type Inner<T, U = Value<T>> = Record<string, U>; type Outer<T> = Inner<string>; type Result = Outer<unknown>;",
  		"interface Owner { readonly id: string } type A = Record<string, unknown & Owner>;",
  		"interface Owner { readonly id: string } interface Child extends Owner {} type A = Record<string, Child>;",
  		"interface Owner { readonly id: string } interface Child extends Owner { readonly __brand?: never } type A = Record<string, Child>;",
  		"interface Escape {} interface Escape { readonly id: string } type A = Record<string, Escape>;",
  		"interface Escape { readonly id: string } interface Escape {} type A = Record<string, Escape>;",
  		"interface Owner { readonly id: string } type A = Record<string, object & Owner>;",
  		"type Wrap<T> = { readonly wrapped: T }; type Inner<T, U> = { readonly value: T } & Wrap<U>; type Outer<T, U> = Record<string, Inner<T, U>>; declare function f<T, U>(): Outer<T, U>;",
  		"type WithSchema<T extends Record<string, unknown>> = (schema: T) => void;",
  		"function run<T extends Record<string, unknown>>(input: T): T { return input; }",
  		"declare class Store<T extends Record<string, unknown>> { read(): T }",
  		"type Deep<T extends Readonly<Record<string, unknown>>> = T;",
  		"type Value = string; type Hidden = Value; type Box<Value> = Hidden; type Result = Record<string, Box<unknown>>;",
  		"type Value = string; type Hidden = Value; type Box<Value> = Record<string, Hidden>; type Result = Box<unknown>;",
  		"type Value = string; type Index<T, U = Value> = Record<string, U>; type Outer<Value> = Index<boolean>; type Result = Outer<unknown>;",
  		"type Identity<T> = T; type Result = Record<string, Identity<Identity<string>>>;",
  		"type Identity<T> = T; type Index<T> = Identity<Identity<Record<string, T>>>; declare const values: Index<string>;",
  		"type Loop<T> = Loop<T>; type Result = Record<string, Loop<unknown>>; declare const values: Loop<unknown>;",
  		"type Left<T> = Right<T>; type Right<T> = Left<T>; type Result = Record<string, Left<unknown>>;",
  		"type Loop<T = Loop> = T; type Result = Record<string, Loop>;",
  		"type Identity<T = Identity<string>> = T; type Result = Record<string, Identity>;",
  		"type Index<T = string> = Record<string, T>; declare const values: Index;",
  		"type Index<T = unknown> = Record<string, T>; declare const values: Index<string>;",
  		"type Tagged<T> = Record<string, T> & { tag: string }; declare const values: Tagged<string>;",
  		"type Tagged<T = string> = Readonly<Record<string, T> & { tag: string }>; declare const values: Tagged;",
  		"type Loop<T> = Loop<T> & Record<string, T>; declare const values: Loop<string>;",
  		"interface Value {} function outer() { type Value = string; type Result = Record<string, Value>; }",
  		"interface Value {} function outer<Value>() { type Result = Record<string, Value>; }",
  		"function one() { interface Value {} } function two() { interface Value { id: string } type Result = Record<string, Value>; }",
  		"interface Value {} function outer() { interface Value {} interface Value { id: string } type Result = Record<string, Value>; }",
  		"interface Value {} function outer() { interface Value { id: string } interface Value {} type Result = Record<string, Value>; }",
  		"interface Value {} namespace Inner { interface Value { id: string } type Result = Record<string, Value>; }",
  		"import type { Value } from './local'; type Result = Record<string, Value>;",
  		"function outer<T>() { { type T = unknown; function consume<T>(value: Record<string, T>) {} } }",
  		"type Item = unknown; type Nested<Input> = Input extends [infer Item, (Input extends infer Other ? Other : never)] ? Record<string, Item> : never;",
  		"type Item = unknown; type Nested<Input> = Input extends (Input extends infer Item ? Record<string, Item> : never) ? string : never;",
  	],
});
