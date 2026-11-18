import { defineConfig } from 'eslint/config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { parser, plugin } from 'typescript-eslint';

import { compilerDelegations } from './compiler-delegations.ts';
import { coreRuleReplacements } from './core-rule-replacements.ts';
import { typeConventions } from './type-conventions.ts';
import { typeSafety } from './type-safety.ts';

import type { Linter } from 'eslint';

const typescript: Linter.Config[] = defineConfig({
  files: ['**/*.{ts,tsx,mts,cts}'],
  languageOptions: {
    parser,
    // Use the consumer's compiler project for type-aware checks across its selected files.
    parserOptions: { project: ['tsconfig.json'] },
    sourceType: 'module',
  },
  name: '@asmundwien/lint/typescript',
  plugins: { '@typescript-eslint': plugin, unicorn: eslintPluginUnicorn },
  rules: {
    ...compilerDelegations,
    ...coreRuleReplacements,
    ...typeConventions,
    ...typeSafety,
  },
  settings: {
    'import-x/extensions': ['.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs'],
    // [correctness] Resolve declarations and ESM exports without enabling CommonJS or unrelated runtime branches.
    'import-x/resolver-next': [createTypeScriptImportResolver({
      conditionNames: ['types', 'import', 'default'],
    })],
  },
});

export { typescript };
