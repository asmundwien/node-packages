import { defineConfig } from 'eslint/config';
import { createNodeResolver, importX } from 'eslint-plugin-import-x';
import regexp from 'eslint-plugin-regexp';
import unicorn from 'eslint-plugin-unicorn';

import { coreConventionRules } from './core-convention-rules.mjs';
import { coreSafetyRules } from './core-safety-rules.mjs';
import { importRules } from './import-rules.mjs';
import { regexpRules } from './regexp-rules.mjs';
import { unicornRules } from './unicorn-rules.mjs';

const base = defineConfig(
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
      unicorn,
    },
    rules: {
      ...coreConventionRules,
      ...coreSafetyRules,
      ...importRules,
      ...regexpRules,
      ...unicornRules,
    },
    settings: {
      'import-x/resolver-next': [
        createNodeResolver({ extensions: ['.mjs', '.cjs', '.js', '.jsx', '.json', '.node'] }),
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
