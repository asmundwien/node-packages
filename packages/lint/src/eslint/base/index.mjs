import { defineConfig } from 'eslint/config';
import importX, { createNodeResolver } from 'eslint-plugin-import-x';
import regexp from 'eslint-plugin-regexp';
import unicorn from 'eslint-plugin-unicorn';

const base = defineConfig(
  {
    name: '@asmundwien/lint/base',
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    linterOptions: {
      // [enforcement-integrity] Keep rule configuration outside source comments so generated code cannot bypass repository lint obligations inline.
      noInlineConfig: true,
      // [enforcement-integrity] Report obsolete disable directives as errors so stale suppression attempts do not remain in reviewed source.
      reportUnusedDisableDirectives: 'error',
      // [enforcement-integrity] Report unused inline configurations as errors so ineffective local policy changes cannot masquerade as enforced obligations.
      reportUnusedInlineConfigs: 'error',
    },
    plugins: {
      unicorn,
      'import-x': importX,
      regexp,
    },
    settings: {
      'import-x/resolver-next': [
        createNodeResolver({ extensions: ['.mjs', '.cjs', '.js', '.jsx', '.json', '.node'] }),
      ],
    },
    rules: {
      // [standardization] Pair setters with getters so generated properties follow the selected readable-and-writable accessor contract rather than write-only interfaces.
      'accessor-pairs': 'error',
      // [correctness] Return values from array transformation callbacks so missing returns do not silently produce undefined elements.
      'array-callback-return': 'error',
      // [standardization] Keep variable use inside its declaring block so reviewers can follow block boundaries even for function-scoped declarations.
      'block-scoped-var': 'error',
      // [standardization] Use camelCase identifiers so generated declarations and repository searches follow one naming convention.
      'camelcase': 'error',
      // [standardization] Capitalize comment starts so generated prose follows the selected sentence convention.
      'capitalized-comments': 'error',
      // [architectural-prevention] Keep instance methods dependent on instance state so class ownership does not hide otherwise standalone behavior.
      'class-methods-use-this': 'error',
      // [architectural-prevention] Cyclomatic complexity 20 is a chosen review ceiling for branching, not evidence that a function below it has a sound design.
      'complexity': ['error', 20],
      // [correctness] Keep return paths consistent so callers do not unexpectedly receive undefined from a function that otherwise returns a value.
      'consistent-return': 'error',
      // [correctness] Call super() where required and only on derived constructors so instance initialization does not throw.
      'constructor-super': 'error',
      // [architectural-prevention] Use braces for control statements so a later added statement cannot appear guarded while executing outside the branch.
      'curly': 'error',
      // [architectural-prevention] Require a switch default or the rule's explicit omission marker so reviewers must consider inputs not covered by listed cases.
      'default-case': 'error',
      // [standardization] Put switch defaults last so reviewers find fallback behavior in a predictable position.
      'default-case-last': 'error',
      // [standardization] Put defaulted parameters last so callers can omit optional inputs without positional placeholders.
      'default-param-last': 'error',
      // [standardization] Use dot access for identifier keys so reviewers can distinguish fixed property names from computed access.
      'dot-notation': 'error',
      // [correctness] Use strict equality so coercion cannot silently equate values with different types.
      'eqeqeq': 'error',
      // [correctness] Catch loop updates that move counters away from their stopping conditions before finite processing becomes nonterminating.
      'for-direction': 'error',
      // [standardization] Match function expression names to assigned bindings so stack traces and repository searches identify the same function name.
      'func-name-matching': 'error',
      // [standardization] Name remaining function expressions so diagnostic stacks identify the function instead of an anonymous frame.
      'func-names': 'error',
      // [correctness] Return values on reachable getter paths so property reads do not unexpectedly yield undefined.
      'getter-return': 'error',
      // [standardization] Keep getter and setter pairs adjacent so reviewers can inspect the complete property interface together.
      'grouped-accessor-pairs': 'error',
      // [correctness] Guard for-in bodies so inherited enumerable properties are not processed as the object's own entries.
      'guard-for-in': 'error',
      // [standardization] Choose a two-character minimum for checked names to reject opaque single-letter bindings and properties during generated-code review.
      'id-length': ['error', { min: 2 }],
      // [standardization] Initialize declarations so reviewers see each binding's first value where the binding is introduced.
      'init-declarations': 'error',
      // [architectural-prevention] One class per file is a chosen review ceiling that separates class ownership boundaries, not proof of cohesive responsibilities.
      'max-classes-per-file': ['error', 1],
      // [architectural-prevention] Four nested blocks is a chosen review ceiling for tracing control flow, not a threshold that proves simple design.
      'max-depth': ['error', 4],
      // [architectural-prevention] A 300-line file ceiling counts comments and blanks to bound the complete review unit rather than only executable statements.
      'max-lines': ['error', 300],
      // [architectural-prevention] A 50-line function ceiling counts comments and blanks to bound the complete review unit rather than treating short code as proof of limited responsibility.
      'max-lines-per-function': ['error', 50],
      // [architectural-prevention] Ten nested callbacks is a chosen review ceiling for tracing enclosing scopes and control flow, not a safe-depth guarantee.
      'max-nested-callbacks': ['error', 10],
      // [architectural-prevention] Three parameters is a chosen review ceiling for caller coupling through positional inputs, not proof of a cohesive interface.
      'max-params': ['error', 3],
      // [architectural-prevention] Ten statements is a chosen function review ceiling to prompt inspection of combined responsibilities, not proof that smaller functions have one purpose.
      'max-statements': ['error', 10],
      // [standardization] Capitalize constructor names so reviewers can distinguish construction-oriented APIs from ordinary calls by their names.
      'new-cap': 'error',
      // [standardization] Avoid alert(), confirm(), and prompt() so generated UI behavior does not introduce browser modal dialogs as an alternate interaction convention.
      'no-alert': 'error',
      // [standardization] Use array literals so reviewers do not decode constructor overloads to determine initial contents.
      'no-array-constructor': 'error',
      // [correctness] Keep Promise executors synchronous because the constructor ignores a returned async promise and can lose its rejection.
      'no-async-promise-executor': 'error',
      // [standardization] Avoid bitwise operators so generated arithmetic does not introduce implicit fixed-width integer coercion under this policy.
      'no-bitwise': 'error',
      // [correctness] Avoid arguments.caller and arguments.callee because strict-mode execution rejects these legacy introspection operations.
      'no-caller': 'error',
      // [correctness] Isolate lexical declarations from switch case scope so entering another case cannot encounter an uninitialized shared binding.
      'no-case-declarations': 'error',
      // [correctness] Keep class declaration bindings unchanged so later construction does not unexpectedly target a reassigned value.
      'no-class-assign': 'error',
      // [correctness] Do not use ordinary equality to distinguish -0 because it compares equal to 0.
      'no-compare-neg-zero': 'error',
      // [correctness] Catch assignments in conditions before a mistaken equals sign changes state and tests the assigned value instead of equality.
      'no-cond-assign': 'error',
      // [standardization] Keep console calls out of generated source so diagnostics do not introduce an unstructured alternate output convention.
      'no-console': 'error',
      // [correctness] Do not reassign const or resource bindings because these updates violate the language's immutable-binding contract.
      'no-const-assign': 'error',
      // [correctness] Catch constant binary outcomes that can hide precedence mistakes or checks that never inspect the intended value.
      'no-constant-binary-expression': 'error',
      // [correctness] Catch constant conditions before an intended branch is unreachable or a loop cannot terminate.
      'no-constant-condition': 'error',
      // [correctness] Do not return values from constructors because object returns replace the instance and primitive returns do not behave like ordinary function results.
      'no-constructor-return': 'error',
      // [standardization] Use named control escapes instead of raw or hexadecimal control characters so reviewers can identify nonprinting regex contents.
      'no-control-regex': 'error',
      // [correctness] Remove debugger statements so consumer execution cannot unexpectedly pause when debugging tools are attached.
      'no-debugger': 'error',
      // [correctness] Do not delete lexical variables because delete cannot remove their bindings and strict mode rejects the operation.
      'no-delete-var': 'error',
      // [standardization] Escape a leading regex equals sign so reviewers do not confuse the literal opening with a division assignment.
      'no-div-regex': 'error',
      // [correctness] Reject duplicate parameter names because one argument can hide another and strict mode rejects the declaration.
      'no-dupe-args': 'error',
      // [correctness] Catch duplicate class members before a later definition silently replaces an earlier method or accessor.
      'no-dupe-class-members': 'error',
      // [correctness] Catch repeated if-chain conditions before an intended branch is hidden behind an earlier identical condition.
      'no-dupe-else-if': 'error',
      // [correctness] Catch duplicate object keys before a later value silently overwrites an earlier configuration entry.
      'no-dupe-keys': 'error',
      // [correctness] Catch repeated switch labels before an intended case becomes unreachable behind the first matching label.
      'no-duplicate-case': 'error',
      // [enforcement-integrity] Reject empty blocks so omitted handling is not mistaken for completed generated behavior; the rule permits comments to state intentional emptiness.
      'no-empty': 'error',
      // [enforcement-integrity] Reject empty functions so placeholder implementations cannot pass as completed behavior without an explicit explanation permitted by the rule.
      'no-empty-function': 'error',
      // [correctness] Catch empty destructuring patterns that bind nothing and can hide an omitted target binding.
      'no-empty-pattern': 'error',
      // [standardization] Remove empty static blocks so class declarations do not imply initialization work that never occurs.
      'no-empty-static-block': 'error',
      // [standardization] Compare null explicitly with strict operators so nullish matching does not introduce loose-equality conventions.
      'no-eq-null': 'error',
      // [correctness] Avoid eval() so data cannot become dynamically executed code with access to the current scope.
      'no-eval': 'error',
      // [correctness] Preserve caught exception bindings so subsequent handling does not accidentally lose the original failure.
      'no-ex-assign': 'error',
      // [architectural-prevention] Avoid extending native prototypes so one module cannot silently alter builtin behavior for unrelated consumers.
      'no-extend-native': 'error',
      // [standardization] Remove bind() calls that add no receiver behavior so reviewers can distinguish necessary binding from redundant wrappers.
      'no-extra-bind': 'error',
      // [standardization] Omit redundant boolean casts in conditions so reviewers inspect the predicate without an unnecessary conversion layer.
      'no-extra-boolean-cast': 'error',
      // [standardization] Remove labels unnecessary to an exit target so explicit labels identify control flow that actually needs naming.
      'no-extra-label': 'error',
      // [correctness] Reject accidental switch fallthrough so handling one case cannot unexpectedly execute the next; explanatory comments mark deliberate fallthrough.
      'no-fallthrough': 'error',
      // [correctness] Keep function declaration bindings unchanged so later calls do not unexpectedly invoke a replacement value.
      'no-func-assign': 'error',
      // [correctness] Avoid writes to readonly globals because assignments can fail or undermine the builtin contract the code expects.
      'no-global-assign': 'error',
      // [standardization] Use explicit conversions so reviewers do not decode boolean, numeric, or string coercion shortcuts.
      'no-implicit-coercion': 'error',
      // [architectural-prevention] Avoid implicit globals in script contexts so separately loaded code does not acquire hidden shared bindings.
      'no-implicit-globals': 'error',
      // [correctness] Avoid string-based eval-like APIs so timer or execution inputs cannot be interpreted as executable source.
      'no-implied-eval': 'error',
      // [correctness] Do not assign imported bindings because ESM imports are readonly views of another module's exports.
      'no-import-assign': 'error',
      // [standardization] Put comments on separate lines so explanations and statements can be reviewed and edited independently.
      'no-inline-comments': 'error',
      // [standardization] Keep flagged declarations out of nested blocks so generated source does not depend on confusing declaration-placement conventions.
      'no-inner-declarations': 'error',
      // [correctness] Catch this in invalid receiver contexts before a property operation encounters undefined instead of the intended instance.
      'no-invalid-this': 'error',
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
      // [correctness] Avoid loop-created closures over unsafe changing bindings so callbacks do not all observe an unintended later iteration value.
      'no-loop-func': 'error',
      // [correctness] Catch numeric literals outside exact representability before the runtime silently rounds the intended value.
      'no-loss-of-precision': 'error',
      // [standardization] Name unexplained numbers with const; allow -1/0/1 and indexes as common structural values, and object values, defaults, fields, enums, readonly properties, and numeric type positions where the surrounding declaration supplies their role.
      'no-magic-numbers': ['error', {
        detectObjects: false,
        enforceConst: true,
        ignore: [-1, 0, 1],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
        ignoreClassFieldInitialValues: true,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreTypeIndexes: true,
      }],
      // [standardization] Separate chained assignments so reviewers can inspect each state update and its assigned value independently.
      'no-multi-assign': 'error',
      // [standardization] Use template literals or explicit escapes instead of line-continued strings so reviewers can see intended string boundaries.
      'no-multi-str': 'error',
      // [architectural-prevention] Retain constructed instances instead of invoking constructors solely for effects so object ownership and lifetime remain visible.
      'no-new': 'error',
      // [correctness] Avoid Function construction so input text cannot become executable code through dynamic compilation.
      'no-new-func': 'error',
      // [correctness] Do not construct nonconstructible builtins because new on these functions throws instead of producing an instance.
      'no-new-native-nonconstructor': 'error',
      // [correctness] Use primitive values instead of boxed strings, numbers, or booleans because wrapper identity and truthiness differ from their contents.
      'no-new-wrappers': 'error',
      // [standardization] Avoid legacy non-octal decimal escapes so generated strings use supported unambiguous escape notation.
      'no-nonoctal-decimal-escape': 'error',
      // [correctness] Do not call noncallable builtin objects because treating namespaces such as Math as functions throws.
      'no-obj-calls': 'error',
      // [standardization] Use object literals for empty objects so reviewers do not infer a conversion operation from Object construction.
      'no-object-constructor': 'error',
      // [standardization] Avoid legacy octal literal notation so generated constants do not depend on leading-zero interpretation.
      'no-octal': 'error',
      // [correctness] Avoid legacy octal string escapes because strict-mode source rejects them rather than producing the intended character.
      'no-octal-escape': 'error',
      // [architectural-prevention] Check parameter properties as well as rebinding so functions cannot hide caller-owned input mutation behind a stable parameter name.
      'no-param-reassign': ['error', { props: true }],
      // [standardization] Use explicit assignment updates instead of ++ or -- so reviewers do not need to distinguish prefix and postfix result semantics.
      'no-plusplus': 'error',
      // [correctness] Do not return values from Promise executors because the constructor ignores them instead of resolving with them.
      'no-promise-executor-return': 'error',
      // [standardization] Avoid legacy __proto__ access so prototype operations use explicit standard APIs rather than a special property convention.
      'no-proto': 'error',
      // [correctness] Do not call borrowed Object.prototype methods directly on inputs because those methods can be absent or shadowed by data.
      'no-prototype-builtins': 'error',
      // [correctness] Catch redeclarations that can hide a conflicting binding or overwrite a function-scoped declaration's intended meaning.
      'no-redeclare': 'error',
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
      // [correctness] Avoid javascript: URLs because navigation can execute embedded code instead of loading a resource.
      'no-script-url': 'error',
      // [correctness] Catch self-assignments that leave an intended update unperformed and can hide a mistaken source binding.
      'no-self-assign': 'error',
      // [correctness] Catch self-comparisons that can hide a mistaken operand and make the intended condition ineffective.
      'no-self-compare': 'error',
      // [standardization] Use separate expressions instead of comma operators so reviewers do not overlook effects hidden inside a value expression.
      'no-sequences': 'error',
      // [correctness] Do not return values from setters because property assignment ignores the setter's return value.
      'no-setter-return': 'error',
      // [architectural-prevention] Avoid shadowed bindings so reviewers can identify which state a reference reads without reconstructing nested name resolution.
      'no-shadow': 'error',
      // [correctness] Preserve restricted builtin names so references such as undefined and NaN cannot resolve to misleading local values.
      'no-shadow-restricted-names': 'error',
      // [correctness] Avoid array holes because iteration methods can skip them instead of visiting an explicit undefined element.
      'no-sparse-arrays': 'error',
      // [correctness] Catch interpolation markers in ordinary strings before consumers receive placeholder text instead of the intended value.
      'no-template-curly-in-string': 'error',
      // [correctness] Initialize derived instances with super() before accessing this or super properties so construction does not throw.
      'no-this-before-super': 'error',
      // [correctness] Throw Error objects rather than literals so consumers receive stack traces and the standard error contract.
      'no-throw-literal': 'error',
      // [correctness] Catch reads of never-assigned variables before undefined substitutes for an intended initialized value.
      'no-unassigned-vars': 'error',
      // [correctness] Catch undeclared bindings before execution raises ReferenceError or a misspelled name targets an unintended global.
      'no-undef': 'error',
      // [standardization] Omit redundant undefined initializers so explicit initial values identify meaningful state choices.
      'no-undef-init': 'error',
      // [standardization] Avoid underscore privacy names so generated bindings follow the selected naming convention and real private fields express privacy.
      'no-underscore-dangle': 'error',
      // [correctness] Catch newline-sensitive expressions before automatic semicolon insertion changes the intended call or access.
      'no-unexpected-multiline': 'error',
      // [correctness] Catch loop conditions whose tested variables never change before a terminating loop becomes nonterminating.
      'no-unmodified-loop-condition': 'error',
      // [standardization] Use direct boolean or fallback expressions instead of redundant ternaries so reviewers inspect the effective value operation.
      'no-unneeded-ternary': 'error',
      // [correctness] Catch unreachable statements that can conceal work placed after an unconditional exit.
      'no-unreachable': 'error',
      // [correctness] Catch loops that can execute only once because an unconditional exit may have replaced intended repeated processing.
      'no-unreachable-loop': 'error',
      // [correctness] Keep exits out of finally blocks so cleanup cannot silently replace a pending return or suppress a thrown error.
      'no-unsafe-finally': 'error',
      // [correctness] Parenthesize intended relational negation so operator precedence does not compare a negated boolean instead of the original value.
      'no-unsafe-negation': 'error',
      // [correctness] Guard optional-chain results before operations that reject undefined so missing data does not turn a supposedly guarded access into a runtime exception.
      'no-unsafe-optional-chaining': 'error',
      // [correctness] Catch discarded expressions that perform no useful work and can hide a missing call or mistaken assignment.
      'no-unused-expressions': 'error',
      // [standardization] Remove unused labels so reviewers do not infer a jump target that no control-flow statement uses.
      'no-unused-labels': 'error',
      // [architectural-prevention] Remove unused private members so class state and behavior do not retain dependencies with no internal consumer.
      'no-unused-private-class-members': 'error',
      // [architectural-prevention] Reject unused bindings and caught errors so dead dependencies and unexamined failure paths remain visible to reviewers.
      'no-unused-vars': 'error',
      // [standardization] Define bindings before use so reviewers encounter declarations before references, even where hoisting would permit the reverse order.
      'no-use-before-define': 'error',
      // [correctness] Catch overwritten unread assignments that can hide a lost result or an update written to the wrong binding.
      'no-useless-assignment': 'error',
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
      // [enforcement-integrity] Reject leading TODO, FIXME, and XXX reminders so unfinished generated work cannot be presented as complete through a passing lint run.
      'no-warning-comments': 'error',
      // [correctness] Avoid with statements because implicit object scope can redirect identifier lookup and assignment at runtime.
      'no-with': 'error',
      // [standardization] Use object method and property shorthand so equivalent literal members have one selected source form.
      'object-shorthand': 'error',
      // [standardization] Declare one binding per declaration so reviewers can inspect each initializer and edit it independently.
      'one-var': ['error', 'never'],
      // [standardization] Use arrows for callbacks that do not need their own this so callback receiver behavior follows one explicit lexical convention.
      'prefer-arrow-callback': 'error',
      // [architectural-prevention] Use const for unreassigned bindings so reviewers can distinguish stable references from mutable local state.
      'prefer-const': 'error',
      // [standardization] Use destructuring for matched extractions so reviewers see source structure beside the resulting bindings.
      'prefer-destructuring': 'error',
      // [standardization] Use ** for exponentiation so generated arithmetic follows the selected operator syntax rather than an equivalent Math call.
      'prefer-exponentiation-operator': 'error',
      // [standardization] Name capture groups so reviewers can connect extracted regex data to meaningful names instead of unexplained numeric positions.
      'prefer-named-capture-group': 'error',
      // [standardization] Use numeric literals for statically known parsed constants so reviewers read their radix and value without evaluating a parser call.
      'prefer-numeric-literals': 'error',
      // [correctness] Use Object.hasOwn() so own-property checks work even when an object shadows or lacks hasOwnProperty().
      'prefer-object-has-own': 'error',
      // [standardization] Use object spread for fresh-object copies so reviewers distinguish constructing a copy from Object.assign() mutations of an existing target.
      'prefer-object-spread': 'error',
      // [correctness] Reject promises with Error objects so consumers receive stack traces and the standard error inspection contract.
      'prefer-promise-reject-errors': 'error',
      // [standardization] Use regex literals for static patterns so reviewers can inspect regex syntax without constructor-string escaping.
      'prefer-regex-literals': 'error',
      // [standardization] Use rest parameters so variable arguments are declared in the signature rather than read through implicit arguments state.
      'prefer-rest-params': 'error',
      // [standardization] Use spread for matched argument forwarding so reviewers see the expanded arguments in ordinary call syntax.
      'prefer-spread': 'error',
      // [standardization] Use template literals for interpolation so reviewers can distinguish literal text from embedded values without tracing concatenation.
      'prefer-template': 'error',
      // [correctness] Preserve the caught error as a cause when wrapping it so consumers do not lose the original failure and stack context.
      'preserve-caught-error': 'error',
      // [correctness] State parseInt() radix explicitly so input prefixes do not silently select an unintended numeric interpretation.
      'radix': 'error',
      // [correctness] Catch updates that can use stale values across await or yield so interleaved work does not silently overwrite a newer result.
      'require-atomic-updates': 'error',
      // [standardization] Reserve async for functions containing await so promise-returning boundaries are not added through an unexplained async marker.
      'require-await': 'error',
      // [standardization] Require u or v regex flags so generated patterns use the selected Unicode-aware interpretation rather than legacy code-unit syntax.
      'require-unicode-regexp': 'error',
      // [correctness] Catch generators with no yield because consumers may otherwise receive no values from an intended sequence.
      'require-yield': 'error',
      // [standardization] Sort object keys so generated objects have a predictable review and search order.
      'sort-keys': 'error',
      // [standardization] Describe symbols so logs and debugger output identify their intended role rather than displaying anonymous symbols.
      'symbol-description': 'error',
      // [standardization] Omit byte order marks so generated source follows one encoding convention without an invisible leading character.
      'unicode-bom': 'error',
      // [correctness] Use NaN-aware checks because equality comparisons with NaN never recognize NaN values.
      'use-isnan': 'error',
      // [correctness] Compare typeof only with valid result strings so misspelled type checks cannot silently become impossible conditions.
      'valid-typeof': 'error',
      // [standardization] Put values before comparison constants so generated comparisons follow one reading order.
      'yoda': 'error',

      // [standardization] Use element-specific traversal when only elements are intended so reviewers do not infer text or comment node handling.
      'unicorn/better-dom-traversing': 'error',
      // [standardization] Name caught exceptions error so reviewers recognize error-handling bindings consistently across generated modules.
      'unicorn/catch-error-name': 'error',
      // [correctness] Use this in matched static methods so inherited calls refer to the receiving subclass rather than a hard-coded base class.
      'unicorn/class-reference-in-static-methods': 'error',
      // [standardization] Remove empty or punctuation-only comments so reviewers do not mistake placeholders for an explanation.
      'unicorn/comment-content': 'error',
      // [standardization] Use consistent multiline arrow return forms so reviewers can distinguish final values from earlier exits without syntax variation.
      'unicorn/consistent-arrow-return-style': 'error',
      // [correctness] Use strict Node assertions so coercion cannot make tests accept values with the wrong type.
      'unicorn/consistent-assert': 'error',
      // [standardization] Use boolean prefixes on checked variables, parameters, and functions so predicate names identify boolean intent without imposing this naming check on methods or fields.
      'unicorn/consistent-boolean-name': 'error',
      // [standardization] Put static members before instance members and private peers before public peers so reviewers find class declarations in a predictable order.
      'unicorn/consistent-class-member-order': 'error',
      // [standardization] Spell compound words consistently so repository searches find equivalent concepts under the same name.
      'unicorn/consistent-compound-words': 'error',
      // [standardization] Use logical conditional object spreads so optional properties have one form rather than an empty-object ternary alternative.
      'unicorn/consistent-conditional-object-spread': 'error',
      // [standardization] Clone Dates directly through the constructor so reviewers see a copy operation rather than an unnecessary timestamp conversion.
      'unicorn/consistent-date-clone': 'error',
      // [standardization] Use consistent destructured access within matched code so reviewers do not track both local aliases and repeated source property reads.
      'unicorn/consistent-destructuring': 'error',
      // [standardization] Keep empty and populated array-spread branches in the same iterable form so reviewers can compare alternatives without representation changes.
      'unicorn/consistent-empty-array-spread': 'error',
      // [standardization] Use consistent index existence comparisons so reviewers can recognize missing-item sentinel handling immediately.
      'unicorn/consistent-existence-index-check': 'error',
      // [standardization] Put decorators above exports so generated decorated declarations follow one selected layout.
      'unicorn/consistent-export-decorator-position': 'error',
      // [architectural-prevention] Move noncapturing functions out of enclosing scopes, including arrows, so their available dependencies and allocation lifetime stay explicit.
      'unicorn/consistent-function-scoping': 'error',
      // [standardization] Use declarations for named functions and exports, arrows for callbacks, and object methods for properties so each role has one recognizable function form.
      'unicorn/consistent-function-style': ['error', {
        namedFunctions: 'declaration',
        namedExports: 'declaration',
        callbacks: 'arrow-function',
        objectProperties: 'method',
      }],
      // [standardization] Read JSON as strings before parsing so decoding and parsing are separate visible operations rather than an implicit Buffer conversion.
      'unicorn/consistent-json-file-read': 'error',
      // [standardization] Use one optional chain for same-base access so reviewers do not reconstruct duplicated existence guards.
      'unicorn/consistent-optional-chaining': 'error',
      // [standardization] Escape literal interpolation markers consistently so reviewers can distinguish placeholder text from evaluated template expressions.
      'unicorn/consistent-template-literal-escape': 'error',
      // [standardization] Label tuple elements consistently so reviewers can interpret every positional role without switching between named and unnamed positions.
      'unicorn/consistent-tuple-labels': 'error',
      // [correctness] Define Error subclass names and constructors correctly so consumers receive the intended error identity and diagnostic stack information.
      'unicorn/custom-error-definition': 'error',
      // [standardization] Use dataset for data attributes so generated DOM code follows one attribute naming and access convention.
      'unicorn/dom-node-dataset': 'error',
      // [standardization] Keep empty braces unspaced so equivalent empty objects and blocks have one selected spelling.
      'unicorn/empty-brace-spaces': 'error',
      // [correctness] Supply built-in error messages so consumers receive an explanation of the failed operation rather than an anonymous failure.
      'unicorn/error-message': 'error',
      // [standardization] Use uppercase hexadecimal escape digits so equivalent escaped values have one searchable spelling.
      'unicorn/escape-case': 'error',
      // [standardization] Compare length and size explicitly so reviewers can distinguish empty and nonempty collection checks without truthiness inference.
      'unicorn/explicit-length-check': 'error',
      // [standardization] State timer delays explicitly so reviewers can see when immediate scheduling is a deliberate choice.
      'unicorn/explicit-timer-delay': 'error',
      // [standardization] Select kebab-case filenames and checked directory names so generated source paths follow one predictable naming convention.
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      // [standardization] Use default chalk and node:path imports and named node:util imports so generated bindings follow the selected per-module import conventions.
      'unicorn/import-style': 'error',
      // [correctness] Keep isolated functions independent of unavailable outer bindings so transferred execution does not fail when its original lexical environment is absent.
      'unicorn/isolated-functions': 'error',
      // [architectural-prevention] Guard optional loop sources instead of constructing empty fallback collections solely to perform no iterations.
      'unicorn/iteration-fallback-style': 'error',
      // [standardization] Use logical assignment shorthand for matched updates so conditional self-assignment follows one selected syntax.
      'unicorn/logical-assignment-operators': 'error',
      // [architectural-prevention] Three nested calls is a chosen review ceiling for expression evaluation order, not proof that the expression is simple.
      'unicorn/max-nested-calls': ['error', { max: 3 }],
      // [standardization] Expand flagged ambiguous abbreviations in names and paths so reviewers and searches use the same explicit vocabulary.
      'unicorn/name-replacements': 'error',
      // [correctness] Match new usage to builtin call contracts so constructor-only APIs work and nonconstructible functions do not throw.
      'unicorn/new-for-builtins': 'error',
      // [correctness] Avoid accessing an accessor through itself because recursive getter or setter calls can overflow the stack.
      'unicorn/no-accessor-recursion': 'error',
      // [correctness] Catch bitwise operators mistaken for logical operators before coercion changes the intended condition.
      'unicorn/no-accidental-bitwise-operator': 'error',
      // [correctness] Wrap array callbacks explicitly so index and array arguments do not accidentally become extra parameters to the referenced function.
      'unicorn/no-array-callback-reference': 'error',
      // [architectural-prevention] Avoid concat() accumulation in loops because repeated copying can turn linear input processing into quadratic allocation and work.
      'unicorn/no-array-concat-in-loop': 'error',
      // [correctness] Avoid filling arrays with one reference value because mutating one apparent element then changes every aliased element.
      'unicorn/no-array-fill-with-reference-type': 'error',
      // [standardization] Initialize Array.from() through its mapping callback so reviewers see construction and initial values together rather than a subsequent fill().
      'unicorn/no-array-from-fill': 'error',
      // [architectural-prevention] Avoid front-of-array mutation because shifting existing elements can create repeated linear copying during accumulation.
      'unicorn/no-array-front-mutation': 'error',
      // [standardization] Use lexical callback context rather than array method this arguments so reviewers follow one receiver convention.
      'unicorn/no-array-method-this-argument': 'error',
      // [architectural-prevention] Use explicit iteration instead of reduce() so accumulator ownership and update effects remain visible during review.
      'unicorn/no-array-reduce': 'error',
      // [architectural-prevention] Use toReversed() so reversing order does not mutate an array that other consumers may share.
      'unicorn/no-array-reverse': 'error',
      // [architectural-prevention] Use toSorted() so ordering does not mutate an array that other consumers may share.
      'unicorn/no-array-sort': 'error',
      // [architectural-prevention] Find extrema directly instead of sorting every element solely to read one endpoint.
      'unicorn/no-array-sort-for-min-max': 'error',
      // [architectural-prevention] Use toSpliced() so range updates do not mutate an array that other consumers may share.
      'unicorn/no-array-splice': 'error',
      // [standardization] Omit decorative asterisk prefixes and shared comment indentation so generated prose follows one multiline layout.
      'unicorn/no-asterisk-prefix-in-documentation-comments': 'error',
      // [correctness] Keep synchronous iterator callbacks synchronous because these helpers do not await promises returned by async callbacks.
      'unicorn/no-async-iterator-callback': 'error',
      // [architectural-prevention] Keep finally cleanup synchronous under this policy so completion does not depend on an additional asynchronous cleanup chain.
      'unicorn/no-async-promise-finally': 'error',
      // [standardization] Separate awaited values from member access so reviewers can distinguish promise settlement from subsequent property evaluation.
      'unicorn/no-await-expression-member': 'error',
      // [correctness] Catch awaited inputs to Promise combinators before premature sequencing defeats the intended concurrent operation.
      'unicorn/no-await-in-promise-methods': 'error',
      // [standardization] Keep an existing Blob when file-specific metadata is unused so generated code does not imply a required File contract.
      'unicorn/no-blob-to-file': 'error',
      // [correctness] Return signed ordering results from comparators because booleans cannot distinguish every required ordering direction.
      'unicorn/no-boolean-sort-comparator': 'error',
      // [architectural-prevention] Avoid break targets hidden inside nested loops or switches so reviewers can identify which iteration ends.
      'unicorn/no-break-in-nested-loop': 'error',
      // [architectural-prevention] Draw canvases directly when supported so an intermediate image conversion does not add encoding and allocation work.
      'unicorn/no-canvas-to-image': 'error',
      // [correctness] Catch chained comparisons because JavaScript compares the first boolean result rather than expressing a mathematical range.
      'unicorn/no-chained-comparison': 'error',
      // [correctness] Access collection entries through their APIs because bracket properties do not read or write Map or Set contents.
      'unicorn/no-collection-bracket-access': 'error',
      // [standardization] Use direct key existence operations for recognized dynamic checks so reviewers do not decode indirect computed-property patterns.
      'unicorn/no-computed-property-existence-check': 'error',
      // [correctness] Catch contradictory CSS and form constraints before queries match nothing or forms accept no intended value.
      'unicorn/no-conflicting-constraints': 'error',
      // [standardization] Express single-element replacement directly and resolve insertion indexes explicitly so reviewers do not mistake splice(-1, 0, ...) for appending.
      'unicorn/no-confusing-array-splice': 'error',
      // [standardization] Use explicit nonnegative replacement indexes with Array.with() rather than negative positions or length so reviewers can identify the intended existing element.
      'unicorn/no-confusing-array-with': 'error',
      // [standardization] Let console argument separation supply spacing so diagnostic text does not gain inconsistent leading or trailing spaces.
      'unicorn/no-console-spaces': 'error',
      // [correctness] Catch arithmetic that always yields zero before a mistaken calculation silently discards its operands.
      'unicorn/no-constant-zero-expression': 'error',
      // [architectural-prevention] Declare values after guards that can exit before their use so unnecessary work and available scope stay limited.
      'unicorn/no-declarations-before-early-exit': 'error',
      // [architectural-prevention] Avoid direct document.cookie manipulation because synchronous global cookie reads and writes hide parsing and shared-state obligations.
      'unicorn/no-document-cookie': 'error',
      // [standardization] Combine equivalent comparisons of the same operands so reviewers inspect one relation instead of redundant logical alternatives.
      'unicorn/no-double-comparison': 'error',
      // [architectural-prevention] Combine adjacent identical branches so future edits do not leave duplicated behavior inconsistent.
      'unicorn/no-duplicate-if-branches': 'error',
      // [correctness] Catch repeated adjacent logical operands that can hide an omitted condition or repeat an effectful expression.
      'unicorn/no-duplicate-logical-operands': 'error',
      // [architectural-prevention] Avoid map() or filter() immediately before iteration so a loop does not require an extra traversal and temporary array.
      'unicorn/no-duplicate-loops': 'error',
      // [correctness] Catch duplicate Set literal values that silently collapse and can hide a missing intended member.
      'unicorn/no-duplicate-set-values': 'error',
      // [enforcement-integrity] Reject empty source files so an unimplemented module is not mistaken for completed generated work.
      'unicorn/no-empty-file': 'error',
      // [standardization] Initialize supported built-in error metadata through construction so reviewers inspect the error contract at its creation site.
      'unicorn/no-error-property-assignment': 'error',
      // [correctness] Catch exports in script contexts before the runtime rejects module-only syntax.
      'unicorn/no-exports-in-scripts': 'error',
      // [standardization] Use for...of instead of forEach() so generated iteration follows the selected statement-based control-flow convention.
      'unicorn/no-for-each': 'error',
      // [standardization] Use for...of when indexes serve only to retrieve elements so reviewers see values rather than incidental counter mechanics.
      'unicorn/no-for-loop': 'error',
      // [architectural-prevention] Avoid assigning global object properties so module consumers do not share hidden writable state.
      'unicorn/no-global-object-property-assignment': 'error',
      // [standardization] Construct initial values directly instead of immediately mutating them so reviewers see the complete initial state at declaration.
      'unicorn/no-immediate-mutation': 'error',
      // [correctness] Catch impossible length or size comparisons before an intended branch becomes permanently unreachable.
      'unicorn/no-impossible-length-comparison': 'error',
      // [correctness] Preserve both sides of inherited accessor contracts so overriding one side does not silently remove reading or writing behavior.
      'unicorn/no-incomplete-accessor-override': 'error',
      // [correctness] Catch known invalid selector API usage before DOM lookup throws or returns unintended results.
      'unicorn/no-incorrect-query-selector': 'error',
      // [correctness] Catch malformed interpolation markers before generated strings contain placeholder text instead of the intended value.
      'unicorn/no-incorrect-template-string-interpolation': 'error',
      // [correctness] Catch CSP directives ignored in meta elements so declared security restrictions do not give a false impression of browser enforcement.
      'unicorn/no-ineffective-csp-directives': 'error',
      // [correctness] Avoid realm-dependent instanceof checks on builtins so valid values from another realm are not misclassified.
      'unicorn/no-instanceof-builtins': 'error',
      // [correctness] Catch known invalid builtin argument counts before calls throw or omit required behavior.
      'unicorn/no-invalid-argument-count': 'error',
      // [correctness] Catch HTML boolean attribute values whose presence enables the attribute even when their text appears to mean false.
      'unicorn/no-invalid-boolean-attribute-value': 'error',
      // [correctness] Catch single-character comparisons to longer strings because the intended branch can never match.
      'unicorn/no-invalid-character-comparison': 'error',
      // [correctness] Catch invalid DOM tokens before token-list operations throw instead of updating the element.
      'unicorn/no-invalid-dom-token': 'error',
      // [correctness] Catch invalid fetch and Request options before a request throws or ignores the intended transport behavior.
      'unicorn/no-invalid-fetch-options': 'error',
      // [correctness] Catch invalid file-input accept filters before browsers ignore the intended file selection constraint.
      'unicorn/no-invalid-file-input-accept': 'error',
      // [correctness] Catch malformed subresource integrity metadata before resource loading fails or an intended integrity check is ineffective.
      'unicorn/no-invalid-integrity': 'error',
      // [correctness] Catch invalid or ignored Intl options before formatting throws or silently differs from the requested output.
      'unicorn/no-invalid-intl-options': 'error',
      // [correctness] Catch incompatible property descriptors before object definition throws or installs a different property contract.
      'unicorn/no-invalid-property-descriptor': 'error',
      // [correctness] Remove listeners using the registered function identity so a newly evaluated expression does not leave the original listener attached.
      'unicorn/no-invalid-remove-event-listener': 'error',
      // [correctness] Catch invalid Response construction options before response creation throws or violates the HTTP response contract.
      'unicorn/no-invalid-response-options': 'error',
      // [correctness] Catch invalid setProperty() arguments before CSS updates are silently ignored.
      'unicorn/no-invalid-style-set-property': 'error',
      // [correctness] Catch statically invalid Temporal arithmetic before date or time operations throw at runtime.
      'unicorn/no-invalid-temporal-arithmetic': 'error',
      // [correctness] Include the protocol colon when comparing URL.protocol so an intended scheme check can actually match.
      'unicorn/no-invalid-url-protocol-comparison': 'error',
      // [correctness] Honor well-known symbol method contracts so language operations do not receive invalid protocol results.
      'unicorn/no-invalid-well-known-symbol-methods': 'error',
      // [standardization] Avoid keyword-like new and class prefixes in flagged identifiers so names do not resemble language syntax during review.
      'unicorn/no-keyword-prefix': 'error',
      // [correctness] Read currentTarget during synchronous dispatch because the browser clears it after the handler returns.
      'unicorn/no-late-current-target-access': 'error',
      // [correctness] Control event propagation and defaults during dispatch because late calls cannot change a completed dispatch.
      'unicorn/no-late-event-control': 'error',
      // [standardization] Start files without empty lines so generated source has a consistent opening layout.
      'unicorn/no-leading-empty-lines': 'error',
      // [architectural-prevention] Combine nested if-only branches to reduce control-flow nesting; core no-lonely-if separately normalizes else-if branches.
      'unicorn/no-lonely-if': 'error',
      // [correctness] Do not mutate a loop's iterable during traversal because changing membership can skip, repeat, or indefinitely add work.
      'unicorn/no-loop-iterable-mutation': 'error',
      // [standardization] Name nontrivial flat() depths so reviewers can connect the flattening level to the intended data structure.
      'unicorn/no-magic-array-flat-depth': 'error',
      // [standardization] Leave prose comments unwrapped manually so editing text does not require maintaining arbitrary line breaks.
      'unicorn/no-manually-wrapped-comments': 'error',
      // [correctness] Match Map lookup keys to their guards so checking one entry does not falsely justify reading a different entry.
      'unicorn/no-mismatched-map-key': 'error',
      // [correctness] Catch duplicated targets after compound-assignment refactors before updates apply the original value twice.
      'unicorn/no-misrefactored-assignment': 'error',
      // [correctness] Catch references to missing local resources before consumers encounter broken asset or file loads.
      'unicorn/no-missing-local-resource': 'error',
      // [correctness] Catch repeated resolver calls on one path because only the first settlement takes effect and later results are silently ignored.
      'unicorn/no-multiple-promise-resolver-calls': 'error',
      // [standardization] Use ordinary default import and export syntax so the default slot is not disguised as a named public binding.
      'unicorn/no-named-default': 'error',
      // [standardization] Use direct complementary array predicates so reviewers do not have to invert a negated predicate call mentally.
      'unicorn/no-negated-array-predicate': 'error',
      // [standardization] Use direct comparison operators so reviewers read the tested relation without an outer negation.
      'unicorn/no-negated-comparison': 'error',
      // [standardization] Prefer positive branch conditions in the rule's matched patterns so reviewers need not invert the condition to understand the first branch.
      'unicorn/no-negated-condition': 'error',
      // [standardization] Compare boolean relationships directly so an operand's negation does not obscure the intended equality test.
      'unicorn/no-negation-in-equality-check': 'error',
      // [architectural-prevention] Avoid nested ternaries so reviewers can follow each decision without decoding stacked value branches.
      'unicorn/no-nested-ternary': 'error',
      // [correctness] Reject single-argument Array construction because numeric input creates holes instead of one element; core covers other constructor forms.
      'unicorn/no-new-array': 'error',
      // [correctness] Use Buffer.from() or Buffer.alloc() so construction distinguishes data conversion from allocation and does not expose uninitialized memory.
      'unicorn/no-new-buffer': 'error',
      // [correctness] Avoid nonstandard builtin properties so generated code does not rely on runtime extensions absent from consumer environments.
      'unicorn/no-nonstandard-builtin-properties': 'error',
      // [standardization] Use undefined for internal absence so optional values follow one convention; permit strict external null comparisons for interoperating with external data.
      'unicorn/no-null': 'error',
      // [correctness] Default individual properties instead of using a nonempty object parameter default because passing a partial object bypasses whole-object defaults.
      'unicorn/no-object-as-default-parameter': 'error',
      // [correctness] Use collection APIs because Object methods inspect properties rather than Map or Set entries.
      'unicorn/no-object-methods-with-collections': 'error',
      // [correctness] Declare optional-chain roots because optional chaining does not prevent ReferenceError for an undeclared variable.
      'unicorn/no-optional-chaining-on-undeclared-variable': 'error',
      // [correctness] Do not call preventDefault() in passive listeners because the browser ignores cancellation there.
      'unicorn/no-prevent-default-in-passive-listener': 'error',
      // [correctness] Avoid process.exit() so abrupt termination cannot truncate pending output or bypass asynchronous cleanup.
      'unicorn/no-process-exit': 'error',
      // [standardization] Remove comparisons already implied by an equality guard so reviewers inspect only conditions that affect the outcome.
      'unicorn/no-redundant-comparison': 'error',
      // [architectural-prevention] Move repeated call wrappers to the function boundary so callers do not duplicate a shared adaptation obligation.
      'unicorn/no-repeated-call-wrappers': 'error',
      // [correctness] Do not return push() or unshift() as the updated array because these methods return its numeric length.
      'unicorn/no-return-array-push': 'error',
      // [correctness] Keep selector syntax out of DOM name APIs because an element name and a CSS selector have different matching contracts.
      'unicorn/no-selector-as-dom-name': 'error',
      // [correctness] Catch shorthand properties that overwrite related longhand values before the earlier configuration is silently lost.
      'unicorn/no-shorthand-property-overrides': 'error',
      // [standardization] Avoid single-element Promise combinators so reviewers do not infer multi-operation coordination where only one promise exists.
      'unicorn/no-single-promise-in-promise-methods': 'error',
      // [architectural-prevention] Use module-level functions for static-only behavior so a class does not add a needless ownership and inheritance boundary.
      'unicorn/no-static-only-class': 'error',
      // [standardization] Compare operands directly rather than subtracting against zero so reviewers read the relation without reconstructing arithmetic.
      'unicorn/no-subtraction-comparison': 'error',
      // [correctness] Avoid incidental then properties because promise resolution can treat such objects as thenables and invoke them unexpectedly.
      'unicorn/no-thenable': 'error',
      // [standardization] Use lexical receiver access rather than aliasing this so reviewers do not track multiple names for the same receiver.
      'unicorn/no-this-assignment': 'error',
      // [architectural-prevention] Keep this within classes so function behavior does not depend on an implicit external calling receiver.
      'unicorn/no-this-outside-of-class': 'error',
      // [architectural-prevention] Avoid writing module-level variables inside functions so calls do not hide changes to shared module state.
      'unicorn/no-top-level-assignment-in-function': 'error',
      // [architectural-prevention] Avoid top-level effects in exported modules so importing a public API does not silently trigger unrelated work or state changes.
      'unicorn/no-top-level-side-effects': 'error',
      // [architectural-prevention] Name transitioned CSS properties so future style changes do not silently add expensive or unintended animations.
      'unicorn/no-transition-all': 'error',
      // [standardization] Compare declared values with undefined directly so absence checks do not disguise themselves as type-name checks.
      'unicorn/no-typeof-undefined': 'error',
      // [correctness] Catch method references where an invocation is expected before an uncalled function substitutes for its intended result.
      'unicorn/no-uncalled-method': 'error',
      // [standardization] Declare class members explicitly so reviewers can inventory instance state without tracing assignments throughout methods.
      'unicorn/no-undeclared-class-members': 'error',
      // [standardization] Omit flat()'s default depth of one so ordinary shallow flattening has one selected spelling.
      'unicorn/no-unnecessary-array-flat-depth': 'error',
      // [standardization] Use map() when no flattening is needed so reviewers do not infer a nested-array contract that the callback never produces.
      'unicorn/no-unnecessary-array-flat-map': 'error',
      // [standardization] Omit redundant splice counts where supported so full-tail deletion has one recognizable expression.
      'unicorn/no-unnecessary-array-splice-count': 'error',
      // [correctness] Catch awaits on known non-promises that can hide a missing asynchronous call or add unintended scheduling.
      'unicorn/no-unnecessary-await': 'error',
      // [standardization] Use boolean conditions directly where equivalent so reviewers need not decode redundant true or false comparisons.
      'unicorn/no-unnecessary-boolean-comparison': 'error',
      // [standardization] Omit arguments equal to defaults so explicit call arguments identify actual deviations from the API's default contract.
      'unicorn/no-unnecessary-default-arguments': 'error',
      // [standardization] Omit fetch options that repeat defaults so reviewers can distinguish intentional transport choices from redundant configuration.
      'unicorn/no-unnecessary-fetch-options': 'error',
      // [standardization] Omit unnecessary globalThis qualification so explicit global access identifies cases that actually require it.
      'unicorn/no-unnecessary-global-this': 'error',
      // [standardization] Collapse equivalent nested ternary branches so reviewers do not infer an extra decision that never changes the value.
      'unicorn/no-unnecessary-nested-ternary': 'error',
      // [architectural-prevention] Remove parameters with the same value at every known call so functions do not imply variation or coupling their callers never need.
      'unicorn/no-unnecessary-parameters': 'error',
      // [standardization] Use supported builtins rather than redundant polyfills so generated code follows the selected runtime API contract.
      'unicorn/no-unnecessary-polyfills': 'error',
      // [standardization] Omit redundant slice end arguments so copying through the end has one selected expression.
      'unicorn/no-unnecessary-slice-end': 'error',
      // [standardization] Use simpler matched array operations instead of splice() so reviewers can identify the required mutation without interpreting general-purpose arguments.
      'unicorn/no-unnecessary-splice': 'error',
      // [standardization] Omit trimming made irrelevant by the matched prefix or suffix test so reviewers inspect only operations that affect the result.
      'unicorn/no-unnecessary-string-trim': 'error',
      // [standardization] Avoid long skipped-position array destructuring so reviewers can identify indexes without counting commas.
      'unicorn/no-unreadable-array-destructuring': 'error',
      // [architectural-prevention] Keep loop-source expressions bounded so reviewers can distinguish iterable construction from per-item processing.
      'unicorn/no-unreadable-for-of-expression': 'error',
      // [standardization] Use readable IIFE forms so reviewers can distinguish immediate invocation from a function value.
      'unicorn/no-unreadable-iife': 'error',
      // [standardization] Separate confusing constructor expressions so reviewers can identify the constructor and the instance operation.
      'unicorn/no-unreadable-new-expression': 'error',
      // [standardization] Avoid confusing object destructuring forms so reviewers can identify source keys, bindings, and defaults without reconstructing the pattern.
      'unicorn/no-unreadable-object-destructuring': 'error',
      // [correctness] Preserve ArrayBuffer view offsets and lengths so buffer conversion does not expose bytes outside the intended view.
      'unicorn/no-unsafe-buffer-conversion': 'error',
      // [correctness] Avoid unsafe DOM HTML insertion APIs so untrusted content cannot become executable markup through direct insertion.
      'unicorn/no-unsafe-dom-html': 'error',
      // [correctness] Catch known lossy or invalid JSON values before serialization drops information or throws.
      'unicorn/no-unsafe-json-serialization': 'error',
      // [correctness] Guard allSettled() results by fulfilled status because rejected results have no fulfillment value.
      'unicorn/no-unsafe-promise-all-settled-values': 'error',
      // [correctness] Catch unsafe property-key values before coercion selects an unintended key or triggers unsafe object access.
      'unicorn/no-unsafe-property-key': 'error',
      // [correctness] Avoid interpolating data into node:sqlite SQL strings so input cannot become SQL syntax instead of a bound value.
      'unicorn/no-unsafe-sqlite-interpolation': 'error',
      // [correctness] Use replacement callbacks for dynamic text so dollar sequences in data are not interpreted as replacement directives.
      'unicorn/no-unsafe-string-replacement': 'error',
      // [correctness] Consume results from non-mutating builtin operations so discarding a result does not silently discard the intended update.
      'unicorn/no-unused-builtin-method-return': 'error',
      // [correctness] Consume lazy iterator helpers because constructing and discarding them never performs the intended iteration.
      'unicorn/no-unused-iterator-helper': 'error',
      // [architectural-prevention] Remove known unused properties so object contracts do not retain state or dependencies no consumer reads.
      'unicorn/no-unused-properties': 'error',
      // [correctness] Pass query text rather than full URLs to URLSearchParams because the constructor does not extract a URL's query component.
      'unicorn/no-url-in-search-params': 'error',
      // [standardization] Omit redundant Boolean() in array predicates so reviewers see the predicate itself; core separately covers boolean control contexts.
      'unicorn/no-useless-boolean-cast': 'error',
      // [standardization] Remove coercions of values already in the target type so reviewers do not infer an actual representation change.
      'unicorn/no-useless-coercion': 'error',
      // [standardization] Omit ineffective collection arguments and fallbacks so constructor inputs express actual initial contents.
      'unicorn/no-useless-collection-argument': 'error',
      // [correctness] Catch no-op compound assignments that can hide a mistaken operand or leave an intended update unperformed.
      'unicorn/no-useless-compound-assignment': 'error',
      // [standardization] Combine adjacent literal fragments so reviewers read the resulting text directly rather than reconstructing concatenation.
      'unicorn/no-useless-concat': 'error',
      // [standardization] Remove redundant continue statements so explicit loop exits identify control flow that changes execution.
      'unicorn/no-useless-continue': 'error',
      // [standardization] Delete optional properties directly in matched cases so reviewers do not infer that a redundant existence guard changes behavior.
      'unicorn/no-useless-delete-check': 'error',
      // [architectural-prevention] Remove else after unconditional exits so remaining code has less nesting; this also covers core no-else-return patterns.
      'unicorn/no-useless-else': 'error',
      // [standardization] Omit redundant captureStackTrace() calls so manual stack handling identifies cases that actually need customization.
      'unicorn/no-useless-error-capture-stack-trace': 'error',
      // [standardization] Omit object-spread fallbacks that cannot affect the result so reviewers do not infer a required absence-handling branch.
      'unicorn/no-useless-fallback-in-spread': 'error',
      // [architectural-prevention] Remove redundant iterator toArray() conversions so immediate consumers do not force avoidable materialization.
      'unicorn/no-useless-iterator-to-array': 'error',
      // [standardization] Omit length guards made redundant by the matched array operation so reviewers inspect only conditions that change behavior.
      'unicorn/no-useless-length-check': 'error',
      // [standardization] Remove ineffective boolean operands so reviewers can read the effective logical condition directly.
      'unicorn/no-useless-logical-operand': 'error',
      // [architectural-prevention] Remove overrides that only delegate unchanged behavior so inheritance contracts do not acquire needless maintenance points.
      'unicorn/no-useless-override': 'error',
      // [standardization] Return or throw directly in supported async contexts so redundant promise settlement wrappers do not obscure the outcome.
      'unicorn/no-useless-promise-resolve-reject': 'error',
      // [architectural-prevention] Use loops for recognized simple recursion so repeated work does not consume an unbounded call stack.
      'unicorn/no-useless-recursion': 'error',
      // [architectural-prevention] Avoid reconstructing Set results already returned as Sets so generated code does not allocate redundant collections.
      'unicorn/no-useless-set-construction': 'error',
      // [standardization] Omit spreads that add no behavior so reviewers can distinguish necessary iterable expansion from redundant syntax.
      'unicorn/no-useless-spread': 'error',
      // [standardization] Remove switch cases equivalent to the default path so reviewers inspect only branches with distinct behavior.
      'unicorn/no-useless-switch-case': 'error',
      // [standardization] Remove redundant template expressions so reviewers can read literal text without tracing needless interpolation.
      'unicorn/no-useless-template-literals': 'error',
      // [standardization] Omit ineffective explicit undefined values so visible absence handling identifies cases that change the contract.
      'unicorn/no-useless-undefined': 'error',
      // [correctness] Keep using resources within their disposal scope so callers cannot receive or capture an already disposed resource.
      'unicorn/no-using-resource-escape': 'error',
      // [correctness] Catch XOR written as exponentiation before numeric calculations silently produce bitwise results.
      'unicorn/no-xor-as-exponentiation': 'error',
      // [standardization] Remove redundant decimal zeros so equivalent numbers use one searchable spelling.
      'unicorn/no-zero-fractions': 'error',
      // [standardization] Use consistent numeric prefixes and uppercase hexadecimal digits so literal spelling does not vary across generated files.
      'unicorn/number-literal-case': 'error',
      // [standardization] Group decimal digits by three, binary and octal digits by four, and hexadecimal digits by two so reviewers can compare long literals consistently.
      'unicorn/numeric-separators-style': 'error',
      // [standardization] Use compound assignments, including template string updates, so self-updates have one recognizable form.
      'unicorn/operator-assignment': 'error',
      // [architectural-prevention] Use AbortSignal.any() to avoid hand-maintained forwarding listeners and their cleanup obligations.
      'unicorn/prefer-abort-signal-any': 'error',
      // [architectural-prevention] Use AbortSignal.timeout() instead of maintaining a controller and timer lifecycle for deadline cancellation.
      'unicorn/prefer-abort-signal-timeout': 'error',
      // [architectural-prevention] Use event listener registration rather than on-properties so one consumer does not overwrite another consumer's handler.
      'unicorn/prefer-add-event-listener': 'error',
      // [standardization] Name event listener options in an object so reviewers need not decode a positional capture boolean.
      'unicorn/prefer-add-event-listener-options': 'error',
      // [standardization] Use AggregateError for collected failures so consumers inspect them through the standard errors property.
      'unicorn/prefer-aggregate-error': 'error',
      // [architectural-prevention] Use find() or findLast() when only one match is needed to avoid allocating all matches and scanning beyond it.
      'unicorn/prefer-array-find': 'error',
      // [standardization] Use flat() for flattening so reviewers do not reconstruct the intent of concatenation or reducer code.
      'unicorn/prefer-array-flat': 'error',
      // [architectural-prevention] Use flatMap() for combined mapping and flattening to avoid an intermediate mapped array.
      'unicorn/prefer-array-flat-map': 'error',
      // [standardization] Use Array.fromAsync() for asynchronous collection so generated code follows one supported collection API.
      'unicorn/prefer-array-from-async': 'error',
      // [architectural-prevention] Map through Array.from() during construction instead of allocating an intermediate array for a subsequent map().
      'unicorn/prefer-array-from-map': 'error',
      // [standardization] Express range construction with Array.from({length}, ...) so reviewers can identify the range size and mapping together.
      'unicorn/prefer-array-from-range': 'error',
      // [standardization] Use indexOf() or lastIndexOf() for direct item lookup so equality-only searches have one recognizable form.
      'unicorn/prefer-array-index-of': 'error',
      // [standardization] Iterate values directly or use keys() when only indexes matter so loop bindings state which part is consumed.
      'unicorn/prefer-array-iterable-methods': 'error',
      // [architectural-prevention] Use last-oriented lookup methods instead of reversing an array solely to search from its end.
      'unicorn/prefer-array-last-methods': 'error',
      // [correctness] Use slice() for reading a range so extraction does not unexpectedly mutate the source array.
      'unicorn/prefer-array-slice': 'error',
      // [standardization] Use some() for existence predicates so consumers see a boolean question rather than an incidental match or count.
      'unicorn/prefer-array-some': 'error',
      // [standardization] Use at() for the supported indexed-access patterns so reviewers see one API for positive and negative positions.
      'unicorn/prefer-at': 'error',
      // [standardization] Use await for asynchronous sequencing so reviewers follow one control-flow style rather than mixed promise chains.
      'unicorn/prefer-await': 'error',
      // [standardization] Spell constant BigInt values as literals so their value and numeric kind are visible without a conversion call.
      'unicorn/prefer-bigint-literals': 'error',
      // [standardization] Read Blob data through text() or arrayBuffer() so asynchronous reads use promises rather than FileReader event state.
      'unicorn/prefer-blob-reading-methods': 'error',
      // [standardization] Use blocks for lexical scoping so reviewers do not mistake an artificial function call for required execution behavior.
      'unicorn/prefer-block-statement-over-iife': 'error',
      // [standardization] Return boolean expressions directly so reviewers need not compare redundant true and false branches.
      'unicorn/prefer-boolean-return': 'error',
      // [standardization] Declare class fields explicitly so reviewers find instance state with its declarations rather than scattered constructor assignments.
      'unicorn/prefer-class-fields': 'error',
      // [standardization] Use classList.toggle() so conditional class membership has one recognizable DOM operation.
      'unicorn/prefer-classlist-toggle': 'error',
      // [correctness] Use code-point APIs so characters outside the basic multilingual plane are not treated as independent surrogate halves.
      'unicorn/prefer-code-point': 'error',
      // [standardization] Combine consecutive guards with identical exits so reviewers inspect one exit condition rather than repeated exit branches.
      'unicorn/prefer-combined-guards': 'error',
      // [architectural-prevention] Use early continue statements to reduce nesting around the remaining loop body.
      'unicorn/prefer-continue': 'error',
      // [standardization] Use Date.now() for epoch milliseconds so timestamp reads do not masquerade as Date object construction.
      'unicorn/prefer-date-now': 'error',
      // [standardization] Put parameter defaults in the signature so reviewers see omitted-argument behavior at the function boundary.
      'unicorn/prefer-default-parameters': 'error',
      // [standardization] Iterate supported values directly so explicit default iterator calls do not add another spelling of the same loop.
      'unicorn/prefer-direct-iteration': 'error',
      // [architectural-prevention] Use using or await using to make resource ownership and disposal scope explicit instead of hand-maintained cleanup paths.
      'unicorn/prefer-dispose': 'error',
      // [standardization] Use append() for DOM insertion so generated code follows the selected multi-node-capable API.
      'unicorn/prefer-dom-node-append': 'error',
      // [standardization] Use getHTML() and setHTML() for supported HTML operations so generated code follows the selected DOM API rather than property assignment.
      'unicorn/prefer-dom-node-html-methods': 'error',
      // [standardization] Use remove() on the target node so removal does not require repeating its parent relationship.
      'unicorn/prefer-dom-node-remove': 'error',
      // [standardization] Use replaceChildren() so reviewers see child replacement as one named DOM operation.
      'unicorn/prefer-dom-node-replace-children': 'error',
      // [architectural-prevention] Use textContent instead of layout-aware innerText so plain text access does not require rendered-layout computation.
      'unicorn/prefer-dom-node-text-content': 'error',
      // [architectural-prevention] Use early returns to reduce nesting around the remaining function body.
      'unicorn/prefer-early-return': 'error',
      // [standardization] Use else if for recognized mutually exclusive conditions so reviewers see the branch relationship directly.
      'unicorn/prefer-else-if': 'error',
      // [correctness] Use Error.isError() so error recognition does not depend on the value sharing the caller's realm or constructor identity.
      'unicorn/prefer-error-is-error': 'error',
      // [standardization] Escape irregular whitespace so reviewers can distinguish intended characters from invisible source formatting.
      'unicorn/prefer-escaped-irregular-whitespace': 'error',
      // [standardization] Use EventTarget as the selected event API so generated event abstractions follow the same registration contract.
      'unicorn/prefer-event-target': 'error',
      // [standardization] Use export-from declarations for reexports so reviewers can distinguish forwarded APIs from locally used imports.
      'unicorn/prefer-export-from': 'error',
      // [standardization] Flatten nested min() and max() calls so reviewers inspect the compared values in one argument list.
      'unicorn/prefer-flat-math-min-max': 'error',
      // [correctness] Compute map defaults only when insertion is needed so an existing key does not trigger the fallback's side effects.
      'unicorn/prefer-get-or-insert-computed': 'error',
      // [standardization] Use global numeric constants so these values have one spelling distinct from Number conversion and checking methods.
      'unicorn/prefer-global-number-constants': 'error',
      // [standardization] Use globalThis so global access uses the same name across browser, worker, and Node environments.
      'unicorn/prefer-global-this': 'error',
      // [standardization] Use Object.groupBy() or Map.groupBy() so reviewers recognize grouping without tracing a custom accumulator.
      'unicorn/prefer-group-by': 'error',
      // [standardization] Use has() for supported membership checks so existence tests do not depend on interpreting retrieved values.
      'unicorn/prefer-has-check': 'error',
      // [architectural-prevention] Move code shared by every branch outside the branches so future edits do not leave duplicated behavior inconsistent.
      'unicorn/prefer-hoisting-branch-code': 'error',
      // [correctness] Prefer HTTPS URLs so requests do not expose payloads to plaintext transport when a secure endpoint is available.
      'unicorn/prefer-https': 'error',
      // [standardization] Use identifier import and export specifiers where possible so public names use ordinary searchable binding syntax.
      'unicorn/prefer-identifier-import-export-specifiers': 'error',
      // [standardization] Use import.meta.dirname and import.meta.filename so ESM file paths do not require repeated URL conversion boilerplate.
      'unicorn/prefer-import-meta-properties': 'error',
      // [standardization] Use includes() for direct membership questions so reviewers do not decode index sentinels or equality callbacks.
      'unicorn/prefer-includes': 'error',
      // [standardization] Use includes() for repeated equality alternatives so reviewers see one candidate list and one tested value.
      'unicorn/prefer-includes-over-repeated-comparisons': 'error',
      // [standardization] Pass iterables to collection constructors so initial contents are explicit rather than assembled through repeated insertion.
      'unicorn/prefer-iterable-in-constructor': 'error',
      // [architectural-prevention] Use iterator helpers instead of materializing temporary arrays solely to transform an iterator.
      'unicorn/prefer-iterator-helpers': 'error',
      // [standardization] Use iterator toArray() for materialization so reviewers can identify the explicit conversion point.
      'unicorn/prefer-iterator-to-array': 'error',
      // [architectural-prevention] Materialize iterator chains at the end so intermediate transformations do not allocate avoidable arrays.
      'unicorn/prefer-iterator-to-array-at-end': 'error',
      // [standardization] Use JSON imports for supported static data dependencies so reviewers find them in the module dependency list.
      'unicorn/prefer-json-import': 'error',
      // [standardization] Use KeyboardEvent.key so generated handlers follow the supported keyboard API instead of deprecated numeric codes.
      'unicorn/prefer-keyboard-event-key': 'error',
      // [standardization] Write printable ASCII literally so reviewers read source text without decoding unnecessary escapes.
      'unicorn/prefer-literal-ascii': 'error',
      // [standardization] Use location.assign() so navigation appears as an explicit operation rather than a property write.
      'unicorn/prefer-location-assign': 'error',
      // [standardization] Use logical operators for recognized fallback ternaries so fallback expressions follow one selected syntax.
      'unicorn/prefer-logical-operator-over-ternary': 'error',
      // [standardization] Use Map for recognized map-like entry collections so key storage follows an explicit collection contract.
      'unicorn/prefer-map-from-entries': 'error',
      // [standardization] Use Math.abs() for absolute values and symmetric bounds so reviewers need not reconstruct the numeric operation.
      'unicorn/prefer-math-abs': 'error',
      // [correctness] Use named Math constants instead of hand-written approximations that can introduce avoidable numeric error.
      'unicorn/prefer-math-constants': 'error',
      // [standardization] Use Math.min() and Math.max() for simple extrema so reviewers see the numeric operation rather than repeated branches.
      'unicorn/prefer-math-min-max': 'error',
      // [standardization] Use Math.trunc() for truncation so generated numeric code states its operation rather than relying on coercion tricks.
      'unicorn/prefer-math-trunc': 'error',
      // [standardization] Put a ternary around only the varying expression so reviewers can distinguish shared operations from branch differences.
      'unicorn/prefer-minimal-ternary': 'error',
      // [standardization] Use replaceWith(), before(), prepend(), append(), after(), and replaceChildren() in matched DOM updates so reviewers identify insertion and replacement without legacy parent or position-string arguments.
      'unicorn/prefer-modern-dom-apis': 'error',
      // [standardization] Use dedicated Math APIs for recognized operations so reviewers do not have to derive their meaning from legacy formulas.
      'unicorn/prefer-modern-math-apis': 'error',
      // [standardization] Use ESM rather than CommonJS globals, require(), export assignments, or redundant strict directives so modules follow one loading model.
      'unicorn/prefer-module': 'error',
      // [standardization] Pass native coercion functions directly for supported callbacks so wrappers do not obscure a plain conversion.
      'unicorn/prefer-native-coercion-functions': 'error',
      // [standardization] Use negative indexes where supported so end-relative access does not repeat length arithmetic.
      'unicorn/prefer-negative-index': 'error',
      // [standardization] Prefix Node builtins with node: so reviewers can distinguish platform imports from installed packages.
      'unicorn/prefer-node-protocol': 'error',
      // [standardization] Use Number() for recognized numeric coercions so conversion intent is distinct from explicit radix parsing.
      'unicorn/prefer-number-coercion': 'error',
      // [correctness] Check safe integer representability rather than integrality alone so integer operations do not silently accept imprecise numbers.
      'unicorn/prefer-number-is-safe-integer': 'error',
      // [standardization] Use Number static parsing and checking methods so numeric operations have a consistent namespace while constants retain their selected global spelling.
      'unicorn/prefer-number-properties': 'error',
      // [standardization] Define multiple descriptors with Object.defineProperties() so reviewers inspect a related property contract together.
      'unicorn/prefer-object-define-properties': 'error',
      // [standardization] Use destructuring defaults so per-property fallback behavior appears beside each binding rather than inside a spread merge.
      'unicorn/prefer-object-destructuring-defaults': 'error',
      // [standardization] Use Object.fromEntries() for entry-to-object conversion so reviewers recognize the transformation without tracing an accumulator.
      'unicorn/prefer-object-from-entries': 'error',
      // [standardization] Select keys(), values(), or entries() to match consumed data so iteration does not imply unused key or value dependencies.
      'unicorn/prefer-object-iterable-methods': 'error',
      // [architectural-prevention] Use observer APIs for recognized layout tracking so scroll or resize handlers do not repeatedly force layout reads.
      'unicorn/prefer-observer-apis': 'error',
      // [standardization] Omit unused catch bindings so error handling does not declare a value it never inspects.
      'unicorn/prefer-optional-catch-binding': 'error',
      // [architectural-prevention] Use Path2D for repeated drawing so a stable path does not need reconstruction on every draw.
      'unicorn/prefer-path2d': 'error',
      // [architectural-prevention] Use private fields so class ownership is language-enforced rather than implied by a public underscore name.
      'unicorn/prefer-private-class-fields': 'error',
      // [standardization] Use Promise.resolve() or Promise.reject() for trivial settlement so reviewers do not inspect an unnecessary executor.
      'unicorn/prefer-promise-static-methods': 'error',
      // [standardization] Use Promise.try() for supported promise-wrapping patterns so generated code follows one API for invoking a potentially throwing operation.
      'unicorn/prefer-promise-try': 'error',
      // [standardization] Use Promise.withResolvers() when resolvers must escape construction so the promise and resolver contract is explicit.
      'unicorn/prefer-promise-with-resolvers': 'error',
      // [standardization] Borrow methods from prototypes so reusable operations do not appear tied to an arbitrary instance.
      'unicorn/prefer-prototype-methods': 'error',
      // [standardization] Use querySelector() and querySelectorAll() so generated DOM queries follow one selector-based convention.
      'unicorn/prefer-query-selector': 'error',
      // [standardization] Use queueMicrotask() for the rule's deferred-callback patterns so generated code follows the selected microtask scheduling contract.
      'unicorn/prefer-queue-microtask': 'error',
      // [standardization] Use Reflect.apply() so explicit receiver invocation follows one API rather than borrowing a function's apply property.
      'unicorn/prefer-reflect-apply': 'error',
      // [correctness] Use RegExp.escape() so interpolated text cannot accidentally become regex syntax through incomplete manual escaping.
      'unicorn/prefer-regexp-escape': 'error',
      // [standardization] Use test() for regex boolean questions so reviewers do not have to infer intent from discarded match data.
      'unicorn/prefer-regexp-test': 'error',
      // [standardization] Use Response.json() so JSON response construction and its content type follow the platform's named operation.
      'unicorn/prefer-response-static-json': 'error',
      // [correctness] Anchor element queries with :scope so matching does not unexpectedly depend on ancestors outside the queried element.
      'unicorn/prefer-scoped-selector': 'error',
      // [architectural-prevention] Use Set.has() for recognized repeated membership queries to avoid repeated linear array scans.
      'unicorn/prefer-set-has': 'error',
      // [standardization] Use Set methods for set operations so reviewers can identify union, intersection, and related intent without tracing custom loops.
      'unicorn/prefer-set-methods': 'error',
      // [architectural-prevention] Read Set.size directly instead of materializing an array solely to count its elements.
      'unicorn/prefer-set-size': 'error',
      // [standardization] Use shorter standard escapes so equivalent characters have one selected source spelling.
      'unicorn/prefer-short-escape-sequences': 'error',
      // [standardization] Put simple conditions first in recognized logical expressions so reviewers scan the least involved checks before complex ones.
      'unicorn/prefer-simple-condition-first': 'error',
      // [standardization] Use the rule's simple sort comparator form so reviewers can identify ordering without equivalent conditional branches.
      'unicorn/prefer-simple-sort-comparator': 'error',
      // [standardization] Simplify recognized equivalent conditions so reviewers inspect the effective predicate rather than redundant logic.
      'unicorn/prefer-simplified-conditions': 'error',
      // [architectural-prevention] Combine compatible some() or every() predicates so one membership question does not require repeated array traversals.
      'unicorn/prefer-single-array-predicate': 'error',
      // [standardization] Combine compatible adjacent collection, class-list, and script-loading calls so related arguments appear in one operation.
      'unicorn/prefer-single-call': 'error',
      // [standardization] Use one destructuring declaration per local const source so reviewers find extracted dependencies together.
      'unicorn/prefer-single-object-destructuring': 'error',
      // [architectural-prevention] Combine compatible single-character replacements so the string is not repeatedly scanned and reallocated.
      'unicorn/prefer-single-replace': 'error',
      // [architectural-prevention] Keep bindings in their smallest applicable scope so fewer statements can depend on or alter local state.
      'unicorn/prefer-smaller-scope': 'error',
      // [architectural-prevention] Limit split() when only a prefix is consumed so processing need not allocate every remaining segment.
      'unicorn/prefer-split-limit': 'error',
      // [standardization] Use spread for the rule's supported copy and concatenation patterns so reviewers see one iterable expansion convention.
      'unicorn/prefer-spread': 'error',
      // [standardization] Use matchAll() for regex match iteration so reviewers do not need to trace an exec() loop's mutable lastIndex state.
      'unicorn/prefer-string-match-all': 'error',
      // [standardization] Use padStart() and padEnd() so padding direction and target length are explicit instead of reconstructed from manual operations.
      'unicorn/prefer-string-pad-start-end': 'error',
      // [standardization] Use String.raw for supported backslash-heavy strings so reviewers read intended text without duplicated escaping.
      'unicorn/prefer-string-raw': 'error',
      // [standardization] Use repeat() for repeated whitespace so reviewers see the repetition count rather than a manually constructed string.
      'unicorn/prefer-string-repeat': 'error',
      // [standardization] Use replaceAll() for supported global replacements so all-occurrence intent is explicit without split/join or regex flags.
      'unicorn/prefer-string-replace-all': 'error',
      // [standardization] Use slice() for substring extraction so reviewers need not switch between APIs with different index conventions.
      'unicorn/prefer-string-slice': 'error',
      // [standardization] Use startsWith() and endsWith() so prefix and suffix tests do not require decoding index or slice arithmetic.
      'unicorn/prefer-string-starts-ends-with': 'error',
      // [standardization] Use trimStart() and trimEnd() so generated code follows the selected names rather than legacy left/right aliases.
      'unicorn/prefer-string-trim-start-end': 'error',
      // [standardization] Use structuredClone() for supported deep-copy patterns so generated code states cloning intent through the platform API.
      'unicorn/prefer-structured-clone': 'error',
      // [standardization] Use switch for recognized repeated discriminant branches so reviewers see one dispatch value rather than repeated tests.
      'unicorn/prefer-switch': 'error',
      // [standardization] Use direct Temporal conversions so reviewers see the intended target type without reconstructing an intermediate conversion chain.
      'unicorn/prefer-temporal-conversion': 'error',
      // [standardization] Use ternaries for the rule's simple conditional-value patterns so reviewers see a single value-producing expression.
      'unicorn/prefer-ternary': 'error',
      // [standardization] Put rejection handling in catch() so generated promise code has a consistent visible error-handling stage.
      'unicorn/prefer-then-catch': 'error',
      // [standardization] Use toggleAttribute() so conditional attribute presence is expressed as one named DOM operation.
      'unicorn/prefer-toggle-attribute': 'error',
      // [correctness] Await asynchronous module initialization at top level so dependent modules do not observe exports before initialization finishes.
      'unicorn/prefer-top-level-await': 'error',
      // [standardization] Throw TypeError for type-check failures so consumers can recognize invalid argument types through the standard error class.
      'unicorn/prefer-type-error': 'error',
      // [standardization] Put type literals last in unions so generated type declarations follow one reviewable ordering convention.
      'unicorn/prefer-type-literal-last': 'error',
      // [standardization] Use unary minus for sign inversion so reviewers do not mistake it for meaningful multiplication or division.
      'unicorn/prefer-unary-minus': 'error',
      // [standardization] Use Unicode code-point escapes so escaped characters have a consistent notation without manually paired surrogate escapes.
      'unicorn/prefer-unicode-code-point-escapes': 'error',
      // [standardization] Use URL.canParse() for validation so reviewers see a boolean question instead of exception-driven URL construction.
      'unicorn/prefer-url-can-parse': 'error',
      // [standardization] Read URL.href when requesting serialized text so reviewers see an explicit string property rather than implicit coercion.
      'unicorn/prefer-url-href': 'error',
      // [correctness] Use URLSearchParams so query parsing handles encoding and repeated parameters instead of relying on incomplete manual string splitting.
      'unicorn/prefer-url-search-parameters': 'error',
      // [standardization] Put a recognized loop guard in while so reviewers can find the continuation condition at the loop boundary.
      'unicorn/prefer-while-loop-condition': 'error',
      // [standardization] Omit redundant ./ URL prefixes while retaining meaningful parent and root-relative paths so equivalent URLs have one selected spelling.
      'unicorn/relative-url-style': 'error',
      // [standardization] Pass join() separators explicitly so reviewers need not infer whether the default comma is intentional.
      'unicorn/require-array-join-separator': 'error',
      // [correctness] Supply sort comparators so numeric and other intended orders do not silently use the default lexicographic comparison.
      'unicorn/require-array-sort-compare': 'error',
      // [correctness] Escape interpolated CSS selector values so data cannot change selector meaning or create invalid selector syntax.
      'unicorn/require-css-escape': 'error',
      // [standardization] Remove empty module attributes so import declarations do not imply a loading constraint they never specify.
      'unicorn/require-module-attributes': 'error',
      // [standardization] Require meaningful module specifier lists so empty braces do not disguise a side-effect-only module operation.
      'unicorn/require-module-specifiers': 'error',
      // [standardization] Pass toFixed() digits explicitly so reviewers can see the chosen precision instead of an implicit zero-digit default.
      'unicorn/require-number-to-fixed-digits-argument': 'error',
      // [architectural-prevention] Declare high-frequency listeners passive so the browser need not delay scrolling while waiting for possible cancellation.
      'unicorn/require-passive-events': 'error',
      // [correctness] State postMessage() target origins explicitly so cross-window delivery boundaries are not left implicit.
      'unicorn/require-post-message-target-origin': 'error',
      // [standardization] Return booleans from boolean Proxy traps so reviewers see the trap contract without relying on truthiness conversion.
      'unicorn/require-proxy-trap-boolean-return': 'error',
      // [correctness] Decode fetch chunks in streaming mode so multi-byte characters split across chunks are not corrupted.
      'unicorn/require-text-decoder-streaming': 'error',
      // [standardization] Expand block comments to multiline form so generated explanations follow one comment layout.
      'unicorn/single-line-block-comment-style': 'error',
      // [correctness] Wrap switch case bodies in braces so lexical bindings cannot leak into neighboring case clauses.
      'unicorn/switch-case-braces': 'error',
      // [standardization] Put case exit statements in a consistent position so reviewers can scan switch control flow without layout variations.
      'unicorn/switch-case-break-position': 'error',
      // [standardization] Normalize known dedent, GraphQL, SQL, HTML, and styled templates so embedded source follows a consistent indentation convention.
      'unicorn/template-indent': 'error',
      // [standardization] Use lowercase encoding names without optional dashes so equivalent encodings have one searchable spelling.
      'unicorn/text-encoding-identifier-case': 'error',
      // [standardization] Use new for error construction so thrown error objects follow the same visible construction convention as other instances.
      'unicorn/throw-new-error': 'error',
      // [architectural-prevention] One operation per try block is a chosen review ceiling to make the source of a caught failure identifiable, not proof of correct recovery.
      'unicorn/try-complexity': ['error', { max: 1 }],

      // [correctness] Catch unresolved dependencies before consumers encounter module-loading failures.
      'import-x/no-unresolved': 'error',
      // [correctness] Catch imports of nonexistent named exports before module instantiation fails.
      'import-x/named': 'error',
      // [correctness] Catch default imports whose target has no default export before module loading fails.
      'import-x/default': 'error',
      // [correctness] Catch duplicate or invalid exports before consumers encounter an invalid module contract.
      'import-x/export': 'error',
      // [correctness] Catch default bindings confused with named exports so callers do not receive the wrong value.
      'import-x/no-named-as-default': 'error',
      // [correctness] Do not treat named exports as properties of a default export because the module makes no such guarantee.
      'import-x/no-named-as-default-member': 'error',
      // [standardization] Merge imports from the same resolved module so reviewers see each dependency in one declaration.
      'import-x/no-duplicates': 'error',
      // [architectural-prevention] Enumerate imported bindings so reviewers can assess dependency usage without tracing namespace access.
      'import-x/no-namespace': 'error',
      // [architectural-prevention] Keep exported bindings non-reassignable so consumers do not depend on hidden changes to module state.
      'import-x/no-mutable-exports': 'error',
      // [standardization] Group local public bindings in one named export list so reviewers can inspect the module contract together.
      'import-x/group-exports': 'error',
      // [architectural-prevention] Use sibling packages through their package contracts rather than coupling consumers to internal paths.
      'import-x/no-relative-packages': 'error',
      // [standardization] Use top-level import type declarations so reviewers can distinguish runtime dependencies from erased types.
      'import-x/consistent-type-specifier-style': 'error',
      // [correctness] Reject self-imports that read the module's own partially initialized exports instead of local bindings.
      'import-x/no-self-import': 'error',
      // [architectural-prevention] Reject dependency cycles because initialization order and ownership become harder to review across mutually dependent modules.
      'import-x/no-cycle': 'error',
      // [standardization] Preserve default export names at import sites so searches identify the same dependency consistently.
      'import-x/no-rename-default': 'error',
      // [standardization] Use the selected ESM dependency model rather than introducing AMD loading conventions.
      'import-x/no-amd': 'error',
      // [standardization] Put imports first so reviewers find dependencies before executable module code.
      'import-x/first': 'error',
      // [architectural-prevention] Ten dependencies is a chosen review ceiling for module coupling, not proof of a single responsibility.
      'import-x/max-dependencies': ['error', { max: 10 }],
      // [correctness] Avoid machine-specific absolute imports that fail when consumers install the package elsewhere.
      'import-x/no-absolute-path': 'error',
      // [standardization] Keep imports independent of webpack loader syntax so generated modules use the selected standard module notation.
      'import-x/no-webpack-loader-syntax': 'error',
      // [standardization] Separate imports with a blank line so reviewers can distinguish dependencies from module implementation.
      'import-x/newline-after-import': 'error',
      // [correctness] Make ESM classification explicit so parsers and runtimes do not interpret a module as a script.
      'import-x/unambiguous': 'error',
      // [architectural-prevention] Require bound imports so reviewers can trace dependency use instead of accepting unexplained import-time effects.
      'import-x/no-unassigned-import': 'error',
      // [standardization] Remove redundant path segments so searches and reviews see one spelling of a dependency path.
      'import-x/no-useless-path-segments': 'error',
      // [standardization] Avoid empty named import blocks that imply binding use while only triggering module evaluation.
      'import-x/no-empty-named-blocks': 'error',
      // [standardization] Put local export lists after their definitions so reviewers encounter implementation before the public contract.
      'import-x/exports-last': 'error',
      // [standardization] Avoid APIs marked deprecated so generated code follows the dependency's currently supported interface.
      'import-x/no-deprecated': 'error',
      // [architectural-prevention] Enumerate reexports so an upstream addition cannot silently expand this module's public contract.
      'import-x/avoid-re-export-all': 'error',
      // [correctness] Emit extensions on relative imports for ESM resolution; exempt package names because package exports select their files.
      'import-x/extensions': ['error', 'always', { ignorePackages: true }],
      // [standardization] Separate dependency origin groups with blank lines and sort names case-insensitively with types first so reviewers can scan and compare imports predictably.
      'import-x/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        named: { enabled: true, types: 'types-first' },
      }],
      // [standardization] Use named source exports so consumers and repository searches use the declared public names.
      'import-x/no-default-export': 'error',
      // [correctness] Include type-only imports in dependency checks because consumer type resolution also requires reproducible package installation.
      'import-x/no-extraneous-dependencies': ['error', { includeTypes: true }],

      // [correctness] Reject quantifiers over possibly empty expressions because their counts can misrepresent the minimum accepted input length.
      'regexp/confusing-quantifier': 'error',
      // [correctness] Catch regex elements that contradict nearby assertions before an intended matching branch becomes impossible.
      'regexp/no-contradiction-with-assertion': 'error',
      // [correctness] Reject empty regex alternatives so an unintended empty match cannot bypass the other alternatives.
      'regexp/no-empty-alternative': 'error',
      // [correctness] Catch character classes that cannot match any input, including constructor patterns and Unicode sets.
      'regexp/no-empty-character-class': 'error',
      // [correctness] Reject empty lookarounds because they accept or reject unconditionally instead of testing the intended input.
      'regexp/no-empty-lookarounds-assertion': 'error',
      // [correctness] Catch invalid constructor patterns and duplicate or incompatible flags before regex compilation throws at runtime.
      'regexp/no-invalid-regexp': 'error',
      // [correctness] Catch terminal lazy quantifiers that can stop before consuming the text the match is intended to include.
      'regexp/no-lazy-ends': 'error',
      // [correctness] Catch captures whose repeated contents differ from the text consumers expect the group to preserve.
      'regexp/no-misleading-capturing-group': 'error',
      // [correctness] Avoid splitting multi-code-point characters in classes or quantifiers because the regex then matches different text.
      'regexp/no-misleading-unicode-character': 'error',
      // [correctness] Require global patterns for matchAll() and replaceAll() because these APIs throw when the g flag is missing.
      'regexp/no-missing-g-flag': 'error',
      // [correctness] Catch nonstandard regex flags before JavaScript rejects the pattern.
      'regexp/no-non-standard-flag': 'error',
      // [correctness] Reject optional assertions because bypassing them can accept input that the apparent condition excludes.
      'regexp/no-optional-assertion': 'error',
      // [correctness] Catch backreferences whose capture may be absent or reset before they silently accept empty text.
      'regexp/no-potentially-useless-backreference': 'error',
      // [correctness] Reject assertions that always accept or reject so a regex does not imply checks it cannot perform.
      'regexp/no-useless-assertions': 'error',
      // [correctness] Catch backreferences that always match empty text, including composed constructor patterns that can hide the missing constraint.
      'regexp/no-useless-backreference': 'error',
      // [correctness] Catch nonexistent replacement references before replacement strings insert literal dollar expressions instead of captured text.
      'regexp/no-useless-dollar-replacements': 'error',
      // [correctness] Reject zero-maximum quantifiers because the apparently required expression can never consume input.
      'regexp/no-zero-quantifier': 'error',
      // [architectural-prevention] Reject certain exponential or polynomial backtracking risks without assuming a rejecting suffix; this bounds known regex resource risks rather than proving safe runtime cost.
      'regexp/no-super-linear-backtracking': ['error', { report: 'certain' }],
    },
  },
  {
    name: '@asmundwien/lint/base/framework-config-exports',
    files: [
      '**/eslint.config.{js,mjs,cjs,ts,mts,cts}',
      '**/vitest.config.{js,mjs,cjs,ts,mts,cts}',
    ],
    rules: {
      // [standardization] Off (compatibility): Only eslint.config and vitest.config files with js, mjs, cjs, ts, mts, or cts extensions may use the default export their configuration loaders require.
      'import-x/no-default-export': 'off',
    },
  },
);

export { base };
