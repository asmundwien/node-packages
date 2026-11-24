import { defineConfig } from 'eslint/config';
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
    // [correctness] Use Project Service to select each file's nearest tsconfig for type-aware rules, matching editor project discovery.
    parserOptions: { projectService: true },
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
  },
});

export { typescript };
