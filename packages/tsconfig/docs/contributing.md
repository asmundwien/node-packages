# Contributing to @asmundwien/tsconfig

Follow the [repository contributing guide](../../../docs/contributing.md) for workflow and source standards, and the [shared configuration policy](../../../docs/configuration-policy.md) for decision rationale and exceptions.

Keep shared source policy in `base.json` and runtime requirements in environment presets. Leave project-specific file selection and build options to consumers.

## Verification

Compile fixtures through each affected preset. Check rejected code and accepted alternatives, including compatibility with the [lint package](../../lint/README.md) when changing delegated compiler checks.
