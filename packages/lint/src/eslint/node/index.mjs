import { defineConfig } from 'eslint/config';
import n from 'eslint-plugin-n';
import globals from 'globals';

const node = defineConfig({
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
  languageOptions: {
    globals: {
      ...globals.nodeBuiltin,
      __dirname: 'off',
      __filename: 'off',
      exports: 'off',
      module: 'off',
      require: 'off',
    },
    sourceType: 'module',
  },
  name: '@asmundwien/lint/node',
  plugins: { n },
  rules: {
    // [correctness] Return after error-first callbacks so execution cannot continue after completion.
    'n/callback-return': 'error',
    // [correctness] Handle conventional err/error/*Error callback parameters so a named failure cannot be discarded silently.
    'n/handle-callback-err': ['error', '^(?:err|error|.+Error)$'],
    // [correctness] Require valid Node hashbangs so executable scripts and installed bin entries launch with the intended runtime.
    'n/hashbang': 'error',
    // [correctness] Pass Error objects to error-first callbacks so callers can inspect failure details consistently.
    'n/no-callback-literal': 'error',
    // [correctness] Reject deprecated Node APIs before removal breaks runtime behavior; import and type checks cover different declarations.
    'n/no-deprecated-api': 'error',
    // [correctness] Resolve import.meta paths with path utilities so path separators do not depend on the operating system.
    'n/no-path-concat': 'error',
    // [architectural-prevention] Pass environment-derived configuration explicitly so function behavior does not depend on hidden process state.
    'n/no-process-env': 'error',
    // [architectural-prevention] Use asynchronous Node APIs so one operation does not block unrelated work on the event loop.
    'n/no-sync': 'error',
    // [correctness] Require package executables to survive npm publication so installed bin entries point to shipped files.
    'n/no-unpublished-bin': 'error',
    // [correctness] Reject imports excluded by npm publication so a working checkout cannot hide a broken installed package.
    'n/no-unpublished-import': 'error',
    // [correctness] Restrict ECMAScript built-ins to the Node 24.0.0 minimum so supported installations can execute them.
    'n/no-unsupported-features/es-builtins': 'error',
    // [correctness] Reject syntax unsupported by the Node minimum; allow native ESM modules because this package requires ESM.
    'n/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
    // [correctness] Restrict Node-specific built-ins to the Node 24.0.0 minimum so newer development runtimes cannot hide incompatibility.
    'n/no-unsupported-features/node-builtins': 'error',
    // [standardization] Use Node's global Buffer so access to the same constructor has one spelling.
    'n/prefer-global/buffer': 'error',
    // [standardization] Use Node's global console so permitted logging does not introduce an equivalent import spelling.
    'n/prefer-global/console': 'error',
    // [standardization] Use the global Web Crypto object so the same implementation has one access pattern.
    'n/prefer-global/crypto': 'error',
    // [standardization] Use Node's global process so process operations have one recognizable access pattern.
    'n/prefer-global/process': 'error',
    // [standardization] Use the global TextDecoder supported by Node 24 so decoding does not alternate between equivalent bindings.
    'n/prefer-global/text-decoder': 'error',
    // [standardization] Use the global TextEncoder supported by Node 24 so encoding does not alternate between equivalent bindings.
    'n/prefer-global/text-encoder': 'error',
    // [standardization] Use global callback timers so scheduling does not alternate between global and imported spellings.
    'n/prefer-global/timers': 'error',
    // [standardization] Use the global URL so URL construction does not alternate between equivalent bindings.
    'n/prefer-global/url': 'error',
    // [standardization] Use the global URLSearchParams so query parsing does not alternate between equivalent bindings.
    'n/prefer-global/url-search-params': 'error',
    // [correctness] Use strict Node assertions so equality checks cannot pass because of type coercion.
    'n/prefer-import/assert-strict': 'error',
    // [standardization] Use promise-based DNS operations so lookup failures follow the selected async/await control flow.
    'n/prefer-promises/dns': 'error',
    // [standardization] Use promise-based filesystem operations so IO failures follow the selected async/await control flow.
    'n/prefer-promises/fs': 'error',
  },
  settings: { node: { version: '>=24.0.0' } },
});

export { node };
