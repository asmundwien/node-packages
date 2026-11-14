# Contributing to @asmundwien/lint

Follow the [shared configuration policy](../../../docs/contributing.md#configuration-policy) and [repository workflow](../../../docs/contributing.md#development).

- Select rules explicitly so upstream presets cannot silently change policy.
- Keep composed layers coherent. Remove duplicate enforcement; retain checks that protect different requirements.
- Keep exceptions in human-approved, file-scoped configuration.

## Verification

Run `pnpm --filter @asmundwien/lint typecheck` from the repository root.

Exercise changed rules through composed configurations and real fixture files. Check rejected code, accepted alternatives, and file-scope boundaries.
