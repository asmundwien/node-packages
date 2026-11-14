import { defineConfig } from 'eslint/config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import unicorn from 'eslint-plugin-unicorn';
import ts from 'typescript-eslint';

import { compilerDelegations } from './compiler-delegations.mjs';
import { coreRuleReplacements } from './core-rule-replacements.mjs';
import { typeConventions } from './type-conventions.mjs';
import { typeSafety } from './type-safety.mjs';

const typescript = defineConfig({
  files: ['**/*.{ts,tsx,mts,cts}'],
  languageOptions: {
    parser: ts.parser,
    // Use the consumer's compiler project for type-aware checks across its selected files.
    parserOptions: { project: ['tsconfig.json'] },
    sourceType: 'module',
  },
  name: '@asmundwien/lint/typescript',
  plugins: { '@typescript-eslint': ts.plugin, unicorn },
  rules: {
    ...compilerDelegations,
    ...coreRuleReplacements,
    ...typeConventions,
    ...typeSafety,
  },
  settings: {
    'import-x/extensions': ['.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs'],
    'import-x/resolver-next': [createTypeScriptImportResolver()],
  },
});

export { typescript };
