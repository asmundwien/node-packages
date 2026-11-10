import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importX, { createNodeResolver } from 'eslint-plugin-import-x';
import unicorn from 'eslint-plugin-unicorn';

const base = defineConfig({
  name: '@asmundwien/lint/base',
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
  linterOptions: { reportUnusedDisableDirectives: 'error' },
  plugins: { unicorn, 'import-x': importX },
  settings: {
    'import-x/resolver-next': [
      createNodeResolver({ extensions: ['.mjs', '.cjs', '.js', '.jsx', '.json', '.node'] }),
    ],
  },
  rules: {
    // Keep all core and JavaScript Unicorn checks, then add import-x's recommended checks.
    ...js.configs.all.rules,
    ...unicorn.configs.all.rules,
    ...importX.flatConfigs.recommended.rules,

    // The recommended preset permits namespace imports; named imports expose each binding.
    'import-x/no-namespace': 'error',
    // The recommended preset permits exported let/var; consumers must not observe reassigned exports.
    'import-x/no-mutable-exports': 'error',
    // The recommended preset permits scattered exports; list public bindings together.
    'import-x/group-exports': 'error',
    // The recommended preset permits relative paths into sibling packages; respect package exports.
    'import-x/no-relative-packages': 'error',
    // The recommended preset leaves type specifiers inconsistent; use top-level import type.
    'import-x/consistent-type-specifier-style': 'error',
    // The recommended preset permits self-imports; reject that circular dependency through aliases.
    'import-x/no-self-import': 'error',
    // The recommended preset checks resolution but permits cycles; reject circular dependency paths.
    'import-x/no-cycle': 'error',
    // The recommended preset permits default as a named specifier; use default-import syntax.
    'import-x/no-named-default': 'error',
    // The recommended preset permits anonymous default exports; require names for diagnostics.
    'import-x/no-anonymous-default-export': 'error',
    // The recommended preset permits renaming default imports; preserve the declaration's name.
    'import-x/no-rename-default': 'error',
    // The recommended preset permits CommonJS syntax; require native ESM imports and exports.
    'import-x/no-commonjs': 'error',
    // The recommended preset permits AMD wrappers; require native ESM imports and exports.
    'import-x/no-amd': 'error',
    // The recommended preset warns on duplicates; make repeated module imports errors.
    'import-x/no-duplicates': 'error',
    // The recommended preset permits imports after executable statements; put dependencies first.
    'import-x/first': 'error',
    // The recommended preset leaves dependency count unlimited; enforce the default ceiling of ten.
    'import-x/max-dependencies': 'error',
    // The recommended preset permits machine-specific absolute paths; require relocatable specifiers.
    'import-x/no-absolute-path': 'error',
    // The recommended preset permits Webpack loader prefixes; require native ESM specifiers.
    'import-x/no-webpack-loader-syntax': 'error',
    // The recommended preset permits imports beside executable statements; require a blank line.
    'import-x/newline-after-import': 'error',
    // The recommended preset permits computed require targets; require statically resolvable literals.
    'import-x/no-dynamic-require': 'error',
    // The recommended preset permits files without module syntax; require an import or export.
    'import-x/unambiguous': 'error',
    // The recommended preset permits side-effect imports; require explicit dependency bindings.
    'import-x/no-unassigned-import': 'error',
    // The recommended preset permits redundant path segments; require equivalent shorter paths.
    'import-x/no-useless-path-segments': 'error',
    // The recommended preset permits imports alongside module.exports; reject mixed module systems.
    'import-x/no-import-module-exports': 'error',
    // The recommended preset permits empty import blocks; reject disguised side-effect imports.
    'import-x/no-empty-named-blocks': 'error',
    // The recommended preset permits exports before definitions; put the public export list last.
    'import-x/exports-last': 'error',
    // The recommended preset permits deprecated bindings; reject imports marked deprecated.
    'import-x/no-deprecated': 'error',
    // The recommended preset permits re-export-only modules; reject barrel-file indirection.
    'import-x/avoid-barrel-files': 'error',
    // The recommended preset permits importing barrels; import defining modules instead.
    'import-x/avoid-importing-barrel-files': 'error',
    // The recommended preset permits runtime namespace imports; keep unused bindings removable.
    'import-x/avoid-namespace-import': 'error',
    // The recommended preset permits export-star; enumerate bindings to prevent implicit additions.
    'import-x/avoid-re-export-all': 'error',

    // arrow-body-style conflicts with unicorn/consistent-arrow-return-style's return consistency.
    'arrow-body-style': 'off',
    // func-style cannot assign syntax by role; unicorn/consistent-function-style owns that policy.
    'func-style': 'off',
    // The upstream ban rejects early continuation, which avoids nesting the remaining loop body.
    'no-continue': 'off',
    // The upstream ban conflicts with unicorn/prefer-ternary's simple conditional expressions.
    'no-ternary': 'off',
    // The upstream ban rejects undefined, the absent value required by unicorn/no-null.
    'no-undefined': 'off',
    // sort-imports cannot implement import-x/order's groups and type-first specifiers.
    'sort-imports': 'off',
    // Iterator.concat() is absent in supported Node.js 24.0; retain spread-based concatenation.
    'unicorn/prefer-iterator-concat': 'off',
    // Iterator.zip() is absent in supported Node.js 24.0; retain indexed parallel-array iteration.
    'unicorn/prefer-iterator-zip': 'off',
    // Temporal is unavailable without flags in supported Node.js 24.0; retain Date.
    'unicorn/prefer-temporal': 'off',
    // Node.js 24.0 lacks Uint8Array.fromBase64()/toBase64(); retain existing conversions.
    'unicorn/prefer-uint8array-base64': 'off',
    // Node.js 24.0 lacks Uint8Array.fromHex()/toHex(); retain existing conversions.
    'unicorn/prefer-uint8array-hex': 'off',
    // Arrow properties conflict with unicorn/consistent-function-style's object methods.
    'unicorn/prefer-short-arrow-method': 'off',
    // JavaScript config files lack type services; the TypeScript layer enables this typed check.
    'unicorn/no-non-function-verb-prefix': 'off',

    // Upstream groups declarations; warn instead and require one binding per declaration.
    'one-var': ['warn', 'never'],
    // Upstream bans void; warn on value-producing uses but allow discarded-promise statements.
    'no-void': ['warn', { allowAsStatement: true }],
    // Upstream leaves roles unconstrained; warn unless named functions declare and callbacks arrow.
    'unicorn/consistent-function-style': ['warn', {
      namedFunctions: 'declaration',
      namedExports: 'declaration',
      callbacks: 'arrow-function',
      objectProperties: 'method',
    }],
    // The recommended preset omits extension checks; require emitted extensions on relative imports.
    'import-x/extensions': ['warn', 'always', { ignorePackages: true }],
    // The recommended preset omits ordering; separate and alphabetize groups, with type names first.
    'import-x/order': ['warn', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
      named: { enabled: true, types: 'types-first' },
    }],
    // The recommended preset permits default exports; require named exports with matching imports.
    'import-x/no-default-export': 'warn',
    // The recommended preset omits manifest checks; include type imports in declared dependencies.
    'import-x/no-extraneous-dependencies': ['error', { includeTypes: true }],
  },
});

export { base };
