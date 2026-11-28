import { noManualEffectErrorTagRule } from './rules/no-manual-effect-error-tag.ts';
import { noManualTagComparisonRule } from './rules/no-manual-tag-comparison.ts';
import { noManualTaggedConstructionRule } from './rules/no-manual-tagged-construction.ts';
import { noServiceConstructorImportsRule } from './rules/no-service-constructor-imports.ts';
import { preferEffectMatchRule } from './rules/prefer-effect-match.ts';

import type { TSESLint } from '@typescript-eslint/utils';
import type { ESLint, Linter } from 'eslint';

const plugin: TSESLint.FlatConfig.Plugin = {
  meta: { name: '@asmundwien/lint/local-effect' },
  rules: {
    'no-manual-effect-error-tag': noManualEffectErrorTagRule,
    'no-manual-tag-comparison': noManualTagComparisonRule,
    'no-manual-tagged-construction': noManualTaggedConstructionRule,
    'no-service-constructor-imports': noServiceConstructorImportsRule,
    'prefer-effect-match': preferEffectMatchRule,
  },
};

const effect: Linter.Config = {
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
  name: '@asmundwien/lint/local-effect',
  // SAFETY: Native rule cases verify this JavaScript plugin; the two libraries expose different language-neutral plugin declarations.
  plugins: { 'local-effect': plugin as ESLint.Plugin },
  rules: {
    // [architectural-prevention] Recover tagged failures through selective Effect error handlers instead of branching inside broad catches.
    'local-effect/no-manual-effect-error-tag': 'error',
    // [standardization] Match tagged variants through Match or Predicate helpers rather than comparing _tag directly.
    'local-effect/no-manual-tag-comparison': 'error',
    // [correctness] Construct tagged values through their owning constructors rather than writing literal _tag objects.
    'local-effect/no-manual-tagged-construction': 'error',
    // [architectural-prevention] Runtime consumers use owning Layers rather than importing project service constructors; focused tests may import constructors.
    'local-effect/no-service-constructor-imports': 'error',
    // [standardization] Express repeated literal branching through Effect Match rather than chained ternaries over the same value.
    'local-effect/prefer-effect-match': 'error',
  },
};

export { effect };
