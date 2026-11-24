# Contributing to @asmundwien/lint

Follow the [repository contributing guide](../../../docs/contributing.md) for workflow and source standards, and the [shared configuration policy](../../../docs/configuration-policy.md) for decision rationale and exceptions.

- Select rules explicitly so upstream presets cannot silently change policy.
- Keep composed layers coherent. Remove duplicate enforcement; retain checks that protect different requirements.
- Keep exceptions in human-approved, file-scoped configuration. Follow the [consumer override structure](../README.md#file-specific-overrides).

## Verification

Run these commands from the repository root:

| Command | Behavior |
| --- | --- |
| `pnpm --filter @asmundwien/lint typecheck` | Checks the implementation and tests under `src/` without emitting files. |
| `pnpm --filter @asmundwien/lint lint:check` | Checks source and tool configuration without fixes. Errors or warnings fail the command. |
| `pnpm --filter @asmundwien/lint lint` | Checks the same files and applies available ESLint fixes. Remaining errors or warnings fail the command. |
| `pnpm --filter @asmundwien/lint test` | Runs Vitest once, including native ESLint rule cases and consumer-policy regressions. |

## Rule maintenance

Maintain rule implementations and their behavioral cases together. Local rule tests live in a `test` directory beside their implementations and use the [native ESLint RuleTester adapter](../src/eslint/local/test/rule-tester.ts). Keep accepted cases, rejected diagnostics, and any fix output in those tests. Use the [consumer-policy tests](../src/eslint/test/consumer.test.ts) to cover `setup` composition, Effect opt-in, type-aware interactions, and repeated parsing.

Register general local rules in [`local/index.ts`](../src/eslint/local/index.ts) and opt-in Effect rules in [`local/effect/index.ts`](../src/eslint/local/effect/index.ts). Keep each rule's leading description and source link. Preserve the [local-rule license](../src/eslint/local/LICENSE) and the [spacing-engine license](../src/eslint/local/vendor/eslint-stylistic/LICENSE).
