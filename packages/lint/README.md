# @asmundwien/lint

Preventive ESLint policy for agent-generated JavaScript and TypeScript, intended to reduce human review burden. Requires Node.js 24+.

## Setup

Install `@asmundwien/lint` with the ESLint and TypeScript peer versions in [package.json](./package.json).

Compose `base` first, then the layers your project needs:

| Layer | Use |
| --- | --- |
| `base` | Shared ESM policy. |
| `typescript` | TypeScript files included in your `tsconfig.json`. |
| `node` | Node.js code. |
| `react` | React 19 browser code, after `typescript`. |
| `vitest` | Tests, after their language and runtime layers. |

For a Node.js TypeScript project with Vitest, create `eslint.config.mjs`:

```js
import { defineConfig } from "eslint/config";
import { base, typescript, node, vitest } from "@asmundwien/lint/eslint";

export default defineConfig(base, typescript, node, vitest, {
  files: ["**/*.{ts,tsx,mts,cts}"],
  languageOptions: {
    parserOptions: { tsconfigRootDir: import.meta.dirname },
  },
});
```

TypeScript projects must also run `tsc --noEmit` in CI with `strict` and `noImplicitReturns` enabled, `allowUnreachableCode: false`, and `noCheck: false`. The [shared compiler presets](../tsconfig/README.md) supply these settings.

Run `eslint . --max-warnings=0` in CI so attempted inline configuration also fails validation.

See [contributing](./docs/contributing.md) for policy changes and exceptions.
