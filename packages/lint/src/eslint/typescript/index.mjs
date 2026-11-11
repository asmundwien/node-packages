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
  rules: {
    // TypeScript checks constructor calls and superclass requirements with the class type.
    'constructor-super': 'off',
    // TypeScript checks getter return types and rejects missing value returns.
    'getter-return': 'off',
    // TypeScript rejects assignments to class declarations.
    'no-class-assign': 'off',
    // TypeScript rejects assignments to const bindings.
    'no-const-assign': 'off',
    // TypeScript rejects duplicate parameter names.
    'no-dupe-args': 'off',
    // The typed duplicate-member check permits valid overload signatures.
    'no-dupe-class-members': 'off',
    // TypeScript rejects duplicate object-literal keys.
    'no-dupe-keys': 'off',
    // TypeScript rejects assignments to function declarations.
    'no-func-assign': 'off',
    // TypeScript rejects writes to imported bindings.
    'no-import-assign': 'off',
    // TypeScript checks whether native values have construct signatures.
    'no-new-native-nonconstructor': 'off',
    // TypeScript checks call and construct signatures of built-in objects.
    'no-obj-calls': 'off',
    // The typed redeclaration check permits legal declaration merging.
    'no-redeclare': 'off',
    // TypeScript rejects setter return values.
    'no-setter-return': 'off',
    // TypeScript checks superclass initialization before this access.
    'no-this-before-super': 'off',
    // TypeScript resolves both type and value names, unlike the core global-name check.
    'no-undef': 'off',
    // TypeScript's control-flow analysis owns unreachable statements.
    'no-unreachable': 'off',
    // TypeScript checks operand types for unsafe negation.
    'no-unsafe-negation': 'off',
    // TypeScript rejects with statements during compilation.
    'no-with': 'off',
    // The typed method check understands abstract, override and interface declarations.
    'class-methods-use-this': 'off',
    // The typed return check recognizes void and Promise<void> return contracts.
    'consistent-return': 'off',
    // The typed parameter-order check includes optional TypeScript parameters.
    'default-param-last': 'off',
    // The typed property-access check understands accessibility and index signatures.
    'dot-notation': 'off',
    // The typed initialization check distinguishes ambient declarations from runtime variables.
    'init-declarations': 'off',
    // The typed parameter limit handles the erased this parameter.
    'max-params': 'off',
    // The typed array-constructor check understands generic element types.
    'no-array-constructor': 'off',
    // The typed empty-function check understands constructor accessibility and decorators.
    'no-empty-function': 'off',
    // The typed eval check distinguishes callable values from string-based evaluation.
    'no-implied-eval': 'off',
    // The typed this check understands explicit this parameters.
    'no-invalid-this': 'off',
    // The typed numeric-literal check includes enums, literal types and type indexes.
    'no-magic-numbers': 'off',
    // The typed shadow check distinguishes type and value namespaces.
    'no-shadow': 'off',
    // The typed expression check understands assertions and non-null expression syntax.
    'no-unused-expressions': 'off',
    // The typed private-member check handles TypeScript access modifiers.
    'no-unused-private-class-members': 'off',
    // The typed binding check counts type-only declarations and references.
    'no-unused-vars': 'off',
    // The typed declaration-order check understands enums and type references.
    'no-use-before-define': 'off',
    // The typed constructor check preserves constructors needed for accessibility.
    'no-useless-constructor': 'off',
    // The typed throw check validates Error types instead of only literal syntax.
    'no-throw-literal': 'off',
    // The typed destructuring check respects type annotations on bindings.
    'prefer-destructuring': 'off',
    // The typed rejection check validates the rejection reason's Error type.
    'prefer-promise-reject-errors': 'off',
    // The typed await check allows async functions that return promises without awaiting them.
    'require-await': 'off',
    // The typed naming policy covers typed selectors, PascalCase components and allowed underscores.
    camelcase: 'off',
    // TypeScript resolves type and value export namespaces that import-x/named cannot model.
    'import-x/named': 'off',
    // The typed import policy requires separate import type declarations.
    'import-x/consistent-type-specifier-style': 'off',
    // Typed member ordering groups overloads and accessibility without conflicting Unicorn groups.
    'unicorn/consistent-class-member-order': 'off',
    // Await-thenable uses inferred types to reject unnecessary awaits without syntax-only guesses.
    'unicorn/no-unnecessary-await': 'off',
    // Typed exhaustiveness distinguishes discriminated unions from switches that need a default.
    'default-case': 'off',

    // Keep overload signatures adjacent so callers can review a complete callable contract.
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    // Use T[] for simple array element types instead of alternating array spellings.
    '@typescript-eslint/array-type': 'error',
    // Await only thenables and reject mixed promise arrays in asynchronous iteration.
    '@typescript-eslint/await-thenable': 'error',
    // Reject ignored compiler checks and require a meaningful description for expected type errors.
    '@typescript-eslint/ban-ts-comment': ['error', { minimumDescriptionLength: 10 }],
    // Reject obsolete TSLint suppression comments instead of leaving ineffective exceptions in source.
    '@typescript-eslint/ban-tslint-comment': 'error',
    // Declare constant class values as fields instead of getter methods that return literals.
    '@typescript-eslint/class-literal-property-style': 'error',
    // Require instance methods to use their receiver rather than hiding standalone functions in classes.
    '@typescript-eslint/class-methods-use-this': 'error',
    // Put generic constructor arguments on the constructor call instead of duplicating variable annotations.
    '@typescript-eslint/consistent-generic-constructors': 'error',
    // Use Record for indexed object contracts instead of interchangeable index-signature spellings.
    '@typescript-eslint/consistent-indexed-object-style': 'error',
    // Keep value-returning paths consistent while recognizing typed void-returning calls.
    '@typescript-eslint/consistent-return': 'error',
    // Use as assertions instead of angle-bracket assertions that conflict with JSX syntax.
    '@typescript-eslint/consistent-type-assertions': 'error',
    // Use interfaces for object contracts while allowing aliases for unions and other non-object types.
    '@typescript-eslint/consistent-type-definitions': 'error',
    // Mark erased exports as type exports and keep mixed exports in separate declarations.
    '@typescript-eslint/consistent-type-exports': 'error',
    // Separate erased imports from runtime imports so emitted module dependencies are explicit.
    '@typescript-eslint/consistent-type-imports': ['error', {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports',
    }],
    // Put default and optional parameters after required parameters.
    '@typescript-eslint/default-param-last': 'error',
    // Use dot access where the property's spelling and accessibility permit it.
    '@typescript-eslint/dot-notation': 'error',
    // State class-member accessibility rather than relying on TypeScript's implicit public default.
    '@typescript-eslint/explicit-member-accessibility': 'error',
    // Initialize runtime bindings at declaration instead of creating temporarily undefined variables.
    '@typescript-eslint/init-declarations': 'error',
    // Limit callable contracts to three runtime parameters, excluding an erased void this parameter.
    '@typescript-eslint/max-params': 'error',
    // Order typed members by role and accessibility so overloads and class contracts remain predictable.
    '@typescript-eslint/member-ordering': 'error',
    // Use function-valued properties for method contracts so strict function variance applies.
    '@typescript-eslint/method-signature-style': 'error',
    // Use camelCase values and PascalCase types/components; allow constants and intentional underscores.
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
    // Avoid ambiguous Array constructors while recognizing explicit generic element types.
    '@typescript-eslint/no-array-constructor': 'error',
    // Reject deleting typed array elements because deletion leaves sparse holes.
    '@typescript-eslint/no-array-delete': 'error',
    // Reject stringification of typed objects that only inherit Object's uninformative string conversion.
    '@typescript-eslint/no-base-to-string': 'error',
    // Keep void-valued calls in statement position instead of embedding them in value expressions.
    '@typescript-eslint/no-confusing-void-expression': 'error',
    // Reject typed @deprecated declarations, including local APIs that import checks cannot inspect.
    '@typescript-eslint/no-deprecated': 'error',
    // Reject duplicate runtime members while permitting TypeScript overload declarations.
    '@typescript-eslint/no-dupe-class-members': 'error',
    // Give enum members distinct values instead of creating ambiguous reverse mappings.
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    // Reject duplicate union and intersection members after type aliases resolve.
    '@typescript-eslint/no-duplicate-type-constituents': 'error',
    // Avoid computed delete operations that mutate object structure through unchecked keys.
    '@typescript-eslint/no-dynamic-delete': 'error',
    // Reject empty runtime functions while recognizing typed constructors and declarations.
    '@typescript-eslint/no-empty-function': 'error',
    // Reject empty object contracts that unexpectedly accept every non-nullish value.
    '@typescript-eslint/no-empty-object-type': 'error',
    // Use unknown and narrowing instead of explicitly bypassing type checks with any.
    '@typescript-eslint/no-explicit-any': 'error',
    // Use objects or standalone functions instead of empty, static-only or namespace-like classes.
    '@typescript-eslint/no-extraneous-class': 'error',
    // Handle every Promise and custom thenable; void does not count as rejection handling.
    '@typescript-eslint/no-floating-promises': ['error', {
      ignoreVoid: false,
      checkThenables: true,
    }],
    // Iterate array values rather than enumerating string keys and inherited properties.
    '@typescript-eslint/no-for-in-array': 'error',
    // Reject mapped and utility type operations that silently produce the unsafe empty object type.
    '@typescript-eslint/no-generated-empty-object-type': 'error',
    // Reject string evaluation in timers and Function constructors with type-aware callable checks.
    '@typescript-eslint/no-implied-eval': 'error',
    // Prevent type-only specifiers from accidentally retaining a runtime module side effect.
    '@typescript-eslint/no-import-type-side-effects': 'error',
    // Let literals infer variable, property and default-parameter types instead of repeating annotations.
    '@typescript-eslint/no-inferrable-types': 'error',
    // Use this only in receiver-bearing functions or explicit typed this contracts.
    '@typescript-eslint/no-invalid-this': 'error',
    // Restrict void to return and supported generic positions instead of using it as a value type.
    '@typescript-eslint/no-invalid-void-type': 'error',
    // Name domain constants; permit structural -1/0/1 values, indexes, defaults and declared constant types.
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
    // Do not discard an expression that already has void or undefined type.
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    // Keep constructor signatures on constructor contracts rather than instance interfaces.
    '@typescript-eslint/no-misused-new': 'error',
    // Reject promises in conditions, object spreads and callbacks that cannot handle their result.
    '@typescript-eslint/no-misused-promises': 'error',
    // Reject typed spreads of promises, functions and values whose copied properties are misleading.
    '@typescript-eslint/no-misused-spread': 'error',
    // Keep enum value domains uniformly numeric or string-based.
    '@typescript-eslint/no-mixed-enums': 'error',
    // Use ESM rather than runtime namespaces while permitting namespaces required by declaration files.
    '@typescript-eslint/no-namespace': 'error',
    // Narrow nullable values before use instead of erasing nullability with a postfix assertion.
    '@typescript-eslint/no-non-null-assertion': 'error',
    // Reject runtime redeclarations while permitting legal type/value declaration merging.
    '@typescript-eslint/no-redeclare': 'error',
    // Remove union and intersection members that absorb or contribute no type information.
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    // Reject require calls and TypeScript import-equals forms that evade ordinary ESM import checks.
    '@typescript-eslint/no-require-imports': 'error',
    // Prevent shadowed runtime bindings without conflating TypeScript's type and value namespaces.
    '@typescript-eslint/no-shadow': 'error',
    // Use typed booleans directly without replacing explicit nullable-boolean comparisons.
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    // Reject branches and optional operations that resolved types prove cannot affect execution.
    '@typescript-eslint/no-unnecessary-condition': 'error',
    // Do not reassign constructor parameter properties that TypeScript already initializes.
    '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
    // Remove namespace qualifiers when the referenced declaration is already in scope.
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    // Simplify string-typed variables and template literal types beyond Unicorn's syntax-based interpolation checks.
    '@typescript-eslint/no-unnecessary-template-expression': 'error',
    // Omit generic arguments equal to their declared defaults.
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    // Remove assertions that resolved types prove do not change the expression's type.
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    // Remove generic constraints that accept every type.
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    // Reject typed String/Number/Boolean calls and toString conversions beyond core coercion syntax checks.
    '@typescript-eslint/no-unnecessary-type-conversion': 'error',
    // Use a concrete type when a generic parameter does not relate multiple contract positions.
    '@typescript-eslint/no-unnecessary-type-parameters': 'error',
    // Prevent any-valued arguments from bypassing a callee's typed contract.
    '@typescript-eslint/no-unsafe-argument': 'error',
    // Prevent any-valued assignments from contaminating typed variables and properties.
    '@typescript-eslint/no-unsafe-assignment': 'error',
    // Reject calls through any-valued functions instead of assuming an unchecked signature.
    '@typescript-eslint/no-unsafe-call': 'error',
    // Reject interface/class merges that claim runtime members the class does not implement.
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',
    // Require enum-typed assignments to use values belonging to that enum.
    '@typescript-eslint/no-unsafe-enum-assignment': 'error',
    // Compare enum values within the enum's domain instead of unrelated primitive values.
    '@typescript-eslint/no-unsafe-enum-comparison': 'error',
    // Specify callable signatures instead of the unsafe built-in Function type.
    '@typescript-eslint/no-unsafe-function-type': 'error',
    // Narrow any-valued receivers before reading properties, including optional-chain access.
    '@typescript-eslint/no-unsafe-member-access': 'error',
    // Prevent any-valued results from escaping through typed return contracts.
    '@typescript-eslint/no-unsafe-return': 'error',
    // Narrow through runtime checks instead of asserting a more specific unchecked type.
    '@typescript-eslint/no-unsafe-type-assertion': 'error',
    // Apply unary minus only to values whose types support numeric negation.
    '@typescript-eslint/no-unsafe-unary-minus': 'error',
    // Reject expressions with no runtime effect, including assertion-wrapped expressions.
    '@typescript-eslint/no-unused-expressions': 'error',
    // Remove private members that no typed class code reads or calls.
    '@typescript-eslint/no-unused-private-class-members': 'error',
    // Reject unused runtime and type bindings rather than retaining unused declarations.
    '@typescript-eslint/no-unused-vars': 'error',
    // Declare runtime values before use while allowing erased type references.
    '@typescript-eslint/no-use-before-define': 'error',
    // Remove constructors that add no behavior or accessibility contract.
    '@typescript-eslint/no-useless-constructor': 'error',
    // Reject default assignments when inferred argument types cannot use the default.
    '@typescript-eslint/no-useless-default-assignment': 'error',
    // Remove empty exports from files that already contain imports or exports.
    '@typescript-eslint/no-useless-empty-export': 'error',
    // Use primitive types instead of boxed Boolean, Number and String object types.
    '@typescript-eslint/no-wrapper-object-types': 'error',
    // Throw Error values rather than unrelated typed values.
    '@typescript-eslint/only-throw-error': 'error',
    // Declare class fields explicitly instead of hiding fields in constructor parameter syntax.
    '@typescript-eslint/parameter-properties': 'error',
    // Preserve literal types with as const instead of spelling a matching literal assertion.
    '@typescript-eslint/prefer-as-const': 'error',
    // Use destructuring for array and object extraction where typed binding contracts permit it.
    '@typescript-eslint/prefer-destructuring': 'error',
    // Initialize every enum member instead of depending on preceding members' numeric values.
    '@typescript-eslint/prefer-enum-initializers': 'error',
    // Detect conditional filter results and computed zero indexes beyond Unicorn's direct array patterns.
    '@typescript-eslint/prefer-find': 'error',
    // Detect element-only loops over property receivers that Unicorn's identifier-receiver check does not cover.
    '@typescript-eslint/prefer-for-of': 'error',
    // Use function type syntax instead of interfaces whose only member is a call signature.
    '@typescript-eslint/prefer-function-type': 'error',
    // Check typed method-signature compatibility and regex tests beyond Unicorn's array search patterns.
    '@typescript-eslint/prefer-includes': 'error',
    // Make enum values literal constants instead of computed runtime expressions.
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    // Use namespace syntax, not legacy module syntax, for permitted ambient namespaces.
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    // Default nullable values with nullish coalescing instead of also replacing valid falsy values.
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    // Use optional chaining for typed nullable access without unsafe return-type-changing fixes.
    '@typescript-eslint/prefer-optional-chain': 'error',
    // Reject promise reasons that are not typed Error values.
    '@typescript-eslint/prefer-promise-reject-errors': 'error',
    // Mark private members readonly when initialization is their only write.
    '@typescript-eslint/prefer-readonly': 'error',
    // Protect explicit and inferred parameter types against input mutation; exceptions require scoped configs.
    '@typescript-eslint/prefer-readonly-parameter-types': ['error', { ignoreInferredTypes: false }],
    // Put reduce accumulator types in the generic argument instead of asserting the initial value.
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    // Use RegExp.exec for non-global matching rather than String.match's overloaded result contract.
    '@typescript-eslint/prefer-regexp-exec': 'error',
    // Return this in fluent member contracts rather than weakening the return to the containing class.
    '@typescript-eslint/prefer-return-this-type': 'error',
    // Check typed dynamic substring lengths and regex patterns beyond Unicorn's syntactic string transforms.
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    // Mark promise-returning functions async so their asynchronous contract is explicit.
    '@typescript-eslint/promise-function-async': 'error',
    // Require getter result types to be accepted by their corresponding setters.
    '@typescript-eslint/related-getter-setter-pairs': 'error',
    // Require comparators for typed non-string arrays, including computed and optional calls Unicorn skips.
    '@typescript-eslint/require-array-sort-compare': 'error',
    // Reject async functions with neither awaits nor promise-valued return paths.
    '@typescript-eslint/require-await': 'error',
    // Add only compatible numeric, bigint or string operands without implicit mixed-type conversion.
    '@typescript-eslint/restrict-plus-operands': ['error', {
      allowAny: false,
      allowBoolean: false,
      allowNullish: false,
      allowNumberAndString: false,
      allowRegExp: false,
    }],
    // Interpolate strings rather than silently coercing any, boolean, nullable, number or regex values.
    '@typescript-eslint/restrict-template-expressions': ['error', {
      allowAny: false,
      allowBoolean: false,
      allowNever: false,
      allowNullish: false,
      allowNumber: false,
      allowRegExp: false,
    }],
    // Await every returned promise so rejection handling and async stack frames remain in the function.
    '@typescript-eslint/return-await': ['error', 'always'],
    // Require explicit boolean decisions instead of number/string truthiness or nullable-value coercion.
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
    // Reject value-returning callbacks where callers promise to discard a void result.
    '@typescript-eslint/strict-void-return': 'error',
    // Enumerate every union case; require defaults for non-unions without treating defaults as union coverage.
    '@typescript-eslint/switch-exhaustiveness-check': ['error', {
      requireDefaultForNonUnion: true,
      considerDefaultExhaustiveForUnions: false,
    }],
    // Use imports for type and path dependencies instead of legacy triple-slash references.
    '@typescript-eslint/triple-slash-reference': 'error',
    // Bind receiver-dependent methods before passing them as standalone callbacks.
    '@typescript-eslint/unbound-method': 'error',
    // Combine equivalent overloads into one union or optional-parameter signature.
    '@typescript-eslint/unified-signatures': 'error',
    // Treat Promise rejection callback parameters as unknown and narrow before access.
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
    // Reserve function verb prefixes for callable values using Project Service's type information.
    'unicorn/no-non-function-verb-prefix': 'error',
  },
});

export { typescript };
