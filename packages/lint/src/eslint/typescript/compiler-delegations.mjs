// Compiler delegations require a consumer tsc check with noCheck disabled.
// Supplying parserOptions.project gives lint types but does not run compiler diagnostics.
/**
@type {import('eslint').Linter.RulesRecord}
*/
const compilerDelegations = {
  // [correctness] Off (covered): Consumer tsc reports getters without returns with TS2378; partial value-return paths need noImplicitReturns for TS7030 or strictNullChecks and a non-undefined return annotation for TS2366.
  'getter-return': 'off',
  // [correctness] Off (covered): Consumer tsc reports missing named exports with TS2305 for resolved module declarations; accurate dependency declarations are required for type/value export checking.
  'import-x/named': 'off',
  // [correctness] Off (covered): Consumer tsc rejects replacing class declarations with TS2629, preserving the declared constructor binding.
  'no-class-assign': 'off',
  // [correctness] Off (covered): Consumer tsc rejects writes to const bindings with TS2588 before immutable-binding assignments reach runtime.
  'no-const-assign': 'off',
  // [correctness] Off (covered): Consumer tsc reports duplicate parameter identifiers with TS2300 rather than accepting ambiguous argument bindings.
  'no-dupe-args': 'off',
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
};

export { compilerDelegations };
