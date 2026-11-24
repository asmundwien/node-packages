import { RuleTester } from "../../test/rule-tester.ts";
import { noReflectGetRule } from "../no-reflect-get.ts";


const tester = new RuleTester();
const error = { messageId: "reflectGet" };

tester.run("local/no-reflect-get", noReflectGetRule, {
  invalid: [
    { code: "const value = Reflect.get(owner, key);", errors: [error], name: "static access" },
    { code: "const value = Reflect['get'](owner, key);", errors: [error], name: "computed access" },
  ],
  valid: [
    "const value = owner.property;",
    "const value = owner[key];",
    "Reflect.set(owner, key, value);",
    "const Reflect = { get() { return 1; } }; Reflect.get();",
    "function read(Reflect: { get(): number }) { return Reflect.get(); }",
  ],
});
