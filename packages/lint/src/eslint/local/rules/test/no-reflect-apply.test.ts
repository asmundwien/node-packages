import { RuleTester } from "../../test/rule-tester.ts";
import { noReflectApplyRule } from "../no-reflect-apply.ts";


const tester = new RuleTester();
const error = { messageId: "reflectApply" };

tester.run("local/no-reflect-apply", noReflectApplyRule, {
  invalid: [
    { code: "const value = Reflect.apply(operation, owner, args);", errors: [error] },
    { code: "const value = Reflect['apply'](operation, owner, args);", errors: [error] },
    { code: "type Reflect = {}; Reflect.apply(operation, owner, args);", errors: [error] },
    { code: "interface Reflect {} Reflect.apply(operation, owner, args);", errors: [error] },
    { code: "function invoke<Reflect>() { return Reflect.apply(operation, owner, args); }", errors: [error] },
    { code: "import type { Reflect } from './types'; Reflect.apply(operation, owner, args);", errors: [error] },
    { code: "import { type Reflect } from './types'; Reflect['apply'](operation, owner, args);", errors: [error] },
  ],
  valid: [
    "const value = operation.apply(owner, args);",
    "Reflect.get(owner, key);",
    "const Reflect = { apply() { return 1; } }; Reflect.apply();",
    "function invoke(Reflect: { apply(): number }) { return Reflect.apply(); }",
    "const Reflect = { apply() { return 1; } }; function invoke() { type Reflect = {}; return Reflect.apply(); }",
    "const Reflect = { apply() { return 1; } }; function invoke<Reflect>() { return Reflect.apply(); }",
    "function invoke(Reflect) { interface Reflect {} return Reflect.apply(); }",
  ],
});
