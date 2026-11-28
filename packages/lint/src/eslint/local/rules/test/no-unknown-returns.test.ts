import { RuleTester } from "../../test/rule-tester.ts";
import { noUnknownReturnsRule } from "../no-unknown-returns.ts";


const tester = new RuleTester();
const error = { messageId: "unknownReturn" };

tester.run("local/no-unknown-returns", noUnknownReturnsRule, {
  invalid: [
    { code: "function load(): unknown { return input; }", errors: [error] },
    { code: "const load = (): unknown => input;", errors: [error] },
    { code: "type Loader = () => unknown;", errors: [error] },
    { code: "interface Loader { load(): unknown }", errors: [error] },
    { code: "declare function load(): unknown;", errors: [error] },
    { code: "function load(): string | unknown { return input; }", errors: [error] },
    { code: "function load(): Promise<unknown> { return promise; }", errors: [error] },
    { code: "type UnknownValue = unknown; function load(): UnknownValue { return input; }", errors: [error] },
    { code: "type Item = unknown; type Fallback<Input> = Input extends infer Item ? string : () => Item;", errors: [error] },
    {
      code: "function outer() { type Result = unknown; function load(): Result { return input; } }",
      errors: [error],
    },
    {
      code: "type Identity<T> = T; function load(): Identity<unknown> { return input; }",
      errors: [error],
    },
    {
      code: "type Identity<T> = T; type Wrapped<T> = Promise<Identity<T>>; function load(): Wrapped<unknown> { return promise; }",
      errors: [error],
    },
    {
      code: "type Value = unknown; type Hidden = Value; type Box<Value> = Hidden; function load(): Box<string> { return input; }",
      errors: [error],
    },
    {
      code: "type Inner<T, U> = U; type Outer<T> = Inner<string, T>; function load(): Outer<unknown> { return input; }",
      errors: [error],
    },
    {
      code: "type Identity<T> = T; type Select<T, U = Identity<T>> = U; function load(): Select<unknown> { return input; }",
      errors: [error],
    },
    {
      code: "type Identity<T> = T; function load(): Identity<Identity<unknown>> { return input; }",
      errors: [error],
    },
    {
      code: "type Identity<T = Identity<unknown>> = T; function load(): Identity { return input; }",
      errors: [error],
    },
    {
      code: "type Loop<T> = Loop<T> | T; function load(): Loop<unknown> { return input; }",
      errors: [error],
    },
    { code: "function load(): PromiseLike<unknown> { return input; }", errors: [error] },
    {
      code: "export {}; type Promise<T> = T; function load(): Promise<unknown> { return input; }",
      errors: [error],
    },
    {
      code: "function outer<T>() { { type T = unknown; function load(): T { return input; } } }",
      errors: [error],
    },
    {
      code: "type Value = unknown; const Owner = class Value { load(): Value { return this; } }; function load(): Value { return input; }",
      errors: [error],
    },
    {
      code: "const Owner = class Promise { load(): Promise<unknown> { return this; } }; function load(): Promise<unknown> { return input; }",
      errors: [error],
    },
    {
      code: "type Item = unknown; type Nested<Input> = Input extends (Input extends infer Item ? Item : never) ? () => Item : never;",
      errors: [error],
    },
  ],
  valid: [
    "type ImportedValue = unknown;",
    "function parse(): ImportedValue { return input; }",
    "function parse(): User { return user; }",
    "function infer() { return input; }",
    "function generic<Value>(): Value { return value; }",
    "type Value = unknown; function generic<Value>(): Value { return value; }",
    "type Key = unknown; type Mapped<Input> = { [Key in keyof Input]: () => Key };",
    "type Item = unknown; type Unpacked<Input> = Input extends Promise<infer Item> ? () => Item : never;",
    "function cause(): { cause: unknown } { return { cause: input }; }",
    "type Result = { value: unknown }; function load(): Result { return result; }",
    "function load(): Promise<User> { return promise; }",
    "type Identity<T> = T; function load(): Identity<User> { return user; }",
    "type Value = unknown; function outer() { type Value = User; function load(): Value { return user; } }",
    "type Value = string; type Hidden = Value; type Box<Value> = Hidden; function load(): Box<unknown> { return input; }",
    "type Value = string; type Select<T, U = Value> = U; type Outer<Value> = Select<boolean>; function load(): Outer<unknown> { return input; }",
    "type Inner<T, U> = U; type Outer<T> = Inner<unknown, T>; function load(): Outer<string> { return input; }",
    "type Identity<T> = T; type Select<T, U = Identity<T>> = U; function load(): Select<string> { return input; }",
    "type Identity<T> = T; function load(): Identity<Identity<string>> { return input; }",
    "type Loop<T> = Loop<T>; function load(): Loop<unknown> { return input; }",
    "type Left<T> = Right<T>; type Right<T> = Left<T>; function load(): Left<unknown> { return input; }",
    "type Loop<T = Loop> = T; function load(): Loop { return input; }",
    "type Identity<T = Identity<string>> = T; function load(): Identity { return input; }",
    "export {}; interface Promise<T> { value: T } function load(): Promise<unknown> { return input; }",
    "export {}; interface PromiseLike<T> { value: T } function load(): PromiseLike<unknown> { return input; }",
    "import type { Promise } from './local'; function load(): Promise<unknown> { return input; }",
    "import type { PromiseLike } from './local'; function load(): PromiseLike<unknown> { return input; }",
    "function outer<T>() { { type T = unknown; function load<T>(): T { return input; } } }",
    "type Item = unknown; type Nested<Input> = Input extends [infer Item, (Input extends infer Other ? Other : never)] ? () => Item : never;",
    "type Item = unknown; type Nested<Input> = Input extends (Input extends infer Item ? () => Item : never) ? string : never;",
  ],
});
