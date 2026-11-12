/**
@type {import('eslint').Linter.RulesRecord}
*/
const typeSafety = {
  // [correctness] Reject awaits of non-thenables and iteration patterns that leave promised elements unresolved instead of producing the values callers expect.
  '@typescript-eslint/await-thenable': 'error',
  // [enforcement-integrity] Reject compiler-check bypasses; expected errors need at least ten description characters to make suppression intent reviewable, not to prove it justified.
  '@typescript-eslint/ban-ts-comment': ['error', { minimumDescriptionLength: 10 }],
  // [enforcement-integrity] Remove obsolete TSLint suppressions so generated code does not imply that an inactive exception satisfies current verification obligations.
  '@typescript-eslint/ban-tslint-comment': 'error',
  // [correctness] Reject inconsistent value-return paths that can give callers undefined instead of the result supplied by other branches.
  '@typescript-eslint/consistent-return': 'error',
  // [correctness] Use function-valued properties so strictFunctionTypes can reject unsafe parameter narrowing that method bivariance would accept; consumer strictFunctionTypes must be enabled.
  '@typescript-eslint/method-signature-style': 'error',
  // [correctness] Reject deleting array elements because the resulting holes retain length and change iteration behavior rather than removing an item.
  '@typescript-eslint/no-array-delete': 'error',
  // [correctness] Reject default object stringification that would replace useful output with values such as [object Object] in messages or stored strings.
  '@typescript-eslint/no-base-to-string': 'error',
  // [correctness] Keep void-valued calls out of value expressions so callers do not accidentally consume the missing result of a side-effect-only operation.
  '@typescript-eslint/no-confusing-void-expression': 'error',
  // [correctness] Reject duplicate runtime members that overwrite earlier behavior while retaining overload declarations that describe one implementation.
  '@typescript-eslint/no-dupe-class-members': 'error',
  // [correctness] Give enum members distinct literal values to avoid indistinguishable states and numeric reverse mappings that overwrite an earlier name.
  '@typescript-eslint/no-duplicate-enum-values': 'error',
  // [enforcement-integrity] Reject empty implementations that can satisfy a generated signature without doing the promised work; typed constructor exceptions retain their declaration contracts.
  '@typescript-eslint/no-empty-function': 'error',
  // [correctness] Reject empty object contracts that accept every non-nullish value when callers may expect an object with a meaningful shape.
  '@typescript-eslint/no-empty-object-type': 'error',
  // [correctness] Require unknown and narrowing instead of explicit any so generated code cannot silently disable checking at a typed contract boundary.
  '@typescript-eslint/no-explicit-any': 'error',
  // [correctness] Require promise handling because rejected work can escape callers; void is not handling, and custom thenables are checked because they can reject too.
  '@typescript-eslint/no-floating-promises': ['error', {
    checkThenables: true,
    ignoreVoid: false,
  }],
  // [correctness] Iterate array values instead of for-in keys, which are strings and may include inherited properties unrelated to the intended elements.
  '@typescript-eslint/no-for-in-array': 'error',
  // [correctness] Reject generated empty object types because mapped or utility operations can silently admit non-nullish primitives instead of the intended object contract.
  '@typescript-eslint/no-generated-empty-object-type': 'error',
  // [correctness] Reject strings passed to timer evaluation and Function constructors because executing constructed source permits code injection beyond ordinary typed calls.
  '@typescript-eslint/no-implied-eval': 'error',
  // [correctness] Prevent inline type-only imports from retaining a runtime module import that can execute side effects despite importing no runtime values.
  '@typescript-eslint/no-import-type-side-effects': 'error',
  // [correctness] Reject this where no receiver contract exists so generated functions do not depend on a binding their callers cannot supply safely.
  '@typescript-eslint/no-invalid-this': 'error',
  // [correctness] Keep constructor signatures separate from instance interfaces so a contract does not claim that existing instances are constructable.
  '@typescript-eslint/no-misused-new': 'error',
  // [correctness] Reject promises in synchronous conditions, spreads and void callbacks where truthiness or a discarded rejection replaces the intended resolved result.
  '@typescript-eslint/no-misused-promises': 'error',
  // [correctness] Reject typed spreads whose enumerable properties differ from the apparent value, such as spreading a Promise instead of its resolved object.
  '@typescript-eslint/no-misused-spread': 'error',
  // [correctness] Require nullability checks instead of postfix assertions so generated code does not erase the possibility of a null or undefined dereference.
  '@typescript-eslint/no-non-null-assertion': 'error',
  // [correctness] Reject runtime redeclarations that can replace an existing binding while accepting TypeScript's intentional declaration-merging contracts.
  '@typescript-eslint/no-redeclare': 'error',
  // [correctness] Flag conditions that resolved types say cannot change the path because they may hide a mistaken branch or an inaccurate input contract.
  '@typescript-eslint/no-unnecessary-condition': 'error',
  // [correctness] Reject any-valued arguments that would bypass a callee's parameter checks and admit values its implementation cannot handle.
  '@typescript-eslint/no-unsafe-argument': 'error',
  // [correctness] Reject any-valued assignments that make a checked variable or property appear to satisfy a contract without validating the incoming value.
  '@typescript-eslint/no-unsafe-assignment': 'error',
  // [correctness] Reject calls through any because neither the target's callability nor its argument contract has been checked.
  '@typescript-eslint/no-unsafe-call': 'error',
  // [correctness] Reject interface/class merges that declare members absent from runtime instances and can make compiled property access fail.
  '@typescript-eslint/no-unsafe-declaration-merging': 'error',
  // [correctness] Reject enum assignments outside the declared enum domain so generated state values cannot silently claim membership in an unrelated contract.
  '@typescript-eslint/no-unsafe-enum-assignment': 'error',
  // [correctness] Reject comparisons outside an enum's value domain because primitive coincidences can hide an incorrect state comparison.
  '@typescript-eslint/no-unsafe-enum-comparison': 'error',
  // [correctness] Require explicit callable signatures instead of Function so invocation arguments and results remain checked rather than accepting arbitrary calls.
  '@typescript-eslint/no-unsafe-function-type': 'error',
  // [correctness] Narrow any-valued receivers before property access because optional chaining only handles nullish values, not an unchecked member contract.
  '@typescript-eslint/no-unsafe-member-access': 'error',
  // [correctness] Reject any-valued returns that would let an unchecked result escape under a caller's trusted return type.
  '@typescript-eslint/no-unsafe-return': 'error',
  // [correctness] Require runtime narrowing instead of narrowing assertions so generated code cannot claim a more specific value shape without checking it.
  '@typescript-eslint/no-unsafe-type-assertion': 'error',
  // [correctness] Reject unary minus on unsupported types because implicit numeric coercion can produce NaN or throw instead of the intended negation.
  '@typescript-eslint/no-unsafe-unary-minus': 'error',
  // [correctness] Reject effect-free expressions that may be missing an assignment or call, including expressions hidden inside TypeScript assertions.
  '@typescript-eslint/no-unused-expressions': 'error',
  // [correctness] Flag defaults that the inferred input type cannot use because the apparent fallback may conceal a mistaken argument contract.
  '@typescript-eslint/no-useless-default-assignment': 'error',
  // [correctness] Use primitive types instead of boxed object types because wrapper contracts can accept objects with truthiness and equality behavior unlike primitive values.
  '@typescript-eslint/no-wrapper-object-types': 'error',
  // [correctness] Throw Error values so consumers can inspect ordinary error messages and stack diagnostics instead of receiving arbitrary thrown data.
  '@typescript-eslint/only-throw-error': 'error',
  // [correctness] Initialize enum members explicitly so inserting or reordering earlier members does not silently renumber values that consumers may persist or exchange.
  '@typescript-eslint/prefer-enum-initializers': 'error',
  // [correctness] Prefer nullish defaults so valid false, zero or empty-string inputs are not replaced merely because a generated fallback used truthiness.
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  // [correctness] Reject non-Error promise rejection reasons so asynchronous consumers retain ordinary message and stack diagnostics when handling failures.
  '@typescript-eslint/prefer-promise-reject-errors': 'error',
  // [correctness] Put reduce accumulator types in generic arguments so the compiler checks the initial value against the accumulator contract instead of trusting an assertion.
  '@typescript-eslint/prefer-reduce-type-parameter': 'error',
  // [correctness] Return this in fluent contracts so subclass callers retain their receiver type instead of losing subclass members after chaining.
  '@typescript-eslint/prefer-return-this-type': 'error',
  // [correctness] Require setter inputs to accept getter results so assigning a property's own value back does not violate its paired accessor contract.
  '@typescript-eslint/related-getter-setter-pairs': 'error',
  // [correctness] Require comparators for typed non-string arrays because default sort compares string forms and can silently produce the wrong numeric or object order.
  '@typescript-eslint/require-array-sort-compare': 'error',
  // [correctness] Reject any, booleans, nullish values, regexes and mixed number/string addition so unchecked coercion cannot turn arithmetic into concatenation or an unintended value.
  '@typescript-eslint/restrict-plus-operands': ['error', {
    allowAny: false,
    allowBoolean: false,
    allowNullish: false,
    allowNumberAndString: false,
    allowRegExp: false,
  }],
  // [correctness] Await promise returns so local catch observes rejections and finally waits for settlement; always awaiting also preserves async stack context outside those blocks.
  '@typescript-eslint/return-await': ['error', 'always'],
  // [correctness] Require boolean conditions, including explicit handling of every nullable category; reject any and number/string truthiness so zero, empty strings and missing values cannot silently choose an unintended branch.
  '@typescript-eslint/strict-boolean-expressions': ['error', {
    allowAny: false,
    allowNullableBoolean: false,
    allowNullableEnum: false,
    allowNullableNumber: false,
    allowNullableObject: false,
    allowNullableString: false,
    allowNumber: false,
    allowString: false,
  }],
  // [correctness] Reject value-returning callbacks in void contracts because callers discard those results, which can hide an omitted consumption step or an unhandled promise.
  '@typescript-eslint/strict-void-return': 'error',
  // [correctness] Require every union case even when a default exists so new variants cannot silently take a fallback; non-union switches need defaults because their possible inputs cannot be enumerated.
  '@typescript-eslint/switch-exhaustiveness-check': ['error', {
    considerDefaultExhaustiveForUnions: false,
    requireDefaultForNonUnion: true,
  }],
  // [correctness] Bind receiver-dependent methods before passing them as callbacks so invocation does not lose the this value their implementations require.
  '@typescript-eslint/unbound-method': 'error',
  // [correctness] Treat Promise rejection callback inputs as unknown because promises can reject arbitrary values; narrowing prevents handlers from assuming Error-shaped properties.
  '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
};

export { typeSafety };
