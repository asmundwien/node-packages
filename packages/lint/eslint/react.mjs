import reactPlugin from '@eslint-react/eslint-plugin';
import { defineConfig } from 'eslint/config';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const react = defineConfig({
  name: '@asmundwien/lint/react',
  files: ['**/*.{ts,tsx,mts,cts}'],
  languageOptions: {
    globals: globals.browser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
  plugins: { '@eslint-react': reactPlugin, 'react-hooks': hooks },
  settings: {
    ...reactPlugin.configs.all.settings,
    'react-x': {
      ...reactPlugin.configs.all.settings['react-x'],
      importSource: 'react',
      version: '19.0.0',
    },
  },
  rules: {
    // The all preset covers checks omitted by recommended; strict-type-checked adds typed checks.
    ...reactPlugin.configs.all.rules,
    ...reactPlugin.configs['strict-type-checked'].rules,
    ...hooks.configs.flat.recommended.rules,
    // Use stable diagnostics; this overlay identifies upstream experimental checks.
    ...reactPlugin.configs['disable-experimental'].rules,

    // The recommended preset omits direct component calls; require JSX invocation.
    'react-hooks/capitalized-calls': 'error',
    // The recommended preset omits unstable effect dependencies; require memoization.
    'react-hooks/memoized-effect-dependencies': 'error',
    // The recommended preset omits effect-derived state; require deriving values during render.
    'react-hooks/no-deriving-state-in-effects': 'error',
    // The recommended preset omits suppression checks; reject disabling enforced React checks.
    'react-hooks/rule-suppression': 'error',
    // The recommended preset omits unused memo results; require useMemo to return a used value.
    'react-hooks/void-use-memo': 'error',

    // react-hooks/error-boundaries owns component error-boundary diagnostics.
    '@eslint-react/error-boundaries': 'off',
    // react-hooks/exhaustive-deps owns dependency checks, avoiding duplicate reports.
    '@eslint-react/exhaustive-deps': 'off',
    // react-hooks/purity owns render-purity checks rather than a second implementation.
    '@eslint-react/purity': 'off',
    // react-hooks/rules-of-hooks owns hook placement and call-order checks.
    '@eslint-react/rules-of-hooks': 'off',
    // react-hooks/set-state-in-effect owns synchronous effect-update diagnostics.
    '@eslint-react/set-state-in-effect': 'off',
    // react-hooks/unsupported-syntax owns compiler-unsupported syntax diagnostics.
    '@eslint-react/unsupported-syntax': 'off',
    // react-hooks/use-memo owns memoization-usage diagnostics without duplicate reports.
    '@eslint-react/use-memo': 'off',
  },
});

export { react };
