import { noArrayFilterMapRule } from './rules/no-array-filter-map.ts';
import { noChainedTypeAssertionsRule } from './rules/no-chained-type-assertions.ts';
import { noConditionalEmptyObjectSpreadRule } from './rules/no-conditional-empty-object-spread.ts';
import { noKnownValueWideningRule } from './rules/no-known-value-widening.ts';
import { noModuleMockingRule } from './rules/no-module-mocking.ts';
import { noObjectParametersRule } from './rules/no-object-parameters.ts';
import { noReduceAccumulatorCopyRule } from './rules/no-reduce-accumulator-copy.ts';
import { noReflectApplyRule } from './rules/no-reflect-apply.ts';
import { noReflectGetRule } from './rules/no-reflect-get.ts';
import { noRuntimeTypeofRule } from './rules/no-runtime-typeof.ts';
import { noForbiddenTermInSymbolNamesRule } from './rules/no-shape-in-symbol-names.ts';
import { noUnknownParametersRule } from './rules/no-unknown-parameters.ts';
import { noUnknownReturnsRule } from './rules/no-unknown-returns.ts';
import { noUnknownTypeAliasesRule } from './rules/no-unknown-type-aliases.ts';
import { noUnsafeDictionaryTypeRule } from './rules/no-unsafe-dictionary-type.ts';
import { noWidenThenAssertRule } from './rules/no-widen-then-assert.ts';
import { requireReadableSpacingRule } from './rules/require-readable-spacing.ts';
import { requireSafetyCommentForTypeAssertionRule } from './rules/require-safety-comment-for-type-assertion.ts';

import type { TSESLint } from '@typescript-eslint/utils';
import type { ESLint, Linter } from 'eslint';

const plugin: TSESLint.FlatConfig.Plugin = {
  meta: { name: '@asmundwien/lint/local' },
  rules: {
    'no-array-filter-map': noArrayFilterMapRule,
    'no-chained-type-assertions': noChainedTypeAssertionsRule,
    'no-conditional-empty-object-spread': noConditionalEmptyObjectSpreadRule,
    'no-known-value-widening': noKnownValueWideningRule,
    'no-module-mocking': noModuleMockingRule,
    'no-object-parameters': noObjectParametersRule,
    'no-reduce-accumulator-copy': noReduceAccumulatorCopyRule,
    'no-reflect-apply': noReflectApplyRule,
    'no-reflect-get': noReflectGetRule,
    'no-runtime-typeof': noRuntimeTypeofRule,
    'no-shape-in-symbol-names': noForbiddenTermInSymbolNamesRule,
    'no-unknown-parameters': noUnknownParametersRule,
    'no-unknown-returns': noUnknownReturnsRule,
    'no-unknown-type-aliases': noUnknownTypeAliasesRule,
    'no-unsafe-dictionary-type': noUnsafeDictionaryTypeRule,
    'no-widen-then-assert': noWidenThenAssertRule,
    'require-readable-spacing': requireReadableSpacingRule,
    'require-safety-comment-for-type-assertion': requireSafetyCommentForTypeAssertionRule,
  },
};

const local: Linter.Config = {
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
  name: '@asmundwien/lint/local',
  // SAFETY: Native rule cases verify this JavaScript plugin; the two libraries expose different language-neutral plugin declarations.
  plugins: { local: plugin as ESLint.Plugin },
  rules: {
    // [architectural-prevention] Avoid adjacent eager array passes while retaining lazy iterator pipelines and their callback semantics.
    'local/no-array-filter-map': 'error',
    // [enforcement-integrity] Reject assertion chains that manufacture a type through an intermediate unchecked contract.
    'local/no-chained-type-assertions': 'error',
    // [standardization] Construct optional fields explicitly rather than hiding omission in a conditional empty-object spread.
    'local/no-conditional-empty-object-spread': 'error',
    // [correctness] Preserve known keys and values rather than widening them into unknown or open object contracts.
    'local/no-known-value-widening': 'error',
    // [architectural-prevention] Pass doubles through explicit dependencies instead of replacing Vitest or Jest modules.
    'local/no-module-mocking': 'error',
    // [correctness] Require named input contracts instead of accepting arbitrary object values.
    'local/no-object-parameters': 'error',
    // [architectural-prevention] Mutate fresh reducer accumulators instead of repeatedly copying accumulated values.
    'local/no-reduce-accumulator-copy': 'error',
    // [correctness] Call typed functions directly instead of bypassing their call contracts through Reflect.apply.
    'local/no-reflect-apply': 'error',
    // [correctness] Use typed property access or boundary parsing instead of unchecked Reflect.get calls.
    'local/no-reflect-get': 'error',
    // [architectural-prevention] Parse boundary values instead of ad hoc runtime typeof narrowing; existence probes remain valid.
    'local/no-runtime-typeof': 'error',
    // [standardization] Name owned symbols for their domain meaning rather than including the word shape.
    'local/no-shape-in-symbol-names': 'error',
    // [architectural-prevention] Keep unknown inputs at predicate boundaries or explicit cause parameters.
    'local/no-unknown-parameters': 'error',
    // [correctness] Return explicit value contracts instead of unknown or promises of unknown.
    'local/no-unknown-returns': 'error',
    // [correctness] Give aliases meaningful contracts instead of resolving them to unknown.
    'local/no-unknown-type-aliases': 'error',
    // [correctness] Define dictionary values precisely instead of using unchecked or non-specific value contracts.
    'local/no-unsafe-dictionary-type': 'error',
    // [enforcement-integrity] Preserve type evidence instead of erasing it and asserting a narrower contract later.
    'local/no-widen-then-assert': 'error',
    // [standardization] Separate declarations and control flow with blank lines while retaining compact bindings and overloads.
    'local/require-readable-spacing': 'error',
    // [enforcement-integrity] Require a nearby nonempty SAFETY justification for every non-const type assertion.
    'local/require-safety-comment-for-type-assertion': 'error',
  },
};

export { local };
