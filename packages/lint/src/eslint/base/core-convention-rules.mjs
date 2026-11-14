/**
@type {import('eslint').Linter.RulesRecord}
*/
const coreConventionRules = {
  // [standardization] Pair setters with getters so generated properties follow the selected readable-and-writable accessor contract rather than write-only interfaces.
  'accessor-pairs': 'error',
  // [standardization] Keep variable use inside its declaring block so reviewers can follow block boundaries even for function-scoped declarations.
  'block-scoped-var': 'error',
  // [standardization] Use camelCase identifiers so generated declarations and repository searches follow one naming convention.
  'camelcase': 'error',
  // [standardization] Capitalize comment starts so generated prose follows the selected sentence convention.
  'capitalized-comments': 'error',
  // [standardization] Put switch defaults last so reviewers find fallback behavior in a predictable position.
  'default-case-last': 'error',
  // [standardization] Put defaulted parameters last so callers can omit optional inputs without positional placeholders.
  'default-param-last': 'error',
  // [standardization] Use dot access for identifier keys so reviewers can distinguish fixed property names from computed access.
  'dot-notation': 'error',
  // [standardization] Match function expression names to assigned bindings so stack traces and repository searches identify the same function name.
  'func-name-matching': 'error',
  // [standardization] Name remaining function expressions so diagnostic stacks identify the function instead of an anonymous frame.
  'func-names': 'error',
  // [standardization] Keep getter and setter pairs adjacent so reviewers can inspect the complete property interface together.
  'grouped-accessor-pairs': 'error',
  // [standardization] Choose a two-character minimum for checked names to reject opaque single-letter bindings and properties during generated-code review.
  'id-length': ['error', { min: 2 }],
  // [standardization] Initialize declarations so reviewers see each binding's first value where the binding is introduced.
  'init-declarations': 'error',
  // [standardization] Capitalize constructor names so reviewers can distinguish construction-oriented APIs from ordinary calls by their names.
  'new-cap': 'error',
  // [standardization] Avoid alert(), confirm(), and prompt() so generated UI behavior does not introduce browser modal dialogs as an alternate interaction convention.
  'no-alert': 'error',
  // [standardization] Use array literals so reviewers do not decode constructor overloads to determine initial contents.
  'no-array-constructor': 'error',
  // [standardization] Avoid bitwise operators so generated arithmetic does not introduce implicit fixed-width integer coercion under this policy.
  'no-bitwise': 'error',
  // [standardization] Keep console calls out of generated source so diagnostics do not introduce an unstructured alternate output convention.
  'no-console': 'error',
  // [standardization] Use named control escapes instead of raw or hexadecimal control characters so reviewers can identify nonprinting regex contents.
  'no-control-regex': 'error',
  // [standardization] Escape a leading regex equals sign so reviewers do not confuse the literal opening with a division assignment.
  'no-div-regex': 'error',
  // [standardization] Remove empty static blocks so class declarations do not imply initialization work that never occurs.
  'no-empty-static-block': 'error',
  // [standardization] Compare null explicitly with strict operators so nullish matching does not introduce loose-equality conventions.
  'no-eq-null': 'error',
  // [standardization] Remove bind() calls that add no receiver behavior so reviewers can distinguish necessary binding from redundant wrappers.
  'no-extra-bind': 'error',
  // [standardization] Omit redundant boolean casts in conditions so reviewers inspect the predicate without an unnecessary conversion layer.
  'no-extra-boolean-cast': 'error',
  // [standardization] Remove labels unnecessary to an exit target so explicit labels identify control flow that actually needs naming.
  'no-extra-label': 'error',
  // [standardization] Use explicit conversions so reviewers do not decode boolean, numeric, or string coercion shortcuts.
  'no-implicit-coercion': 'error',
  // [standardization] Put comments on separate lines so explanations and statements can be reviewed and edited independently.
  'no-inline-comments': 'error',
  // [standardization] Keep flagged declarations out of nested blocks so generated source does not depend on confusing declaration-placement conventions.
  'no-inner-declarations': 'error',
  // [standardization] Reject irregular whitespace so invisible source characters do not obscure token boundaries during review.
  'no-irregular-whitespace': 'error',
  // [standardization] Use standard iteration protocols instead of legacy __iterator__ properties so generated code follows the supported language API.
  'no-iterator': 'error',
  // [standardization] Keep labels distinct from variable names so reviewers can distinguish jump targets from data bindings.
  'no-label-var': 'error',
  // [standardization] Avoid labeled statements so generated control flow follows ordinary structured loop and branch conventions.
  'no-labels': 'error',
  // [standardization] Remove unnecessary blocks so reviewers do not infer a meaningful scope boundary where none is needed.
  'no-lone-blocks': 'error',
  // [standardization] Use else if instead of an else containing only if so generated branch chains have one selected layout.
  'no-lonely-if': 'error',
  // [standardization] Name unexplained numbers with const; allow -1/0/1 and indexes as common structural values, and object values, defaults, fields, enums, readonly properties, and numeric type positions where the surrounding declaration supplies their role.
  'no-magic-numbers': ['error', {
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
  // [standardization] Separate chained assignments so reviewers can inspect each state update and its assigned value independently.
  'no-multi-assign': 'error',
  // [standardization] Use template literals or explicit escapes instead of line-continued strings so reviewers can see intended string boundaries.
  'no-multi-str': 'error',
  // [standardization] Avoid legacy non-octal decimal escapes so generated strings use supported unambiguous escape notation.
  'no-nonoctal-decimal-escape': 'error',
  // [standardization] Use object literals for empty objects so reviewers do not infer a conversion operation from Object construction.
  'no-object-constructor': 'error',
  // [standardization] Avoid legacy octal literal notation so generated constants do not depend on leading-zero interpretation.
  'no-octal': 'error',
  // [standardization] Use explicit assignment updates instead of ++ or -- so reviewers do not need to distinguish prefix and postfix result semantics.
  'no-plusplus': 'error',
  // [standardization] Avoid legacy __proto__ access so prototype operations use explicit standard APIs rather than a special property convention.
  'no-proto': 'error',
  // [standardization] Express repeated regex spaces explicitly so reviewers can count required whitespace without comparing invisible gaps.
  'no-regex-spaces': 'error',
  // [standardization] Use Vitest for unit and integration tests; reject alternate runner imports and their subpaths so generated tests do not introduce a second discovery and execution convention.
  'no-restricted-imports': ['error', {
    patterns: [{
      group: [
        'node:test',
        'node:test/**',
        'bun:test',
        'bun:test/**',
        '@jest/globals',
        '@jest/globals/**',
        'jest',
        'jest/**',
        'mocha',
        'mocha/**',
        'ava',
        'ava/**',
        'tape',
        'tape/**',
        'uvu',
        'uvu/**',
      ],
      message: 'Use Vitest for unit and integration tests; configure browser E2E separately.',
    }],
  }],
  // [standardization] Separate assignment from returned values so reviewers can distinguish state updates from the function's output contract.
  'no-return-assign': 'error',
  // [standardization] Use separate expressions instead of comma operators so reviewers do not overlook effects hidden inside a value expression.
  'no-sequences': 'error',
  // [standardization] Omit redundant undefined initializers so explicit initial values identify meaningful state choices.
  'no-undef-init': 'error',
  // [standardization] Avoid underscore privacy names so generated bindings follow the selected naming convention and real private fields express privacy.
  'no-underscore-dangle': 'error',
  // [standardization] Use direct boolean or fallback expressions instead of redundant ternaries so reviewers inspect the effective value operation.
  'no-unneeded-ternary': 'error',
  // [standardization] Remove unused labels so reviewers do not infer a jump target that no control-flow statement uses.
  'no-unused-labels': 'error',
  // [standardization] Define bindings before use so reviewers encounter declarations before references, even where hoisting would permit the reverse order.
  'no-use-before-define': 'error',
  // [standardization] Use direct calls when call() or apply() adds no receiver behavior so reviewers do not infer a required invocation adaptation.
  'no-useless-call': 'error',
  // [standardization] Remove catch clauses that only rethrow unchanged errors so visible handlers identify actual recovery or translation.
  'no-useless-catch': 'error',
  // [standardization] Use ordinary property keys when computation is unnecessary so reviewers can distinguish fixed names from dynamic access.
  'no-useless-computed-key': 'error',
  // [standardization] Omit constructors that add no behavior so reviewers inspect only initialization that differs from the language default.
  'no-useless-constructor': 'error',
  // [standardization] Remove ineffective escapes so source spelling does not imply a special character interpretation that never occurs.
  'no-useless-escape': 'error',
  // [standardization] Omit same-name aliases so reviewers can distinguish genuine renaming from redundant import, export, or destructuring syntax.
  'no-useless-rename': 'error',
  // [standardization] Remove redundant returns so explicit exits identify control flow that changes execution.
  'no-useless-return': 'error',
  // [standardization] Use block-scoped let and const so generated declarations follow one scope model rather than mixing in var hoisting.
  'no-var': 'error',
  // [standardization] Permit standalone void only to mark deliberate result discard; keep it out of value expressions where it hides the resulting undefined value.
  'no-void': ['error', { allowAsStatement: true }],
  // [standardization] Use object method and property shorthand so equivalent literal members have one selected source form.
  'object-shorthand': 'error',
  // [standardization] Declare one binding per declaration so reviewers can inspect each initializer and edit it independently.
  'one-var': ['error', 'never'],
  // [standardization] Use arrows for callbacks that do not need their own this so callback receiver behavior follows one explicit lexical convention.
  'prefer-arrow-callback': 'error',
  // [standardization] Use destructuring for matched extractions so reviewers see source structure beside the resulting bindings.
  'prefer-destructuring': 'error',
  // [standardization] Use ** for exponentiation so generated arithmetic follows the selected operator syntax rather than an equivalent Math call.
  'prefer-exponentiation-operator': 'error',
  // [standardization] Name capture groups so reviewers can connect extracted regex data to meaningful names instead of unexplained numeric positions.
  'prefer-named-capture-group': 'error',
  // [standardization] Use numeric literals for statically known parsed constants so reviewers read their radix and value without evaluating a parser call.
  'prefer-numeric-literals': 'error',
  // [standardization] Use object spread for fresh-object copies so reviewers distinguish constructing a copy from Object.assign() mutations of an existing target.
  'prefer-object-spread': 'error',
  // [standardization] Use regex literals for static patterns so reviewers can inspect regex syntax without constructor-string escaping.
  'prefer-regex-literals': 'error',
  // [standardization] Use rest parameters so variable arguments are declared in the signature rather than read through implicit arguments state.
  'prefer-rest-params': 'error',
  // [standardization] Use spread for matched argument forwarding so reviewers see the expanded arguments in ordinary call syntax.
  'prefer-spread': 'error',
  // [standardization] Use template literals for interpolation so reviewers can distinguish literal text from embedded values without tracing concatenation.
  'prefer-template': 'error',
  // [standardization] Reserve async for functions containing await so promise-returning boundaries are not added through an unexplained async marker.
  'require-await': 'error',
  // [standardization] Require u or v regex flags so generated patterns use the selected Unicode-aware interpretation rather than legacy code-unit syntax.
  'require-unicode-regexp': 'error',
  // [standardization] Sort object keys so generated objects have a predictable review and search order.
  'sort-keys': 'error',
  // [standardization] Describe symbols so logs and debugger output identify their intended role rather than displaying anonymous symbols.
  'symbol-description': 'error',
  // [standardization] Omit byte order marks so generated source follows one encoding convention without an invisible leading character.
  'unicode-bom': 'error',
  // [standardization] Put values before comparison constants so generated comparisons follow one reading order.
  'yoda': 'error',
};

export { coreConventionRules };
