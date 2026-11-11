import vitestPlugin from '@vitest/eslint-plugin';
import { defineConfig } from 'eslint/config';

const testFiles = [
  '**/*.{test,spec}.{js,jsx,mjs,cjs,ts,tsx,mts,cts}',
  '**/{test,tests,__tests__}/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}',
];

const typedTestFiles = [
  '**/*.{test,spec}.{ts,tsx,mts,cts}',
  '**/{test,tests,__tests__}/**/*.{ts,tsx,mts,cts}',
];

// Runner configuration remains configuration even when it lives beside test files.
const runnerConfigFiles = [
  '**/{vitest,vite,jest,playwright,cypress,karma,ava}.config.*',
  '**/vitest.workspace.*',
  '**/.mocharc.*',
];

const vitest = defineConfig({
  name: '@asmundwien/lint/vitest',
  files: testFiles,
  ignores: runnerConfigFiles,
  plugins: { vitest: vitestPlugin },
  rules: {
    // Literal inputs, expected outputs and boundary values are the test cases themselves.
    'no-magic-numbers': 'off',
    // Core distinguishes ambient APIs from fixture imports; Vitest's import-preference rule accepts only vitest imports.
    'no-restricted-globals': ['error', {
      checkGlobalObject: true,
      globalObjects: ['global'],
      globals: [
        'suite',
        'test',
        'describe',
        'it',
        'expectTypeOf',
        'assertType',
        'expect',
        'assert',
        'chai',
        'vitest',
        'vi',
        'beforeAll',
        'afterAll',
        'beforeEach',
        'afterEach',
        'onTestFailed',
        'onTestFinished',
      ],
    }],
    // Conditional registration APIs change test coverage with runtime inputs, including fixture APIs.
    'no-restricted-properties': ['error', {
      property: 'skipIf',
      message: 'Register unconditional test cases. Put environment-specific suites in scoped Vitest projects.',
    }, {
      property: 'runIf',
      message: 'Register unconditional test cases. Put environment-specific suites in scoped Vitest projects.',
    }],
    // Register named cases outside branches so every run executes the same declared contracts.
    'no-restricted-syntax': ['error', {
      selector: ':matches(IfStatement, SwitchCase, ConditionalExpression, LogicalExpression) CallExpression:matches([callee.name=/^(test|it|describe|suite)$/], [callee.object.name=/^(test|it|describe|suite)$/])',
      message: 'Register tests and suites unconditionally. Use parameterized cases or scoped Vitest projects.',
    }],

    // Parameterized cases use each consistently; its rows become named runner-managed cases.
    'vitest/consistent-each-for': ['error', {
      test: 'each',
      it: 'each',
      describe: 'each',
      suite: 'each',
    }],
    // Suffixed test files use .test across ESM, CommonJS, JSX and TypeScript source extensions.
    'vitest/consistent-test-filename': ['error', {
      pattern: '.*\\.test\\.(?:[jt]sx?|[cm][jt]s)$',
      allTestPattern: '.*\\.(?:test|spec)\\.(?:[jt]sx?|[cm][jt]s)$',
    }],
    // Use test both inside and outside describes so test declarations have one spelling.
    'vitest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
    // Use vi for effect spies, fake clocks and explicitly passed test doubles.
    'vitest/consistent-vitest-vi': ['error', { fn: 'vi' }],
    // Recognize built-in value/type assertions and local test-context expect without generic helper names.
    'vitest/expect-expect': ['error', {
      assertFunctionNames: ['expect', 'assert', 'expectTypeOf', 'assertType', '**.expect'],
    }],
    // Hoisted setup must precede ordinary statements so the written order matches execution order.
    'vitest/hoisted-apis-on-top': 'error',
    // Three describe levels allow subject, operation and scenario without deeply nested suites.
    'vitest/max-nested-describe': ['error', { max: 3 }],
    // Canonical matcher names make assertions searchable and avoid deprecated aliases.
    'vitest/no-alias-methods': 'error',
    // Commented-out cases remove regression coverage while leaving an apparent test in the file.
    'vitest/no-commented-out-tests': 'error',
    // Every assertion must run; assertion counts do not exempt conditional expectations.
    'vitest/no-conditional-expect': ['error', { expectAssertions: false }],
    // A test body has one scenario; split branching setup into separate parameterized cases.
    'vitest/no-conditional-in-test': 'error',
    // Conditional suite or test registration makes coverage depend on the current environment.
    'vitest/no-conditional-tests': 'error',
    // Skipped and callback-free cases cannot protect the contract they claim to test.
    'vitest/no-disabled-tests': 'error',
    // One hook of each kind per suite gives setup and teardown an explicit execution order.
    'vitest/no-duplicate-hooks': 'error',
    // Focused cases silently omit the rest of the suite from CI.
    'vitest/no-focused-tests': 'error',
    // Distinct sibling titles identify failures and external snapshots without ambiguity.
    'vitest/no-identical-title': 'error',
    // Inline snapshots must contain fixed expected text rather than values computed by the test.
    'vitest/no-interpolation-in-snapshots': 'error',
    // Module replacement hides dependency contracts; pass doubles through explicit dependency seams.
    'vitest/no-restricted-vi-methods': ['error', {
      mock: 'Pass a test double through an explicit parameter, constructor or factory dependency instead of replacing a module with vi.mock().',
      doMock: 'Pass a test double through an explicit parameter, constructor or factory dependency instead of replacing a module with vi.doMock().',
      importMock: 'Import the real module and pass test doubles through explicit dependencies instead of loading an automatically mocked module.',
    }],
    // Assertions belong to executed tests or assertion helpers, not suite-definition code.
    'vitest/no-standalone-expect': 'error',
    // Test bodies finish after their awaited assertions instead of returning an assertion or exiting early.
    'vitest/no-test-return-statement': 'error',
    // Assert the original promise rather than adding an async wrapper that changes the reported stack.
    'vitest/no-unneeded-async-expect-function': 'error',
    // Separate suite declarations, hooks, cases and assertion groups with blank lines.
    'vitest/padding-around-all': 'error',
    // Adjacent assertions form one group; separate that group from setup and actions.
    'vitest/padding-around-expect-groups': 'error',
    // Combine a once-and-arguments contract into one assertion about the same invocation.
    'vitest/prefer-called-exactly-once-with': 'error',
    // Use the same count matcher for one or many calls instead of competing once spellings.
    'vitest/prefer-called-times': 'error',
    // Positive call assertions name the arguments so an unrelated invocation cannot satisfy them.
    'vitest/prefer-called-with': 'error',
    // Comparison matchers report the actual operands rather than an opaque boolean result.
    'vitest/prefer-comparison-matcher': 'error',
    // Parameterized declarations let Vitest report and rerun each row as an independent case.
    'vitest/prefer-each': 'error',
    // Equality matchers report both compared values rather than only the comparison's boolean.
    'vitest/prefer-equality-matcher': 'error',
    // Callback and loop assertions need a runtime assertion guard so empty execution cannot pass.
    'vitest/prefer-expect-assertions': ['error', {
      onlyFunctionsWithExpectInCallback: true,
      onlyFunctionsWithExpectInLoop: true,
    }],
    // Await resolves assertions so rejected promises retain their assertion context.
    'vitest/prefer-expect-resolves': 'error',
    // Type matchers state the expected runtime type directly in failure output.
    'vitest/prefer-expect-type-of': 'error',
    // Declare beforeAll, beforeEach, afterEach and afterAll in execution-lifecycle order.
    'vitest/prefer-hooks-in-order': 'error',
    // Place setup and teardown before the cases whose lifecycle they control.
    'vitest/prefer-hooks-on-top': 'error',
    // Test descriptions start with lowercase prose; describes may retain public symbol capitalization.
    'vitest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],
    // Promise-returning doubles state their resolution or rejection without a manual Promise wrapper.
    'vitest/prefer-mock-promise-shorthand': 'error',
    // Constant-return doubles state the configured return value without an implementation callback.
    'vitest/prefer-mock-return-shorthand': 'error',
    // Give each external snapshot a stable hint so snapshot failures name the checked output.
    'vitest/prefer-snapshot-hint': ['error', 'always'],
    // Effect spies use vi.spyOn so Vitest can restore the original method after the contract check.
    'vitest/prefer-spy-on': 'error',
    // Boolean contracts check true or false rather than accepting unrelated truthy or falsy values.
    'vitest/prefer-strict-boolean-matchers': 'error',
    // Structural equality includes prototypes, sparse elements and undefined-valued properties.
    'vitest/prefer-strict-equal': 'error',
    // Primitive and absent-value matchers state the checked value without loose structural equality.
    'vitest/prefer-to-be': 'error',
    // Containment matchers report the missing item instead of an includes result.
    'vitest/prefer-to-contain': 'error',
    // Call-count matchers check invocation history without inspecting the mock.calls representation.
    'vitest/prefer-to-have-been-called-times': 'error',
    // Length matchers report the collection as well as its expected size.
    'vitest/prefer-to-have-length': 'error',
    // Polling and element assertions must finish before the test completes.
    'vitest/require-awaited-expect-poll': 'error',
    // Lifecycle setup belongs in hooks rather than executable suite-definition statements.
    'vitest/require-hook': 'error',
    // Concurrent snapshots use the current test's expect so snapshots cannot attach to another test.
    'vitest/require-local-test-context-for-concurrent-snapshots': 'error',
    // Positive throw assertions identify the expected error instead of accepting every exception.
    'vitest/require-to-throw-message': 'error',
    // A file has one subject suite; nested describes separate its operations and scenarios.
    'vitest/require-top-level-describe': ['error', { maxNumberOfTopLevelDescribes: 1 }],
    // Describe callbacks register cases synchronously with the supported title/callback signature.
    'vitest/valid-describe-callback': 'error',
    // Promise chains containing assertions must finish before the runner marks a test complete.
    'vitest/valid-expect-in-promise': 'error',
    // Await async assertions and accept Vitest's optional assertion message or polling options.
    'vitest/valid-expect': ['error', { alwaysAwait: true, minArgs: 1, maxArgs: 2 }],
    // Nonempty titles have no accidental whitespace or duplicated test-function prefix.
    'vitest/valid-title': 'error',
    // Todo placeholders do not execute a regression check and cannot enter the committed suite.
    'vitest/warn-todo': 'error',
  },
}, {
  name: '@asmundwien/lint/vitest/typescript',
  files: typedTestFiles,
  ignores: runnerConfigFiles,
  settings: { vitest: { typecheck: true } },
  rules: {
    // Typed test inputs and expected boundary values need literal numbers just like JavaScript tests.
    '@typescript-eslint/no-magic-numbers': 'off',
    // Vitest's extension retains receiver checks but permits inspecting methods in supported matchers.
    '@typescript-eslint/unbound-method': 'off',
    // Public function and class subjects use the symbol so renamed APIs cannot leave stale suite titles.
    'vitest/prefer-describe-function-title': 'error',
    // Typed doubles use vi.mocked instead of assertions that fabricate a Mock signature.
    'vitest/prefer-vi-mocked': 'error',
    // Function doubles declare the dependency signature; ordinary imports remain ordinary imports.
    'vitest/require-mock-type-parameters': ['error', { checkImportFunctions: false }],
    // Preserve receiver correctness outside matcher inspection, including static methods.
    'vitest/unbound-method': ['error', { ignoreStatic: false }],
  },
}, {
  name: '@asmundwien/lint/vitest/snapshots',
  files: [...testFiles, '**/__snapshots__/*.snap'],
  ignores: runnerConfigFiles,
  plugins: { vitest: vitestPlugin },
  linterOptions: {
    noInlineConfig: true,
    reportUnusedDisableDirectives: 'error',
    reportUnusedInlineConfigs: 'error',
  },
  rules: {
    // External snapshots stay within 50 lines and inline snapshots within 20 for reviewable contracts.
    'vitest/no-large-snapshots': ['error', { maxSize: 50, inlineMaxSize: 20 }],
  },
});

export { vitest };
