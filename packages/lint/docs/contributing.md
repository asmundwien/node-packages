# Contributing to @asmundwien/lint

Follow the [repository contributing guide](../../../docs/contributing.md) for workflow, source standards and configuration policy.

- Select rules explicitly so upstream presets cannot silently change policy.
- Keep composed layers coherent. Remove duplicate enforcement; retain checks that protect different requirements.
- Keep exceptions in human-approved, file-scoped configuration.

## Verification

Run `pnpm --filter @asmundwien/lint typecheck` for compiler checks.
