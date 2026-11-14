/**
@type {import('eslint').Linter.RulesRecord}
*/
const unicornArchitectureRules = {
  // [architectural-prevention] Move noncapturing functions out of enclosing scopes, including arrows, so their available dependencies and allocation lifetime stay explicit.
  'unicorn/consistent-function-scoping': 'error',
  // [architectural-prevention] Guard optional loop sources instead of constructing empty fallback collections solely to perform no iterations.
  'unicorn/iteration-fallback-style': 'error',
  // [architectural-prevention] Three nested calls is a chosen review ceiling for expression evaluation order, not proof that the expression is simple.
  'unicorn/max-nested-calls': ['error', { max: 3 }],
  // [architectural-prevention] Avoid concat() accumulation in loops because repeated copying can turn linear input processing into quadratic allocation and work.
  'unicorn/no-array-concat-in-loop': 'error',
  // [architectural-prevention] Avoid front-of-array mutation because shifting existing elements can create repeated linear copying during accumulation.
  'unicorn/no-array-front-mutation': 'error',
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
  // [architectural-prevention] Keep finally cleanup synchronous under this policy so completion does not depend on an additional asynchronous cleanup chain.
  'unicorn/no-async-promise-finally': 'error',
  // [architectural-prevention] Avoid break targets hidden inside nested loops or switches so reviewers can identify which iteration ends.
  'unicorn/no-break-in-nested-loop': 'error',
  // [architectural-prevention] Draw canvases directly when supported so an intermediate image conversion does not add encoding and allocation work.
  'unicorn/no-canvas-to-image': 'error',
  // [architectural-prevention] Declare values after guards that can exit before their use so unnecessary work and available scope stay limited.
  'unicorn/no-declarations-before-early-exit': 'error',
  // [architectural-prevention] Avoid direct document.cookie manipulation because synchronous global cookie reads and writes hide parsing and shared-state obligations.
  'unicorn/no-document-cookie': 'error',
  // [architectural-prevention] Combine adjacent identical branches so future edits do not leave duplicated behavior inconsistent.
  'unicorn/no-duplicate-if-branches': 'error',
  // [architectural-prevention] Avoid map() or filter() immediately before iteration so a loop does not require an extra traversal and temporary array.
  'unicorn/no-duplicate-loops': 'error',
  // [enforcement-integrity] Reject empty source files so an unimplemented module is not mistaken for completed generated work.
  'unicorn/no-empty-file': 'error',
  // [architectural-prevention] Avoid assigning global object properties so module consumers do not share hidden writable state.
  'unicorn/no-global-object-property-assignment': 'error',
  // [architectural-prevention] Combine nested if-only branches to reduce control-flow nesting; core no-lonely-if separately normalizes else-if branches.
  'unicorn/no-lonely-if': 'error',
  // [architectural-prevention] Avoid nested ternaries so reviewers can follow each decision without decoding stacked value branches.
  'unicorn/no-nested-ternary': 'error',
  // [architectural-prevention] Move repeated call wrappers to the function boundary so callers do not duplicate a shared adaptation obligation.
  'unicorn/no-repeated-call-wrappers': 'error',
  // [architectural-prevention] Use module-level functions for static-only behavior so a class does not add a needless ownership and inheritance boundary.
  'unicorn/no-static-only-class': 'error',
  // [architectural-prevention] Keep this within classes so function behavior does not depend on an implicit external calling receiver.
  'unicorn/no-this-outside-of-class': 'error',
  // [architectural-prevention] Avoid writing module-level variables inside functions so calls do not hide changes to shared module state.
  'unicorn/no-top-level-assignment-in-function': 'error',
  // [architectural-prevention] Avoid top-level effects in exported modules so importing a public API does not silently trigger unrelated work or state changes.
  'unicorn/no-top-level-side-effects': 'error',
  // [architectural-prevention] Name transitioned CSS properties so future style changes do not silently add expensive or unintended animations.
  'unicorn/no-transition-all': 'error',
  // [architectural-prevention] Remove parameters with the same value at every known call so functions do not imply variation or coupling their callers never need.
  'unicorn/no-unnecessary-parameters': 'error',
  // [architectural-prevention] Keep loop-source expressions bounded so reviewers can distinguish iterable construction from per-item processing.
  'unicorn/no-unreadable-for-of-expression': 'error',
  // [architectural-prevention] Remove known unused properties so object contracts do not retain state or dependencies no consumer reads.
  'unicorn/no-unused-properties': 'error',
  // [architectural-prevention] Remove else after unconditional exits so remaining code has less nesting; this also covers core no-else-return patterns.
  'unicorn/no-useless-else': 'error',
  // [architectural-prevention] Remove redundant iterator toArray() conversions so immediate consumers do not force avoidable materialization.
  'unicorn/no-useless-iterator-to-array': 'error',
  // [architectural-prevention] Remove overrides that only delegate unchanged behavior so inheritance contracts do not acquire needless maintenance points.
  'unicorn/no-useless-override': 'error',
  // [architectural-prevention] Use loops for recognized simple recursion so repeated work does not consume an unbounded call stack.
  'unicorn/no-useless-recursion': 'error',
  // [architectural-prevention] Avoid reconstructing Set results already returned as Sets so generated code does not allocate redundant collections.
  'unicorn/no-useless-set-construction': 'error',
  // [architectural-prevention] Use AbortSignal.any() to avoid hand-maintained forwarding listeners and their cleanup obligations.
  'unicorn/prefer-abort-signal-any': 'error',
  // [architectural-prevention] Use AbortSignal.timeout() instead of maintaining a controller and timer lifecycle for deadline cancellation.
  'unicorn/prefer-abort-signal-timeout': 'error',
  // [architectural-prevention] Use event listener registration rather than on-properties so one consumer does not overwrite another consumer's handler.
  'unicorn/prefer-add-event-listener': 'error',
  // [architectural-prevention] Use find() or findLast() when only one match is needed to avoid allocating all matches and scanning beyond it.
  'unicorn/prefer-array-find': 'error',
  // [architectural-prevention] Use flatMap() for combined mapping and flattening to avoid an intermediate mapped array.
  'unicorn/prefer-array-flat-map': 'error',
  // [architectural-prevention] Map through Array.from() during construction instead of allocating an intermediate array for a subsequent map().
  'unicorn/prefer-array-from-map': 'error',
  // [architectural-prevention] Use last-oriented lookup methods instead of reversing an array solely to search from its end.
  'unicorn/prefer-array-last-methods': 'error',
  // [architectural-prevention] Use early continue statements to reduce nesting around the remaining loop body.
  'unicorn/prefer-continue': 'error',
  // [architectural-prevention] Use using or await using to make resource ownership and disposal scope explicit instead of hand-maintained cleanup paths.
  'unicorn/prefer-dispose': 'error',
  // [architectural-prevention] Use textContent instead of layout-aware innerText so plain text access does not require rendered-layout computation.
  'unicorn/prefer-dom-node-text-content': 'error',
  // [architectural-prevention] Use early returns to reduce nesting around the remaining function body.
  'unicorn/prefer-early-return': 'error',
  // [architectural-prevention] Move code shared by every branch outside the branches so future edits do not leave duplicated behavior inconsistent.
  'unicorn/prefer-hoisting-branch-code': 'error',
  // [architectural-prevention] Use iterator helpers instead of materializing temporary arrays solely to transform an iterator.
  'unicorn/prefer-iterator-helpers': 'error',
  // [architectural-prevention] Materialize iterator chains at the end so intermediate transformations do not allocate avoidable arrays.
  'unicorn/prefer-iterator-to-array-at-end': 'error',
  // [architectural-prevention] Use observer APIs for recognized layout tracking so scroll or resize handlers do not repeatedly force layout reads.
  'unicorn/prefer-observer-apis': 'error',
  // [architectural-prevention] Use Path2D for repeated drawing so a stable path does not need reconstruction on every draw.
  'unicorn/prefer-path2d': 'error',
  // [architectural-prevention] Use private fields so class ownership is language-enforced rather than implied by a public underscore name.
  'unicorn/prefer-private-class-fields': 'error',
  // [architectural-prevention] Use Set.has() for recognized repeated membership queries to avoid repeated linear array scans.
  'unicorn/prefer-set-has': 'error',
  // [architectural-prevention] Read Set.size directly instead of materializing an array solely to count its elements.
  'unicorn/prefer-set-size': 'error',
  // [architectural-prevention] Combine compatible some() or every() predicates so one membership question does not require repeated array traversals.
  'unicorn/prefer-single-array-predicate': 'error',
  // [architectural-prevention] Combine compatible single-character replacements so the string is not repeatedly scanned and reallocated.
  'unicorn/prefer-single-replace': 'error',
  // [architectural-prevention] Keep bindings in their smallest applicable scope so fewer statements can depend on or alter local state.
  'unicorn/prefer-smaller-scope': 'error',
  // [architectural-prevention] Limit split() when only a prefix is consumed so processing need not allocate every remaining segment.
  'unicorn/prefer-split-limit': 'error',
  // [architectural-prevention] Declare high-frequency listeners passive so the browser need not delay scrolling while waiting for possible cancellation.
  'unicorn/require-passive-events': 'error',
  // [architectural-prevention] One operation per try block is a chosen review ceiling to make the source of a caught failure identifiable, not proof of correct recovery.
  'unicorn/try-complexity': ['error', { max: 1 }],
};

export { unicornArchitectureRules };
