/**
@type {import('eslint').Linter.RulesRecord}
*/
const unicornApiRules = {
  // [standardization] Name event listener options in an object so reviewers need not decode a positional capture boolean.
  'unicorn/prefer-add-event-listener-options': 'error',
  // [standardization] Use AggregateError for collected failures so consumers inspect them through the standard errors property.
  'unicorn/prefer-aggregate-error': 'error',
  // [standardization] Use flat() for flattening so reviewers do not reconstruct the intent of concatenation or reducer code.
  'unicorn/prefer-array-flat': 'error',
  // [standardization] Use Array.fromAsync() for asynchronous collection so generated code follows one supported collection API.
  'unicorn/prefer-array-from-async': 'error',
  // [standardization] Express range construction with Array.from({length}, ...) so reviewers can identify the range size and mapping together.
  'unicorn/prefer-array-from-range': 'error',
  // [standardization] Use indexOf() or lastIndexOf() for direct item lookup so equality-only searches have one recognizable form.
  'unicorn/prefer-array-index-of': 'error',
  // [standardization] Iterate values directly or use keys() when only indexes matter so loop bindings state which part is consumed.
  'unicorn/prefer-array-iterable-methods': 'error',
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
  // [standardization] Combine consecutive guards with identical exits so reviewers inspect one exit condition rather than repeated exit branches.
  'unicorn/prefer-combined-guards': 'error',
  // [standardization] Use Date.now() for epoch milliseconds so timestamp reads do not masquerade as Date object construction.
  'unicorn/prefer-date-now': 'error',
  // [standardization] Put parameter defaults in the signature so reviewers see omitted-argument behavior at the function boundary.
  'unicorn/prefer-default-parameters': 'error',
  // [standardization] Iterate supported values directly so explicit default iterator calls do not add another spelling of the same loop.
  'unicorn/prefer-direct-iteration': 'error',
  // [standardization] Use append() for DOM insertion so generated code follows the selected multi-node-capable API.
  'unicorn/prefer-dom-node-append': 'error',
  // [standardization] Use getHTML() and setHTML() for supported HTML operations so generated code follows the selected DOM API rather than property assignment.
  'unicorn/prefer-dom-node-html-methods': 'error',
  // [standardization] Use remove() on the target node so removal does not require repeating its parent relationship.
  'unicorn/prefer-dom-node-remove': 'error',
  // [standardization] Use replaceChildren() so reviewers see child replacement as one named DOM operation.
  'unicorn/prefer-dom-node-replace-children': 'error',
  // [standardization] Use else if for recognized mutually exclusive conditions so reviewers see the branch relationship directly.
  'unicorn/prefer-else-if': 'error',
  // [standardization] Escape irregular whitespace so reviewers can distinguish intended characters from invisible source formatting.
  'unicorn/prefer-escaped-irregular-whitespace': 'error',
  // [standardization] Use EventTarget as the selected event API so generated event abstractions follow the same registration contract.
  'unicorn/prefer-event-target': 'error',
  // [standardization] Use export-from declarations for reexports so reviewers can distinguish forwarded APIs from locally used imports.
  'unicorn/prefer-export-from': 'error',
  // [standardization] Flatten nested min() and max() calls so reviewers inspect the compared values in one argument list.
  'unicorn/prefer-flat-math-min-max': 'error',
  // [standardization] Use global numeric constants so these values have one spelling distinct from Number conversion and checking methods.
  'unicorn/prefer-global-number-constants': 'error',
  // [standardization] Use globalThis so global access uses the same name across browser, worker, and Node environments.
  'unicorn/prefer-global-this': 'error',
  // [standardization] Use Object.groupBy() or Map.groupBy() so reviewers recognize grouping without tracing a custom accumulator.
  'unicorn/prefer-group-by': 'error',
  // [standardization] Use has() for supported membership checks so existence tests do not depend on interpreting retrieved values.
  'unicorn/prefer-has-check': 'error',
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
  // [standardization] Use iterator toArray() for materialization so reviewers can identify the explicit conversion point.
  'unicorn/prefer-iterator-to-array': 'error',
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
  // [standardization] Omit unused catch bindings so error handling does not declare a value it never inspects.
  'unicorn/prefer-optional-catch-binding': 'error',
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
  // [standardization] Use test() for regex boolean questions so reviewers do not have to infer intent from discarded match data.
  'unicorn/prefer-regexp-test': 'error',
  // [standardization] Use Response.json() so JSON response construction and its content type follow the platform's named operation.
  'unicorn/prefer-response-static-json': 'error',
  // [standardization] Use Set methods for set operations so reviewers can identify union, intersection, and related intent without tracing custom loops.
  'unicorn/prefer-set-methods': 'error',
  // [standardization] Use shorter standard escapes so equivalent characters have one selected source spelling.
  'unicorn/prefer-short-escape-sequences': 'error',
  // [standardization] Put simple conditions first in recognized logical expressions so reviewers scan the least involved checks before complex ones.
  'unicorn/prefer-simple-condition-first': 'error',
  // [standardization] Use the rule's simple sort comparator form so reviewers can identify ordering without equivalent conditional branches.
  'unicorn/prefer-simple-sort-comparator': 'error',
  // [standardization] Simplify recognized equivalent conditions so reviewers inspect the effective predicate rather than redundant logic.
  'unicorn/prefer-simplified-conditions': 'error',
  // [standardization] Combine compatible adjacent collection, class-list, and script-loading calls so related arguments appear in one operation.
  'unicorn/prefer-single-call': 'error',
  // [standardization] Use one destructuring declaration per local const source so reviewers find extracted dependencies together.
  'unicorn/prefer-single-object-destructuring': 'error',
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
  // [standardization] Put a recognized loop guard in while so reviewers can find the continuation condition at the loop boundary.
  'unicorn/prefer-while-loop-condition': 'error',
};

export { unicornApiRules };
