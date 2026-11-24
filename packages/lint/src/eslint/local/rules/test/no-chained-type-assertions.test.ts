import { RuleTester } from "../../test/rule-tester.ts";
import { noChainedTypeAssertionsRule } from "../no-chained-type-assertions.ts";


const tester = new RuleTester();
const error = { messageId: "chained" };

tester.run("local/no-chained-type-assertions", noChainedTypeAssertionsRule, {
  valid: [
    "const value = input as User;",
    "const value = (input as User);",
    "const value = ({ id: 1 } as const) as const;",
    "const value = (input as User) satisfies User;",
    "const value = (input satisfies User) as User;",
    "const value = (input as User)!;",
    "const value = input! as User;",
    "const value = (({ id: 1 } as const) satisfies User) as const;",
    "const value = ({ id: 1 } as const)! as const;",
    "const value = (<const>{ id: 1 })! as const;",
    "const value = ((input as User)! satisfies User)!;",
    "const value = ((input as User).id satisfies string) as Identifier;",
    "const value = [(left as User), (right as User)] as readonly User[];",
  ],
  invalid: [
    { name: "as chain", code: "const value = input as unknown as User;", errors: [error] },
    {
      name: "parenthesized chain",
      code: "const value = (input as unknown) as User;",
      errors: [error],
    },
    {
      name: "angle-bracket chain",
      code: "const value = <User>(<unknown>input);",
      errors: [error],
    },
    {
      name: "mixed const chain",
      code: "const value = ({ id: 1 } as const) as User;",
      errors: [error],
    },
    {
      name: "satisfies wrapper",
      code: "const value = ((input as unknown) satisfies unknown) as User;",
      errors: [error],
    },
    {
      name: "non-null wrapper",
      code: "const value = (input as unknown)! as User;",
      errors: [error],
    },
    {
      name: "multiple transparent wrappers and assertions",
      code: "const value = (((input as unknown)! satisfies unknown) as object)! as User;",
      errors: [error],
    },
    {
      name: "wrapped angle-bracket chain",
      code: "const value = <User>((<unknown>input) satisfies unknown)!;",
      errors: [error],
    },
    {
      name: "chain inside an outer satisfies wrapper",
      code: "const value = ((input as unknown) as User) satisfies User;",
      errors: [error],
    },
    {
      name: "chain inside an outer non-null wrapper",
      code: "const value = ((input as unknown) as User)!;",
      errors: [error],
    },
    {
      name: "mixed const chain through satisfies",
      code: "const value = (({ id: 1 } as const) satisfies User) as User;",
      errors: [error],
    },
    {
      name: "mixed const chain through non-null",
      code: "const value = (input as User)! as const;",
      errors: [error],
    },
    {
      name: "independent child chains",
      code: "const value = [(left as unknown)! as User, ((right as unknown) satisfies unknown) as User] as readonly User[];",
      errors: [error, error],
    },
  ],
});
