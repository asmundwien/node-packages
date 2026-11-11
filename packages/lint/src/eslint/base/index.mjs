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
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
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
      // Require a getter for each setter so properties support both reading and writing.
      'accessor-pairs': 'error',
      // Require return values from array transformations so callbacks do not silently produce undefined.
      'array-callback-return': 'error',
      // Keep variable use inside its declaring block to prevent accidental scope leakage.
      'block-scoped-var': 'error',
      // Use camelCase identifiers so declarations and references follow one source naming convention.
      'camelcase': 'error',
      // Start comments with capital letters so prose follows sentence capitalization.
      'capitalized-comments': 'error',
      // Keep instance methods dependent on their instance rather than hiding standalone functions in classes.
      'class-methods-use-this': 'error',
      // Limit each function to cyclomatic complexity 20 so branching remains reviewable.
      'complexity': ['error', 20],
      // Require return statements to either always or never specify values.
      'consistent-return': 'error',
      // Require super() calls in constructors.
      'constructor-super': 'error',
      // Require braces for every control statement so added statements cannot escape its branch.
      'curly': 'error',
      // Require default cases in switch statements.
      'default-case': 'error',
      // Put the default branch last so switch cases have a predictable order.
      'default-case-last': 'error',
      // Put defaulted parameters last so callers can omit them without placeholder arguments.
      'default-param-last': 'error',
      // Use dot access for identifier keys so property access does not hide simple names in strings.
      'dot-notation': 'error',
      // Require strict equality so coercion cannot change comparison results.
      'eqeqeq': 'error',
      // Reject loop updates that move the counter away from its stopping condition.
      'for-direction': 'error',
      // Match function expression names to their assigned identifiers so stack traces identify the binding.
      'func-name-matching': 'error',
      // Name function expressions that remain after the callback-arrow policy so stack traces identify them.
      'func-names': 'error',
      // Require getters to return a value on every reachable path.
      'getter-return': 'error',
      // Keep each getter and setter adjacent so the complete property contract can be reviewed together.
      'grouped-accessor-pairs': 'error',
      // Require for-in loops to include an if statement.
      'guard-for-in': 'error',
      // Require at least two characters in identifiers and property names to reject opaque single-letter names.
      'id-length': ['error', { min: 2 }],
      // Initialize declarations so the first value is explicit at the declaration.
      'init-declarations': 'error',
      // Limit modules to one class so class responsibilities have separate files.
      'max-classes-per-file': ['error', 1],
      // Limit block nesting to four levels so control flow remains reviewable.
      'max-depth': ['error', 4],
      // Limit files to 300 lines, including comments and blanks, so modules stay bounded.
      'max-lines': ['error', 300],
      // Limit functions to 50 lines, including comments and blanks, so responsibilities remain bounded.
      'max-lines-per-function': ['error', 50],
      // Limit callback nesting to ten levels so callback control flow has a fixed ceiling.
      'max-nested-callbacks': ['error', 10],
      // Limit functions to three parameters so callers do not depend on long positional argument lists.
      'max-params': ['error', 3],
      // Limit functions to ten statements so each function has a bounded responsibility.
      'max-statements': ['error', 10],
      // Require constructor names to begin with a capital letter.
      'new-cap': 'error',
      // Reject the use of alert, confirm, and prompt.
      'no-alert': 'error',
      // Reject Array constructors.
      'no-array-constructor': 'error',
      // Reject using an async function as a Promise executor.
      'no-async-promise-executor': 'error',
      // Reject bitwise operators.
      'no-bitwise': 'error',
      // Reject the use of arguments.caller or arguments.callee.
      'no-caller': 'error',
      // Reject lexical declarations in case clauses.
      'no-case-declarations': 'error',
      // Reject reassigning class members.
      'no-class-assign': 'error',
      // Reject comparing against -0.
      'no-compare-neg-zero': 'error',
      // Reject assignment operators in conditional expressions.
      'no-cond-assign': 'error',
      // Reject the use of console.
      'no-console': 'error',
      // Reject reassigning const, using, and await using variables.
      'no-const-assign': 'error',
      // Reject expressions where the operation doesn't affect the value.
      'no-constant-binary-expression': 'error',
      // Reject constant expressions in conditions.
      'no-constant-condition': 'error',
      // Reject returning value from constructor.
      'no-constructor-return': 'error',
      // Reject raw and hexadecimal control characters in regexes while permitting named control escapes.
      'no-control-regex': 'error',
      // Reject the use of debugger.
      'no-debugger': 'error',
      // Reject deleting variables.
      'no-delete-var': 'error',
      // Reject equal signs explicitly at the beginning of regular expressions.
      'no-div-regex': 'error',
      // Reject duplicate arguments in function definitions.
      'no-dupe-args': 'error',
      // Reject duplicate class members.
      'no-dupe-class-members': 'error',
      // Reject duplicate conditions in if-else-if chains.
      'no-dupe-else-if': 'error',
      // Reject duplicate keys in object literals.
      'no-dupe-keys': 'error',
      // Reject duplicate case labels.
      'no-duplicate-case': 'error',
      // Reject empty block statements.
      'no-empty': 'error',
      // Reject empty functions.
      'no-empty-function': 'error',
      // Reject empty destructuring patterns.
      'no-empty-pattern': 'error',
      // Reject empty static blocks.
      'no-empty-static-block': 'error',
      // Reject null comparisons without type-checking operators.
      'no-eq-null': 'error',
      // Reject the use of eval().
      'no-eval': 'error',
      // Reject reassigning exceptions in catch clauses.
      'no-ex-assign': 'error',
      // Reject extending native types.
      'no-extend-native': 'error',
      // Reject unnecessary calls to .bind().
      'no-extra-bind': 'error',
      // Reject unnecessary boolean casts.
      'no-extra-boolean-cast': 'error',
      // Reject unnecessary labels.
      'no-extra-label': 'error',
      // Reject accidental switch fallthrough; intentional fallthrough must have an explanatory comment.
      'no-fallthrough': 'error',
      // Reject reassigning function declarations.
      'no-func-assign': 'error',
      // Reject assignments to native objects or read-only global variables.
      'no-global-assign': 'error',
      // Use explicit conversions instead of boolean, numeric, or string coercion shortcuts.
      'no-implicit-coercion': 'error',
      // Reject declarations in the global scope.
      'no-implicit-globals': 'error',
      // Reject the use of eval()-like methods.
      'no-implied-eval': 'error',
      // Reject assigning to imported bindings.
      'no-import-assign': 'error',
      // Put comments on separate lines so statements and explanations have separate edits.
      'no-inline-comments': 'error',
      // Reject variable or function declarations in nested blocks.
      'no-inner-declarations': 'error',
      // Reject use of this in contexts where the value of this is undefined.
      'no-invalid-this': 'error',
      // Reject irregular whitespace.
      'no-irregular-whitespace': 'error',
      // Reject the use of the __iterator__ property.
      'no-iterator': 'error',
      // Reject labels that share a name with a variable.
      'no-label-var': 'error',
      // Reject labeled statements.
      'no-labels': 'error',
      // Reject unnecessary nested blocks.
      'no-lone-blocks': 'error',
      // Reject if statements as the only statement in else blocks.
      'no-lonely-if': 'error',
      // Reject function declarations that contain unsafe references inside loop statements.
      'no-loop-func': 'error',
      // Reject literal numbers that lose precision.
      'no-loss-of-precision': 'error',
      // Name numeric values with const bindings; permit named object values, -1/0/1, indexes, defaults, enum values, and numeric type positions.
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
      // Reject use of chained assignment expressions.
      'no-multi-assign': 'error',
      // Reject multiline strings.
      'no-multi-str': 'error',
      // Reject new operators outside of assignments or comparisons.
      'no-new': 'error',
      // Reject new operators with the Function object.
      'no-new-func': 'error',
      // Reject new operators with global non-constructor functions.
      'no-new-native-nonconstructor': 'error',
      // Reject new operators with the String, Number, and Boolean objects.
      'no-new-wrappers': 'error',
      // Reject \8 and \9 escape sequences in string literals.
      'no-nonoctal-decimal-escape': 'error',
      // Reject calling global object properties as functions.
      'no-obj-calls': 'error',
      // Reject calls to the Object constructor without an argument.
      'no-object-constructor': 'error',
      // Reject octal literals.
      'no-octal': 'error',
      // Reject octal escape sequences in string literals.
      'no-octal-escape': 'error',
      // Reject parameter rebinding and property writes so functions cannot mutate caller-owned inputs through parameters.
      'no-param-reassign': ['error', { props: true }],
      // Reject the unary operators ++ and --.
      'no-plusplus': 'error',
      // Reject returning values from Promise executor functions.
      'no-promise-executor-return': 'error',
      // Reject the use of the __proto__ property.
      'no-proto': 'error',
      // Reject calling some Object.prototype methods directly on objects.
      'no-prototype-builtins': 'error',
      // Reject variable redeclaration.
      'no-redeclare': 'error',
      // Reject multiple spaces in regular expressions.
      'no-regex-spaces': 'error',
      // Use Vitest for unit and integration tests; reject Node, Bun, Jest, Mocha, Ava, Tape, and uvu runner imports and subpaths.
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
      // Reject assignment operators in return statements.
      'no-return-assign': 'error',
      // Reject javascript: URLs.
      'no-script-url': 'error',
      // Reject assignments where both sides are exactly the same.
      'no-self-assign': 'error',
      // Reject comparisons where both sides are exactly the same.
      'no-self-compare': 'error',
      // Reject comma operators.
      'no-sequences': 'error',
      // Reject returning values from setters.
      'no-setter-return': 'error',
      // Reject variable declarations from shadowing variables declared in the outer scope.
      'no-shadow': 'error',
      // Reject identifiers from shadowing restricted names.
      'no-shadow-restricted-names': 'error',
      // Reject sparse arrays.
      'no-sparse-arrays': 'error',
      // Reject template literal placeholder syntax in regular strings.
      'no-template-curly-in-string': 'error',
      // Reject this/super before calling super() in constructors.
      'no-this-before-super': 'error',
      // Reject throwing literals as exceptions.
      'no-throw-literal': 'error',
      // Reject let or var variables that are read but never assigned.
      'no-unassigned-vars': 'error',
      // Reject the use of undeclared variables unless mentioned in /*global */ comments.
      'no-undef': 'error',
      // Reject initializing variables to undefined.
      'no-undef-init': 'error',
      // Reject underscore-prefixed source bindings; use real private fields rather than public-name conventions.
      'no-underscore-dangle': 'error',
      // Reject confusing multiline expressions.
      'no-unexpected-multiline': 'error',
      // Reject unmodified loop conditions.
      'no-unmodified-loop-condition': 'error',
      // Reject ternary operators when simpler alternatives exist.
      'no-unneeded-ternary': 'error',
      // Reject unreachable code after return, throw, continue, and break statements.
      'no-unreachable': 'error',
      // Reject loops with a body that allows only one iteration.
      'no-unreachable-loop': 'error',
      // Reject control flow statements in finally blocks.
      'no-unsafe-finally': 'error',
      // Reject negating the left operand of relational operators.
      'no-unsafe-negation': 'error',
      // Reject use of optional chaining in contexts where the undefined value is not allowed.
      'no-unsafe-optional-chaining': 'error',
      // Reject unused expressions.
      'no-unused-expressions': 'error',
      // Reject unused labels.
      'no-unused-labels': 'error',
      // Reject unused private class members.
      'no-unused-private-class-members': 'error',
      // Reject unused bindings and caught errors so dead values and ignored exceptions do not remain.
      'no-unused-vars': 'error',
      // Reject the use of variables before they are defined.
      'no-use-before-define': 'error',
      // Reject variable assignments when the value is not used.
      'no-useless-assignment': 'error',
      // Reject unnecessary calls to .call() and .apply().
      'no-useless-call': 'error',
      // Reject unnecessary catch clauses.
      'no-useless-catch': 'error',
      // Reject unnecessary computed property keys in objects and classes.
      'no-useless-computed-key': 'error',
      // Reject unnecessary constructors.
      'no-useless-constructor': 'error',
      // Reject unnecessary escape characters.
      'no-useless-escape': 'error',
      // Reject renaming import, export, and destructured assignments to the same name.
      'no-useless-rename': 'error',
      // Reject redundant return statements.
      'no-useless-return': 'error',
      // Require let or const instead of var.
      'no-var': 'error',
      // Allow standalone void statements for deliberately discarded return values, not inside value expressions.
      'no-void': ['error', { allowAsStatement: true }],
      // Reject TODO, FIXME, and XXX reminders at comment starts so unfinished work cannot pass CI.
      'no-warning-comments': 'error',
      // Reject with statements.
      'no-with': 'error',
      // Require or disallow method and property shorthand syntax for object literals.
      'object-shorthand': 'error',
      // Declare one binding per declaration so each variable has an independent initializer and edit.
      'one-var': ['error', 'never'],
      // Use arrows for callbacks that do not require their own this; named source functions remain declarations.
      'prefer-arrow-callback': 'error',
      // Require const declarations for variables that are never reassigned after declared.
      'prefer-const': 'error',
      // Use destructuring for array and object extraction so binding names and source structure are explicit.
      'prefer-destructuring': 'error',
      // Reject the use of Math.pow in favor of the ** operator.
      'prefer-exponentiation-operator': 'error',
      // Name regex capture groups so consumers do not depend on unexplained capture positions.
      'prefer-named-capture-group': 'error',
      // Reject parseInt() and Number.parseInt() in favor of binary, octal, and hexadecimal literals.
      'prefer-numeric-literals': 'error',
      // Use Object.hasOwn() so own-property checks do not borrow or call a shadowed instance method.
      'prefer-object-has-own': 'error',
      // Use object spread instead of Object.assign() into a fresh object so copying is explicit and non-mutating.
      'prefer-object-spread': 'error',
      // Require using Error objects as Promise rejection reasons.
      'prefer-promise-reject-errors': 'error',
      // Reject use of the RegExp constructor in favor of regular expression literals.
      'prefer-regex-literals': 'error',
      // Require rest parameters instead of arguments.
      'prefer-rest-params': 'error',
      // Require spread operators instead of .apply().
      'prefer-spread': 'error',
      // Require template literals instead of string concatenation.
      'prefer-template': 'error',
      // Reject losing originally caught error when re-throwing custom errors.
      'preserve-caught-error': 'error',
      // Specify parseInt() radix so numeric interpretation does not depend on the input prefix.
      'radix': 'error',
      // Reject assignments and property writes whose value can become stale across an await or yield.
      'require-atomic-updates': 'error',
      // Reject async functions which have no await expression.
      'require-await': 'error',
      // Require u or v regex flags so patterns use Unicode-aware matching.
      'require-unicode-regexp': 'error',
      // Require generator functions to contain yield.
      'require-yield': 'error',
      // Require object keys to be sorted.
      'sort-keys': 'error',
      // Require symbol descriptions.
      'symbol-description': 'error',
      // Require or disallow Unicode byte order mark (BOM).
      'unicode-bom': 'error',
      // Require calls to isNaN() when checking for NaN.
      'use-isnan': 'error',
      // Compare typeof results only with valid result strings so impossible type checks fail.
      'valid-typeof': 'error',
      // Put the value before the comparison constant so comparisons follow the normal reading order.
      'yoda': 'error',

      // Use element-specific traversal APIs when text and comment nodes are not intended.
      'unicorn/better-dom-traversing': 'error',
      // Name caught exceptions error so error-handling bindings use one recognizable name.
      'unicorn/catch-error-name': 'error',
      // Use this in static methods so subclass calls refer to the receiving class.
      'unicorn/class-reference-in-static-methods': 'error',
      // Reject empty or placeholder punctuation comments because they do not explain code.
      'unicorn/comment-content': 'error',
      // Keep multiline arrow return syntax consistent so early returns do not obscure the final result.
      'unicorn/consistent-arrow-return-style': 'error',
      // Use strict Node assertions so equality checks do not coerce values.
      'unicorn/consistent-assert': 'error',
      // Require boolean prefixes for variables, arguments, and functions; leave methods and fields outside this naming check.
      'unicorn/consistent-boolean-name': 'error',
      // Order static fields, blocks, and methods before instance fields, constructors, and methods; place private members before public peers.
      'unicorn/consistent-class-member-order': 'error',
      // Use the standard spelling of compound words so equivalent names do not vary across modules.
      'unicorn/consistent-compound-words': 'error',
      // Use logical expressions for conditional object spreads instead of empty-object ternary branches.
      'unicorn/consistent-conditional-object-spread': 'error',
      // Pass the existing Date directly to its constructor when cloning to avoid an unnecessary timestamp conversion.
      'unicorn/consistent-date-clone': 'error',
      // Do not mix destructured access and repeated property access to the same object.
      'unicorn/consistent-destructuring': 'error',
      // Use the same iterable type in populated and empty conditional array-spread branches.
      'unicorn/consistent-empty-array-spread': 'error',
      // Use consistent index comparisons for existence checks so missing-item sentinel handling is explicit.
      'unicorn/consistent-existence-index-check': 'error',
      // Place decorators above export declarations so decorated classes follow one declaration order.
      'unicorn/consistent-export-decorator-position': 'error',
      // Move functions that do not capture enclosing values out of that scope, including arrows.
      'unicorn/consistent-function-scoping': 'error',
      // Use declarations for named functions and named exports, arrows for callbacks, and methods for object properties.
      'unicorn/consistent-function-style': ['error', {
        namedFunctions: 'declaration',
        namedExports: 'declaration',
        callbacks: 'arrow-function',
        objectProperties: 'method',
      }],
      // Read JSON files as strings before JSON.parse() so decoding is explicit.
      'unicorn/consistent-json-file-read': 'error',
      // Use one optional-chain expression for same-base access instead of duplicated existence guards.
      'unicorn/consistent-optional-chaining': 'error',
      // Escape template interpolation markers consistently so literal placeholders stay literal.
      'unicorn/consistent-template-literal-escape': 'error',
      // Label tuple elements consistently so positional type contracts do not mix named and unnamed positions.
      'unicorn/consistent-tuple-labels': 'error',
      // Define Error subclasses with correct names and constructors so stack traces identify the actual error type.
      'unicorn/custom-error-definition': 'error',
      // Use dataset for DOM data attributes so attribute names and property access stay consistent.
      'unicorn/dom-node-dataset': 'error',
      // Keep empty brace pairs unspaced so empty objects and blocks use one spelling.
      'unicorn/empty-brace-spaces': 'error',
      // Supply a message when creating built-in errors so failures explain what went wrong.
      'unicorn/error-message': 'error',
      // Use uppercase hexadecimal escape digits so equivalent escapes have one spelling.
      'unicorn/escape-case': 'error',
      // Compare length and size explicitly so zero and nonzero collection checks state their intent.
      'unicorn/explicit-length-check': 'error',
      // Pass timer delays explicitly so immediate scheduling is not hidden in an omitted argument.
      'unicorn/explicit-timer-delay': 'error',
      // Use kebab-case filenames and directory names so source paths follow one naming convention.
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      // Use default imports for chalk and node:path, and named imports for node:util, to match their module APIs.
      'unicorn/import-style': 'error',
      // Prevent usage of variables from outside the scope of isolated functions.
      'unicorn/isolated-functions': 'error',
      // Guard optional loop sources instead of allocating empty fallback collections.
      'unicorn/iteration-fallback-style': 'error',
      // Require or disallow logical assignment operator shorthand.
      'unicorn/logical-assignment-operators': 'error',
      // Limit nested call depth to three so evaluation order can be reviewed without expanding an expression.
      'unicorn/max-nested-calls': ['error', { max: 3 }],
      // Expand ambiguous abbreviations in variables, properties, and filenames so names state what they hold.
      'unicorn/name-replacements': 'error',
      // Use new only for built-ins that construct objects so call syntax matches runtime semantics.
      'unicorn/new-for-builtins': 'error',
      // Reject recursive access to this within getters and setters.
      'unicorn/no-accessor-recursion': 'error',
      // Reject bitwise operators where a logical operator was likely intended.
      'unicorn/no-accidental-bitwise-operator': 'error',
      // Prevent passing a function reference directly to iterator methods.
      'unicorn/no-array-callback-reference': 'error',
      // Reject array accumulation with Array#concat() in loops.
      'unicorn/no-array-concat-in-loop': 'error',
      // Reject using reference values as Array#fill() values.
      'unicorn/no-array-fill-with-reference-type': 'error',
      // Reject .fill() after Array.from({length: ...}).
      'unicorn/no-array-from-fill': 'error',
      // Reject front-of-array mutation.
      'unicorn/no-array-front-mutation': 'error',
      // Reject using the this argument in array methods.
      'unicorn/no-array-method-this-argument': 'error',
      // Reject Array#reduce() and Array#reduceRight().
      'unicorn/no-array-reduce': 'error',
      // Use Array#toReversed() over Array#reverse().
      'unicorn/no-array-reverse': 'error',
      // Use Array#toSorted() over Array#sort().
      'unicorn/no-array-sort': 'error',
      // Reject sorting arrays to get the minimum or maximum value.
      'unicorn/no-array-sort-for-min-max': 'error',
      // Use Array#toSpliced() over Array#splice().
      'unicorn/no-array-splice': 'error',
      // Reject asterisk prefixes and shared indentation in multiline comments.
      'unicorn/no-asterisk-prefix-in-documentation-comments': 'error',
      // Reject asynchronous callbacks in synchronous iterator helpers.
      'unicorn/no-async-iterator-callback': 'error',
      // Reject async functions as Promise#finally() callbacks.
      'unicorn/no-async-promise-finally': 'error',
      // Reject member access from await expression.
      'unicorn/no-await-expression-member': 'error',
      // Reject using await in Promise method parameters.
      'unicorn/no-await-in-promise-methods': 'error',
      // Reject unnecessary Blob to File conversion.
      'unicorn/no-blob-to-file': 'error',
      // Reject boolean-returning sort comparators.
      'unicorn/no-boolean-sort-comparator': 'error',
      // Reject break and optionally continue in nested loops and switches inside loops.
      'unicorn/no-break-in-nested-loop': 'error',
      // Use drawing canvases directly instead of converting them to images.
      'unicorn/no-canvas-to-image': 'error',
      // Reject chained comparisons such as a < b < c.
      'unicorn/no-chained-comparison': 'error',
      // Reject accessing Map, Set, WeakMap, and WeakSet entries with bracket notation.
      'unicorn/no-collection-bracket-access': 'error',
      // Reject dynamic object property existence checks.
      'unicorn/no-computed-property-existence-check': 'error',
      // Reject conflicting CSS query and HTML form constraints.
      'unicorn/no-conflicting-constraints': 'error',
      // Reject confusing uses of Array#{splice,toSpliced}().
      'unicorn/no-confusing-array-splice': 'error',
      // Reject confusing uses of Array#with().
      'unicorn/no-confusing-array-with': 'error',
      // Do not use leading/trailing space between console.log parameters.
      'unicorn/no-console-spaces': 'error',
      // Reject arithmetic and bitwise operations that always evaluate to 0.
      'unicorn/no-constant-zero-expression': 'error',
      // Reject declarations before conditional early exits when they are only used after the exit.
      'unicorn/no-declarations-before-early-exit': 'error',
      // Do not use document.cookie directly.
      'unicorn/no-document-cookie': 'error',
      // Reject two comparisons of the same operands that can be combined into one.
      'unicorn/no-double-comparison': 'error',
      // Reject duplicate adjacent branches in if chains.
      'unicorn/no-duplicate-if-branches': 'error',
      // Reject adjacent duplicate operands in logical expressions.
      'unicorn/no-duplicate-logical-operands': 'error',
      // Reject .map() and .filter() in for...of and for await...of loop headers.
      'unicorn/no-duplicate-loops': 'error',
      // Reject duplicate values in Set constructor array literals.
      'unicorn/no-duplicate-set-values': 'error',
      // Reject empty files.
      'unicorn/no-empty-file': 'error',
      // Reject assigning to built-in error properties.
      'unicorn/no-error-property-assignment': 'error',
      // Reject exports in scripts.
      'unicorn/no-exports-in-scripts': 'error',
      // Use for...of over the forEach method.
      'unicorn/no-for-each': 'error',
      // Do not use a for loop that can be replaced with a for-of loop.
      'unicorn/no-for-loop': 'error',
      // Reject assigning properties on the global object.
      'unicorn/no-global-object-property-assignment': 'error',
      // Reject immediate mutation after assignment and initialization immediately after declaration.
      'unicorn/no-immediate-mutation': 'error',
      // Reject impossible comparisons against .length or .size.
      'unicorn/no-impossible-length-comparison': 'error',
      // Reject class accessors that hide an inherited getter or setter.
      'unicorn/no-incomplete-accessor-override': 'error',
      // Reject incorrect querySelector() and querySelectorAll() usage.
      'unicorn/no-incorrect-query-selector': 'error',
      // Reject incorrect template literal interpolation syntax.
      'unicorn/no-incorrect-template-string-interpolation': 'error',
      // Reject ineffective CSP directives in <meta> elements.
      'unicorn/no-ineffective-csp-directives': 'error',
      // Reject instanceof with built-in objects.
      'unicorn/no-instanceof-builtins': 'error',
      // Reject calling functions and constructors with an invalid number of arguments.
      'unicorn/no-invalid-argument-count': 'error',
      // Reject invalid values for HTML boolean attributes.
      'unicorn/no-invalid-boolean-attribute-value': 'error',
      // Reject comparing a single character from a string to a multi-character string.
      'unicorn/no-invalid-character-comparison': 'error',
      // Reject invalid DOM tokens.
      'unicorn/no-invalid-dom-token': 'error',
      // Reject invalid options in fetch() and new Request().
      'unicorn/no-invalid-fetch-options': 'error',
      // Reject invalid accept values on file inputs.
      'unicorn/no-invalid-file-input-accept': 'error',
      // Reject invalid subresource integrity metadata.
      'unicorn/no-invalid-integrity': 'error',
      // Reject invalid or ignored Intl options.
      'unicorn/no-invalid-intl-options': 'error',
      // Reject invalid property descriptors.
      'unicorn/no-invalid-property-descriptor': 'error',
      // Prevent calling EventTarget#removeEventListener() with the result of an expression.
      'unicorn/no-invalid-remove-event-listener': 'error',
      // Reject invalid options in new Response(), Response.json(), and Response.redirect().
      'unicorn/no-invalid-response-options': 'error',
      // Reject invalid arguments to CSSStyleDeclaration#setProperty().
      'unicorn/no-invalid-style-set-property': 'error',
      // Reject statically known invalid Temporal arithmetic.
      'unicorn/no-invalid-temporal-arithmetic': 'error',
      // Reject invalid protocol strings in comparisons with URL#protocol.
      'unicorn/no-invalid-url-protocol-comparison': 'error',
      // Reject invalid implementations of well-known symbol methods.
      'unicorn/no-invalid-well-known-symbol-methods': 'error',
      // Reject identifiers starting with new or class.
      'unicorn/no-keyword-prefix': 'error',
      // Reject accessing event.currentTarget after the synchronous event dispatch has finished.
      'unicorn/no-late-current-target-access': 'error',
      // Reject event-control method calls after the synchronous event dispatch has finished.
      'unicorn/no-late-event-control': 'error',
      // Reject empty lines at the beginning of a file.
      'unicorn/no-leading-empty-lines': 'error',
      // Combine nested if-only branches; core no-lonely-if separately normalizes else-if branches.
      'unicorn/no-lonely-if': 'error',
      // Reject mutating a loop iterable during iteration.
      'unicorn/no-loop-iterable-mutation': 'error',
      // Reject a magic number as the depth argument in Array#flat(...)..
      'unicorn/no-magic-array-flat-depth': 'error',
      // Reject manually wrapped comments.
      'unicorn/no-manually-wrapped-comments': 'error',
      // Reject checking a Map key before accessing a different key.
      'unicorn/no-mismatched-map-key': 'error',
      // Reject misrefactored compound assignments where the target is duplicated in the right-hand side.
      'unicorn/no-misrefactored-assignment': 'error',
      // Reject references to missing local resources.
      'unicorn/no-missing-local-resource': 'error',
      // Reject calling Promise executor resolver functions more than once on the same execution path.
      'unicorn/no-multiple-promise-resolver-calls': 'error',
      // Reject named usage of default import and export.
      'unicorn/no-named-default': 'error',
      // Reject negated array predicate calls.
      'unicorn/no-negated-array-predicate': 'error',
      // Reject negated comparisons.
      'unicorn/no-negated-comparison': 'error',
      // Reject negated conditions.
      'unicorn/no-negated-condition': 'error',
      // Reject negated expression in equality check.
      'unicorn/no-negation-in-equality-check': 'error',
      // Reject nested ternary expressions.
      'unicorn/no-nested-ternary': 'error',
      // Reject single-argument new Array() and its hole-producing ambiguity; core covers other constructor forms.
      'unicorn/no-new-array': 'error',
      // Require the use of Buffer.from() and Buffer.alloc() instead of the deprecated new Buffer().
      'unicorn/no-new-buffer': 'error',
      // Reject non-standard properties on built-in objects.
      'unicorn/no-nonstandard-builtin-properties': 'error',
      // Use undefined for internal absence rather than null; permit strict comparisons with external null values.
      'unicorn/no-null': 'error',
      // Reject the use of objects as default parameters.
      'unicorn/no-object-as-default-parameter': 'error',
      // Reject Object methods with Map or Set.
      'unicorn/no-object-methods-with-collections': 'error',
      // Reject optional chaining on undeclared variables.
      'unicorn/no-optional-chaining-on-undeclared-variable': 'error',
      // Reject ineffective preventDefault() calls in passive event listeners.
      'unicorn/no-prevent-default-in-passive-listener': 'error',
      // Reject process.exit().
      'unicorn/no-process-exit': 'error',
      // Reject comparisons made redundant by an equality check in the same logical AND.
      'unicorn/no-redundant-comparison': 'error',
      // Reject repeating the same wrapper at every call to a function.
      'unicorn/no-repeated-call-wrappers': 'error',
      // Reject using the return value of Array#push() and Array#unshift().
      'unicorn/no-return-array-push': 'error',
      // Reject selector syntax in DOM names.
      'unicorn/no-selector-as-dom-name': 'error',
      // Reject shorthand properties that override related longhand properties.
      'unicorn/no-shorthand-property-overrides': 'error',
      // Reject passing single-element arrays to Promise methods.
      'unicorn/no-single-promise-in-promise-methods': 'error',
      // Reject classes that only have static members.
      'unicorn/no-static-only-class': 'error',
      // Use comparing values directly over subtracting and comparing to 0.
      'unicorn/no-subtraction-comparison': 'error',
      // Reject then property.
      'unicorn/no-thenable': 'error',
      // Reject assigning this to a variable.
      'unicorn/no-this-assignment': 'error',
      // Reject this outside of classes.
      'unicorn/no-this-outside-of-class': 'error',
      // Reject assigning to top-level variables from inside functions.
      'unicorn/no-top-level-assignment-in-function': 'error',
      // Reject top-level side effects in exported modules.
      'unicorn/no-top-level-side-effects': 'error',
      // Reject all as a transition property.
      'unicorn/no-transition-all': 'error',
      // Reject comparing undefined using typeof.
      'unicorn/no-typeof-undefined': 'error',
      // Reject referencing methods without calling them.
      'unicorn/no-uncalled-method': 'error',
      // Require class members to be declared.
      'unicorn/no-undeclared-class-members': 'error',
      // Reject using 1 as the depth argument of Array#flat().
      'unicorn/no-unnecessary-array-flat-depth': 'error',
      // Reject unnecessary use of Array#flatMap().
      'unicorn/no-unnecessary-array-flat-map': 'error',
      // Reject using .length or Infinity as the deleteCount or skipCount argument of Array#{splice,toSpliced}().
      'unicorn/no-unnecessary-array-splice-count': 'error',
      // Reject awaiting non-promise values.
      'unicorn/no-unnecessary-await': 'error',
      // Reject unnecessary comparisons against boolean literals.
      'unicorn/no-unnecessary-boolean-comparison': 'error',
      // Reject arguments that match their parameter defaults.
      'unicorn/no-unnecessary-default-arguments': 'error',
      // Reject unnecessary options in fetch() and new Request().
      'unicorn/no-unnecessary-fetch-options': 'error',
      // Reject unnecessary globalThis references.
      'unicorn/no-unnecessary-global-this': 'error',
      // Reject unnecessary nested ternary expressions.
      'unicorn/no-unnecessary-nested-ternary': 'error',
      // Reject parameters that receive the same value at every call.
      'unicorn/no-unnecessary-parameters': 'error',
      // Require the use of built-in methods instead of unnecessary polyfills.
      'unicorn/no-unnecessary-polyfills': 'error',
      // Reject using .length or Infinity as the end argument of {Array,String,TypedArray}#slice().
      'unicorn/no-unnecessary-slice-end': 'error',
      // Reject Array#splice() when simpler alternatives exist.
      'unicorn/no-unnecessary-splice': 'error',
      // Reject String#trim() before String#startsWith() or String#endsWith().
      'unicorn/no-unnecessary-string-trim': 'error',
      // Reject unreadable array destructuring.
      'unicorn/no-unreadable-array-destructuring': 'error',
      // Reject unreadable iterable expressions in for...of and for await...of loop headers.
      'unicorn/no-unreadable-for-of-expression': 'error',
      // Reject unreadable IIFEs.
      'unicorn/no-unreadable-iife': 'error',
      // Reject unreadable new expressions.
      'unicorn/no-unreadable-new-expression': 'error',
      // Reject unreadable object destructuring.
      'unicorn/no-unreadable-object-destructuring': 'error',
      // Prevent unsafe use of ArrayBuffer view .buffer.
      'unicorn/no-unsafe-buffer-conversion': 'error',
      // Reject unsafe DOM HTML APIs.
      'unicorn/no-unsafe-dom-html': 'error',
      // Reject known values that JSON serialization cannot represent faithfully.
      'unicorn/no-unsafe-json-serialization': 'error',
      // Reject reading .value from Promise.allSettled() results without a fulfilled status guard.
      'unicorn/no-unsafe-promise-all-settled-values': 'error',
      // Reject unsafe values as property keys.
      'unicorn/no-unsafe-property-key': 'error',
      // Reject interpolation into SQL strings passed to Node’s node:sqlite APIs.
      'unicorn/no-unsafe-sqlite-interpolation': 'error',
      // Reject non-literal replacement values in String#replace() and String#replaceAll().
      'unicorn/no-unsafe-string-replacement': 'error',
      // Reject ignoring the return value of selected built-in methods.
      'unicorn/no-unused-builtin-method-return': 'error',
      // Reject discarding lazy iterator helpers.
      'unicorn/no-unused-iterator-helper': 'error',
      // Reject unused object properties.
      'unicorn/no-unused-properties': 'error',
      // Reject passing full URLs to URLSearchParams.
      'unicorn/no-url-in-search-params': 'error',
      // Remove Boolean() in array predicate callbacks; core separately covers boolean control contexts.
      'unicorn/no-useless-boolean-cast': 'error',
      // Reject useless type coercions of values that are already of the target type.
      'unicorn/no-useless-coercion': 'error',
      // Reject useless values or fallbacks in Set, Map, WeakSet, or WeakMap.
      'unicorn/no-useless-collection-argument': 'error',
      // Reject useless compound assignments such as x += 0.
      'unicorn/no-useless-compound-assignment': 'error',
      // Combine literal string and template fragments; this also covers core no-useless-concat patterns.
      'unicorn/no-useless-concat': 'error',
      // Reject useless continue statements.
      'unicorn/no-useless-continue': 'error',
      // Reject unnecessary existence checks before deletion.
      'unicorn/no-useless-delete-check': 'error',
      // Remove else after return, throw, break, or continue; this also covers core no-else-return patterns.
      'unicorn/no-useless-else': 'error',
      // Reject unnecessary Error.captureStackTrace(...).
      'unicorn/no-useless-error-capture-stack-trace': 'error',
      // Reject useless fallback when spreading in object literals.
      'unicorn/no-useless-fallback-in-spread': 'error',
      // Reject unnecessary .toArray() on iterators.
      'unicorn/no-useless-iterator-to-array': 'error',
      // Reject useless array length check.
      'unicorn/no-useless-length-check': 'error',
      // Reject unnecessary operands in logical expressions involving boolean literals.
      'unicorn/no-useless-logical-operand': 'error',
      // Reject useless overrides of class methods.
      'unicorn/no-useless-override': 'error',
      // Reject returning/yielding Promise.resolve/reject() in async functions or promise callbacks.
      'unicorn/no-useless-promise-resolve-reject': 'error',
      // Reject simple recursive function calls that can be replaced with a loop.
      'unicorn/no-useless-recursion': 'error',
      // Reject unnecessary Set construction around Set methods.
      'unicorn/no-useless-set-construction': 'error',
      // Reject unnecessary spread.
      'unicorn/no-useless-spread': 'error',
      // Reject useless case in switch statements.
      'unicorn/no-useless-switch-case': 'error',
      // Reject useless template literal expressions.
      'unicorn/no-useless-template-literals': 'error',
      // Reject useless undefined.
      'unicorn/no-useless-undefined': 'error',
      // Reject returning or exporting resources declared with using, including through capturing functions.
      'unicorn/no-using-resource-escape': 'error',
      // Reject the bitwise XOR operator where exponentiation was likely intended.
      'unicorn/no-xor-as-exponentiation': 'error',
      // Require consistent decimal numbers without redundant zeros.
      'unicorn/no-zero-fractions': 'error',
      // Use consistent numeric prefixes and uppercase hexadecimal value digits.
      'unicorn/number-literal-case': 'error',
      // Group long decimal digits by three, binary and octal digits by four, and hexadecimal digits by two.
      'unicorn/numeric-separators-style': 'error',
      // Use compound assignments, including template-based string updates; this extends the core assignment check.
      'unicorn/operator-assignment': 'error',
      // Use AbortSignal.any() over manually forwarding abort events between signals.
      'unicorn/prefer-abort-signal-any': 'error',
      // Use AbortSignal.timeout() over manually aborting an AbortController with setTimeout().
      'unicorn/prefer-abort-signal-timeout': 'error',
      // Use .addEventListener() and .removeEventListener() over on-functions.
      'unicorn/prefer-add-event-listener': 'error',
      // Use an options object over a boolean in .addEventListener().
      'unicorn/prefer-add-event-listener-options': 'error',
      // Use AggregateError when throwing collected errors.
      'unicorn/prefer-aggregate-error': 'error',
      // Use .find(...) and .findLast(...) over the first or last element from .filter(...).
      'unicorn/prefer-array-find': 'error',
      // Use Array#flat() over legacy techniques to flatten arrays.
      'unicorn/prefer-array-flat': 'error',
      // Use .flatMap(...) over .map(...).flat() and .filter(...).flatMap(...).
      'unicorn/prefer-array-flat-map': 'error',
      // Use Array.fromAsync() over array accumulation loops.
      'unicorn/prefer-array-from-async': 'error',
      // Use using the Array.from() mapping function argument.
      'unicorn/prefer-array-from-map': 'error',
      // Use Array.from({length}, ...) when creating range arrays.
      'unicorn/prefer-array-from-range': 'error',
      // Use Array#{indexOf,lastIndexOf}() over Array#{findIndex,findLastIndex}() when looking for the index of an item.
      'unicorn/prefer-array-index-of': 'error',
      // Use iterating an array directly or with Array#keys() over Array#entries() when the index or value is unused.
      'unicorn/prefer-array-iterable-methods': 'error',
      // Use last-oriented array methods over Array#reverse() or Array#toReversed() followed by a method.
      'unicorn/prefer-array-last-methods': 'error',
      // Use Array#slice() over Array#splice() when reading from the returned array.
      'unicorn/prefer-array-slice': 'error',
      // Use .some(...) over .filter(...).length check and .{find,findLast,findIndex,findLastIndex}(...).
      'unicorn/prefer-array-some': 'error',
      // Use .at() method for index access and String#charAt().
      'unicorn/prefer-at': 'error',
      // Use await over promise chaining.
      'unicorn/prefer-await': 'error',
      // Use BigInt literals over the constructor.
      'unicorn/prefer-bigint-literals': 'error',
      // Use Blob#arrayBuffer() over FileReader#readAsArrayBuffer(...) and Blob#text() over FileReader#readAsText(...).
      'unicorn/prefer-blob-reading-methods': 'error',
      // Use block statements over IIFEs used only for scoping.
      'unicorn/prefer-block-statement-over-iife': 'error',
      // Use directly returning boolean expressions over if statements.
      'unicorn/prefer-boolean-return': 'error',
      // Use class field declarations over this assignments in constructors.
      'unicorn/prefer-class-fields': 'error',
      // Use using Element#classList.toggle() to toggle class names.
      'unicorn/prefer-classlist-toggle': 'error',
      // Use String#codePointAt(...) over String#charCodeAt(...) and String.fromCodePoint(...) over String.fromCharCode(...).
      'unicorn/prefer-code-point': 'error',
      // Use combining consecutive guards with identical exit statements.
      'unicorn/prefer-combined-guards': 'error',
      // Use early continues over conditionals wrapping the remainder of the loop body.
      'unicorn/prefer-continue': 'error',
      // Use Date.now() to get the number of milliseconds since the Unix Epoch.
      'unicorn/prefer-date-now': 'error',
      // Use default parameters and destructuring defaults over reassignment and fallback expressions.
      'unicorn/prefer-default-parameters': 'error',
      // Use direct iteration over default iterator method calls.
      'unicorn/prefer-direct-iteration': 'error',
      // Use using using/await using over manual try/finally resource disposal.
      'unicorn/prefer-dispose': 'error',
      // Use Element#append() over Node#appendChild().
      'unicorn/prefer-dom-node-append': 'error',
      // Use .getHTML() and .setHTML() over .innerHTML.
      'unicorn/prefer-dom-node-html-methods': 'error',
      // Use childNode.remove() over parentNode.removeChild(childNode).
      'unicorn/prefer-dom-node-remove': 'error',
      // Use .replaceChildren() when replacing DOM children.
      'unicorn/prefer-dom-node-replace-children': 'error',
      // Use .textContent over .innerText.
      'unicorn/prefer-dom-node-text-content': 'error',
      // Use early returns over conditionals wrapping the remainder of the function body.
      'unicorn/prefer-early-return': 'error',
      // Use else if over adjacent if statements with related conditions.
      'unicorn/prefer-else-if': 'error',
      // Use Error.isError() when checking for errors.
      'unicorn/prefer-error-is-error': 'error',
      // Use escape sequences for irregular whitespace characters.
      'unicorn/prefer-escaped-irregular-whitespace': 'error',
      // Use EventTarget over EventEmitter.
      'unicorn/prefer-event-target': 'error',
      // Use export...from when re-exporting.
      'unicorn/prefer-export-from': 'error',
      // Use flat Math.min() and Math.max() calls over nested calls.
      'unicorn/prefer-flat-math-min-max': 'error',
      // Use .getOrInsertComputed() when the default value has side effects.
      'unicorn/prefer-get-or-insert-computed': 'error',
      // Use global numeric constants over Number static properties.
      'unicorn/prefer-global-number-constants': 'error',
      // Use globalThis over window, self, and global.
      'unicorn/prefer-global-this': 'error',
      // Use Object.groupBy() or Map.groupBy() over manual grouping.
      'unicorn/prefer-group-by': 'error',
      // Use .has() when checking existence.
      'unicorn/prefer-has-check': 'error',
      // Use moving code shared by all branches of an if statement out of the branches.
      'unicorn/prefer-hoisting-branch-code': 'error',
      // Use HTTPS over HTTP.
      'unicorn/prefer-https': 'error',
      // Use identifiers over string literals in import and export specifiers.
      'unicorn/prefer-identifier-import-export-specifiers': 'error',
      // Use import.meta.{dirname,filename} over legacy techniques for getting file paths.
      'unicorn/prefer-import-meta-properties': 'error',
      // Use .includes() over .indexOf(), .lastIndexOf(), and Array#some() when checking for existence or non-existence.
      'unicorn/prefer-includes': 'error',
      // Use .includes() over repeated equality comparisons.
      'unicorn/prefer-includes-over-repeated-comparisons': 'error',
      // Use passing iterables directly to constructors instead of filling empty collections.
      'unicorn/prefer-iterable-in-constructor': 'error',
      // Use iterator helpers over temporary arrays from iterators.
      'unicorn/prefer-iterator-helpers': 'error',
      // Use Iterator#toArray() over temporary arrays from iterator spreads.
      'unicorn/prefer-iterator-to-array': 'error',
      // Use moving .toArray() to the end of iterator helper chains.
      'unicorn/prefer-iterator-to-array-at-end': 'error',
      // Use JSON imports over reading and parsing JSON files.
      'unicorn/prefer-json-import': 'error',
      // Use KeyboardEvent#key over deprecated keyboard event properties.
      'unicorn/prefer-keyboard-event-key': 'error',
      // Use literal printable ASCII characters over escape sequences.
      'unicorn/prefer-literal-ascii': 'error',
      // Use location.assign() over assigning to location.href.
      'unicorn/prefer-location-assign': 'error',
      // Use using a logical operator over a ternary.
      'unicorn/prefer-logical-operator-over-ternary': 'error',
      // Use new Map() over Object.fromEntries() when using the result as a map.
      'unicorn/prefer-map-from-entries': 'error',
      // Use Math.abs() over manual absolute value expressions and symmetric range checks.
      'unicorn/prefer-math-abs': 'error',
      // Use Math constants over their approximate numeric values.
      'unicorn/prefer-math-constants': 'error',
      // Use Math.min() and Math.max() over ternaries for simple comparisons.
      'unicorn/prefer-math-min-max': 'error',
      // Use Math.trunc() for truncating numbers.
      'unicorn/prefer-math-trunc': 'error',
      // Use moving ternaries into the minimal varying part of an expression.
      'unicorn/prefer-minimal-ternary': 'error',
      // Use modern DOM APIs.
      'unicorn/prefer-modern-dom-apis': 'error',
      // Use modern Math APIs over legacy patterns.
      'unicorn/prefer-modern-math-apis': 'error',
      // Require ESM and reject CommonJS globals, require(), exports assignments, and redundant strict directives.
      'unicorn/prefer-module': 'error',
      // Pass String, Number, BigInt, Boolean, and Symbol directly instead of wrapping them in callbacks.
      'unicorn/prefer-native-coercion-functions': 'error',
      // Use negative index over .length - index when possible.
      'unicorn/prefer-negative-index': 'error',
      // Use using the node: protocol when importing Node.js builtin modules.
      'unicorn/prefer-node-protocol': 'error',
      // Use Number() over parseFloat() and base-10 parseInt().
      'unicorn/prefer-number-coercion': 'error',
      // Use Number.isSafeInteger() over integer checks.
      'unicorn/prefer-number-is-safe-integer': 'error',
      // Use Number static methods over global functions and optionally static properties over global constants.
      'unicorn/prefer-number-properties': 'error',
      // Use Object.defineProperties() over multiple Object.defineProperty() calls.
      'unicorn/prefer-object-define-properties': 'error',
      // Use object destructuring defaults over default object literals with spread.
      'unicorn/prefer-object-destructuring-defaults': 'error',
      // Use using Object.fromEntries(...) to transform a list of key-value pairs into an object.
      'unicorn/prefer-object-from-entries': 'error',
      // Use the most specific Object iterable method.
      'unicorn/prefer-object-iterable-methods': 'error',
      // Use observer APIs over resize and scroll listeners with layout reads.
      'unicorn/prefer-observer-apis': 'error',
      // Use omitting the catch binding parameter.
      'unicorn/prefer-optional-catch-binding': 'error',
      // Use Path2D for repeatedly drawn canvas paths.
      'unicorn/prefer-path2d': 'error',
      // Use private class fields over the underscore-prefix convention.
      'unicorn/prefer-private-class-fields': 'error',
      // Use Promise.resolve() and Promise.reject() over trivial new Promise() calls.
      'unicorn/prefer-promise-static-methods': 'error',
      // Use Promise.try() over promise-wrapping boilerplate.
      'unicorn/prefer-promise-try': 'error',
      // Use Promise.withResolvers() when extracting resolver functions from new Promise().
      'unicorn/prefer-promise-with-resolvers': 'error',
      // Use borrowing methods from the prototype instead of the instance.
      'unicorn/prefer-prototype-methods': 'error',
      // Use .querySelector() and .querySelectorAll() over older DOM query methods.
      'unicorn/prefer-query-selector': 'error',
      // Use queueMicrotask() over process.nextTick(), setImmediate(), and setTimeout(..., 0).
      'unicorn/prefer-queue-microtask': 'error',
      // Use Reflect.apply() over Function#apply().
      'unicorn/prefer-reflect-apply': 'error',
      // Use RegExp.escape() for escaping strings to use in regular expressions.
      'unicorn/prefer-regexp-escape': 'error',
      // Use RegExp#test() over String#match(), String#search(), and RegExp#exec().
      'unicorn/prefer-regexp-test': 'error',
      // Use Response.json() over new Response(JSON.stringify()).
      'unicorn/prefer-response-static-json': 'error',
      // Use :scope when using element query selector methods.
      'unicorn/prefer-scoped-selector': 'error',
      // Use Set#has() over Array#includes() when checking for existence or non-existence.
      'unicorn/prefer-set-has': 'error',
      // Use Set methods for Set operations.
      'unicorn/prefer-set-methods': 'error',
      // Use using Set#size instead of Array#length.
      'unicorn/prefer-set-size': 'error',
      // Use shorter alternatives to Unicode escape sequences.
      'unicorn/prefer-short-escape-sequences': 'error',
      // Use simple conditions first in logical expressions.
      'unicorn/prefer-simple-condition-first': 'error',
      // Use a simple comparison function for Array#sort().
      'unicorn/prefer-simple-sort-comparator': 'error',
      // Use simplified conditions.
      'unicorn/prefer-simplified-conditions': 'error',
      // Use a single Array#some() or Array#every() with a combined predicate.
      'unicorn/prefer-single-array-predicate': 'error',
      // Require combining multiple Array#{push,unshift}(), Element#classList.{add,remove}(), and importScripts() into one call.
      'unicorn/prefer-single-call': 'error',
      // Use a single object destructuring declaration per local const source.
      'unicorn/prefer-single-object-destructuring': 'error',
      // Require combining multiple single-character replacements into a single String#replaceAll() with a regular expression.
      'unicorn/prefer-single-replace': 'error',
      // Use declaring variables and type aliases in the smallest possible scope.
      'unicorn/prefer-smaller-scope': 'error',
      // Use String#split() with a limit.
      'unicorn/prefer-split-limit': 'error',
      // Use the spread operator over Array.from(...), Array#concat(...), Array#{slice,toSpliced}(), and trivial for...of copies.
      'unicorn/prefer-spread': 'error',
      // Use String#matchAll() over RegExp#exec() loops.
      'unicorn/prefer-string-match-all': 'error',
      // Use String#padStart() and String#padEnd() over manual string padding.
      'unicorn/prefer-string-pad-start-end': 'error',
      // Use using the String.raw tag to avoid escaping \.
      'unicorn/prefer-string-raw': 'error',
      // Use String#repeat() for repeated whitespace.
      'unicorn/prefer-string-repeat': 'error',
      // Use String#replaceAll() over regex searches with the global flag and String#split().join().
      'unicorn/prefer-string-replace-all': 'error',
      // Use String#slice() over String#substr() and String#substring().
      'unicorn/prefer-string-slice': 'error',
      // Use String#startsWith() & String#endsWith() over regexes, String#indexOf() === 0, and slice checks.
      'unicorn/prefer-string-starts-ends-with': 'error',
      // Use String#trimStart() / String#trimEnd() over String#trimLeft() / String#trimRight().
      'unicorn/prefer-string-trim-start-end': 'error',
      // Use using structuredClone to create a deep clone.
      'unicorn/prefer-structured-clone': 'error',
      // Use switch over multiple else-if.
      'unicorn/prefer-switch': 'error',
      // Use direct Temporal conversion methods.
      'unicorn/prefer-temporal-conversion': 'error',
      // Use ternary expressions over simple if statements.
      'unicorn/prefer-ternary': 'error',
      // Use .then().catch() over .then(..., ...) for error handling.
      'unicorn/prefer-then-catch': 'error',
      // Use using Element#toggleAttribute() to toggle attributes.
      'unicorn/prefer-toggle-attribute': 'error',
      // Use top-level await over top-level promises and async function calls.
      'unicorn/prefer-top-level-await': 'error',
      // Require throwing TypeError in type checking conditions.
      'unicorn/prefer-type-error': 'error',
      // Require type literals to be last in union types.
      'unicorn/prefer-type-literal-last': 'error',
      // Use the unary minus operator over multiplying or dividing by -1.
      'unicorn/prefer-unary-minus': 'error',
      // Use Unicode code point escapes over legacy escape sequences.
      'unicorn/prefer-unicode-code-point-escapes': 'error',
      // Use URL.canParse() over constructing a URL in a try/catch for validation.
      'unicorn/prefer-url-can-parse': 'error',
      // Use URL#href over stringifying a URL.
      'unicorn/prefer-url-href': 'error',
      // Use URLSearchParams over manually splitting query strings.
      'unicorn/prefer-url-search-parameters': 'error',
      // Use putting the condition in the while statement.
      'unicorn/prefer-while-loop-condition': 'error',
      // Do not prepend a redundant ./ to relative URLs; retain meaningful parent and root-relative paths.
      'unicorn/relative-url-style': 'error',
      // Require using the separator argument with Array#join().
      'unicorn/require-array-join-separator': 'error',
      // Require a compare function when calling Array#sort() or Array#toSorted().
      'unicorn/require-array-sort-compare': 'error',
      // Require CSS.escape() for interpolated values in CSS selectors.
      'unicorn/require-css-escape': 'error',
      // Require non-empty module attributes for imports and exports.
      'unicorn/require-module-attributes': 'error',
      // Require non-empty specifier list in import and export statements.
      'unicorn/require-module-specifiers': 'error',
      // Require using the digits argument with Number#toFixed().
      'unicorn/require-number-to-fixed-digits-argument': 'error',
      // Require passive event listeners for high-frequency events.
      'unicorn/require-passive-events': 'error',
      // Require using the targetOrigin argument with window.postMessage().
      'unicorn/require-post-message-target-origin': 'error',
      // Require boolean-returning Proxy traps to return booleans.
      'unicorn/require-proxy-trap-boolean-return': 'error',
      // Require streaming decoding of fetch-body chunks with TextDecoder.
      'unicorn/require-text-decoder-streaming': 'error',
      // Expand block comments to multiline form instead of compact one-line blocks.
      'unicorn/single-line-block-comment-style': 'error',
      // Wrap case bodies in braces so lexical bindings cannot leak into neighboring cases.
      'unicorn/switch-case-braces': 'error',
      // Put case exit statements in a consistent position relative to the case block.
      'unicorn/switch-case-break-position': 'error',
      // Normalize indentation in known dedent, outdent, GraphQL, SQL, HTML, and styled template forms.
      'unicorn/template-indent': 'error',
      // Use lowercase encoding identifiers without optional dashes so equivalent encodings have one spelling.
      'unicorn/text-encoding-identifier-case': 'error',
      // Require new when creating an error.
      'unicorn/throw-new-error': 'error',
      // Limit try blocks to one operation so the caught failure has an identifiable source.
      'unicorn/try-complexity': ['error', { max: 1 }],

      // Ensure imports point to a file/module that can be resolved.
      'import-x/no-unresolved': 'error',
      // Ensure named imports correspond to a named export in the remote file.
      'import-x/named': 'error',
      // Ensure a default export is present, given a default import.
      'import-x/default': 'error',
      // Reject any invalid exports, i.e. re-export of the same name.
      'import-x/export': 'error',
      // Reject use of exported name as identifier of default export.
      'import-x/no-named-as-default': 'error',
      // Reject use of exported name as property of default export.
      'import-x/no-named-as-default-member': 'error',
      // Merge imports from the same resolved module so each dependency has one declaration.
      'import-x/no-duplicates': 'error',
      // Require named dependency bindings instead of namespace imports so each imported name is explicit.
      'import-x/no-namespace': 'error',
      // Reject exported let and var bindings so module contracts do not expose reassignable values.
      'import-x/no-mutable-exports': 'error',
      // Group local public bindings in one named export list so the module contract is reviewable together.
      'import-x/group-exports': 'error',
      // Use package exports instead of relative paths into sibling packages.
      'import-x/no-relative-packages': 'error',
      // Use top-level import type so runtime and type-only dependencies are separate declarations.
      'import-x/consistent-type-specifier-style': 'error',
      // Reject a module from importing itself.
      'import-x/no-self-import': 'error',
      // Reject a module from importing a module with a dependency path back to itself.
      'import-x/no-cycle': 'error',
      // Reject importing a default export by a different name.
      'import-x/no-rename-default': 'error',
      // Reject AMD require and define calls.
      'import-x/no-amd': 'error',
      // Put imports before executable statements so dependencies are visible at the start of each module.
      'import-x/first': 'error',
      // Limit each module to ten distinct dependencies so its integration responsibility stays bounded.
      'import-x/max-dependencies': ['error', { max: 10 }],
      // Reject import of modules using absolute paths.
      'import-x/no-absolute-path': 'error',
      // Reject webpack loader syntax in imports.
      'import-x/no-webpack-loader-syntax': 'error',
      // Separate imports from module code with a blank line so the dependency list has a clear boundary.
      'import-x/newline-after-import': 'error',
      // Require module syntax so parser and runtime module classification agree.
      'import-x/unambiguous': 'error',
      // Bind imports explicitly so dependency side effects are not hidden in unassigned imports.
      'import-x/no-unassigned-import': 'error',
      // Reject unnecessary path segments in import and require statements.
      'import-x/no-useless-path-segments': 'error',
      // Reject empty named import blocks.
      'import-x/no-empty-named-blocks': 'error',
      // Put local export lists after their definitions so the public contract follows the implementation.
      'import-x/exports-last': 'error',
      // Reject imported names marked with @deprecated documentation tag.
      'import-x/no-deprecated': 'error',
      // Enumerate public reexports so upstream additions cannot silently expand this module contract.
      'import-x/avoid-re-export-all': 'error',
      // Require emitted extensions on relative imports; leave package specifiers independent of internal filenames.
      'import-x/extensions': ['error', 'always', { ignorePackages: true }],
      // Separate built-in, external, internal, parent, sibling, index, object, and type groups; alphabetize names case-insensitively with type specifiers first.
      'import-x/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        named: { enabled: true, types: 'types-first' },
      }],
      // Require named source exports so consumers import the declared public names.
      'import-x/no-default-export': 'error',
      // Require runtime and type imports to be declared dependencies so package installation can reproduce resolution.
      'import-x/no-extraneous-dependencies': ['error', { includeTypes: true }],

      // Reject quantifiers whose repeated expression can be empty so repetition counts do not imply a minimum match length.
      'regexp/confusing-quantifier': 'error',
      // Reject regex elements that contradict nearby assertions so impossible branches do not remain.
      'regexp/no-contradiction-with-assertion': 'error',
      // Reject empty regex alternatives so an unintended empty match cannot bypass the other alternatives.
      'regexp/no-empty-alternative': 'error',
      // Reject character classes that match nothing, including constructor patterns and Unicode sets.
      'regexp/no-empty-character-class': 'error',
      // Reject empty lookarounds because they unconditionally accept or reject without inspecting input.
      'regexp/no-empty-lookarounds-assertion': 'error',
      // Reject invalid constructor patterns and duplicate or incompatible regex flags before runtime compilation.
      'regexp/no-invalid-regexp': 'error',
      // Reject lazy quantifiers at a pattern end when they cannot consume the intended complete match.
      'regexp/no-lazy-ends': 'error',
      // Reject captures whose repeated contents do not preserve the text implied by the group.
      'regexp/no-misleading-capturing-group': 'error',
      // Reject multi-code-point characters split by character classes or quantifiers so matching respects the intended character.
      'regexp/no-misleading-unicode-character': 'error',
      // Require global regexes for matchAll() and replaceAll() so these calls cannot throw for missing g.
      'regexp/no-missing-g-flag': 'error',
      // Reject nonstandard regex flags so patterns use only supported JavaScript flag meanings.
      'regexp/no-non-standard-flag': 'error',
      // Reject optional assertions because skipping them makes the asserted condition ineffective.
      'regexp/no-optional-assertion': 'error',
      // Reject backreferences whose capture may be absent or reset so they cannot silently become empty matches.
      'regexp/no-potentially-useless-backreference': 'error',
      // Reject assertions that always accept or reject so the pattern does not imply checks it cannot perform.
      'regexp/no-useless-assertions': 'error',
      // Reject backreferences that always match empty text, including patterns composed through constructors.
      'regexp/no-useless-backreference': 'error',
      // Reject nonexistent numeric or named replacement references so replacement strings do not silently insert literal dollars.
      'regexp/no-useless-dollar-replacements': 'error',
      // Reject zero-maximum quantifiers because the quantified expression can never consume input.
      'regexp/no-zero-quantifier': 'error',
      // Reject proven exponential or polynomial regex backtracking; report certain cases without assuming a rejecting suffix.
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
      // ESLint and Vitest load their exact configuration filenames through framework-required default exports.
      'import-x/no-default-export': 'off',
    },
  },
);

export { base };
