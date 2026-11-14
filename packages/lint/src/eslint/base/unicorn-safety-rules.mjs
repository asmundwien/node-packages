/**
@type {import('eslint').Linter.RulesRecord}
*/
const unicornSafetyRules = {
  // [correctness] Use this in matched static methods so inherited calls refer to the receiving subclass rather than a hard-coded base class.
  'unicorn/class-reference-in-static-methods': 'error',
  // [correctness] Use strict Node assertions so coercion cannot make tests accept values with the wrong type.
  'unicorn/consistent-assert': 'error',
  // [correctness] Define Error subclass names and constructors correctly so consumers receive the intended error identity and diagnostic stack information.
  'unicorn/custom-error-definition': 'error',
  // [correctness] Supply built-in error messages so consumers receive an explanation of the failed operation rather than an anonymous failure.
  'unicorn/error-message': 'error',
  // [correctness] Keep isolated functions independent of unavailable outer bindings so transferred execution does not fail when its original lexical environment is absent.
  'unicorn/isolated-functions': 'error',
  // [correctness] Match new usage to builtin call contracts so constructor-only APIs work and nonconstructible functions do not throw.
  'unicorn/new-for-builtins': 'error',
  // [correctness] Avoid accessing an accessor through itself because recursive getter or setter calls can overflow the stack.
  'unicorn/no-accessor-recursion': 'error',
  // [correctness] Catch bitwise operators mistaken for logical operators before coercion changes the intended condition.
  'unicorn/no-accidental-bitwise-operator': 'error',
  // [correctness] Wrap array callbacks explicitly so index and array arguments do not accidentally become extra parameters to the referenced function.
  'unicorn/no-array-callback-reference': 'error',
  // [correctness] Avoid filling arrays with one reference value because mutating one apparent element then changes every aliased element.
  'unicorn/no-array-fill-with-reference-type': 'error',
  // [correctness] Keep synchronous iterator callbacks synchronous because these helpers do not await promises returned by async callbacks.
  'unicorn/no-async-iterator-callback': 'error',
  // [correctness] Catch awaited inputs to Promise combinators before premature sequencing defeats the intended concurrent operation.
  'unicorn/no-await-in-promise-methods': 'error',
  // [correctness] Return signed ordering results from comparators because booleans cannot distinguish every required ordering direction.
  'unicorn/no-boolean-sort-comparator': 'error',
  // [correctness] Catch chained comparisons because JavaScript compares the first boolean result rather than expressing a mathematical range.
  'unicorn/no-chained-comparison': 'error',
  // [correctness] Access collection entries through their APIs because bracket properties do not read or write Map or Set contents.
  'unicorn/no-collection-bracket-access': 'error',
  // [correctness] Catch contradictory CSS and form constraints before queries match nothing or forms accept no intended value.
  'unicorn/no-conflicting-constraints': 'error',
  // [correctness] Catch arithmetic that always yields zero before a mistaken calculation silently discards its operands.
  'unicorn/no-constant-zero-expression': 'error',
  // [correctness] Catch repeated adjacent logical operands that can hide an omitted condition or repeat an effectful expression.
  'unicorn/no-duplicate-logical-operands': 'error',
  // [correctness] Catch duplicate Set literal values that silently collapse and can hide a missing intended member.
  'unicorn/no-duplicate-set-values': 'error',
  // [correctness] Catch exports in script contexts before the runtime rejects module-only syntax.
  'unicorn/no-exports-in-scripts': 'error',
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
  // [correctness] Read currentTarget during synchronous dispatch because the browser clears it after the handler returns.
  'unicorn/no-late-current-target-access': 'error',
  // [correctness] Control event propagation and defaults during dispatch because late calls cannot change a completed dispatch.
  'unicorn/no-late-event-control': 'error',
  // [correctness] Do not mutate a loop's iterable during traversal because changing membership can skip, repeat, or indefinitely add work.
  'unicorn/no-loop-iterable-mutation': 'error',
  // [correctness] Match Map lookup keys to their guards so checking one entry does not falsely justify reading a different entry.
  'unicorn/no-mismatched-map-key': 'error',
  // [correctness] Catch duplicated targets after compound-assignment refactors before updates apply the original value twice.
  'unicorn/no-misrefactored-assignment': 'error',
  // [correctness] Catch references to missing local resources before consumers encounter broken asset or file loads.
  'unicorn/no-missing-local-resource': 'error',
  // [correctness] Catch repeated resolver calls on one path because only the first settlement takes effect and later results are silently ignored.
  'unicorn/no-multiple-promise-resolver-calls': 'error',
  // [correctness] Reject single-argument Array construction because numeric input creates holes instead of one element; core covers other constructor forms.
  'unicorn/no-new-array': 'error',
  // [correctness] Use Buffer.from() or Buffer.alloc() so construction distinguishes data conversion from allocation and does not expose uninitialized memory.
  'unicorn/no-new-buffer': 'error',
  // [correctness] Avoid nonstandard builtin properties so generated code does not rely on runtime extensions absent from consumer environments.
  'unicorn/no-nonstandard-builtin-properties': 'error',
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
  // [correctness] Do not return push() or unshift() as the updated array because these methods return its numeric length.
  'unicorn/no-return-array-push': 'error',
  // [correctness] Keep selector syntax out of DOM name APIs because an element name and a CSS selector have different matching contracts.
  'unicorn/no-selector-as-dom-name': 'error',
  // [correctness] Catch shorthand properties that overwrite related longhand values before the earlier configuration is silently lost.
  'unicorn/no-shorthand-property-overrides': 'error',
  // [correctness] Avoid incidental then properties because promise resolution can treat such objects as thenables and invoke them unexpectedly.
  'unicorn/no-thenable': 'error',
  // [correctness] Catch method references where an invocation is expected before an uncalled function substitutes for its intended result.
  'unicorn/no-uncalled-method': 'error',
  // [correctness] Catch awaits on known non-promises that can hide a missing asynchronous call or add unintended scheduling.
  'unicorn/no-unnecessary-await': 'error',
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
  // [correctness] Avoid interpolating data into SQLite SQL strings so input cannot become SQL syntax instead of a bound value.
  'unicorn/no-unsafe-sqlite-interpolation': 'error',
  // [correctness] Use replacement callbacks for dynamic text so dollar sequences in data are not interpreted as replacement directives.
  'unicorn/no-unsafe-string-replacement': 'error',
  // [correctness] Consume results from non-mutating builtin operations so discarding a result does not silently discard the intended update.
  'unicorn/no-unused-builtin-method-return': 'error',
  // [correctness] Consume lazy iterator helpers because constructing and discarding them never performs the intended iteration.
  'unicorn/no-unused-iterator-helper': 'error',
  // [correctness] Pass query text rather than full URLs to URLSearchParams because the constructor does not extract a URL's query component.
  'unicorn/no-url-in-search-params': 'error',
  // [correctness] Catch no-op compound assignments that can hide a mistaken operand or leave an intended update unperformed.
  'unicorn/no-useless-compound-assignment': 'error',
  // [correctness] Keep using resources within their disposal scope so callers cannot receive or capture an already disposed resource.
  'unicorn/no-using-resource-escape': 'error',
  // [correctness] Catch XOR written as exponentiation before numeric calculations silently produce bitwise results.
  'unicorn/no-xor-as-exponentiation': 'error',
  // [correctness] Use slice() for reading a range so extraction does not unexpectedly mutate the source array.
  'unicorn/prefer-array-slice': 'error',
  // [correctness] Use code-point APIs so characters outside the basic multilingual plane are not treated as independent surrogate halves.
  'unicorn/prefer-code-point': 'error',
  // [correctness] Use Error.isError() so error recognition does not depend on the value sharing the caller's realm or constructor identity.
  'unicorn/prefer-error-is-error': 'error',
  // [correctness] Compute map defaults only when insertion is needed so an existing key does not trigger the fallback's side effects.
  'unicorn/prefer-get-or-insert-computed': 'error',
  // [correctness] Prefer HTTPS URLs so requests do not expose payloads to plaintext transport when a secure endpoint is available.
  'unicorn/prefer-https': 'error',
  // [correctness] Use named Math constants instead of hand-written approximations that can introduce avoidable numeric error.
  'unicorn/prefer-math-constants': 'error',
  // [correctness] Check safe integer representability rather than integrality alone so integer operations do not silently accept imprecise numbers.
  'unicorn/prefer-number-is-safe-integer': 'error',
  // [correctness] Use RegExp.escape() so interpolated text cannot accidentally become regex syntax through incomplete manual escaping.
  'unicorn/prefer-regexp-escape': 'error',
  // [correctness] Anchor element queries with :scope so matching does not unexpectedly depend on ancestors outside the queried element.
  'unicorn/prefer-scoped-selector': 'error',
  // [correctness] Await asynchronous module initialization at top level so dependent modules do not observe exports before initialization finishes.
  'unicorn/prefer-top-level-await': 'error',
  // [correctness] Use URLSearchParams so query parsing handles encoding and repeated parameters instead of relying on incomplete manual string splitting.
  'unicorn/prefer-url-search-parameters': 'error',
  // [correctness] Supply sort comparators so numeric and other intended orders do not silently use the default lexicographic comparison.
  'unicorn/require-array-sort-compare': 'error',
  // [correctness] Escape interpolated CSS selector values so data cannot change selector meaning or create invalid selector syntax.
  'unicorn/require-css-escape': 'error',
  // [correctness] State postMessage() target origins explicitly so cross-window delivery boundaries are not left implicit.
  'unicorn/require-post-message-target-origin': 'error',
  // [correctness] Decode fetch chunks in streaming mode so multi-byte characters split across chunks are not corrupted.
  'unicorn/require-text-decoder-streaming': 'error',
  // [correctness] Wrap switch case bodies in braces so lexical bindings cannot leak into neighboring case clauses.
  'unicorn/switch-case-braces': 'error',
};

export { unicornSafetyRules };
