/**
@type {import('eslint').Linter.RulesRecord}
*/
const regexpRules = {
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
  // [architectural-prevention] Reject certain exponential or polynomial backtracking risks without assuming a rejecting suffix; this bounds known regex resource risks rather than proving safe runtime cost.
  'regexp/no-super-linear-backtracking': ['error', { report: 'certain' }],
  // [correctness] Reject assertions that always accept or reject so a regex does not imply checks it cannot perform.
  'regexp/no-useless-assertions': 'error',
  // [correctness] Catch backreferences that always match empty text, including composed constructor patterns that can hide the missing constraint.
  'regexp/no-useless-backreference': 'error',
  // [correctness] Catch nonexistent replacement references before replacement strings insert literal dollar expressions instead of captured text.
  'regexp/no-useless-dollar-replacements': 'error',
  // [correctness] Reject zero-maximum quantifiers because the apparently required expression can never consume input.
  'regexp/no-zero-quantifier': 'error',
};

export { regexpRules };
