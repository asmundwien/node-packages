/**
@type {import('eslint').Linter.RulesRecord}
*/
const unicornConventionRules = {
  // [standardization] Use element-specific traversal when only elements are intended so reviewers do not infer text or comment node handling.
  'unicorn/better-dom-traversing': 'error',
  // [standardization] Name caught exceptions error so reviewers recognize error-handling bindings consistently across generated modules.
  'unicorn/catch-error-name': 'error',
  // [standardization] Remove empty or punctuation-only comments so reviewers do not mistake placeholders for an explanation.
  'unicorn/comment-content': 'error',
  // [standardization] Use consistent multiline arrow return forms so reviewers can distinguish final values from earlier exits without syntax variation.
  'unicorn/consistent-arrow-return-style': 'error',
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
  // [standardization] Use declarations for named functions and exports, arrows for callbacks, and object methods for properties so each role has one recognizable function form.
  'unicorn/consistent-function-style': ['error', {
    callbacks: 'arrow-function',
    namedExports: 'declaration',
    namedFunctions: 'declaration',
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
  // [standardization] Use dataset for data attributes so generated DOM code follows one attribute naming and access convention.
  'unicorn/dom-node-dataset': 'error',
  // [standardization] Keep empty braces unspaced so equivalent empty objects and blocks have one selected spelling.
  'unicorn/empty-brace-spaces': 'error',
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
  // [standardization] Use logical assignment shorthand for matched updates so conditional self-assignment follows one selected syntax.
  'unicorn/logical-assignment-operators': 'error',
  // [standardization] Expand flagged ambiguous abbreviations in names and paths so reviewers and searches use the same explicit vocabulary.
  'unicorn/name-replacements': 'error',
  // [standardization] Initialize Array.from() through its mapping callback so reviewers see construction and initial values together rather than a subsequent fill().
  'unicorn/no-array-from-fill': 'error',
  // [standardization] Use lexical callback context rather than array method this arguments so reviewers follow one receiver convention.
  'unicorn/no-array-method-this-argument': 'error',
  // [standardization] Omit decorative asterisk prefixes and shared comment indentation so generated prose follows one multiline layout.
  'unicorn/no-asterisk-prefix-in-documentation-comments': 'error',
  // [standardization] Separate awaited values from member access so reviewers can distinguish promise settlement from subsequent property evaluation.
  'unicorn/no-await-expression-member': 'error',
  // [standardization] Keep an existing Blob when file-specific metadata is unused so generated code does not imply a required File contract.
  'unicorn/no-blob-to-file': 'error',
  // [standardization] Use direct key existence operations for recognized dynamic checks so reviewers do not decode indirect computed-property patterns.
  'unicorn/no-computed-property-existence-check': 'error',
  // [standardization] Express single-element replacement directly and resolve insertion indexes explicitly so reviewers do not mistake splice(-1, 0, ...) for appending.
  'unicorn/no-confusing-array-splice': 'error',
  // [standardization] Use explicit nonnegative replacement indexes with Array.with() rather than negative positions or length so reviewers can identify the intended existing element.
  'unicorn/no-confusing-array-with': 'error',
  // [standardization] Let console argument separation supply spacing so diagnostic text does not gain inconsistent leading or trailing spaces.
  'unicorn/no-console-spaces': 'error',
  // [standardization] Combine equivalent comparisons of the same operands so reviewers inspect one relation instead of redundant logical alternatives.
  'unicorn/no-double-comparison': 'error',
  // [standardization] Initialize supported built-in error metadata through construction so reviewers inspect the error contract at its creation site.
  'unicorn/no-error-property-assignment': 'error',
  // [standardization] Use for...of instead of forEach() so generated iteration follows the selected statement-based control-flow convention.
  'unicorn/no-for-each': 'error',
  // [standardization] Use for...of when indexes serve only to retrieve elements so reviewers see values rather than incidental counter mechanics.
  'unicorn/no-for-loop': 'error',
  // [standardization] Construct initial values directly instead of immediately mutating them so reviewers see the complete initial state at declaration.
  'unicorn/no-immediate-mutation': 'error',
  // [standardization] Avoid keyword-like new and class prefixes in flagged identifiers so names do not resemble language syntax during review.
  'unicorn/no-keyword-prefix': 'error',
  // [standardization] Start files without empty lines so generated source has a consistent opening layout.
  'unicorn/no-leading-empty-lines': 'error',
  // [standardization] Name nontrivial flat() depths so reviewers can connect the flattening level to the intended data structure.
  'unicorn/no-magic-array-flat-depth': 'error',
  // [standardization] Leave prose comments unwrapped manually so editing text does not require maintaining arbitrary line breaks.
  'unicorn/no-manually-wrapped-comments': 'error',
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
  // [standardization] Use undefined for internal absence so optional values follow one convention; permit strict external null comparisons for interoperating with external data.
  'unicorn/no-null': 'error',
  // [standardization] Remove comparisons already implied by an equality guard so reviewers inspect only conditions that affect the outcome.
  'unicorn/no-redundant-comparison': 'error',
  // [standardization] Avoid single-element Promise combinators so reviewers do not infer multi-operation coordination where only one promise exists.
  'unicorn/no-single-promise-in-promise-methods': 'error',
  // [standardization] Compare operands directly rather than subtracting against zero so reviewers read the relation without reconstructing arithmetic.
  'unicorn/no-subtraction-comparison': 'error',
  // [standardization] Use lexical receiver access rather than aliasing this so reviewers do not track multiple names for the same receiver.
  'unicorn/no-this-assignment': 'error',
  // [standardization] Compare declared values with undefined directly so absence checks do not disguise themselves as type-name checks.
  'unicorn/no-typeof-undefined': 'error',
  // [standardization] Declare class members explicitly so reviewers can inventory instance state without tracing assignments throughout methods.
  'unicorn/no-undeclared-class-members': 'error',
  // [standardization] Omit flat()'s default depth of one so ordinary shallow flattening has one selected spelling.
  'unicorn/no-unnecessary-array-flat-depth': 'error',
  // [standardization] Use map() when no flattening is needed so reviewers do not infer a nested-array contract that the callback never produces.
  'unicorn/no-unnecessary-array-flat-map': 'error',
  // [standardization] Omit redundant splice counts where supported so full-tail deletion has one recognizable expression.
  'unicorn/no-unnecessary-array-splice-count': 'error',
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
  // [standardization] Use readable IIFE forms so reviewers can distinguish immediate invocation from a function value.
  'unicorn/no-unreadable-iife': 'error',
  // [standardization] Separate confusing constructor expressions so reviewers can identify the constructor and the instance operation.
  'unicorn/no-unreadable-new-expression': 'error',
  // [standardization] Avoid confusing object destructuring forms so reviewers can identify source keys, bindings, and defaults without reconstructing the pattern.
  'unicorn/no-unreadable-object-destructuring': 'error',
  // [standardization] Omit redundant Boolean() in array predicates so reviewers see the predicate itself; core separately covers boolean control contexts.
  'unicorn/no-useless-boolean-cast': 'error',
  // [standardization] Remove coercions of values already in the target type so reviewers do not infer an actual representation change.
  'unicorn/no-useless-coercion': 'error',
  // [standardization] Omit ineffective collection arguments and fallbacks so constructor inputs express actual initial contents.
  'unicorn/no-useless-collection-argument': 'error',
  // [standardization] Combine adjacent literal fragments so reviewers read the resulting text directly rather than reconstructing concatenation.
  'unicorn/no-useless-concat': 'error',
  // [standardization] Remove redundant continue statements so explicit loop exits identify control flow that changes execution.
  'unicorn/no-useless-continue': 'error',
  // [standardization] Delete optional properties directly in matched cases so reviewers do not infer that a redundant existence guard changes behavior.
  'unicorn/no-useless-delete-check': 'error',
  // [standardization] Omit redundant captureStackTrace() calls so manual stack handling identifies cases that actually need customization.
  'unicorn/no-useless-error-capture-stack-trace': 'error',
  // [standardization] Omit object-spread fallbacks that cannot affect the result so reviewers do not infer a required absence-handling branch.
  'unicorn/no-useless-fallback-in-spread': 'error',
  // [standardization] Omit length guards made redundant by the matched array operation so reviewers inspect only conditions that change behavior.
  'unicorn/no-useless-length-check': 'error',
  // [standardization] Remove ineffective boolean operands so reviewers can read the effective logical condition directly.
  'unicorn/no-useless-logical-operand': 'error',
  // [standardization] Return or throw directly in supported async contexts so redundant promise settlement wrappers do not obscure the outcome.
  'unicorn/no-useless-promise-resolve-reject': 'error',
  // [standardization] Omit spreads that add no behavior so reviewers can distinguish necessary iterable expansion from redundant syntax.
  'unicorn/no-useless-spread': 'error',
  // [standardization] Remove switch cases equivalent to the default path so reviewers inspect only branches with distinct behavior.
  'unicorn/no-useless-switch-case': 'error',
  // [standardization] Remove redundant template expressions so reviewers can read literal text without tracing needless interpolation.
  'unicorn/no-useless-template-literals': 'error',
  // [standardization] Omit ineffective explicit undefined values so visible absence handling identifies cases that change the contract.
  'unicorn/no-useless-undefined': 'error',
  // [standardization] Remove redundant decimal zeros so equivalent numbers use one searchable spelling.
  'unicorn/no-zero-fractions': 'error',
  // [standardization] Use consistent numeric prefixes and uppercase hexadecimal digits so literal spelling does not vary across generated files.
  'unicorn/number-literal-case': 'error',
  // [standardization] Group decimal digits by three, binary and octal digits by four, and hexadecimal digits by two so reviewers can compare long literals consistently.
  'unicorn/numeric-separators-style': 'error',
  // [standardization] Use compound assignments, including template string updates, so self-updates have one recognizable form.
  'unicorn/operator-assignment': 'error',
  // [standardization] Omit redundant ./ URL prefixes while retaining meaningful parent and root-relative paths so equivalent URLs have one selected spelling.
  'unicorn/relative-url-style': 'error',
  // [standardization] Pass join() separators explicitly so reviewers need not infer whether the default comma is intentional.
  'unicorn/require-array-join-separator': 'error',
  // [standardization] Remove empty module attributes so import declarations do not imply a loading constraint they never specify.
  'unicorn/require-module-attributes': 'error',
  // [standardization] Require meaningful module specifier lists so empty braces do not disguise a side-effect-only module operation.
  'unicorn/require-module-specifiers': 'error',
  // [standardization] Pass toFixed() digits explicitly so reviewers can see the chosen precision instead of an implicit zero-digit default.
  'unicorn/require-number-to-fixed-digits-argument': 'error',
  // [standardization] Return booleans from boolean Proxy traps so reviewers see the trap contract without relying on truthiness conversion.
  'unicorn/require-proxy-trap-boolean-return': 'error',
  // [standardization] Expand block comments to multiline form so generated explanations follow one comment layout.
  'unicorn/single-line-block-comment-style': 'error',
  // [standardization] Put case exit statements in a consistent position so reviewers can scan switch control flow without layout variations.
  'unicorn/switch-case-break-position': 'error',
  // [standardization] Normalize known dedent, GraphQL, SQL, HTML, and styled templates so embedded source follows a consistent indentation convention.
  'unicorn/template-indent': 'error',
  // [standardization] Use lowercase encoding names without optional dashes so equivalent encodings have one searchable spelling.
  'unicorn/text-encoding-identifier-case': 'error',
  // [standardization] Use new for error construction so thrown error objects follow the same visible construction convention as other instances.
  'unicorn/throw-new-error': 'error',
};

export { unicornConventionRules };
