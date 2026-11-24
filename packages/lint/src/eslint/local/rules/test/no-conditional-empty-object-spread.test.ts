import { RuleTester } from "../../test/rule-tester.ts";
import { noConditionalEmptyObjectSpreadRule } from "../no-conditional-empty-object-spread.ts";


const tester = new RuleTester();
const error = { messageId: "avoid" };


tester.run(
  "local/no-conditional-empty-object-spread",
  noConditionalEmptyObjectSpreadRule,
  {
    valid: [
      "const result = { value };",
      "const result = { ...values };",
      "const result = condition ? { value } : {};",
    ],
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
  },
);
