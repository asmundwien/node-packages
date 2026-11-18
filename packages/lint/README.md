# @asmundwien/lint

Preventive ESLint policy for TypeScript ESM projects, intended to reduce human review burden. See the [runtime baseline](../../docs/adr/0001-runtime-and-language-baseline.md) for developer and consumer requirements.

## Setup

Install `@asmundwien/lint` with the ESLint and TypeScript peer versions in [package.json](./package.json).

Create `eslint.config.mjs` with `setup(options)`. Type-aware TypeScript checks and test-scoped Vitest policy always apply.

| Option | Use |
| --- | --- |
| `runtime` | `node` for Node.js, `react` for React 19 browser projects, or `generic` for runtime-neutral TypeScript. |
| `tsconfigRootDir` | Absolute directory containing your `tsconfig.json`. |

For a Node.js TypeScript project:

```js
import { setup } from "@asmundwien/lint/eslint";

export default setup({
  runtime: "node",
  tsconfigRootDir: import.meta.dirname,
});
```

TypeScript files must belong to the selected compiler project. JavaScript tool configuration receives the shared ESM policy.

For human-approved file-scoped exceptions or additional configuration, compose `defineConfig(setup(options), { files: [...], rules: { ... } })` using `defineConfig` from `eslint/config`.

Use the [shared compiler presets](../tsconfig/README.md) and run compiler checks in CI alongside ESLint.

Run `eslint . --max-warnings=0` in CI so attempted inline configuration also fails validation.

See [contributing](./docs/contributing.md) for policy changes and exceptions.
