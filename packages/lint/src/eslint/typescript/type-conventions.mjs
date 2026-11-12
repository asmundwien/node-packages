/**
@type {import('eslint').Linter.RulesRecord}
*/
const typeConventions = {
  // [standardization] Keep overloads adjacent so reviewers can compare the complete callable contract without searching through generated declarations.
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  // [standardization] Choose T[] array syntax so generated contracts do not alternate it with the equivalent Array<T> spelling.
  '@typescript-eslint/array-type': 'error',
  // [standardization] Represent literal class constants as readonly fields rather than getters so generated declarations use a predictable constant representation.
  '@typescript-eslint/class-literal-property-style': 'error',
  // [architectural-prevention] Require receiver use to expose methods that may belong outside the class; receiver use is an ownership proxy, not proof of cohesion.
  '@typescript-eslint/class-methods-use-this': 'error',
  // [standardization] Put generic arguments on constructor calls so generated initialization code has one predictable place for its instantiated type.
  '@typescript-eslint/consistent-generic-constructors': 'error',
  // [standardization] Choose Record for indexed object contracts so review and search do not need to account for equivalent index-signature spellings.
  '@typescript-eslint/consistent-indexed-object-style': 'error',
  // [standardization] Choose as assertions over angle-bracket assertions so generated TypeScript uses syntax that also parses in TSX.
  '@typescript-eslint/consistent-type-assertions': 'error',
  // [standardization] Choose interfaces for object contracts so generated APIs use a predictable declaration form; aliases remain available for other type expressions.
  '@typescript-eslint/consistent-type-definitions': 'error',
  // [standardization] Mark erased exports with export type so reviewers can distinguish runtime exports from type-only contracts without resolving each declaration.
  '@typescript-eslint/consistent-type-exports': 'error',
  // [standardization] Require separate import type declarations so erased dependencies remain distinct from runtime imports during review and dependency search.
  '@typescript-eslint/consistent-type-imports': ['error', {
    fixStyle: 'separate-type-imports',
    prefer: 'type-imports',
  }],
  // [standardization] Put required parameters first so generated positional APIs do not require callers to pass undefined merely to reach a required argument.
  '@typescript-eslint/default-param-last': 'error',
  // [standardization] Choose dot access when the property permits it so generated property reads use one searchable spelling rather than arbitrary bracket notation.
  '@typescript-eslint/dot-notation': 'error',
  // [architectural-prevention] State member accessibility explicitly so reviewers can inspect the class's intended public contract without assuming implicit public ownership.
  '@typescript-eslint/explicit-member-accessibility': 'error',
  // [architectural-prevention] Initialize runtime bindings at declaration so reviewers need not trace a separate assignment before the binding acquires its intended value.
  '@typescript-eslint/init-declarations': 'error',
  // [architectural-prevention] Use three parameters as a chosen callable review ceiling to limit positional coupling, not a safety threshold; an erased void this parameter does not count.
  '@typescript-eslint/max-params': 'error',
  // [standardization] Group members by the typed role and accessibility order so reviewers can locate generated class contracts and implementations predictably.
  '@typescript-eslint/member-ordering': 'error',
  // [standardization] Choose camelCase values and PascalCase types so generated names identify their intended role.
  // PascalCase imports, variables and functions support component bindings; UPPER_CASE variables support constants.
  // Boundary underscores support intentional naming conventions but imply neither privacy nor exemption from unused checks.
  '@typescript-eslint/naming-convention': ['error', {
    format: ['camelCase'],
    leadingUnderscore: 'allow',
    selector: 'default',
    trailingUnderscore: 'allow',
  }, {
    format: ['camelCase', 'PascalCase'],
    selector: 'import',
  }, {
    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
    leadingUnderscore: 'allow',
    selector: 'variable',
    trailingUnderscore: 'allow',
  }, {
    format: ['PascalCase'],
    selector: 'typeLike',
  }, {
    format: ['camelCase', 'PascalCase'],
    leadingUnderscore: 'allow',
    selector: 'function',
    trailingUnderscore: 'allow',
  }],
  // [standardization] Choose array literals instead of ambiguous Array constructor syntax; generic Array<T> calls remain available to state element types explicitly.
  '@typescript-eslint/no-array-constructor': 'error',
  // [standardization] Exclude APIs marked @deprecated from newly generated code so it follows the declared supported API rather than adding migration work.
  '@typescript-eslint/no-deprecated': 'error',
  // [standardization] Remove duplicate union and intersection constituents so generated contracts do not repeat alternatives and obscure meaningful type differences.
  '@typescript-eslint/no-duplicate-type-constituents': 'error',
  // [architectural-prevention] Restrict computed deletion because dynamic structural mutation makes property ownership and object-shape changes harder to inspect locally.
  '@typescript-eslint/no-dynamic-delete': 'error',
  // [architectural-prevention] Reject empty and static-only classes that add class coupling without instance state; ordinary objects or functions expose the actual ownership.
  '@typescript-eslint/no-extraneous-class': 'error',
  // [standardization] Omit annotations inferable from initial literals so generated declarations do not repeat type information that must be maintained twice.
  '@typescript-eslint/no-inferrable-types': 'error',
  // [standardization] Reserve void for supported return and generic positions so generated contracts do not alternate it with value-level undefined types.
  '@typescript-eslint/no-invalid-void-type': 'error',
  // [standardization] Name domain numbers so their meaning is reviewable; accept -1/0/1 as structural conventions and indexes or type indexes as positions.
  // Defaults and field initializers already locate the declaration; enums, literal types and readonly properties already state a named contract.
  // Object values remain inline to avoid naming every data field. These exceptions do not prove domain meaning; remaining numeric bindings must use const.
  '@typescript-eslint/no-magic-numbers': ['error', {
    detectObjects: false,
    enforceConst: true,
    ignore: [-1, 0, 1],
    ignoreArrayIndexes: true,
    ignoreClassFieldInitialValues: true,
    ignoreDefaultValues: true,
    ignoreEnums: true,
    ignoreNumericLiteralTypes: true,
    ignoreReadonlyClassProperties: true,
    ignoreTypeIndexes: true,
  }],
  // [standardization] Remove void applied to already void or undefined expressions so generated code does not add a discard marker where no value exists to discard.
  '@typescript-eslint/no-meaningless-void-operator': 'error',
  // [standardization] Keep each enum numeric or string-based so generated value domains have one predictable representation rather than mixed conversion behavior.
  '@typescript-eslint/no-mixed-enums': 'error',
  // [standardization] Choose ESM for runtime organization instead of TypeScript namespaces; declaration-file namespaces remain accepted for ambient API descriptions.
  '@typescript-eslint/no-namespace': 'error',
  // [standardization] Remove absorbed or ineffective union and intersection members so reviewers can see the contract the compiler actually enforces.
  '@typescript-eslint/no-redundant-type-constituents': 'error',
  // [standardization] Require ESM imports rather than require or import-equals so generated dependency declarations follow the same module convention and import checks.
  '@typescript-eslint/no-require-imports': 'error',
  // [architectural-prevention] Prevent shadowed bindings from hiding which value a generated reference uses without conflating independent type and value namespaces.
  '@typescript-eslint/no-shadow': 'error',
  // [standardization] Use boolean values directly instead of literal comparisons so generated conditions use one spelling; explicit nullable-boolean distinctions remain meaningful.
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
  // [standardization] Omit assignments already performed by constructor parameter properties so generated initialization has no duplicate write to maintain.
  '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
  // [standardization] Omit namespace qualifiers for declarations already in scope so generated references use one local name rather than redundant qualified spellings.
  '@typescript-eslint/no-unnecessary-qualifier': 'error',
  // [standardization] Remove unnecessary string interpolation in values and template literal types so generated code does not wrap an already string-valued contract.
  '@typescript-eslint/no-unnecessary-template-expression': 'error',
  // [standardization] Omit generic arguments equal to declared defaults so generated callers do not duplicate defaults that the API already owns.
  '@typescript-eslint/no-unnecessary-type-arguments': 'error',
  // [standardization] Remove assertions that leave the inferred type unchanged so necessary unchecked claims are not obscured by redundant assertion syntax.
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  // [standardization] Omit generic constraints that accept every type so generated contracts do not present unrestricted parameters as if they were constrained.
  '@typescript-eslint/no-unnecessary-type-constraint': 'error',
  // [standardization] Remove conversions that preserve the existing primitive type so generated code does not imply that unchanged values need coercion.
  '@typescript-eslint/no-unnecessary-type-conversion': 'error',
  // [architectural-prevention] Use concrete types when a generic relates no contract positions so generated APIs do not impose type-parameter complexity without a caller-visible relationship.
  '@typescript-eslint/no-unnecessary-type-parameters': 'error',
  // [architectural-prevention] Remove unused private members so generated classes do not retain unconsumed implementation state or methods that increase review work.
  '@typescript-eslint/no-unused-private-class-members': 'error',
  // [architectural-prevention] Remove unused value and type bindings so generated code does not accumulate unconsumed declarations or unnecessary dependency references.
  '@typescript-eslint/no-unused-vars': 'error',
  // [standardization] Declare runtime values before references so generated execution order is locally readable; erased type references do not need runtime ordering.
  '@typescript-eslint/no-use-before-define': 'error',
  // [standardization] Omit constructors that add neither behavior nor accessibility so generated class declarations do not repeat the inherited construction contract.
  '@typescript-eslint/no-useless-constructor': 'error',
  // [standardization] Omit empty exports when imports or exports already establish module scope so generated files do not repeat an unnecessary module marker.
  '@typescript-eslint/no-useless-empty-export': 'error',
  // [architectural-prevention] Declare fields outside constructor parameters so reviewers can inspect instance state ownership without searching a second declaration location.
  '@typescript-eslint/parameter-properties': 'error',
  // [standardization] Choose as const for matching literal assertions so generated declarations preserve literal types without repeating the value as a type.
  '@typescript-eslint/prefer-as-const': 'error',
  // [standardization] Choose destructuring for supported extraction patterns so generated bindings use one recognizable extraction form without losing typed annotations.
  '@typescript-eslint/prefer-destructuring': 'error',
  // [standardization] Choose find over filtering to select one result so generated searches express single-result intent without constructing a result array.
  '@typescript-eslint/prefer-find': 'error',
  // [standardization] Choose for-of for element-only loops so generated traversal does not introduce an index solely to retrieve the current value.
  '@typescript-eslint/prefer-for-of': 'error',
  // [standardization] Choose function type syntax for callable-only contracts so generated APIs do not alternate equivalent call-signature interface forms.
  '@typescript-eslint/prefer-function-type': 'error',
  // [standardization] Choose includes for supported containment checks so generated membership tests do not encode boolean intent through numeric search results.
  '@typescript-eslint/prefer-includes': 'error',
  // [standardization] Use literal enum values so reviewers can inspect the declared value domain without evaluating generated initializer expressions.
  '@typescript-eslint/prefer-literal-enum-member': 'error',
  // [standardization] Choose namespace rather than legacy module spelling for accepted ambient namespaces so declarations distinguish them from actual modules.
  '@typescript-eslint/prefer-namespace-keyword': 'error',
  // [standardization] Choose optional chaining for supported nullable access so generated guards use a predictable form; default fixes avoid changing the result type unsafely.
  '@typescript-eslint/prefer-optional-chain': 'error',
  // [architectural-prevention] Mark initialization-only private members readonly so later generated code cannot mutate state that the class currently treats as fixed.
  '@typescript-eslint/prefer-readonly': 'error',
  // [architectural-prevention] Require readonly parameter contracts even for inferred types so mutation through caller-owned inputs stays restricted; inference is not an exemption, and readonly does not prove deep runtime immutability.
  '@typescript-eslint/prefer-readonly-parameter-types': ['error', { ignoreInferredTypes: false }],
  // [standardization] Choose RegExp.exec for non-global matching so generated callers use the matching API without String.match's global-dependent result contract.
  '@typescript-eslint/prefer-regexp-exec': 'error',
  // [standardization] Choose startsWith and endsWith for supported boundary tests so generated string checks state the comparison without index or regex encodings.
  '@typescript-eslint/prefer-string-starts-ends-with': 'error',
  // [standardization] Mark promise-returning functions async so generated declarations expose the asynchronous boundary rather than relying only on an inferred promise result.
  '@typescript-eslint/promise-function-async': 'error',
  // [architectural-prevention] Reject async wrappers with no awaits or promise-valued returns because they add an asynchronous caller contract without asynchronous work.
  '@typescript-eslint/require-await': 'error',
  // [standardization] Require explicit formatting for any, booleans, nullish values, numbers and regexes so generated interpolation does not silently choose a conversion convention.
  // Never-typed expressions have no exemption because an unreachable type is not an output-format contract.
  '@typescript-eslint/restrict-template-expressions': ['error', {
    allowAny: false,
    allowBoolean: false,
    allowNever: false,
    allowNullish: false,
    allowNumber: false,
    allowRegExp: false,
  }],
  // [standardization] Choose imports for type and path dependencies so generated module dependencies remain visible to the ordinary import tooling rather than legacy triple-slash directives.
  '@typescript-eslint/triple-slash-reference': 'error',
  // [standardization] Combine equivalent overloads into union or optional-parameter signatures so generated callable contracts do not duplicate signatures reviewers must compare.
  '@typescript-eslint/unified-signatures': 'error',
  // [standardization] Reserve function verb prefixes for callable values so generated names communicate whether consumers can invoke them; the configured type checker resolves callability.
  'unicorn/no-non-function-verb-prefix': 'error',
};

export { typeConventions };
