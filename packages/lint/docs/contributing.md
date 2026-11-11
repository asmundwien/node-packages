# Contributing to @asmundwien/lint

See the [README](../README.md) for package policy and consumer setup.

## Policy changes

Select rules against the [package policy](../README.md#policy). Choose them explicitly so upstream presets and dependency updates cannot silently change the policy.

Composed layers must enforce a coherent policy without duplicate or contradictory checks. Keep separate checks when they protect different requirements.

## Rule rationale

Keep rationale beside each effective rule entry. Explain the risk or convention it protects and why non-default options are appropriate. For exclusions, name the replacement check or verified compatibility constraint.

Do not restate rule names or rely on phrases such as "best practice" or "not needed". Remove entries that have no effect rather than keep a catalogue of reviewed rules.

### Exceptions

Inline ESLint configuration and suppressions are disabled. Exceptions require reviewed, file-scoped configuration with a concrete reason and an accepted code pattern.

Agents must not grant their own exceptions, they are human approved only. Just because an exception exists does not mean it is free to keep violating. If an exception grows worse with a new code change, this is a red flag and requires human eyes.

Run CI with `--max-warnings=0` so attempted inline configuration also fails validation.

## Verification

Run `pnpm typecheck` from the package directory.

Exercise policy changes through composed ESLint configurations and real fixture files. Verify rejected code, accepted alternatives, and file-scope boundaries.
