# Contributing to @asmundwien/tsconfig

Follow the [shared configuration policy](../../../docs/contributing.md#configuration-policy) and [repository workflow](../../../docs/contributing.md#development).

Keep shared source policy in `base.json` and runtime requirements in environment presets. Leave project-specific file selection and build options to consumers.

## Verification

Compile fixtures through each affected preset. Check rejected code and accepted alternatives, including compatibility with the [lint package](../../lint/README.md) when changing delegated compiler checks.
