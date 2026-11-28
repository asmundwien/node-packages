import { RuleTester } from "../../test/rule-tester.ts";
import { noReflectGetRule } from "../no-reflect-get.ts";


const tester = new RuleTester();
const error = { messageId: "reflectGet" };

tester.run("local/no-reflect-get", noReflectGetRule, {
  invalid: [
    { code: "const value = Reflect.get(owner, key);", errors: [error], name: "static access" },
    { code: "const value = Reflect['get'](owner, key);", errors: [error], name: "computed access" },
    { code: "type Reflect = {}; Reflect.get(owner, key);", errors: [error] },
    { code: "interface Reflect {} Reflect.get(owner, key);", errors: [error] },
    { code: "function read<Reflect>() { return Reflect.get(owner, key); }", errors: [error] },
    { code: "import type { Reflect } from './types'; Reflect.get(owner, key);", errors: [error] },
    { code: "import { type Reflect } from './types'; Reflect['get'](owner, key);", errors: [error] },
  ],
  valid: [
    "const value = owner.property;",
    "const value = owner[key];",
    "Reflect.set(owner, key, value);",
    "const Reflect = { get() { return 1; } }; Reflect.get();",
    "function read(Reflect: { get(): number }) { return Reflect.get(); }",
    "const Reflect = { get() { return 1; } }; function read() { type Reflect = {}; return Reflect.get(); }",
    "const Reflect = { get() { return 1; } }; function read<Reflect>() { return Reflect.get(); }",
    "function read(Reflect) { interface Reflect {} return Reflect.get(); }",
  ],
});
