# @asmundwien/lint

Preventive ESLint policy for TypeScript ESM projects, intended to reduce human review burden. See the [runtime baseline](../../docs/adr/0001-runtime-and-language-baseline.md) for developer and consumer requirements.

## Setup

Install `@asmundwien/lint` with the ESLint and TypeScript peer versions in [package.json](./package.json).

Create `eslint.config.mjs` with `setup(options)`. Type-aware TypeScript checks, locally maintained rules and test-scoped Vitest policy always apply.

| Option | Use |
| --- | --- |
| `runtime` | `node` for Node.js, `react` for React 19 browser projects, or `generic` for runtime-neutral TypeScript. |
| `tsconfigRootDir` | Absolute directory containing your `tsconfig.json`, used for type-aware checks and TypeScript import resolution. |
| `effect` | Set to `true` for Effect service, tagged-value construction and matching conventions. |

For a Node.js TypeScript project:

```js
import { setup } from "@asmundwien/lint/eslint";

export default setup({
  runtime: "node",
  tsconfigRootDir: import.meta.dirname,
});
```

TypeScript files must belong to the selected compiler project. JavaScript tool configuration receives the shared ESM policy.

Use the [shared compiler presets](../tsconfig/README.md) and run compiler checks in CI alongside ESLint.

Run `eslint . --max-warnings=0` in CI so attempted inline configuration also fails validation.

## Best practice for file-specific overrides

Keep `setup(options)` as the shared baseline. Give each file that needs an adjustment at most one override block after that baseline. Files without adjustments inherit the baseline without an override.

- Use one literal, project-relative file path in each block's `files` array and sort blocks by path. Exact paths keep new files on the baseline until their exceptions are reviewed.
- Put the file's complete set of rule adjustments in its block, rather than distributing them across overlapping file lists or globs. Record only adjustments, not copies of unchanged baseline rules.
- Keep every adjusted rule key explicit. Named constants may hold complex option values with shared meaning; rule bundles and object spreads hide which checks a file changes.
- Put one single-line rationale immediately before each adjusted rule. Explain the requirement for that file and the tradeoff, following the [configuration policy](../../docs/configuration-policy.md).

For example, an approved identifier-length exception for Cartesian coordinates belongs only to its geometry module:

```js
import { defineConfig } from "eslint/config";

import { setup } from "@asmundwien/lint/eslint";

export default defineConfig(
  setup({
    runtime: "node",
    tsconfigRootDir: import.meta.dirname,
  }),
  {
    files: ["src/geometry/point.ts"],
    rules: {
      // [standardization] Off (scope): Cartesian coordinates use x and y for axis names in this module; other identifiers retain the two-character minimum.
      "id-length": ["error", { exceptions: ["x", "y"], min: 2 }],
    },
  },
);
```

When regrouping existing overrides, compare ESLint's resolved configuration for every affected file before and after the change. `eslint --print-config path/to/file.ts` exposes the merged rules and options.

## Local rules

The `local/` rules restrict ad hoc runtime narrowing, broad input and return contracts, erased type evidence, reflective calls and property access, module mocking, collection copies and statement spacing. Each implementation in [`src/eslint/local/rules`](./src/eslint/local/rules) starts with its behavior and source attribution.

Non-const assertions require a nearby `SAFETY:` comment that states the invariant. The [TypeScript safety policy](./src/eslint/typescript/type-safety.ts) records the assertion review tradeoff. Chained assertions remain errors, including through syntax-only wrappers. Fresh, locally owned reducer accumulators may be mutated; copying accumulated values on each iteration is an error.

Run ESLint with `--fix` to insert required blank lines. Spacing fixes only add whitespace.

Set `effect: true` to enable the `local-effect/` rules. They require Effect matching helpers, tagged constructors, selective error handlers and Layer-based runtime service access. Focused test files may import service constructors directly.

Local analysis follows syntax and lexical bindings within each file. It resolves supported local aliases but does not resolve imported type definitions or prove boundary validation. Keep type-aware ESLint checks and compiler checks enabled.

See [contributing](./docs/contributing.md) for policy changes and exceptions.
