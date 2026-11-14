const maximumBlockDepth = 4;
const maximumCallbackDepth = 10;
const maximumClassesPerFile = 1;
const maximumCyclomaticComplexity = 20;
const maximumFileLines = 300;
const maximumFunctionLines = 50;
const maximumFunctionStatements = 10;
const maximumParameters = 3;

/**
@type {import('eslint').Linter.RulesRecord}
*/
const coreSafetyRules = {
  // [correctness] Return values from array transformation callbacks so missing returns do not silently produce undefined elements.
  'array-callback-return': 'error',
  // [architectural-prevention] Keep instance methods dependent on instance state so class ownership does not hide otherwise standalone behavior.
  'class-methods-use-this': 'error',
  // [architectural-prevention] Cyclomatic complexity 20 is a chosen review ceiling for branching, not evidence that a function below it has a sound design.
  'complexity': ['error', maximumCyclomaticComplexity],
  // [correctness] Keep return paths consistent so callers do not unexpectedly receive undefined from a function that otherwise returns a value.
  'consistent-return': 'error',
  // [correctness] Require exactly one super() call per derived-constructor path; retain this check for TypeScript because its compiler accepts duplicate calls that throw at runtime.
  'constructor-super': 'error',
  // [architectural-prevention] Use braces for control statements so a later added statement cannot appear guarded while executing outside the branch.
  'curly': 'error',
  // [architectural-prevention] Require a switch default or the rule's explicit omission marker so reviewers must consider inputs not covered by listed cases.
  'default-case': 'error',
  // [correctness] Use strict equality so coercion cannot silently equate values with different types.
  'eqeqeq': 'error',
  // [correctness] Catch loop updates that move counters away from their stopping conditions before finite processing becomes nonterminating.
  'for-direction': 'error',
  // [correctness] Return values on reachable getter paths so property reads do not unexpectedly yield undefined.
  'getter-return': 'error',
  // [correctness] Guard for-in bodies so inherited enumerable properties are not processed as the object's own entries.
  'guard-for-in': 'error',
  // [architectural-prevention] One class per file is a chosen review ceiling that separates class ownership boundaries, not proof of cohesive responsibilities.
  'max-classes-per-file': ['error', maximumClassesPerFile],
  // [architectural-prevention] Four nested blocks is a chosen review ceiling for tracing control flow, not a threshold that proves simple design.
  'max-depth': ['error', maximumBlockDepth],
  // [architectural-prevention] A 300-line file ceiling counts comments and blanks to bound the complete review unit rather than only executable statements.
  'max-lines': ['error', maximumFileLines],
  // [architectural-prevention] A 50-line function ceiling counts comments and blanks to bound the complete review unit rather than treating short code as proof of limited responsibility.
  'max-lines-per-function': ['error', maximumFunctionLines],
  // [architectural-prevention] Ten nested callbacks is a chosen review ceiling for tracing enclosing scopes and control flow, not a safe-depth guarantee.
  'max-nested-callbacks': ['error', maximumCallbackDepth],
  // [architectural-prevention] Three parameters is a chosen review ceiling for caller coupling through positional inputs, not proof of a cohesive interface.
  'max-params': ['error', maximumParameters],
  // [architectural-prevention] Ten statements is a chosen function review ceiling to prompt inspection of combined responsibilities, not proof that smaller functions have one purpose.
  'max-statements': ['error', maximumFunctionStatements],
  // [correctness] Keep Promise executors synchronous because the constructor ignores a returned async promise and can lose its rejection.
  'no-async-promise-executor': 'error',
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
  // [correctness] Do not reassign const or resource bindings because these updates violate the language's immutable-binding contract.
  'no-const-assign': 'error',
  // [correctness] Catch constant binary outcomes that can hide precedence mistakes or checks that never inspect the intended value.
  'no-constant-binary-expression': 'error',
  // [correctness] Catch constant conditions before an intended branch is unreachable or a loop cannot terminate.
  'no-constant-condition': 'error',
  // [correctness] Do not return values from constructors because object returns replace the instance and primitive returns do not behave like ordinary function results.
  'no-constructor-return': 'error',
  // [correctness] Remove debugger statements so consumer execution cannot unexpectedly pause when debugging tools are attached.
  'no-debugger': 'error',
  // [correctness] Do not delete lexical variables because delete cannot remove their bindings and strict mode rejects the operation.
  'no-delete-var': 'error',
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
  // [correctness] Avoid eval() so data cannot become dynamically executed code with access to the current scope.
  'no-eval': 'error',
  // [correctness] Preserve caught exception bindings so subsequent handling does not accidentally lose the original failure.
  'no-ex-assign': 'error',
  // [architectural-prevention] Avoid extending native prototypes so one module cannot silently alter builtin behavior for unrelated consumers.
  'no-extend-native': 'error',
  // [correctness] Reject accidental switch fallthrough so handling one case cannot unexpectedly execute the next; explanatory comments mark deliberate fallthrough.
  'no-fallthrough': 'error',
  // [correctness] Keep function declaration bindings unchanged so later calls do not unexpectedly invoke a replacement value.
  'no-func-assign': 'error',
  // [correctness] Avoid writes to readonly globals because assignments can fail or undermine the builtin contract the code expects.
  'no-global-assign': 'error',
  // [architectural-prevention] Avoid implicit globals in script contexts so separately loaded code does not acquire hidden shared bindings.
  'no-implicit-globals': 'error',
  // [correctness] Avoid string-based eval-like APIs so timer or execution inputs cannot be interpreted as executable source.
  'no-implied-eval': 'error',
  // [correctness] Do not assign imported bindings because ESM imports are readonly views of another module's exports.
  'no-import-assign': 'error',
  // [correctness] Catch this in invalid receiver contexts before a property operation encounters undefined instead of the intended instance.
  'no-invalid-this': 'error',
  // [correctness] Avoid loop-created closures over unsafe changing bindings so callbacks do not all observe an unintended later iteration value.
  'no-loop-func': 'error',
  // [correctness] Catch numeric literals outside exact representability before the runtime silently rounds the intended value.
  'no-loss-of-precision': 'error',
  // [architectural-prevention] Retain constructed instances instead of invoking constructors solely for effects so object ownership and lifetime remain visible.
  'no-new': 'error',
  // [correctness] Avoid Function construction so input text cannot become executable code through dynamic compilation.
  'no-new-func': 'error',
  // [correctness] Do not construct nonconstructible builtins because new on these functions throws instead of producing an instance.
  'no-new-native-nonconstructor': 'error',
  // [correctness] Use primitive values instead of boxed strings, numbers, or booleans because wrapper identity and truthiness differ from their contents.
  'no-new-wrappers': 'error',
  // [correctness] Do not call noncallable builtin objects because treating namespaces such as Math as functions throws.
  'no-obj-calls': 'error',
  // [correctness] Avoid legacy octal string escapes because strict-mode source rejects them rather than producing the intended character.
  'no-octal-escape': 'error',
  // [architectural-prevention] Check parameter properties as well as rebinding so functions cannot hide caller-owned input mutation behind a stable parameter name.
  'no-param-reassign': ['error', { props: true }],
  // [correctness] Do not return values from Promise executors because the constructor ignores them instead of resolving with them.
  'no-promise-executor-return': 'error',
  // [correctness] Do not call borrowed Object.prototype methods directly on inputs because those methods can be absent or shadowed by data.
  'no-prototype-builtins': 'error',
  // [correctness] Catch redeclarations that can hide a conflicting binding or overwrite a function-scoped declaration's intended meaning.
  'no-redeclare': 'error',
  // [correctness] Avoid JavaScript URLs because navigation can execute embedded code instead of loading a resource.
  'no-script-url': 'error',
  // [correctness] Catch self-assignments that leave an intended update unperformed and can hide a mistaken source binding.
  'no-self-assign': 'error',
  // [correctness] Catch self-comparisons that can hide a mistaken operand and make the intended condition ineffective.
  'no-self-compare': 'error',
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
  // [correctness] Catch newline-sensitive expressions before automatic semicolon insertion changes the intended call or access.
  'no-unexpected-multiline': 'error',
  // [correctness] Catch loop conditions whose tested variables never change before a terminating loop becomes nonterminating.
  'no-unmodified-loop-condition': 'error',
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
  // [architectural-prevention] Remove unused private members so class state and behavior do not retain dependencies with no internal consumer.
  'no-unused-private-class-members': 'error',
  // [architectural-prevention] Reject unused bindings and caught errors so dead dependencies and unexamined failure paths remain visible to reviewers.
  'no-unused-vars': 'error',
  // [correctness] Catch overwritten unread assignments that can hide a lost result or an update written to the wrong binding.
  'no-useless-assignment': 'error',
  // [enforcement-integrity] Reject leading TODO, FIXME, and XXX reminders so unfinished generated work cannot be presented as complete through a passing lint run.
  'no-warning-comments': 'error',
  // [correctness] Avoid with statements because implicit object scope can redirect identifier lookup and assignment at runtime.
  'no-with': 'error',
  // [architectural-prevention] Use const for unreassigned bindings so reviewers can distinguish stable references from mutable local state.
  'prefer-const': 'error',
  // [correctness] Use Object.hasOwn() so own-property checks work even when an object shadows or lacks hasOwnProperty().
  'prefer-object-has-own': 'error',
  // [correctness] Reject promises with Error objects so consumers receive stack traces and the standard error inspection contract.
  'prefer-promise-reject-errors': 'error',
  // [correctness] Preserve the caught error as a cause when wrapping it so consumers do not lose the original failure and stack context.
  'preserve-caught-error': 'error',
  // [correctness] State parseInt() radix explicitly so input prefixes do not silently select an unintended numeric interpretation.
  'radix': 'error',
  // [correctness] Catch updates that can use stale values across await or yield so interleaved work does not silently overwrite a newer result.
  'require-atomic-updates': 'error',
  // [correctness] Catch generators with no yield because consumers may otherwise receive no values from an intended sequence.
  'require-yield': 'error',
  // [correctness] Use NaN-aware checks because equality comparisons with NaN never recognize NaN values.
  'use-isnan': 'error',
  // [correctness] Compare typeof only with valid result strings so misspelled type checks cannot silently become impossible conditions.
  'valid-typeof': 'error',
};

export { coreSafetyRules };
