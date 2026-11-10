import { defineConfig } from 'eslint/config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import unicorn from 'eslint-plugin-unicorn';
import ts from 'typescript-eslint';

const typescript = defineConfig({
  name: '@asmundwien/lint/typescript',
  files: ['**/*.{ts,tsx,mts,cts}'],
  extends: [ts.configs.all, ts.configs.strictTypeChecked, ts.configs.stylisticTypeChecked],
  languageOptions: {
    parser: ts.parser,
    sourceType: 'module',
    parserOptions: { projectService: true },
  },
  plugins: { '@typescript-eslint': ts.plugin, unicorn },
  settings: {
    'import-x/extensions': ['.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs'],
    'import-x/resolver-next': [createTypeScriptImportResolver()],
  },
  rules: {
    // Requiring return annotations rejects inference; retain inference and type-aware safety checks.
    '@typescript-eslint/explicit-function-return-type': 'off',
    // Exported functions may expose inferred signatures instead of repeating their return types.
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // @typescript-eslint/naming-convention handles typed selectors, components and underscores.
    camelcase: 'off',
    // TypeScript checks type/value export namespaces that import-x/named cannot fully model.
    'import-x/named': 'off',
    // @typescript-eslint/consistent-type-imports owns separate import type declarations.
    'import-x/consistent-type-specifier-style': 'off',
    // @typescript-eslint/member-ordering handles overloads and accessibility without Unicorn groups.
    'unicorn/consistent-class-member-order': 'off',

    // The base disables this typed check; Project Service permits warnings for non-function verbs.
    'unicorn/no-non-function-verb-prefix': 'warn',
    // Upstream errors block style-only changes; warn while keeping type imports separate.
    '@typescript-eslint/consistent-type-imports': ['warn', {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports',
    }],
    // Defaults reject PascalCase components; allow component functions and values, warn otherwise.
    '@typescript-eslint/naming-convention': ['warn', {
      selector: 'default',
      format: ['camelCase'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    }, {
      selector: 'import',
      format: ['camelCase', 'PascalCase'],
    }, {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    }, {
      selector: 'typeLike',
      format: ['PascalCase'],
    }, {
      selector: 'function',
      format: ['camelCase', 'PascalCase'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    }],
    // Default errors include inferred parameters; warn only for mutable explicit parameter types.
    '@typescript-eslint/prefer-readonly-parameter-types': ['warn', { ignoreInferredTypes: true }],
    // The strict preset awaits only for error handling; await every returned promise for async stacks.
    '@typescript-eslint/return-await': ['error', 'always'],
  },
});

export { typescript };
