import { defineConfig } from "eslint/config";

import { setup } from "@asmundwien/lint/eslint";

const pairSize = 2;

const fixtureStatementLimit = 12;

const classifierComplexityLimit = 30;
const analysisParameterLimit = 4;
const traversalStatementLimit = 25;
const dictionaryStatementLimit = 40;
const visitorLineLimit = 175;
const classifierLineLimit = 100;
const compactVisitorLineLimit = 75;
const knownValueFileLineLimit = 550;
const dictionaryFileLineLimit = 700;
const wideningFileLineLimit = 450;
const aliasFileLineLimit = 350;
const grammarFileLineLimit = 1100;
const grammarFunctionLineLimit = 350;

const configFileLineLimit = 2000;

const config = defineConfig(
  setup({
    runtime: "node",
    tsconfigRootDir: import.meta.dirname,
  }),
  {
    files: ["eslint.config.mjs"],
    rules: {
      // [architectural-prevention] Off (scope): A 2000-line ceiling keeps the explicit file-specific overrides together in this configuration while bounding module growth.
      "max-lines": ["error", configFileLineLimit],
    },
  },
  {
    files: ["src/eslint/base/core-convention-rules.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/base/core-safety-rules.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/base/import-rules.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/base/index.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/base/regexp-rules.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/base/unicorn-api-rules.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/base/unicorn-architecture-rules.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/base/unicorn-convention-rules.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/base/unicorn-safety-rules.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/import-resolution.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/local/effect/index.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/local/effect/rules/no-manual-effect-error-tag.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
    },
  },
  {
    files: ["src/eslint/local/effect/rules/no-manual-tag-comparison.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
    },
  },
  {
    files: ["src/eslint/local/effect/rules/no-manual-tagged-construction.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
    },
  },
  {
    files: ["src/eslint/local/effect/rules/no-service-constructor-imports.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [architectural-prevention] Off (compatibility): Parser-owned node and scope graphs have mutable native declarations; these adapters retain parameter-property mutation checks without claiming deep immutability.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["src/eslint/local/effect/rules/prefer-effect-match.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [architectural-prevention] Off (compatibility): Parser-owned node and scope graphs have mutable native declarations; these adapters retain parameter-property mutation checks without claiming deep immutability.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [architectural-prevention] Off (scope): Twenty-five statements retain the listed traversal algorithms while bounding combined responsibilities.
      "max-statements": ["error", traversalStatementLimit],
    },
  },
  {
    files: ["src/eslint/local/effect/rules/test/no-manual-effect-error-tag.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/effect/rules/test/no-manual-tag-comparison.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/effect/rules/test/no-manual-tagged-construction.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/effect/rules/test/no-service-constructor-imports.test.ts"],
    rules: {
      // [standardization] Off (compatibility): RuleTester uses output null to assert that a diagnostic has no automatic fix.
      "unicorn/no-null": "off",
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/effect/rules/test/prefer-effect-match.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/effect/shared/tagged-values.ts"],
    rules: {
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [architectural-prevention] Off (compatibility): Parser-owned node and scope graphs have mutable native declarations; these adapters retain parameter-property mutation checks without claiming deep immutability.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [architectural-prevention] Off (compatibility): Listed boundary adapters classify parser child nodes, literal property names and schema-validated options before use; arbitrary downstream narrowing remains prohibited elsewhere.
      "local/no-runtime-typeof": "off",
    },
  },
  {
    files: ["src/eslint/local/index.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
      // [architectural-prevention] Off (scope): The reviewed registry imports eighteen rules and their two type providers explicitly; twenty dependencies bound further registration growth.
      "import-x/max-dependencies": ["error", { max: 20 }],
    },
  },
  {
    files: ["src/eslint/local/rules/no-array-filter-map.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-chained-type-assertions.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [architectural-prevention] Off (compatibility): Parser-owned node and scope graphs have mutable native declarations; these adapters retain parameter-property mutation checks without claiming deep immutability.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-conditional-empty-object-spread.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-known-value-widening.ts"],
    rules: {
      // [architectural-prevention] Off (scope): Four parameters keep parser nodes and lexical analysis state explicit in these reviewed helpers while retaining an arity ceiling.
      "@typescript-eslint/max-params": ["error", { max: analysisParameterLimit }],
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [correctness] Off (compatibility): Listed root and absent-field guards intentionally equate null with undefined; all other equality comparisons remain strict.
      "eqeqeq": ["error", "always", { null: "ignore" }],
      // [architectural-prevention] Off (scope): A 550-line module and 175-line visitor factory retain shared evidence state while bounding review size.
      "max-lines": ["error", knownValueFileLineLimit],
      // [architectural-prevention] Off (scope): A 175-line ceiling retains the related evidence visitors in one factory while bounding review size.
      "max-lines-per-function": ["error", visitorLineLimit],
      // [architectural-prevention] Off (scope): Twenty-five statements retain the listed traversal algorithms while bounding combined responsibilities.
      "max-statements": ["error", traversalStatementLimit],
      // [correctness] Off (compatibility): Listed root and absent-field guards intentionally equate null with undefined; other coercive comparisons remain errors.
      "no-eq-null": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
      // [correctness] Off (compatibility): Listed type classifiers recurse through nested syntax and alias substitutions; recursion cost remains subject to finite complexity and statement limits.
      "unicorn/no-useless-recursion": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-module-mocking.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [standardization] Off (scope): Listed syntax predicates retain grammar-operation names with typed boolean returns; boolean naming remains a review decision.
      "unicorn/consistent-boolean-name": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-object-parameters.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [architectural-prevention] Off (scope): A 75-line ceiling retains each listed visitor factory or evidence classifier while bounding review size.
      "max-lines-per-function": ["error", compactVisitorLineLimit],
      // [standardization] Off (scope): Listed syntax predicates retain grammar-operation names with typed boolean returns; boolean naming remains a review decision.
      "unicorn/consistent-boolean-name": "off",
      // [correctness] Off (compatibility): Listed unary syntax predicates ignore collection callback indexes and collection arguments; receiver binding remains checked.
      "unicorn/no-array-callback-reference": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-reduce-accumulator-copy.ts"],
    rules: {
      // [architectural-prevention] Off (scope): Four parameters keep parser nodes and lexical analysis state explicit in these reviewed helpers while retaining an arity ceiling.
      "@typescript-eslint/max-params": ["error", { max: analysisParameterLimit }],
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Two denotes reducer arity or adjacent token boundaries in these reviewed algorithms; other numeric fixtures still require names.
      "@typescript-eslint/no-magic-numbers": ["error", { ignore: [-1, 0, 1, pairSize] }],
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [architectural-prevention] Off (scope): A 75-line ceiling retains each listed visitor factory or evidence classifier while bounding review size.
      "max-lines-per-function": ["error", compactVisitorLineLimit],
      // [architectural-prevention] Off (scope): Twenty-five statements retain the listed traversal algorithms while bounding combined responsibilities.
      "max-statements": ["error", traversalStatementLimit],
      // [standardization] Off (scope): Listed syntax predicates retain grammar-operation names with typed boolean returns; boolean naming remains a review decision.
      "unicorn/consistent-boolean-name": "off",
      // [correctness] Off (compatibility): Listed unary syntax predicates ignore collection callback indexes and collection arguments; receiver binding remains checked.
      "unicorn/no-array-callback-reference": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
      // [correctness] Off (compatibility): Listed type classifiers recurse through nested syntax and alias substitutions; recursion cost remains subject to finite complexity and statement limits.
      "unicorn/no-useless-recursion": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-reflect-apply.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
    },
  },
  {
    files: ["src/eslint/local/rules/no-reflect-get.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
    },
  },
  {
    files: ["src/eslint/local/rules/no-runtime-typeof.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [architectural-prevention] Off (compatibility): Parser-owned node and scope graphs have mutable native declarations; these adapters retain parameter-property mutation checks without claiming deep immutability.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-shape-in-symbol-names.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [correctness] Off (compatibility): Listed root and absent-field guards intentionally equate null with undefined; all other equality comparisons remain strict.
      "eqeqeq": ["error", "always", { null: "ignore" }],
      // [correctness] Off (compatibility): Listed root and absent-field guards intentionally equate null with undefined; other coercive comparisons remain errors.
      "no-eq-null": "off",
      // [standardization] Off (scope): Listed syntax predicates retain grammar-operation names with typed boolean returns; boolean naming remains a review decision.
      "unicorn/consistent-boolean-name": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
      // [correctness] Off (compatibility): Listed type classifiers recurse through nested syntax and alias substitutions; recursion cost remains subject to finite complexity and statement limits.
      "unicorn/no-useless-recursion": "off",
      // [standardization] Off (scope): Listed classifiers retain explicit boolean and absent-node ternaries; equivalent logical-operator spelling remains a review decision.
      "unicorn/prefer-logical-operator-over-ternary": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-unknown-parameters.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-unknown-returns.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [architectural-prevention] Off (scope): A 75-line ceiling retains each listed visitor factory or evidence classifier while bounding review size.
      "max-lines-per-function": ["error", compactVisitorLineLimit],
      // [standardization] Off (scope): Listed syntax predicates retain grammar-operation names with typed boolean returns; boolean naming remains a review decision.
      "unicorn/consistent-boolean-name": "off",
      // [correctness] Off (compatibility): Listed unary syntax predicates ignore collection callback indexes and collection arguments; receiver binding remains checked.
      "unicorn/no-array-callback-reference": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-unknown-type-aliases.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [standardization] Off (scope): Listed syntax predicates retain grammar-operation names with typed boolean returns; boolean naming remains a review decision.
      "unicorn/consistent-boolean-name": "off",
      // [correctness] Off (compatibility): Listed unary syntax predicates ignore collection callback indexes and collection arguments; receiver binding remains checked.
      "unicorn/no-array-callback-reference": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-unsafe-dictionary-type.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/no-widen-then-assert.ts"],
    rules: {
      // [architectural-prevention] Off (scope): Four parameters keep parser nodes and lexical analysis state explicit in these reviewed helpers while retaining an arity ceiling.
      "@typescript-eslint/max-params": ["error", { max: analysisParameterLimit }],
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Two denotes reducer arity or adjacent token boundaries in these reviewed algorithms; other numeric fixtures still require names.
      "@typescript-eslint/no-magic-numbers": ["error", { ignore: [-1, 0, 1, pairSize] }],
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [correctness] Off (compatibility): The reviewed object-type classifier deliberately returns false for every unsupported AST kind; other union switches retain exhaustive checking.
      "@typescript-eslint/switch-exhaustiveness-check": ["error", { considerDefaultExhaustiveForUnions: true, requireDefaultForNonUnion: true }],
      // [architectural-prevention] Off (scope): Complexity 30 permits these reviewed syntax-dispatch algorithms while retaining a branching ceiling.
      "complexity": ["error", classifierComplexityLimit],
      // [correctness] Off (compatibility): Listed root and absent-field guards intentionally equate null with undefined; all other equality comparisons remain strict.
      "eqeqeq": ["error", "always", { null: "ignore" }],
      // [architectural-prevention] Off (scope): A 450-line ceiling retains the widening analysis lifecycle in this module while bounding growth.
      "max-lines": ["error", wideningFileLineLimit],
      // [architectural-prevention] Off (scope): A 75-line ceiling retains each listed visitor factory or evidence classifier while bounding review size.
      "max-lines-per-function": ["error", compactVisitorLineLimit],
      // [architectural-prevention] Off (scope): Twenty-five statements retain the listed traversal algorithms while bounding combined responsibilities.
      "max-statements": ["error", traversalStatementLimit],
      // [correctness] Off (compatibility): Listed root and absent-field guards intentionally equate null with undefined; other coercive comparisons remain errors.
      "no-eq-null": "off",
      // [standardization] Off (scope): Listed syntax predicates retain grammar-operation names with typed boolean returns; boolean naming remains a review decision.
      "unicorn/consistent-boolean-name": "off",
      // [correctness] Off (compatibility): Listed unary syntax predicates ignore collection callback indexes and collection arguments; receiver binding remains checked.
      "unicorn/no-array-callback-reference": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
      // [correctness] Off (compatibility): Listed type classifiers recurse through nested syntax and alias substitutions; recursion cost remains subject to finite complexity and statement limits.
      "unicorn/no-useless-recursion": "off",
      // [standardization] Off (scope): Listed classifiers retain explicit boolean and absent-node ternaries; equivalent logical-operator spelling remains a review decision.
      "unicorn/prefer-logical-operator-over-ternary": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/require-readable-spacing.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [architectural-prevention] Off (compatibility): Parser-owned node and scope graphs have mutable native declarations; these adapters retain parameter-property mutation checks without claiming deep immutability.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/require-safety-comment-for-type-assertion.ts"],
    rules: {
      // [architectural-prevention] Off (scope): Four parameters keep parser nodes and lexical analysis state explicit in these reviewed helpers while retaining an arity ceiling.
      "@typescript-eslint/max-params": ["error", { max: analysisParameterLimit }],
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-array-filter-map.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-chained-type-assertions.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-conditional-empty-object-spread.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-known-value-widening.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-module-mocking.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-object-parameters.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-reduce-accumulator-copy.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-reflect-apply.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-reflect-get.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-runtime-typeof.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-shape-in-symbol-names.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-unknown-parameters.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-unknown-returns.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-unknown-type-aliases.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-unsafe-dictionary-type.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/no-widen-then-assert.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/require-readable-spacing.test.ts"],
    rules: {
      // [standardization] Off (compatibility): RuleTester uses output null to assert that a diagnostic has no automatic fix.
      "unicorn/no-null": "off",
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/rules/test/require-safety-comment-for-type-assertion.test.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): RuleTester.run and its runner callbacks register suites at module evaluation, before test hooks execute.
      "vitest/require-hook": "off",
    },
  },
  {
    files: ["src/eslint/local/shared/array-method.ts"],
    rules: {
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [architectural-prevention] Off (compatibility): Parser-owned node and scope graphs have mutable native declarations; these adapters retain parameter-property mutation checks without claiming deep immutability.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [correctness] Off (compatibility): Listed root and absent-field guards intentionally equate null with undefined; all other equality comparisons remain strict.
      "eqeqeq": ["error", "always", { null: "ignore" }],
      // [architectural-prevention] Off (compatibility): Listed boundary adapters classify parser child nodes, literal property names and schema-validated options before use; arbitrary downstream narrowing remains prohibited elsewhere.
      "local/no-runtime-typeof": "off",
      // [architectural-prevention] Off (scope): Twenty-five statements retain the listed traversal algorithms while bounding combined responsibilities.
      "max-statements": ["error", traversalStatementLimit],
      // [correctness] Off (compatibility): Listed root and absent-field guards intentionally equate null with undefined; other coercive comparisons remain errors.
      "no-eq-null": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
      // [correctness] Off (compatibility): Listed type classifiers recurse through nested syntax and alias substitutions; recursion cost remains subject to finite complexity and statement limits.
      "unicorn/no-useless-recursion": "off",
    },
  },
  {
    files: ["src/eslint/local/shared/dictionary-types.ts"],
    rules: {
      // [architectural-prevention] Off (scope): Four parameters keep parser nodes and lexical analysis state explicit in these reviewed helpers while retaining an arity ceiling.
      "@typescript-eslint/max-params": ["error", { max: analysisParameterLimit }],
      // [correctness] Off (compatibility): Listed alias classifiers use hoisted mutually recursive function declarations; variable ordering remains checked.
      "@typescript-eslint/no-use-before-define": ["error", { functions: false, typedefs: false }],
      // [architectural-prevention] Off (compatibility): Parser-owned node and scope graphs have mutable native declarations; these adapters retain parameter-property mutation checks without claiming deep immutability.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [architectural-prevention] Off (scope): Complexity 30 permits these reviewed syntax-dispatch algorithms while retaining a branching ceiling.
      "complexity": ["error", classifierComplexityLimit],
      // [architectural-prevention] Off (scope): A 700-line ceiling retains the dictionary and widening classifiers together while bounding module growth.
      "max-lines": ["error", dictionaryFileLineLimit],
      // [architectural-prevention] Off (scope): A 100-line ceiling retains cohesive alias classifiers while bounding individual review units.
      "max-lines-per-function": ["error", classifierLineLimit],
      // [architectural-prevention] Off (scope): Forty statements retain complete syntax-classification branches while bounding combined responsibilities.
      "max-statements": ["error", dictionaryStatementLimit],
      // [correctness] Off (compatibility): Listed unary syntax predicates ignore collection callback indexes and collection arguments; receiver binding remains checked.
      "unicorn/no-array-callback-reference": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
      // [correctness] Off (compatibility): Listed type classifiers recurse through nested syntax and alias substitutions; recursion cost remains subject to finite complexity and statement limits.
      "unicorn/no-useless-recursion": "off",
      // [standardization] Off (scope): Listed classifiers retain explicit boolean and absent-node ternaries; equivalent logical-operator spelling remains a review decision.
      "unicorn/prefer-logical-operator-over-ternary": "off",
    },
  },
  {
    files: ["src/eslint/local/shared/function-parameters.ts"],
    rules: {
      // [standardization] Off (compatibility): Listed parser adapters use PascalCase visitor keys and uppercase grammar constants; quoted external keys retain their required spelling while ordinary identifiers still follow naming checks.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase"], selector: "import" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }],
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [architectural-prevention] Off (scope): Twenty-five statements retain the listed traversal algorithms while bounding combined responsibilities.
      "max-statements": ["error", traversalStatementLimit],
      // [standardization] Off (scope): Listed syntax predicates retain grammar-operation names with typed boolean returns; boolean naming remains a review decision.
      "unicorn/consistent-boolean-name": "off",
      // [correctness] Off (compatibility): Listed unary syntax predicates ignore collection callback indexes and collection arguments; receiver binding remains checked.
      "unicorn/no-array-callback-reference": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
      // [correctness] Off (compatibility): Listed type classifiers recurse through nested syntax and alias substitutions; recursion cost remains subject to finite complexity and statement limits.
      "unicorn/no-useless-recursion": "off",
      // [standardization] Off (scope): Listed classifiers retain explicit boolean and absent-node ternaries; equivalent logical-operator spelling remains a review decision.
      "unicorn/prefer-logical-operator-over-ternary": "off",
    },
  },
  {
    files: ["src/eslint/local/shared/lexical-type-parameters.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): Parser-owned node and scope graphs have mutable native declarations; these adapters retain parameter-property mutation checks without claiming deep immutability.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [architectural-prevention] Off (compatibility): Listed boundary adapters classify parser child nodes, literal property names and schema-validated options before use; arbitrary downstream narrowing remains prohibited elsewhere.
      "local/no-runtime-typeof": "off",
      // [architectural-prevention] Off (scope): Twenty-five statements retain the listed traversal algorithms while bounding combined responsibilities.
      "max-statements": ["error", traversalStatementLimit],
    },
  },
  {
    files: ["src/eslint/local/shared/reflect-method.ts"],
    rules: {
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["src/eslint/local/shared/scope.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): Parser-owned node and scope graphs have mutable native declarations; these adapters retain parameter-property mutation checks without claiming deep immutability.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [correctness] Off (compatibility): Listed root and absent-field guards intentionally equate null with undefined; all other equality comparisons remain strict.
      "eqeqeq": ["error", "always", { null: "ignore" }],
      // [correctness] Off (compatibility): Listed root and absent-field guards intentionally equate null with undefined; other coercive comparisons remain errors.
      "no-eq-null": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
    },
  },
  {
    files: ["src/eslint/local/shared/type-alias-resolution.ts"],
    rules: {
      // [architectural-prevention] Off (scope): Four parameters keep parser nodes and lexical analysis state explicit in these reviewed helpers while retaining an arity ceiling.
      "@typescript-eslint/max-params": ["error", { max: analysisParameterLimit }],
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [architectural-prevention] Off (compatibility): Listed boundary adapters classify parser child nodes, literal property names and schema-validated options before use; arbitrary downstream narrowing remains prohibited elsewhere.
      "local/no-runtime-typeof": "off",
      // [architectural-prevention] Off (scope): A 350-line ceiling retains lexical bindings and alias environments together while bounding module growth.
      "max-lines": ["error", aliasFileLineLimit],
      // [architectural-prevention] Off (scope): Twenty-five statements retain the listed traversal algorithms while bounding combined responsibilities.
      "max-statements": ["error", traversalStatementLimit],
      // [standardization] Off (scope): Listed syntax predicates retain grammar-operation names with typed boolean returns; boolean naming remains a review decision.
      "unicorn/consistent-boolean-name": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
    },
  },
  {
    files: ["src/eslint/local/test/rule-tester.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): Native RuleTester configuration and case inputs use mutable framework types; the adapter does not mutate caller-owned inputs.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [correctness] Off (scope): These native test entry points import the dev-only Vitest runner; installed copies require development dependencies and other unpublished imports remain checked.
      "n/no-unpublished-import": ["error", { allowModules: ["vitest"] }],
    },
  },
  {
    files: ["src/eslint/local/types.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["src/eslint/local/vendor/eslint-stylistic/padding-line-ast.ts"],
    rules: {
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["src/eslint/local/vendor/eslint-stylistic/padding-line-between-statements.ts"],
    rules: {
      // [architectural-prevention] Off (scope): Four parameters keep parser nodes and lexical analysis state explicit in these reviewed helpers while retaining an arity ceiling.
      "@typescript-eslint/max-params": ["error", { max: analysisParameterLimit }],
      // [standardization] Off (compatibility): The upstream regex callback retains its unused _ parameter, selector methods retain quoted keys and JSON Schema retains $defs and $ref; other names remain checked.
      "@typescript-eslint/naming-convention": ["error", { format: ["camelCase"], selector: "default" }, { format: ["PascalCase"], selector: "typeLike" }, { format: ["camelCase", "PascalCase", "UPPER_CASE"], selector: "variable" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralMethod" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralMethod" }, { format: ["camelCase", "PascalCase"], selector: "objectLiteralProperty" }, { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" }, { filter: String.raw`^\$(defs|ref)$`, format: [], selector: "objectLiteralProperty" }, { filter: "^_$", format: [], selector: "parameter" }],
      // [standardization] Off (scope): Two denotes reducer arity or adjacent token boundaries in these reviewed algorithms; other numeric fixtures still require names.
      "@typescript-eslint/no-magic-numbers": ["error", { ignore: [-1, 0, 1, pairSize] }],
      // [standardization] Off (scope): Listed visitors read parser fields directly to retain discriminant narrowing beside dependent accesses; extraction style remains a review decision.
      "@typescript-eslint/prefer-destructuring": "off",
      // [standardization] Off (scope): Listed visitors keep explicit short-circuit parser guards; equivalent optional-chain spelling remains a review decision.
      "@typescript-eslint/prefer-optional-chain": "off",
      // [architectural-prevention] Off (compatibility): Listed adapters accept mutable parser-owned nodes, scopes and contexts without claiming deep immutability; parameter-property mutation remains checked.
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      // [standardization] Off (scope): This reviewed engine retains named grammar regular expressions beside its other lexical patterns; boundary-test spelling remains a review decision here.
      "@typescript-eslint/prefer-string-starts-ends-with": "off",
      // [standardization] Off (compatibility): The upstream regex callback retains its unused _ parameter; other identifier lengths remain checked.
      "id-length": ["error", { exceptions: ["_"], min: 2 }],
      // [architectural-prevention] Off (compatibility): Listed boundary adapters classify parser child nodes, literal property names and schema-validated options before use; arbitrary downstream narrowing remains prohibited elsewhere.
      "local/no-runtime-typeof": "off",
      // [architectural-prevention] Off (scope): An 1100-line ceiling preserves the reviewed upstream grammar table while bounding this vendored module.
      "max-lines": ["error", grammarFileLineLimit],
      // [architectural-prevention] Off (scope): A 350-line ceiling preserves the reviewed matcher and visitor lifecycle while bounding each function.
      "max-lines-per-function": ["error", grammarFunctionLineLimit],
      // [architectural-prevention] Off (scope): Twenty-five statements retain the listed traversal algorithms while bounding combined responsibilities.
      "max-statements": ["error", traversalStatementLimit],
      // [standardization] Off (compatibility): Listed rule schemas and visitor descriptors group lifecycle fields rather than alphabetizing them; ordinary object layout in these files remains a review decision.
      "sort-keys": "off",
      // [standardization] Off (scope): Listed syntax predicates retain grammar-operation names with typed boolean returns; boolean naming remains a review decision.
      "unicorn/consistent-boolean-name": "off",
      // [standardization] Off (compatibility): The upstream engine retains prevNode and nextNode grammar names for patch comparison; other implementation files retain the naming convention.
      "unicorn/name-replacements": "off",
      // [standardization] Off (compatibility): ESTree and lexical scope APIs use null for absent nodes; additional sentinel choices in listed adapters require review.
      "unicorn/no-null": "off",
      // [correctness] Off (covered): The typed replacement function returns only captured whitespace; it is not an interpolated replacement string.
      "unicorn/no-unsafe-string-replacement": "off",
      // [correctness] Off (compatibility): Listed type classifiers recurse through nested syntax and alias substitutions; recursion cost remains subject to finite complexity and statement limits.
      "unicorn/no-useless-recursion": "off",
      // [standardization] Off (scope): Listed classifiers retain explicit boolean and absent-node ternaries; equivalent logical-operator spelling remains a review decision.
      "unicorn/prefer-logical-operator-over-ternary": "off",
      // [standardization] Off (scope): Array.from materializes the grammar kind iterable once during matcher construction.
      "unicorn/prefer-spread": "off",
    },
  },
  {
    files: ["src/eslint/local/vendor/eslint-stylistic/padding-line-options.d.ts"],
    rules: {
      // [standardization] Off (scope): Listed parser helpers export declarations beside their contracts; export grouping remains a review decision.
      "import-x/group-exports": "off",
    },
  },
  {
    files: ["src/eslint/node/index.ts"],
    rules: {
      // [standardization] Off (compatibility): Use camelCase bindings and properties and PascalCase types; human-approved exceptions in this package's policy source allow external object-literal keys requiring quotes and the exact Node global keys __dirname and __filename.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
        { filter: "^__(dirname|filename)$", format: [], selector: "objectLiteralProperty" },
      ],
      // [standardization] Off (compatibility): Human-approved n import and plugin registration match eslint-plugin-n's default export name as required by import-x/no-rename-default; retain the two-character minimum for other identifiers in this module.
      "id-length": ["error", { exceptions: ["n"], min: 2 }],
    },
  },
  {
    files: ["src/eslint/react/index.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/test/consumer.test.ts"],
    rules: {
      // [architectural-prevention] Off (scope): Seventy-five lines bound the reviewed consumer suite while retaining its related policy cases together.
      "max-lines-per-function": ["error", compactVisitorLineLimit],
      // [architectural-prevention] Off (scope): Twelve statements keep temporary files, compiler setup, diagnostics and cleanup under one fixture lifetime.
      "max-statements": ["error", fixtureStatementLimit],
      // [correctness] Off (scope): These native test entry points import the dev-only Vitest runner; installed copies require development dependencies and other unpublished imports remain checked.
      "n/no-unpublished-import": ["error", { allowModules: ["vitest"] }],
    },
  },
  {
    files: ["src/eslint/typescript/compiler-delegations.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/typescript/core-rule-replacements.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/typescript/index.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/typescript/type-conventions.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/typescript/type-safety.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
  {
    files: ["src/eslint/vitest/index.ts"],
    rules: {
      // [standardization] Off (compatibility): Policy dictionaries retain quote-required external rule, plugin and settings keys; ordinary identifiers follow the package naming convention.
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase"], selector: "default" },
        { format: ["PascalCase"], selector: "typeLike" },
        { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      ],
    },
  },
);

export default config;
