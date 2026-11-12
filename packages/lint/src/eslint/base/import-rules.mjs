/**
@type {import('eslint').Linter.RulesRecord}
*/
const importRules = {
  // [architectural-prevention] Enumerate reexports so an upstream addition cannot silently expand this module's public contract.
  'import-x/avoid-re-export-all': 'error',
  // [standardization] Use top-level import type declarations so reviewers can distinguish runtime dependencies from erased types.
  'import-x/consistent-type-specifier-style': 'error',
  // [correctness] Catch default imports whose target has no default export before module loading fails.
  'import-x/default': 'error',
  // [correctness] Catch duplicate or invalid exports before consumers encounter an invalid module contract.
  'import-x/export': 'error',
  // [standardization] Put local export lists after their definitions so reviewers encounter implementation before the public contract.
  'import-x/exports-last': 'error',
  // [correctness] Emit extensions on relative imports for ESM resolution; exempt package names because package exports select their files.
  'import-x/extensions': ['error', 'always', { ignorePackages: true }],
  // [standardization] Put imports first so reviewers find dependencies before executable module code.
  'import-x/first': 'error',
  // [standardization] Group local public bindings in one named export list so reviewers can inspect the module contract together.
  'import-x/group-exports': 'error',
  // [architectural-prevention] Ten dependencies is a chosen review ceiling for module coupling, not proof of a single responsibility.
  'import-x/max-dependencies': ['error', { max: 10 }],
  // [correctness] Catch imports of nonexistent named exports before module instantiation fails.
  'import-x/named': 'error',
  // [standardization] Separate imports with a blank line so reviewers can distinguish dependencies from module implementation.
  'import-x/newline-after-import': 'error',
  // [correctness] Avoid machine-specific absolute imports that fail when consumers install the package elsewhere.
  'import-x/no-absolute-path': 'error',
  // [standardization] Use the selected ESM dependency model rather than introducing AMD loading conventions.
  'import-x/no-amd': 'error',
  // [architectural-prevention] Reject dependency cycles because initialization order and ownership become harder to review across mutually dependent modules.
  'import-x/no-cycle': 'error',
  // [standardization] Use named source exports so consumers and repository searches use the declared public names.
  'import-x/no-default-export': 'error',
  // [standardization] Avoid APIs marked deprecated so generated code follows the dependency's currently supported interface.
  'import-x/no-deprecated': 'error',
  // [standardization] Merge imports from the same resolved module so reviewers see each dependency in one declaration.
  'import-x/no-duplicates': 'error',
  // [standardization] Avoid empty named import blocks that imply binding use while only triggering module evaluation.
  'import-x/no-empty-named-blocks': 'error',
  // [correctness] Include type-only imports in dependency checks because consumer type resolution also requires reproducible package installation.
  'import-x/no-extraneous-dependencies': ['error', { includeTypes: true }],
  // [architectural-prevention] Keep exported bindings non-reassignable so consumers do not depend on hidden changes to module state.
  'import-x/no-mutable-exports': 'error',
  // [correctness] Catch default bindings confused with named exports so callers do not receive the wrong value.
  'import-x/no-named-as-default': 'error',
  // [correctness] Do not treat named exports as properties of a default export because the module makes no such guarantee.
  'import-x/no-named-as-default-member': 'error',
  // [architectural-prevention] Enumerate imported bindings so reviewers can assess dependency usage without tracing namespace access.
  'import-x/no-namespace': 'error',
  // [architectural-prevention] Use sibling packages through their package contracts rather than coupling consumers to internal paths.
  'import-x/no-relative-packages': 'error',
  // [standardization] Preserve default export names at import sites so searches identify the same dependency consistently.
  'import-x/no-rename-default': 'error',
  // [correctness] Reject self-imports that read the module's own partially initialized exports instead of local bindings.
  'import-x/no-self-import': 'error',
  // [architectural-prevention] Require bound imports so reviewers can trace dependency use instead of accepting unexplained import-time effects.
  'import-x/no-unassigned-import': 'error',
  // [correctness] Catch unresolved dependencies before consumers encounter module-loading failures.
  'import-x/no-unresolved': 'error',
  // [standardization] Remove redundant path segments so searches and reviews see one spelling of a dependency path.
  'import-x/no-useless-path-segments': 'error',
  // [standardization] Keep imports independent of webpack loader syntax so generated modules use the selected standard module notation.
  'import-x/no-webpack-loader-syntax': 'error',
  // [standardization] Separate dependency origin groups with blank lines and sort names case-insensitively with types first so reviewers can scan and compare imports predictably.
  'import-x/order': ['error', {
    alphabetize: { caseInsensitive: true, order: 'asc' },
    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
    named: { enabled: true, types: 'types-first' },
    'newlines-between': 'always',
  }],
  // [correctness] Make ESM classification explicit so parsers and runtimes do not interpret a module as a script.
  'import-x/unambiguous': 'error',
};

export { importRules };
