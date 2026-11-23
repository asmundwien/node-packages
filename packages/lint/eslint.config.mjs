import { defineConfig } from "eslint/config";

import { setup } from "@asmundwien/lint/eslint";

const pairSize = 2;

const fixtureStatementLimit = 12;

const config = defineConfig(setup({
  runtime: "node",
  tsconfigRootDir: import.meta.dirname,
}), {
  files: ["src/eslint/**/*.ts"],
  ignores: ["**/test/**"],
  rules: {
    // [standardization] Off (compatibility): Use camelCase bindings and properties and PascalCase types; human-approved exceptions in this package's policy source allow external object-literal keys requiring quotes and the exact Node global keys __dirname and __filename.
    "@typescript-eslint/naming-convention": [
      "error",
      { format: ["camelCase"], selector: "default" },
      { format: ["PascalCase"], selector: "typeLike" },
      { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      { filter: "^__(dirname|filename)$", format: [], selector: "objectLiteralProperty" },
    ],
  },
}, {
  files: ["src/eslint/node/index.ts"],
  rules: {
    // [standardization] Off (compatibility): Human-approved n import and plugin registration match eslint-plugin-n's default export name as required by import-x/no-rename-default; retain the two-character minimum for other identifiers in this module.
    "id-length": ["error", { exceptions: ["n"], min: 2 }],
  },
}, {
  files: ["src/eslint/local/**/*.ts"],
  ignores: ["**/test/**"],
  rules: {
    // [architectural-prevention] Off (scope): Traversal helpers pass the parser node, visitor keys and lexical resolution state explicitly.
    "@typescript-eslint/max-params": "off",
    // [standardization] Off (compatibility): Parser selectors, grammar table names, unused regex parameters and schema properties retain their specified casing.
    "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["PascalCase"], selector: "typeParameter" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable", trailingUnderscore: "allow" }, { filter: "^_$", format: [], selector: "parameter" }, { format: [], selector: "objectLiteralMethod" }, { format: [], selector: "objectLiteralProperty" }],
    // [standardization] Off (scope): A pair denotes reducer arity and adjacent line or token boundaries in the parser grammar.
    "@typescript-eslint/no-magic-numbers": ["error", { ignore: [-1, 0, 1, pairSize] }],
    // [correctness] Off (compatibility): Shared visitors guard optional parser fields and root parents across the JavaScript and TypeScript AST contracts.
    "@typescript-eslint/no-unnecessary-condition": "off",
    // [correctness] Off (compatibility): ESTree specifies literal node-kind strings while the parser types encode those same strings as an enum.
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    // [correctness] Off (compatibility): Mutually recursive type classifiers use hoisted function declarations; runtime variable ordering remains checked.
    "@typescript-eslint/no-use-before-define": ["error", { functions: false, typedefs: false }],
    // [standardization] Off (scope): Direct parser-field reads keep discriminant narrowing beside the dependent field access.
    "@typescript-eslint/prefer-destructuring": "off",
    // [standardization] Off (scope): Explicit parser guards preserve false and null results while narrowing dependent AST fields.
    "@typescript-eslint/prefer-optional-chain": "off",
    // [architectural-prevention] Off (compatibility): Parser-owned nodes, scopes and contexts have mutable library types; rule traversal reads them without claiming deep runtime immutability.
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    // [standardization] Off (scope): Named grammar matchers define accepted source spelling beside other lexical patterns.
    "@typescript-eslint/prefer-string-starts-ends-with": "off",
    // [correctness] Off (compatibility): Parser option strings, optional children and nullable match results use their specified truthiness; unchecked values remain errors.
    "@typescript-eslint/strict-boolean-expressions": ["error", { allowAny: false, allowNullableBoolean: true, allowNullableObject: true, allowNullableString: true, allowNumber: false, allowString: true }],
    // [correctness] Off (compatibility): Node classifiers deliberately reject unrecognized syntax through explicit default branches.
    "@typescript-eslint/switch-exhaustiveness-check": ["error", { considerDefaultExhaustiveForUnions: true, requireDefaultForNonUnion: true }],
    // [architectural-prevention] Off (scope): Node-kind dispatch and lexical alias resolution remain cohesive algorithms; behavioral suites cover their branches instead of a branch-count ceiling.
    "complexity": "off",
    // [correctness] Off (compatibility): Nullish parser fields include both null and undefined; other values still require strict equality.
    "eqeqeq": ["error", "always", { null: "ignore" }],
    // [standardization] Off (scope): Regular-expression callbacks retain the conventional unused full-match parameter name.
    "id-length": ["error", { exceptions: ["_"], min: 2 }],
    // [standardization] Off (scope): Rule and parser-helper exports remain adjacent to their typed declarations.
    "import-x/exports-last": "off",
    // [standardization] Off (scope): Rule and parser-helper exports remain adjacent to their typed declarations.
    "import-x/group-exports": "off",
    // [architectural-prevention] Off (compatibility): Parser and rule-option adapters inspect literal primitives before using the decoded AST or schema-validated options.
    "local/no-runtime-typeof": "off",
    // [architectural-prevention] Off (scope): Visitor factories and grammar tables remain in their owning rule modules rather than splitting them at a line ceiling.
    "max-lines": "off",
    // [architectural-prevention] Off (scope): Related visitors share one rule context and analysis state rather than separate factories chosen by line count.
    "max-lines-per-function": "off",
    // [architectural-prevention] Off (scope): Rule factories keep related visitors and report state together; statement counts do not split that lifecycle.
    "max-statements": "off",
    // [correctness] Off (compatibility): Nullish parser fields intentionally treat null and undefined as absent.
    "no-eq-null": "off",
    // [architectural-prevention] Off (scope): Traversal cursors rebind function-local parameters without changing parser-owned nodes.
    "no-param-reassign": "off",
    // [standardization] Off (compatibility): Generic argument collections use arguments_ to avoid the reserved arguments binding.
    "no-underscore-dangle": ["error", { allow: ["arguments_"] }],
    // [standardization] Off (compatibility): Visitor selector, grammar matcher and schema property order follows the rule lifecycle rather than alphabetical key order.
    "sort-keys": "off",
    // [standardization] Off (scope): Grammar predicates retain syntax-operation names; their typed boolean returns state their result contract.
    "unicorn/consistent-boolean-name": "off",
    // [architectural-prevention] Off (scope): Visitor helpers remain beside the per-rule context and callbacks that use them.
    "unicorn/consistent-function-scoping": "off",
    // [standardization] Off (scope): Named visitor closures and ordinary helper declarations retain their lexical-state ownership.
    "unicorn/consistent-function-style": "off",
    // [standardization] Off (scope): Grammar algorithms retain locally defined previous-node and next-node terminology.
    "unicorn/name-replacements": "off",
    // [correctness] Off (compatibility): Typed unary grammar predicates ignore collection callback indexes and collection arguments.
    "unicorn/no-array-callback-reference": "off",
    // [standardization] Off (scope): Matcher factories use new-prefixed names to identify creation of fresh grammar testers.
    "unicorn/no-keyword-prefix": "off",
    // [standardization] Off (compatibility): ESTree and scope lookups use null as their absent-node sentinel, including helper return contracts.
    "unicorn/no-null": "off",
    // [architectural-prevention] Off (scope): Traversal reads the child list directly from the parser visitor-key table.
    "unicorn/no-unreadable-for-of-expression": "off",
    // [correctness] Off (compatibility): Recursive aliases and nested AST contracts require recursion through generic binding substitutions.
    "unicorn/no-useless-recursion": "off",
    // [standardization] Off (scope): Explicit classifier branches retain the chosen boolean or absent-node sentinel.
    "unicorn/prefer-logical-operator-over-ternary": "off",
    // [correctness] Off (compatibility): Parser guard order preserves short-circuit narrowing before dependent property access.
    "unicorn/prefer-simple-condition-first": "off",
    // [architectural-prevention] Off (scope): Parser type aliases stay at module scope without adding runtime state or work.
    "unicorn/prefer-smaller-scope": "off",
  },
}, {
  files: ["src/eslint/local/vendor/eslint-stylistic/padding-line-between-statements.ts"],
  rules: {
    // [correctness] Off (covered): The typed replacement function returns only captured whitespace; it is not an interpolated replacement string.
    "unicorn/no-unsafe-string-replacement": "off",
    // [standardization] Off (scope): Array.from materializes the grammar kind iterable once during matcher construction.
    "unicorn/prefer-spread": "off",
  },
}, {
  files: ["src/eslint/local/index.ts"],
  rules: {
    // [architectural-prevention] Off (scope): The plugin registry imports each maintained rule explicitly so registration remains reviewable.
    "import-x/max-dependencies": "off",
  },
}, {
  files: ["src/eslint/local/rules/test/**/*.test.ts", "src/eslint/local/effect/rules/test/**/*.test.ts", "src/eslint/local/test/rule-tester.ts"],
  rules: {
    // [architectural-prevention] Off (compatibility): Native RuleTester configuration and case inputs use mutable framework types; the adapter does not mutate caller-owned inputs.
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    // [standardization] Off (scope): Fixture descriptors group input and options before expected diagnostics and fixes.
    "sort-keys": "off",
    // [standardization] Off (compatibility): RuleTester uses output null to assert that a diagnostic has no automatic fix.
    "unicorn/no-null": "off",
    // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
    "vitest/require-hook": "off",
  },
}, {
  files: ["src/eslint/test/consumer.test.ts"],
  rules: {
    // [architectural-prevention] Off (scope): Twelve statements keep temporary files, compiler setup, diagnostics and cleanup under one fixture lifetime.
    "max-statements": ["error", fixtureStatementLimit],
  },
});

export default config;
