# @asmundwien/lint

Shared lint configurations for TypeScript projects. Requires Node.js 24 or newer.

## Get started

Install `@asmundwien/lint` with the exact ESLint and TypeScript peer versions in [package.json](./package.json). Plugins and the TypeScript import resolver are included.

### ESLint Configuration

Import layers from `@asmundwien/lint/eslint` and compose them in order:

| Layer        | Purpose                          | Requirements                                        |
| ------------ | -------------------------------- | --------------------------------------------------- |
| `base`       | Core, Unicorn and import-x rules | JavaScript or TypeScript source files               |
| `typescript` | Type-aware TypeScript rules      | TypeScript files in a configured TypeScript project |
| `node`       | Node.js rules and globals        | Files that run in Node.js 24 or newer               |
| `react`      | React, browser APIs and Hooks    | React 19 TypeScript files that run in a browser     |

For a Node.js TypeScript project:

```js
// eslint.config.mjs
import { defineConfig } from "eslint/config";
import { base, typescript, node } from "@asmundwien/lint/eslint";

export default defineConfig(base, typescript, node, {
  files: ["**/*.{ts,tsx,mts,cts}"],
  languageOptions: {
    parserOptions: { tsconfigRootDir: import.meta.dirname },
  },
});
```

Override rules with later configuration objects. Run `eslint . --max-warnings=0` in CI so warnings also fail the check.

## Contributing

See the [contributor guide](./docs/contributing.md) for configuration module conventions and rule override requirements.
