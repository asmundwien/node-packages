import { defineConfig } from 'eslint/config';
import { createNodeResolver, importX } from 'eslint-plugin-import-x';
import regexp from 'eslint-plugin-regexp';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

import { coreConventionRules } from './core-convention-rules.ts';
import { coreSafetyRules } from './core-safety-rules.ts';
import { importRules } from './import-rules.ts';
import { regexpRules } from './regexp-rules.ts';
import { unicornRules } from './unicorn-rules.ts';

import type { Linter } from 'eslint';

const base: Linter.Config[] = defineConfig(
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: { ecmaFeatures: { jsx: true } },
      sourceType: 'module',
    },
    linterOptions: {
      // [enforcement-integrity] Keep rule configuration outside source comments so generated code cannot bypass repository lint obligations inline.
      noInlineConfig: true,
      // [enforcement-integrity] Report obsolete disable directives as errors so stale suppression attempts do not remain in reviewed source.
      reportUnusedDisableDirectives: 'error',
      // [enforcement-integrity] Report unused inline configurations as errors so ineffective local policy changes cannot masquerade as enforced obligations.
      reportUnusedInlineConfigs: 'error',
    },
    name: '@asmundwien/lint/base',
    plugins: {
      'import-x': importX,
      regexp,
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      ...coreConventionRules,
      ...coreSafetyRules,
      ...importRules,
      ...regexpRules,
      ...unicornRules,
    },
    settings: {
      // [correctness] Configure module analysis separately from resolution so JSX imports receive export and cycle checks.
      'import-x/extensions': ['.js', '.jsx', '.mjs', '.cjs'],
      'import-x/resolver-next': [
        // [correctness] Resolve ESM imports without accepting require-only exports; runtime layers add their own conditions.
        createNodeResolver({
          conditionNames: ['import', 'default'],
          extensions: ['.mjs', '.cjs', '.js', '.jsx', '.json', '.node'],
        }),
      ],
    },
  },
  {
    files: [
      '**/eslint.config.{js,mjs,cjs,ts,mts,cts}',
      '**/vitest.config.{js,mjs,cjs,ts,mts,cts}',
    ],
    name: '@asmundwien/lint/base/framework-config-exports',
    rules: {
      // [standardization] Off (compatibility): Only eslint.config and vitest.config files with js, mjs, CJS, ts, mts, or cts extensions may use the default export their configuration loaders require.
      'import-x/no-default-export': 'off',
    },
  },
);

export { base };
