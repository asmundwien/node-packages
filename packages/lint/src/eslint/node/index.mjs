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
  settings: { node: { version: '>=24.0.0' } },
  rules: {
    // Return after error-first callbacks so execution cannot continue after completion.
    'n/callback-return': 'error',
    // Handle callbacks named err, error or ending in Error instead of discarding failures.
    'n/handle-callback-err': ['error', '^(?:err|error|.+Error)$'],
    // Pass Error objects, not arbitrary literals, to error-first callbacks.
    'n/no-callback-literal': 'error',
    // Reject Node API deprecations independently of imported or typed @deprecated declarations.
    'n/no-deprecated-api': 'error',
    // Resolve import.meta paths with path utilities instead of platform-dependent concatenation.
    'n/no-path-concat': 'error',
    // Pass environment-derived configuration explicitly instead of reading process.env in application code.
    'n/no-process-env': 'error',
    // Use asynchronous Node APIs instead of blocking the event loop with synchronous methods.
    'n/no-sync': 'error',
    // Package executable files must survive npm's publication exclusions.
    'n/no-unpublished-bin': 'error',
    // Published ESM must not import files or dependencies that npm excludes from the package.
    'n/no-unpublished-import': 'error',
    // Restrict ECMAScript built-ins to APIs available at the Node 24.0.0 minimum.
    'n/no-unsupported-features/es-builtins': 'error',
    // Check Node-supported syntax while allowing native ESM imports and exports.
    'n/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
    // Restrict Node-specific built-ins to APIs available at the Node 24.0.0 minimum.
    'n/no-unsupported-features/node-builtins': 'error',
    // Use the global Buffer supplied by Node instead of redundant buffer imports.
    'n/prefer-global/buffer': 'error',
    // Use Node's global console rather than importing a second spelling of the same API.
    'n/prefer-global/console': 'error',
    // Use the global Web Crypto API when accessing the Web Crypto implementation.
    'n/prefer-global/crypto': 'error',
    // Use Node's global process rather than importing the same process object.
    'n/prefer-global/process': 'error',
    // Use the global TextDecoder supported by the minimum Node version.
    'n/prefer-global/text-decoder': 'error',
    // Use the global TextEncoder supported by the minimum Node version.
    'n/prefer-global/text-encoder': 'error',
    // Use the global URLSearchParams instead of a redundant node:url import.
    'n/prefer-global/url-search-params': 'error',
    // Use the global URL instead of a redundant node:url import.
    'n/prefer-global/url': 'error',
    // Use global callback timers rather than importing equivalent callback timer functions.
    'n/prefer-global/timers': 'error',
    // Use strict assertion semantics instead of coercive node:assert comparisons.
    'n/prefer-import/assert-strict': 'error',
    // Use the promise-based DNS API instead of callback-based DNS operations.
    'n/prefer-promises/dns': 'error',
    // Use the promise-based filesystem API instead of callback-based filesystem operations.
    'n/prefer-promises/fs': 'error',
    // Require executable scripts and package bin entries to use valid Node hashbangs.
    'n/hashbang': 'error',
  },
});

export { node };
