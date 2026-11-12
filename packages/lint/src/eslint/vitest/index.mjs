import plugin from '@vitest/eslint-plugin';
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
  files: testFiles,
  ignores: runnerConfigFiles,
  name: '@asmundwien/lint/vitest',
  plugins: { vitest: plugin },
  rules: {
    // [standardization] Off (scope): Tests keep literal inputs, expected results and boundary values beside assertions rather than naming every numeric fixture.
    'no-magic-numbers': 'off',
    // [standardization] Require explicit runner API imports, including globalThis and global access, while allowing fixture imports that Vitest's import-only rule would reject.
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
    // [enforcement-integrity] Reject skipIf and runIf on ordinary and fixture APIs so runtime conditions cannot silently omit registered verification.
    'no-restricted-properties': ['error', {
      message: 'Register unconditional test cases. Put environment-specific suites in scoped Vitest projects.',
      property: 'skipIf',
    }, {
      message: 'Register unconditional test cases. Put environment-specific suites in scoped Vitest projects.',
      property: 'runIf',
    }],
    // [enforcement-integrity] Reject named test and suite registration under branches so generated verification does not disappear with runtime inputs.
    'no-restricted-syntax': ['error', {
      message: 'Register tests and suites unconditionally. Use parameterized cases or scoped Vitest projects.',
      selector: ':matches(IfStatement, SwitchCase, ConditionalExpression, LogicalExpression) CallExpression:matches([callee.name=/^(test|it|describe|suite)$/], [callee.object.name=/^(test|it|describe|suite)$/])',
    }],

    // [standardization] Use each rather than for for both case and suite tables so generated parameterized declarations share one searchable API.
    'vitest/consistent-each-for': ['error', {
      describe: 'each',
      it: 'each',
      suite: 'each',
      test: 'each',
    }],
    // [standardization] Recognize both test and spec suffixes across supported source extensions, but require test so generated case files have one suffix.
    'vitest/consistent-test-filename': ['error', {
      allTestPattern: String.raw`.*\.(?:test|spec)\.(?:[jt]sx?|[cm][jt]s)$`,
      pattern: String.raw`.*\.test\.(?:[jt]sx?|[cm][jt]s)$`,
    }],
    // [standardization] Use test inside and outside describes so generated case declarations have one searchable spelling.
    'vitest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
    // [standardization] Use vi rather than vitest for spies and doubles so generated test utilities have one searchable receiver name.
    'vitest/consistent-vitest-vi': ['error', { fn: 'vi' }],
    // [enforcement-integrity] Require recognizable assertions, accepting value and type assertion APIs plus dotted expect calls for test-context expect, but not arbitrary helper names.
    'vitest/expect-expect': ['error', {
      assertFunctionNames: ['expect', 'assert', 'expectTypeOf', 'assertType', '**.expect'],
    }],
    // [standardization] Place hoisted APIs first so source order communicates that their setup executes before ordinary statements.
    'vitest/hoisted-apis-on-top': 'error',
    // [architectural-prevention] Three describe levels are a chosen review ceiling for suite nesting, not proof that a test structure is simple.
    'vitest/max-nested-describe': ['error', { max: 3 }],
    // [standardization] Use canonical matcher names so generated assertions remain searchable without deprecated alias spellings.
    'vitest/no-alias-methods': 'error',
    // [enforcement-integrity] Commented-out cases look like retained coverage but execute no regression check.
    'vitest/no-commented-out-tests': 'error',
    // [enforcement-integrity] Conditional assertions may never execute; assertion-count guards do not waive the requirement to run each declared check.
    'vitest/no-conditional-expect': ['error', { expectAssertions: false }],
    // [architectural-prevention] Branch-free test bodies keep the exercised scenario visible instead of embedding multiple execution paths in one case.
    'vitest/no-conditional-in-test': 'error',
    // [enforcement-integrity] Conditional registration lets the current environment silently remove verification from a run.
    'vitest/no-conditional-tests': 'error',
    // [enforcement-integrity] Skipped and callback-free cases execute no check despite declaring a test contract.
    'vitest/no-disabled-tests': 'error',
    // [standardization] Keep one hook of each kind per suite so generated setup and teardown do not require tracking duplicate lifecycle blocks.
    'vitest/no-duplicate-hooks': 'error',
    // [enforcement-integrity] Focused cases can omit the rest of the suite while the selected cases still pass.
    'vitest/no-focused-tests': 'error',
    // [standardization] Distinct sibling titles let reviewers identify failures and their external snapshots without ambiguous case names.
    'vitest/no-identical-title': 'error',
    // [enforcement-integrity] Interpolated snapshot expectations can derive the expected output from runtime data instead of checking a fixed contract.
    'vitest/no-interpolation-in-snapshots': 'error',
    // [architectural-prevention] Ban module replacement through mock, doMock and importMock so generated tests expose doubles through explicit dependency ownership.
    'vitest/no-restricted-vi-methods': ['error', {
      doMock: 'Pass a test double through an explicit parameter, constructor or factory dependency instead of replacing a module with vi.doMock().',
      importMock: 'Import the real module and pass test doubles through explicit dependencies instead of loading an automatically mocked module.',
      mock: 'Pass a test double through an explicit parameter, constructor or factory dependency instead of replacing a module with vi.mock().',
    }],
    // [correctness] Assertions in suite-definition code run outside the intended test lifecycle and can fail before a case owns the failure.
    'vitest/no-standalone-expect': 'error',
    // [standardization] Finish test bodies after their awaited checks rather than returning assertion expressions or introducing early exits.
    'vitest/no-test-return-statement': 'error',
    // [standardization] Assert promises directly instead of generating redundant async expectation wrappers that obscure the tested operation.
    'vitest/no-unneeded-async-expect-function': 'error',
    // [standardization] Separate suite declarations, hooks and cases with blank lines so reviewers can scan generated test structure consistently.
    'vitest/padding-around-all': 'error',
    // [standardization] Keep adjacent assertions together and separate them from setup and actions so the checked contract is easy to locate.
    'vitest/padding-around-expect-groups': 'error',
    // [standardization] Express matching once-and-arguments checks with one matcher so the generated assertion names the complete invocation contract.
    'vitest/prefer-called-exactly-once-with': 'error',
    // [standardization] Use count matchers for both one and many calls so generated invocation counts have one representation.
    'vitest/prefer-called-times': 'error',
    // [enforcement-integrity] Positive call checks must name arguments so an unrelated invocation cannot satisfy the intended interaction contract.
    'vitest/prefer-called-with': 'error',
    // [standardization] Use comparison matchers so generated failures report compared operands rather than only a boolean result.
    'vitest/prefer-comparison-matcher': 'error',
    // [standardization] Use runner-managed parameterized cases instead of repeated declarations so each input row has its own reported case.
    'vitest/prefer-each': 'error',
    // [standardization] Use equality matchers so generated failures report both compared values rather than only the comparison result.
    'vitest/prefer-equality-matcher': 'error',
    // [enforcement-integrity] Require assertion-count guards for callback and loop assertions that may execute zero times, without imposing counts on every straight-line case.
    'vitest/prefer-expect-assertions': ['error', {
      onlyFunctionsWithExpectInCallback: true,
      onlyFunctionsWithExpectInLoop: true,
    }],
    // [standardization] Use resolves assertions rather than awaiting inside expect so generated promise checks retain matcher-specific failure context.
    'vitest/prefer-expect-resolves': 'error',
    // [standardization] Use type matchers rather than comparing typeof strings so generated failures identify the expected runtime type directly.
    'vitest/prefer-expect-type-of': 'error',
    // [standardization] Write hooks in beforeAll, beforeEach, afterEach and afterAll order so generated suites use one lifecycle layout.
    'vitest/prefer-hooks-in-order': 'error',
    // [standardization] Put hooks before cases so reviewers encounter lifecycle setup before the tests that depend on it.
    'vitest/prefer-hooks-on-top': 'error',
    // [standardization] Start case titles with lowercase prose, but allow describe titles to retain public symbol capitalization.
    'vitest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],
    // [standardization] Use promise-return shorthand for doubles so generated setup states resolution or rejection without manual Promise callbacks.
    'vitest/prefer-mock-promise-shorthand': 'error',
    // [standardization] Use return-value shorthand for constant doubles so generated setup does not hide a fixed value inside an implementation callback.
    'vitest/prefer-mock-return-shorthand': 'error',
    // [standardization] Require a hint on every external snapshot assertion so generated snapshot names identify the checked output.
    'vitest/prefer-snapshot-hint': ['error', 'always'],
    // [standardization] Use vi.spyOn for method spies so generated tests use Vitest's restoration-capable API rather than direct replacement.
    'vitest/prefer-spy-on': 'error',
    // [enforcement-integrity] Exact boolean expectations reject unrelated truthy or falsy values that could otherwise satisfy the test.
    'vitest/prefer-strict-boolean-matchers': 'error',
    // [enforcement-integrity] Strict equality checks retain distinctions in prototypes, sparse arrays and undefined-valued properties that loose structural checks can miss.
    'vitest/prefer-strict-equal': 'error',
    // [standardization] Use dedicated primitive and absent-value matchers so generated assertions name the specific value contract.
    'vitest/prefer-to-be': 'error',
    // [standardization] Use containment matchers so generated failures show the missing item rather than only an includes result.
    'vitest/prefer-to-contain': 'error',
    // [standardization] Check invocation counts through matchers instead of coupling generated assertions to the mock.calls array representation.
    'vitest/prefer-to-have-been-called-times': 'error',
    // [standardization] Use length matchers so generated failures include the collection and its expected size.
    'vitest/prefer-to-have-length': 'error',
    // [enforcement-integrity] Unawaited polling or element assertions can outlive the test and leave their verification unfinished.
    'vitest/require-awaited-expect-poll': 'error',
    // [architectural-prevention] Put lifecycle setup in hooks so generated suites make ownership and execution timing visible instead of mutating state during registration.
    'vitest/require-hook': 'error',
    // [correctness] Concurrent snapshots need the current test's expect so Vitest does not attribute a snapshot to another running case.
    'vitest/require-local-test-context-for-concurrent-snapshots': 'error',
    // [enforcement-integrity] Positive throw assertions must identify the expected error so an unrelated exception cannot satisfy the test.
    'vitest/require-to-throw-message': 'error',
    // [standardization] Use one top-level subject suite per file so generated cases have a predictable location; nested suites group its scenarios.
    'vitest/require-top-level-describe': ['error', { maxNumberOfTopLevelDescribes: 1 }],
    // [correctness] Describe callbacks must register cases synchronously with a supported signature or Vitest can miss cases or reject the suite.
    'vitest/valid-describe-callback': 'error',
    // [standardization, enforcement-integrity] Await async assertions to finish verification; allow a second expect argument for Vitest's assertion message or polling options.
    'vitest/valid-expect': ['error', { alwaysAwait: true, maxArgs: 2, minArgs: 1 }],
    // [enforcement-integrity] Assertion-bearing promise chains must finish before the runner marks verification complete.
    'vitest/valid-expect-in-promise': 'error',
    // [standardization] Require nonempty titles without stray whitespace or repeated test-function prefixes so generated case names remain readable and searchable.
    'vitest/valid-title': 'error',
    // [enforcement-integrity] Placeholder cases execute no regression check and cannot stand in for completed verification.
    'vitest/warn-todo': 'error',
  },
}, {
  files: typedTestFiles,
  ignores: runnerConfigFiles,
  name: '@asmundwien/lint/vitest/typescript',
  rules: {
    // [standardization] Off (scope): Typed tests keep literal inputs, expected results and boundary values beside assertions rather than naming every numeric fixture.
    '@typescript-eslint/no-magic-numbers': 'off',
    // [correctness] Off (covered): With type-aware linting, vitest/unbound-method replaces this check while permitting method inspection in non-throw matchers and vi.mocked without invoking the method.
    '@typescript-eslint/unbound-method': 'off',
    // [standardization] Use the tested function or class symbol as its suite title so generated names track API renames instead of retaining stale prose.
    'vitest/prefer-describe-function-title': 'error',
    // [standardization] Use vi.mocked for typed doubles instead of assertions that manufacture a Mock signature outside the selected Vitest API.
    'vitest/prefer-vi-mocked': 'error',
    // [standardization] Give vi.fn an explicit dependency signature; leave importActual and importMock outside this signature convention because they load modules rather than define callable doubles.
    'vitest/require-mock-type-parameters': ['error', { checkImportFunctions: false }],
    // [correctness] Preserve receiver checks outside supported matcher inspection, including static methods whose implementations can depend on this.
    'vitest/unbound-method': ['error', { ignoreStatic: false }],
  },
  settings: { vitest: { typecheck: true } },
}, {
  files: [...testFiles, '**/__snapshots__/*.snap'],
  ignores: runnerConfigFiles,
  linterOptions: {
    // [enforcement-integrity] Block source-level configuration in snapshot files so generated output cannot weaken the surrounding test policy.
    noInlineConfig: true,
    // [enforcement-integrity] Set unused-suppression diagnostics to errors; noInlineConfig is the active source-suppression protection.
    reportUnusedDisableDirectives: 'error',
    // [enforcement-integrity] Set unused inline-policy diagnostics to errors; noInlineConfig remains the active source-configuration protection.
    reportUnusedInlineConfigs: 'error',
  },
  name: '@asmundwien/lint/vitest/snapshots',
  plugins: { vitest: plugin },
  rules: {
    // [architectural-prevention] Snapshot ceilings of 50 external lines and 20 inline lines are chosen review limits to discourage opaque expected output, not guarantees of useful checks.
    'vitest/no-large-snapshots': ['error', { inlineMaxSize: 20, maxSize: 50 }],
  },
});

export { vitest };
