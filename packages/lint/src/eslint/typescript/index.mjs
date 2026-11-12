import { defineConfig } from 'eslint/config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import unicorn from 'eslint-plugin-unicorn';
import ts from 'typescript-eslint';

const typescript = defineConfig({
  name: '@asmundwien/lint/typescript',
  files: ['**/*.{ts,tsx,mts,cts}'],
  languageOptions: {
    parser: ts.parser,
    sourceType: 'module',
    // Use the consumer's compiler project for type-aware checks across its selected files.
    parserOptions: { project: ['tsconfig.json'] },
  },
  plugins: { '@typescript-eslint': ts.plugin, unicorn },
  settings: {
    'import-x/extensions': ['.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs'],
    'import-x/resolver-next': [createTypeScriptImportResolver()],
  },
  // Compiler delegations below require a consumer tsc check with noCheck disabled.
  // Supplying parserOptions.project gives lint types but does not run compiler diagnostics.
  rules: {
    // [correctness] Off (covered): Consumer tsc reports missing or invalid super calls with TS2377 and TS2337 during class checking.
    'constructor-super': 'off',
    // [correctness] Off (covered): Consumer tsc reports getters without returns with TS2378; partial value-return paths need noImplicitReturns for TS7030 or strictNullChecks and a non-undefined return annotation for TS2366.
    'getter-return': 'off',
    // [correctness] Off (covered): Consumer tsc rejects replacing class declarations with TS2629, preserving the declared constructor binding.
    'no-class-assign': 'off',
    // [correctness] Off (covered): Consumer tsc rejects writes to const bindings with TS2588 before immutable-binding assignments reach runtime.
    'no-const-assign': 'off',
    // [correctness] Off (covered): Consumer tsc reports duplicate parameter identifiers with TS2300 rather than accepting ambiguous argument bindings.
    'no-dupe-args': 'off',
    // [correctness] Off (covered): @typescript-eslint/no-dupe-class-members rejects overwriting members while accepting TypeScript overload signatures.
    'no-dupe-class-members': 'off',
    // [correctness] Off (covered): Consumer tsc reports repeated object properties with TS1117 and conflicting accessors with TS1118 or TS1119.
    'no-dupe-keys': 'off',
    // [correctness] Off (covered): Consumer tsc rejects replacing function declarations with TS2630, preserving the declared callable binding.
    'no-func-assign': 'off',
    // [correctness] Off (covered): Consumer tsc reports imported-binding writes with TS2632 and namespace-property writes with TS2540 for resolved module declarations.
    'no-import-assign': 'off',
    // [correctness] Off (covered): Consumer tsc rejects new Symbol and new BigInt with TS2350 against their standard library declarations; those declarations must be included in the consumer's lib.
    'no-new-native-nonconstructor': 'off',
    // [correctness] Off (covered): Consumer tsc reports calls to non-callable standard library objects with TS2349; accurate lib declarations are required instead of any-valued globals.
    'no-obj-calls': 'off',
    // [correctness] Off (covered): @typescript-eslint/no-redeclare rejects conflicting bindings while accepting legal type/value declaration merging.
    'no-redeclare': 'off',
    // [correctness] Off (covered): Consumer tsc reports value-returning setters with TS2408 because assignments cannot consume a setter return value.
    'no-setter-return': 'off',
    // [correctness] Off (covered): Consumer tsc reports this access before super with TS17009 and super-property access before initialization with TS17011.
    'no-this-before-super': 'off',
    // [correctness] Off (covered): Consumer tsc reports unresolved type and value names with TS2304; consumer ambient declarations define the accepted globals.
    'no-undef': 'off',
    // [correctness] Off (covered): Consumer tsc reports unreachable statements with TS7027 only when allowUnreachableCode is false; the default emits editor suggestions, not build errors.
    'no-unreachable': 'off',
    // [correctness] Off (covered): Consumer tsc rejects boolean left operands from misplaced ! in instanceof with TS2358 and in in-expressions with TS2322.
    'no-unsafe-negation': 'off',
    // [correctness] Off (covered): Consumer tsc rejects unsupported with blocks with TS2410 because their dynamic name lookup defeats static binding checks.
    'no-with': 'off',
    // [architectural-prevention] Off (covered): @typescript-eslint/class-methods-use-this checks receiver ownership without misreading typed class declarations.
    'class-methods-use-this': 'off',
    // [correctness] Off (covered): @typescript-eslint/consistent-return detects inconsistent value paths while recognizing void and Promise<void> contracts.
    'consistent-return': 'off',
    // [standardization] Off (covered): @typescript-eslint/default-param-last applies the selected positional-call convention to optional TypeScript parameters too.
    'default-param-last': 'off',
    // [standardization] Off (covered): @typescript-eslint/dot-notation selects property syntax with knowledge of typed accessibility and index signatures.
    'dot-notation': 'off',
    // [architectural-prevention] Off (covered): @typescript-eslint/init-declarations requires initialized runtime bindings without treating ambient declarations as missing initialization.
    'init-declarations': 'off',
    // [architectural-prevention] Off (covered): @typescript-eslint/max-params applies the callable review ceiling without counting an erased void this parameter.
    'max-params': 'off',
    // [standardization] Off (covered): @typescript-eslint/no-array-constructor selects array literals while recognizing generic Array<T> construction.
    'no-array-constructor': 'off',
    // [enforcement-integrity] Off (covered): @typescript-eslint/no-empty-function rejects empty implementations while recognizing TypeScript-specific constructor contracts.
    'no-empty-function': 'off',
    // [correctness] Off (covered): @typescript-eslint/no-implied-eval rejects string execution while distinguishing typed callable timer arguments.
    'no-implied-eval': 'off',
    // [correctness] Off (covered): @typescript-eslint/no-invalid-this checks receiver validity while recognizing explicit typed this parameters.
    'no-invalid-this': 'off',
    // [standardization] Off (covered): @typescript-eslint/no-magic-numbers applies the selected constant-naming policy to enums and type-level numeric syntax too.
    'no-magic-numbers': 'off',
    // [architectural-prevention] Off (covered): @typescript-eslint/no-shadow checks binding ambiguity without conflating separate type and value namespaces.
    'no-shadow': 'off',
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
    // [correctness] Off (covered): @typescript-eslint/only-throw-error checks the thrown value's type rather than only rejecting literal throw syntax.
    'no-throw-literal': 'off',
    // [standardization] Off (covered): @typescript-eslint/prefer-destructuring selects extraction syntax without discarding typed binding annotations.
    'prefer-destructuring': 'off',
    // [correctness] Off (covered): @typescript-eslint/prefer-promise-reject-errors checks rejection reason types so handlers can consume Error diagnostics.
    'prefer-promise-reject-errors': 'off',
    // [architectural-prevention] Off (covered): @typescript-eslint/require-await checks unnecessary async boundaries while accepting promise-valued return paths.
    'require-await': 'off',
    // [standardization] Off (covered): @typescript-eslint/naming-convention owns the selected value/type naming policy, including PascalCase components and permitted underscores.
    camelcase: 'off',
    // [correctness] Off (covered): Consumer tsc reports missing named exports with TS2305 for resolved module declarations; accurate dependency declarations are required for type/value export checking.
    'import-x/named': 'off',
    // [standardization] Off (covered): @typescript-eslint/consistent-type-imports requires separate type imports, so import-x/consistent-type-specifier-style must not select competing syntax.
    'import-x/consistent-type-specifier-style': 'off',
    // [standardization] Off (covered): @typescript-eslint/member-ordering owns member layout with typed accessibility and overload groups instead of competing Unicorn groups.
    'unicorn/consistent-class-member-order': 'off',
    // [correctness] Off (covered): @typescript-eslint/await-thenable rejects awaits of non-thenables using inferred types instead of syntax-only guesses.
    'unicorn/no-unnecessary-await': 'off',
    // [correctness] Off (covered): @typescript-eslint/switch-exhaustiveness-check requires union cases and, with requireDefaultForNonUnion, a fallback for other switch domains.
    'default-case': 'off',

    // [standardization] Keep overloads adjacent so reviewers can compare the complete callable contract without searching through generated declarations.
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    // [standardization] Choose T[] array syntax so generated contracts do not alternate it with the equivalent Array<T> spelling.
    '@typescript-eslint/array-type': 'error',
    // [correctness] Reject awaits of non-thenables and iteration patterns that leave promised elements unresolved instead of producing the values callers expect.
    '@typescript-eslint/await-thenable': 'error',
    // [enforcement-integrity] Reject compiler-check bypasses; expected errors need at least ten description characters to make suppression intent reviewable, not to prove it justified.
    '@typescript-eslint/ban-ts-comment': ['error', { minimumDescriptionLength: 10 }],
    // [enforcement-integrity] Remove obsolete TSLint suppressions so generated code does not imply that an inactive exception satisfies current verification obligations.
    '@typescript-eslint/ban-tslint-comment': 'error',
    // [standardization] Represent literal class constants as readonly fields rather than getters so generated declarations use a predictable constant representation.
    '@typescript-eslint/class-literal-property-style': 'error',
    // [architectural-prevention] Require receiver use to expose methods that may belong outside the class; receiver use is an ownership proxy, not proof of cohesion.
    '@typescript-eslint/class-methods-use-this': 'error',
    // [standardization] Put generic arguments on constructor calls so generated initialization code has one predictable place for its instantiated type.
    '@typescript-eslint/consistent-generic-constructors': 'error',
    // [standardization] Choose Record for indexed object contracts so review and search do not need to account for equivalent index-signature spellings.
    '@typescript-eslint/consistent-indexed-object-style': 'error',
    // [correctness] Reject inconsistent value-return paths that can give callers undefined instead of the result supplied by other branches.
    '@typescript-eslint/consistent-return': 'error',
    // [standardization] Choose as assertions over angle-bracket assertions so generated TypeScript uses syntax that also parses in TSX.
    '@typescript-eslint/consistent-type-assertions': 'error',
    // [standardization] Choose interfaces for object contracts so generated APIs use a predictable declaration form; aliases remain available for other type expressions.
    '@typescript-eslint/consistent-type-definitions': 'error',
    // [standardization] Mark erased exports with export type so reviewers can distinguish runtime exports from type-only contracts without resolving each declaration.
    '@typescript-eslint/consistent-type-exports': 'error',
    // [standardization] Require separate import type declarations so erased dependencies remain distinct from runtime imports during review and dependency search.
    '@typescript-eslint/consistent-type-imports': ['error', {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports',
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
    // [correctness] Use function-valued properties so strictFunctionTypes can reject unsafe parameter narrowing that method bivariance would accept; consumer strictFunctionTypes must be enabled.
    '@typescript-eslint/method-signature-style': 'error',
    // [standardization] Choose camelCase values and PascalCase types so generated names identify their intended role.
    // PascalCase imports, variables and functions support component bindings; UPPER_CASE variables support constants.
    // Boundary underscores support intentional naming conventions but imply neither privacy nor exemption from unused checks.
    '@typescript-eslint/naming-convention': ['error', {
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
    // [standardization] Choose array literals instead of ambiguous Array constructor syntax; generic Array<T> calls remain available to state element types explicitly.
    '@typescript-eslint/no-array-constructor': 'error',
    // [correctness] Reject deleting array elements because the resulting holes retain length and change iteration behavior rather than removing an item.
    '@typescript-eslint/no-array-delete': 'error',
    // [correctness] Reject default object stringification that would replace useful output with values such as [object Object] in messages or stored strings.
    '@typescript-eslint/no-base-to-string': 'error',
    // [correctness] Keep void-valued calls out of value expressions so callers do not accidentally consume the missing result of a side-effect-only operation.
    '@typescript-eslint/no-confusing-void-expression': 'error',
    // [standardization] Exclude APIs marked @deprecated from newly generated code so it follows the declared supported API rather than adding migration work.
    '@typescript-eslint/no-deprecated': 'error',
    // [correctness] Reject duplicate runtime members that overwrite earlier behavior while retaining overload declarations that describe one implementation.
    '@typescript-eslint/no-dupe-class-members': 'error',
    // [correctness] Give enum members distinct literal values to avoid indistinguishable states and numeric reverse mappings that overwrite an earlier name.
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    // [standardization] Remove duplicate union and intersection constituents so generated contracts do not repeat alternatives and obscure meaningful type differences.
    '@typescript-eslint/no-duplicate-type-constituents': 'error',
    // [architectural-prevention] Restrict computed deletion because dynamic structural mutation makes property ownership and object-shape changes harder to inspect locally.
    '@typescript-eslint/no-dynamic-delete': 'error',
    // [enforcement-integrity] Reject empty implementations that can satisfy a generated signature without doing the promised work; typed constructor exceptions retain their declaration contracts.
    '@typescript-eslint/no-empty-function': 'error',
    // [correctness] Reject empty object contracts that accept every non-nullish value when callers may expect an object with a meaningful shape.
    '@typescript-eslint/no-empty-object-type': 'error',
    // [correctness] Require unknown and narrowing instead of explicit any so generated code cannot silently disable checking at a typed contract boundary.
    '@typescript-eslint/no-explicit-any': 'error',
    // [architectural-prevention] Reject empty and static-only classes that add class coupling without instance state; ordinary objects or functions expose the actual ownership.
    '@typescript-eslint/no-extraneous-class': 'error',
    // [correctness] Require promise handling because rejected work can escape callers; void is not handling, and custom thenables are checked because they can reject too.
    '@typescript-eslint/no-floating-promises': ['error', {
      ignoreVoid: false,
      checkThenables: true,
    }],
    // [correctness] Iterate array values instead of for-in keys, which are strings and may include inherited properties unrelated to the intended elements.
    '@typescript-eslint/no-for-in-array': 'error',
    // [correctness] Reject generated empty object types because mapped or utility operations can silently admit non-nullish primitives instead of the intended object contract.
    '@typescript-eslint/no-generated-empty-object-type': 'error',
    // [correctness] Reject strings passed to timer evaluation and Function constructors because executing constructed source permits code injection beyond ordinary typed calls.
    '@typescript-eslint/no-implied-eval': 'error',
    // [correctness] Prevent inline type-only imports from retaining a runtime module import that can execute side effects despite importing no runtime values.
    '@typescript-eslint/no-import-type-side-effects': 'error',
    // [standardization] Omit annotations inferable from initial literals so generated declarations do not repeat type information that must be maintained twice.
    '@typescript-eslint/no-inferrable-types': 'error',
    // [correctness] Reject this where no receiver contract exists so generated functions do not depend on a binding their callers cannot supply safely.
    '@typescript-eslint/no-invalid-this': 'error',
    // [standardization] Reserve void for supported return and generic positions so generated contracts do not alternate it with value-level undefined types.
    '@typescript-eslint/no-invalid-void-type': 'error',
    // [standardization] Name domain numbers so their meaning is reviewable; accept -1/0/1 as structural conventions and indexes or type indexes as positions.
    // Defaults and field initializers already locate the declaration; enums, literal types and readonly properties already state a named contract.
    // Object values remain inline to avoid naming every data field. These exceptions do not prove domain meaning; remaining numeric bindings must use const.
    '@typescript-eslint/no-magic-numbers': ['error', {
      ignore: [-1, 0, 1],
      ignoreArrayIndexes: true,
      ignoreDefaultValues: true,
      ignoreClassFieldInitialValues: true,
      ignoreEnums: true,
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
      ignoreTypeIndexes: true,
      enforceConst: true,
      detectObjects: false,
    }],
    // [standardization] Remove void applied to already void or undefined expressions so generated code does not add a discard marker where no value exists to discard.
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    // [correctness] Keep constructor signatures separate from instance interfaces so a contract does not claim that existing instances are constructable.
    '@typescript-eslint/no-misused-new': 'error',
    // [correctness] Reject promises in synchronous conditions, spreads and void callbacks where truthiness or a discarded rejection replaces the intended resolved result.
    '@typescript-eslint/no-misused-promises': 'error',
    // [correctness] Reject typed spreads whose enumerable properties differ from the apparent value, such as spreading a Promise instead of its resolved object.
    '@typescript-eslint/no-misused-spread': 'error',
    // [standardization] Keep each enum numeric or string-based so generated value domains have one predictable representation rather than mixed conversion behavior.
    '@typescript-eslint/no-mixed-enums': 'error',
    // [standardization] Choose ESM for runtime organization instead of TypeScript namespaces; declaration-file namespaces remain accepted for ambient API descriptions.
    '@typescript-eslint/no-namespace': 'error',
    // [correctness] Require nullability checks instead of postfix assertions so generated code does not erase the possibility of a null or undefined dereference.
    '@typescript-eslint/no-non-null-assertion': 'error',
    // [correctness] Reject runtime redeclarations that can replace an existing binding while accepting TypeScript's intentional declaration-merging contracts.
    '@typescript-eslint/no-redeclare': 'error',
    // [standardization] Remove absorbed or ineffective union and intersection members so reviewers can see the contract the compiler actually enforces.
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    // [standardization] Require ESM imports rather than require or import-equals so generated dependency declarations follow the same module convention and import checks.
    '@typescript-eslint/no-require-imports': 'error',
    // [architectural-prevention] Prevent shadowed bindings from hiding which value a generated reference uses without conflating independent type and value namespaces.
    '@typescript-eslint/no-shadow': 'error',
    // [standardization] Use boolean values directly instead of literal comparisons so generated conditions use one spelling; explicit nullable-boolean distinctions remain meaningful.
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    // [correctness] Flag conditions that resolved types say cannot change the path because they may hide a mistaken branch or an inaccurate input contract.
    '@typescript-eslint/no-unnecessary-condition': 'error',
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
    // [architectural-prevention] Remove unused private members so generated classes do not retain unconsumed implementation state or methods that increase review work.
    '@typescript-eslint/no-unused-private-class-members': 'error',
    // [architectural-prevention] Remove unused value and type bindings so generated code does not accumulate unconsumed declarations or unnecessary dependency references.
    '@typescript-eslint/no-unused-vars': 'error',
    // [standardization] Declare runtime values before references so generated execution order is locally readable; erased type references do not need runtime ordering.
    '@typescript-eslint/no-use-before-define': 'error',
    // [standardization] Omit constructors that add neither behavior nor accessibility so generated class declarations do not repeat the inherited construction contract.
    '@typescript-eslint/no-useless-constructor': 'error',
    // [correctness] Flag defaults that the inferred input type cannot use because the apparent fallback may conceal a mistaken argument contract.
    '@typescript-eslint/no-useless-default-assignment': 'error',
    // [standardization] Omit empty exports when imports or exports already establish module scope so generated files do not repeat an unnecessary module marker.
    '@typescript-eslint/no-useless-empty-export': 'error',
    // [correctness] Use primitive types instead of boxed object types because wrapper contracts can accept objects with truthiness and equality behavior unlike primitive values.
    '@typescript-eslint/no-wrapper-object-types': 'error',
    // [correctness] Throw Error values so consumers can inspect ordinary error messages and stack diagnostics instead of receiving arbitrary thrown data.
    '@typescript-eslint/only-throw-error': 'error',
    // [architectural-prevention] Declare fields outside constructor parameters so reviewers can inspect instance state ownership without searching a second declaration location.
    '@typescript-eslint/parameter-properties': 'error',
    // [standardization] Choose as const for matching literal assertions so generated declarations preserve literal types without repeating the value as a type.
    '@typescript-eslint/prefer-as-const': 'error',
    // [standardization] Choose destructuring for supported extraction patterns so generated bindings use one recognizable extraction form without losing typed annotations.
    '@typescript-eslint/prefer-destructuring': 'error',
    // [correctness] Initialize enum members explicitly so inserting or reordering earlier members does not silently renumber values that consumers may persist or exchange.
    '@typescript-eslint/prefer-enum-initializers': 'error',
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
    // [correctness] Prefer nullish defaults so valid false, zero or empty-string inputs are not replaced merely because a generated fallback used truthiness.
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    // [standardization] Choose optional chaining for supported nullable access so generated guards use a predictable form; default fixes avoid changing the result type unsafely.
    '@typescript-eslint/prefer-optional-chain': 'error',
    // [correctness] Reject non-Error promise rejection reasons so asynchronous consumers retain ordinary message and stack diagnostics when handling failures.
    '@typescript-eslint/prefer-promise-reject-errors': 'error',
    // [architectural-prevention] Mark initialization-only private members readonly so later generated code cannot mutate state that the class currently treats as fixed.
    '@typescript-eslint/prefer-readonly': 'error',
    // [architectural-prevention] Require readonly parameter contracts even for inferred types so mutation through caller-owned inputs stays restricted; inference is not an exemption, and readonly does not prove deep runtime immutability.
    '@typescript-eslint/prefer-readonly-parameter-types': ['error', { ignoreInferredTypes: false }],
    // [correctness] Put reduce accumulator types in generic arguments so the compiler checks the initial value against the accumulator contract instead of trusting an assertion.
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    // [standardization] Choose RegExp.exec for non-global matching so generated callers use the matching API without String.match's global-dependent result contract.
    '@typescript-eslint/prefer-regexp-exec': 'error',
    // [correctness] Return this in fluent contracts so subclass callers retain their receiver type instead of losing subclass members after chaining.
    '@typescript-eslint/prefer-return-this-type': 'error',
    // [standardization] Choose startsWith and endsWith for supported boundary tests so generated string checks state the comparison without index or regex encodings.
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    // [standardization] Mark promise-returning functions async so generated declarations expose the asynchronous boundary rather than relying only on an inferred promise result.
    '@typescript-eslint/promise-function-async': 'error',
    // [correctness] Require setter inputs to accept getter results so assigning a property's own value back does not violate its paired accessor contract.
    '@typescript-eslint/related-getter-setter-pairs': 'error',
    // [correctness] Require comparators for typed non-string arrays because default sort compares string forms and can silently produce the wrong numeric or object order.
    '@typescript-eslint/require-array-sort-compare': 'error',
    // [architectural-prevention] Reject async wrappers with no awaits or promise-valued returns because they add an asynchronous caller contract without asynchronous work.
    '@typescript-eslint/require-await': 'error',
    // [correctness] Reject any, booleans, nullish values, regexes and mixed number/string addition so unchecked coercion cannot turn arithmetic into concatenation or an unintended value.
    '@typescript-eslint/restrict-plus-operands': ['error', {
      allowAny: false,
      allowBoolean: false,
      allowNullish: false,
      allowNumberAndString: false,
      allowRegExp: false,
    }],
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
      requireDefaultForNonUnion: true,
      considerDefaultExhaustiveForUnions: false,
    }],
    // [standardization] Choose imports for type and path dependencies so generated module dependencies remain visible to the ordinary import tooling rather than legacy triple-slash directives.
    '@typescript-eslint/triple-slash-reference': 'error',
    // [correctness] Bind receiver-dependent methods before passing them as callbacks so invocation does not lose the this value their implementations require.
    '@typescript-eslint/unbound-method': 'error',
    // [standardization] Combine equivalent overloads into union or optional-parameter signatures so generated callable contracts do not duplicate signatures reviewers must compare.
    '@typescript-eslint/unified-signatures': 'error',
    // [correctness] Treat Promise rejection callback inputs as unknown because promises can reject arbitrary values; narrowing prevents handlers from assuming Error-shaped properties.
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
    // [standardization] Reserve function verb prefixes for callable values so generated names communicate whether consumers can invoke them; the configured type checker resolves callability.
    'unicorn/no-non-function-verb-prefix': 'error',
  },
});

export { typescript };
