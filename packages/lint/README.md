# @asmundwien/lint

Opinionated preventive ESLint configurations for agent-generated JavaScript and TypeScript. Requires Node.js 24 or newer.

## Policy

This package sets constraints before agents generate code, especially when human review is limited. Rules must prevent bugs, limit architectural risk, establish a shared convention, or prevent enforcement bypasses.

Preventive constraints do not require a prior incident. Accepted fixes must address the underlying concern rather than add indirection to evade a limit.

| Purpose                  | What earns inclusion                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| Correctness              | Rejects an identifiable bug, unsafe operation, or broken contract.                                 |
| Architectural prevention | Restricts a known risk indicator, such as excessive branching, dependencies, or mutable inputs.    |
| Standardization          | Selects one supported framework, API pattern, syntax convention, or organization policy.           |
| Enforcement integrity    | Prevents agents from bypassing the preceding requirements through suppressions or unchecked types. |

## Get started

Install `@asmundwien/lint` with the exact ESLint and TypeScript peer versions in [package.json](./package.json). Plugins and the TypeScript import resolver are included.

### ESLint configuration

Import layers from `@asmundwien/lint/eslint` and compose them in order:

| Layer        | Applies to                                            |
| ------------ | ----------------------------------------------------- |
| `base`       | Shared JavaScript and TypeScript policy               |
| `typescript` | TypeScript files in a configured TypeScript project   |
| `node`       | Code that runs in Node.js                             |
| `react`      | React 19 browser code written in TypeScript           |
| `vitest`     | Vitest tests, after their language and runtime layers |

For a Node.js TypeScript project with Vitest tests:

```js
// eslint.config.mjs
import { defineConfig } from "eslint/config";
import { base, typescript, node, vitest } from "@asmundwien/lint/eslint";

export default defineConfig(base, typescript, node, vitest, {
  files: ["**/*.{ts,tsx,mts,cts}"],
  languageOptions: {
    parserOptions: { tsconfigRootDir: import.meta.dirname },
  },
});
```

## Contributing

See the [contributor guide](./docs/contributing.md) for policy changes, rule rationale, and verification.
