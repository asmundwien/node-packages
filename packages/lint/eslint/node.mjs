import { defineConfig } from 'eslint/config';
import n from 'eslint-plugin-n';
import globals from 'globals';

const node = defineConfig({
  name: '@asmundwien/lint/node',
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
  languageOptions: {
    sourceType: 'module',
    globals: {
      ...globals.nodeBuiltin,
      __dirname: 'off',
      __filename: 'off',
      exports: 'off',
      module: 'off',
      require: 'off',
    },
  },
  plugins: { n },
  settings: { node: { version: '>=24' } },
  rules: {
    // Enable every Node check, then preserve the published ESM-specific syntax options.
    ...n.configs['flat/all'].rules,
    ...n.configs['flat/recommended-module'].rules,

    // import-x/no-commonjs rejects exports/module.exports before export style matters.
    'n/exports-style': 'off',
    // import-x/no-commonjs rejects require(), including calls outside module scope.
    'n/global-require': 'off',
    // import-x/no-commonjs rejects exports assignments before assignment safety matters.
    'n/no-exports-assign': 'off',
    // import-x/no-commonjs rejects require(); import-x/no-extraneous-dependencies checks ESM.
    'n/no-extraneous-require': 'off',
    // import-x/no-commonjs rejects require(); import-x/no-unresolved checks ESM resolution.
    'n/no-missing-require': 'off',
    // import-x/no-commonjs rejects require(), rather than allowing grouped CommonJS declarations.
    'n/no-mixed-requires': 'off',
    // import-x/no-commonjs rejects require(), including constructor calls.
    'n/no-new-require': 'off',
    // import-x/no-commonjs rejects require(), rather than allowing published CommonJS imports.
    'n/no-unpublished-require': 'off',
    // import-x/extensions checks emitted ESM extensions with TypeScript resolver aliases.
    'n/file-extension-in-import': 'off',
    // import-x/no-extraneous-dependencies checks runtime and type imports against the consumer.
    'n/no-extraneous-import': 'off',
    // import-x/no-unresolved resolves TypeScript extension aliases rejected by Node's resolver.
    'n/no-missing-import': 'off',
    // Node >=24 ESM uses import.meta.dirname/filename instead of CommonJS path globals.
    'n/no-path-concat': 'off',
    // unicorn/no-process-exit supplies the process.exit() prohibition without duplicate reports.
    'n/no-process-exit': 'off',
    // Node >=24 supports top-level await; requiring wrappers rejects native ESM initialization.
    'n/no-top-level-await': 'off',
    // Require static ESM built-in imports instead of replacing them with process.getBuiltinModule().
    'n/prefer-process-get-builtin-module': 'off',
    // unicorn/prefer-node-protocol covers imports and process.getBuiltinModule() arguments.
    'n/prefer-node-protocol': 'off',

    // The default only recognizes err; warn on unhandled callbacks named error or ending in Error.
    'n/handle-callback-err': ['warn', '^(?:error|.+Error)$'],
  },
});

export { node };
