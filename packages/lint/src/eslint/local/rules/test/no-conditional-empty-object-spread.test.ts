import { RuleTester } from "../../test/rule-tester.ts";
import { noConditionalEmptyObjectSpreadRule } from "../no-conditional-empty-object-spread.ts";


const tester = new RuleTester();
const error = { messageId: "avoid" };


tester.run("local/no-conditional-empty-object-spread", noConditionalEmptyObjectSpreadRule, {
  invalid: [
    {
      code: "const result = { ...(value !== undefined ? { value } : {}) };",
      errors: [error],
    },
    {
      code: "const result = { ...(condition ? {} : { value }) };",
      errors: [error],
    },
  ],
  valid: [
    "const result = { value };",
    "const result = { ...values };",
    "const result = condition ? { value } : {};",
  ],
});
