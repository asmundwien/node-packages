/**
@type {import('eslint').Linter.RulesRecord}
*/
const coreRuleReplacements = {
  // [standardization] Off (covered): @typescript-eslint/naming-convention owns the selected value/type naming policy, including PascalCase components and permitted underscores.
  camelcase: 'off',
  // [architectural-prevention] Off (covered): @typescript-eslint/class-methods-use-this checks receiver ownership without misreading typed class declarations.
  'class-methods-use-this': 'off',
  // [correctness] Off (covered): @typescript-eslint/consistent-return detects inconsistent value paths while recognizing void and Promise<void> contracts.
  'consistent-return': 'off',
  // [correctness] Off (covered): @typescript-eslint/switch-exhaustiveness-check requires union cases and, with requireDefaultForNonUnion, a fallback for other switch domains.
  'default-case': 'off',
  // [standardization] Off (covered): @typescript-eslint/default-param-last applies the selected positional-call convention to optional TypeScript parameters too.
  'default-param-last': 'off',
  // [standardization] Off (covered): @typescript-eslint/dot-notation selects property syntax with knowledge of typed accessibility and index signatures.
  'dot-notation': 'off',
  // [standardization] Off (covered): @typescript-eslint/consistent-type-imports requires separate type imports, so import-x/consistent-type-specifier-style must not select competing syntax.
  'import-x/consistent-type-specifier-style': 'off',
  // [architectural-prevention] Off (covered): @typescript-eslint/init-declarations requires initialized runtime bindings without treating ambient declarations as missing initialization.
  'init-declarations': 'off',
  // [architectural-prevention] Off (covered): @typescript-eslint/max-params applies the callable review ceiling without counting an erased void this parameter.
  'max-params': 'off',
  // [standardization] Off (covered): @typescript-eslint/no-array-constructor selects array literals while recognizing generic Array<T> construction.
  'no-array-constructor': 'off',
  // [correctness] Off (covered): @typescript-eslint/no-dupe-class-members rejects overwriting members while accepting TypeScript overload signatures.
  'no-dupe-class-members': 'off',
  // [enforcement-integrity] Off (covered): @typescript-eslint/no-empty-function rejects empty implementations while recognizing TypeScript-specific constructor contracts.
  'no-empty-function': 'off',
  // [correctness] Off (covered): @typescript-eslint/no-implied-eval rejects string execution while distinguishing typed callable timer arguments.
  'no-implied-eval': 'off',
  // [correctness] Off (covered): @typescript-eslint/no-invalid-this checks receiver validity while recognizing explicit typed this parameters.
  'no-invalid-this': 'off',
  // [standardization] Off (covered): @typescript-eslint/no-magic-numbers applies the selected constant-naming policy to enums and type-level numeric syntax too.
  'no-magic-numbers': 'off',
  // [correctness] Off (covered): @typescript-eslint/no-redeclare rejects conflicting bindings while accepting legal type/value declaration merging.
  'no-redeclare': 'off',
  // [architectural-prevention] Off (covered): @typescript-eslint/no-shadow checks binding ambiguity without conflating separate type and value namespaces.
  'no-shadow': 'off',
  // [correctness] Off (covered): @typescript-eslint/only-throw-error checks the thrown value's type rather than only rejecting literal throw syntax.
  'no-throw-literal': 'off',
  // [correctness] Off (covered): @typescript-eslint/no-unused-expressions detects discarded computations even through TypeScript assertions.
  'no-unused-expressions': 'off',
  // [architectural-prevention] Off (covered): @typescript-eslint/no-unused-private-class-members detects unconsumed implementation members with TypeScript accessibility syntax.
  'no-unused-private-class-members': 'off',
  // [architectural-prevention] Off (covered): @typescript-eslint/no-unused-vars counts type references when identifying declarations that add unused dependencies or code.
  'no-unused-vars': 'off',
  // [standardization] Off (covered): @typescript-eslint/no-use-before-define applies declaration ordering without treating erased type references as runtime accesses.
  'no-use-before-define': 'off',
  // [standardization] Off (covered): @typescript-eslint/no-useless-constructor removes redundant syntax without deleting constructors that define accessibility.
  'no-useless-constructor': 'off',
  // [standardization] Off (covered): @typescript-eslint/prefer-destructuring selects extraction syntax without discarding typed binding annotations.
  'prefer-destructuring': 'off',
  // [correctness] Off (covered): @typescript-eslint/prefer-promise-reject-errors checks rejection reason types so handlers can consume Error diagnostics.
  'prefer-promise-reject-errors': 'off',
  // [architectural-prevention] Off (covered): @typescript-eslint/require-await checks unnecessary async boundaries while accepting promise-valued return paths.
  'require-await': 'off',
  // [standardization] Off (covered): @typescript-eslint/member-ordering owns member layout with typed accessibility and overload groups instead of competing Unicorn groups.
  'unicorn/consistent-class-member-order': 'off',
  // [correctness] Off (covered): @typescript-eslint/await-thenable rejects awaits of non-thenables using inferred types instead of syntax-only guesses.
  'unicorn/no-unnecessary-await': 'off',
};

export { coreRuleReplacements };
