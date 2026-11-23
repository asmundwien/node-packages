# Contributing to @asmundwien/lint

Follow the [repository contributing guide](../../../docs/contributing.md) for workflow and source standards, and the [shared configuration policy](../../../docs/configuration-policy.md) for decision rationale and exceptions.

- Select rules explicitly so upstream presets cannot silently change policy.
- Keep composed layers coherent. Remove duplicate enforcement; retain checks that protect different requirements.
- Keep exceptions in human-approved, file-scoped configuration.

## Verification

Run `pnpm --filter @asmundwien/lint typecheck` for compiler checks of the TypeScript implementation and tests.
Run `pnpm --filter @asmundwien/lint lint:check` for ESLint checks of the source and tool configuration.
Run `pnpm --filter @asmundwien/lint test` for native ESLint rule diagnostics, fixes and consumer-policy regression cases.

Maintain rule implementations and their behavioral cases together. Keep each rule's leading description and source link, and preserve the licenses beside the local rules and spacing engine.
