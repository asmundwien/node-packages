# Contributing to @asmundwien/lint

Follow the [repository contributing guide](../../../docs/contributing.md) for workflow and source standards, and the [shared configuration policy](../../../docs/configuration-policy.md) for decision rationale and exceptions.

- Select rules explicitly so upstream presets cannot silently change policy.
- Keep composed layers coherent. Remove duplicate enforcement; retain checks that protect different requirements.
- Keep exceptions in human-approved, file-scoped configuration.

## Verification

Run `pnpm --filter @asmundwien/lint typecheck` for compiler checks.
