import { RuleTester } from "../../test/rule-tester.ts";
import { noUnknownTypeAliasesRule } from "../no-unknown-type-aliases.ts";


const tester = new RuleTester();
const error = { messageId: "unknownAlias" };

tester.run("local/no-unknown-type-aliases", noUnknownTypeAliasesRule, {
  invalid: [
  		{ code: "type Alias = unknown;", errors: [error] },
  		{ code: "type Current = unknown;", errors: [error] },
  		{ code: "type UnknownValue = unknown; type Alias = UnknownValue;", errors: [error, error] },
  		{ code: "type Payload = string | unknown;", errors: [error] },
  		{
  			code: "type Payload = string | unknown; type NestedPayload = number | Payload;",
  			errors: [error, error],
  		},
  		{
  			code: "type Identity<T> = T; type Payload = Identity<unknown>;",
  			errors: [error],
  		},
  		{
  			code: "type Identity<T> = T; type Wrapped<T> = Identity<T>; type Payload = Wrapped<unknown>;",
  			errors: [error],
  		},
  		{
  			code: "function outer() { type Payload = unknown; }",
  			errors: [error],
  		},
  		{
  			code: "type Identity<T> = T; type Payload = Identity<Identity<unknown>>;",
  			errors: [error],
  		},
  		{
  			code: "type Identity<T = Identity<unknown>> = T; type Payload = Identity;",
  			errors: [error],
  		},
  		{
  			code: "type Inner<T, U> = U; type Outer<T> = Inner<string, T>; type Payload = Outer<unknown>;",
  			errors: [error],
  		},
  		{
  			code: "type Identity<T> = T; type Select<T, U = Identity<T>> = U; type Payload = Select<unknown>;",
  			errors: [error],
  		},
  		{
  			code: "type Loop<T> = Loop<T> | T; type Payload = Loop<unknown>;",
  			errors: [error],
  		},
  		{
  			code: "function outer<T>() { { type T = unknown; type Payload = T; } }",
  			errors: [error, error],
  		},
  		{
  			code: "type Value = unknown; const Owner = class Value { consume(value: Value) {} }; type Payload = Value;",
  			errors: [error, error],
  		},
  	],
  valid: [
  		"type User = { readonly id: string };",
  		"type Alias = string; type UserId = Alias;",
  		"type Payload = string | number;",
  		"type Box<T> = { readonly value: T }; type Payload = Box<unknown>;",
  		"type Value = string; type Hidden = Value; type Box<Value> = Hidden; type Payload = Box<unknown>;",
  		"type Value = string; type Select<T, U = Value> = U; type Outer<Value> = Select<boolean>; type Payload = Outer<unknown>;",
  		"type Inner<T, U> = U; type Outer<T> = Inner<unknown, T>; type Payload = Outer<string>;",
  		"type Identity<T> = T; type Select<T, U = Identity<T>> = U; type Payload = Select<string>;",
  		"type Identity<T> = T; type Payload = Identity<Identity<string>>;",
  		"type Loop<T> = Loop<T>; type Payload = Loop<unknown>;",
  		"type Left<T> = Right<T>; type Right<T> = Left<T>; type Payload = Left<unknown>;",
  		"type Loop<T = Loop> = T; type Payload = Loop;",
  		"type Identity<T = Identity<string>> = T; type Payload = Identity;",
  		"type Value = string; function outer<Value>() { type Payload = Value; }",
  	],
});
