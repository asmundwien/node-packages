# @asmundwien/lint

Preventive ESLint policy for TypeScript ESM projects, intended to reduce human review burden. See the [runtime baseline](../../docs/adr/0001-runtime-and-language-baseline.md) for developer and consumer requirements.

## Setup

Install `@asmundwien/lint` with the ESLint and TypeScript peer versions in [package.json](./package.json).

Create `eslint.config.mjs` with `setup(options)` from `@asmundwien/lint/eslint`. This entry point exports `setup` and the `SetupOptions` type. `setup` returns an ordered ESLint flat configuration array.

| Option | Required | Default | Use |
| --- | --- | --- | --- |
| `runtime` | Yes | None | `"node"` for Node.js, `"react"` for React 19 browser projects, or `"generic"` for runtime-neutral TypeScript. |
| `tsconfigRootDir` | Yes | None | Absolute directory containing the import resolver's `tsconfig.json`. Also sets the parser's project root. |
| `effect` | No | `false` | Set to `true` for Effect service, tagged-value construction, and matching conventions. |

For a Node.js TypeScript project:

```js
import { setup } from "@asmundwien/lint/eslint";

export default setup({
	runtime: "node",
	tsconfigRootDir: import.meta.dirname,
});
```

Type-aware checks apply to `ts`, `tsx`, `mts`, and `cts` files. Project Service selects the nearest `tsconfig.json` for each file and supports project references. Every linted TypeScript file must belong to a discovered compiler project. The parser does not allow files outside those projects by default.

Import resolution is separate from parser project discovery. The TypeScript resolver starts from `tsconfigRootDir/tsconfig.json` for import aliases. Node mode uses Node ESM package conditions and entry fields. React mode adds the `browser` condition for TypeScript imports. Generic mode uses runtime-neutral ESM conditions. See the [resolver configuration](./src/eslint/import-resolution.ts) for the exact condition and field priorities.

The shared ESM policy and local rules apply to `js`, `jsx`, `mjs`, `cjs`, `ts`, `tsx`, `mts`, and `cts` files. All use ESM parsing, including files with CommonJS extensions. Node mode adds its globals and rules to all those files. React mode adds browser globals and React rules only to TypeScript files. Generic mode adds no runtime-specific globals or rules.

Vitest rules apply to `*.test.*` and `*.spec.*` files and files under `test`, `tests`, or `__tests__` directories with those source extensions. Runner configuration files are excluded from the Vitest layers, not from shared checks. Snapshot size checks also cover `**/__snapshots__/*.snap`. See the [Vitest configuration](./src/eslint/vitest/index.ts) for exclusions, limits, and typed-test adjustments.

Use the [shared compiler presets](../tsconfig/README.md) and run compiler checks in CI alongside ESLint. Project Service supplies type information, not compiler diagnostics. The [compiler delegations](./src/eslint/typescript/compiler-delegations.ts) require `noCheck: false`, `allowUnreachableCode: false`, and accurate library and dependency declarations. Keep `strictNullChecks` and `strictFunctionTypes` enabled for the type-aware policy.

Inline ESLint configuration is disabled. Run `eslint . --max-warnings=0` in CI so attempted inline configuration also fails validation.

## File-specific overrides

Keep `setup(options)` as the shared baseline. Give each file that needs an adjustment at most one override block after that baseline. Files without adjustments inherit the baseline without an override.

- Use one literal, project-relative file path in each block's `files` array and sort blocks by path. Exact paths keep new files on the baseline until their exceptions are reviewed.
- Put the file's complete set of rule adjustments in its block, rather than distributing them across overlapping file lists or globs. Record only adjustments, not copies of unchanged baseline rules.
- Keep every adjusted rule key explicit. Named constants may hold complex option values with shared meaning; rule bundles and object spreads hide which checks a file changes.
- Follow the [configuration policy](../../docs/configuration-policy.md) for human approval and each adjusted rule's rationale.

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

The [`local/` rules](./src/eslint/local/index.ts) are enabled as errors. They restrict ad hoc runtime narrowing, broad input and return contracts, erased type evidence, reflective calls and property access, module mocking, symbol names, collection transformations and copies, and statement spacing. Each implementation in [`src/eslint/local/rules`](./src/eslint/local/rules) starts with its behavior and source attribution.

Non-const assertions require a nearby, nonempty `SAFETY:` comment that states the invariant. The [TypeScript safety policy](./src/eslint/typescript/type-safety.ts) records the assertion review tradeoff. Comment presence does not prove validation or type safety. Assertion chains containing a non-const assertion remain errors, including through parentheses, `satisfies`, or non-null assertions.

Runtime `typeof` expressions are errors except equality or inequality comparisons with `"undefined"`, even inside type guards. Explicit `unknown` parameters are allowed only for a parameter named `cause` or the subject of a type predicate. The readonly-parameter check skips inferred types, but inference does not establish ownership. Fresh, locally owned reducer accumulators may be mutated; copying accumulated values on each iteration is an error.

Two local rules accept options in file-specific overrides:

| Rule | Option | Default | Behavior |
| --- | --- | --- | --- |
| `local/no-runtime-typeof` | `allowInTypeGuards` | `false` | `true` also permits runtime `typeof` inside functions with an explicit type-predicate return annotation. |
| `local/require-safety-comment-for-type-assertion` | `markers` | `["SAFETY"]` | Replaces the accepted comment markers with a nonempty array of unique, nonempty strings. Markers are case-sensitive and require a colon followed by a non-whitespace justification. |

Run ESLint with `--fix` to insert required blank lines. Spacing fixes only add whitespace.

Set `effect: true` to enable the [`local-effect/` rules](./src/eslint/local/effect/index.ts) as errors. They require Effect matching helpers, tagged constructors, selective error handlers, and Layer-based runtime service access for the syntax they recognize. The service-import rule rejects named imports matching `make[A-Z]` from relative paths outside `*.test.*` and `*.spec.*` source files. A file in a `tests` directory does not receive that exemption unless its name also matches.

Local analysis follows syntax and lexical bindings within each file. It resolves supported local aliases but does not resolve imported type definitions or prove boundary validation. Keep type-aware ESLint checks and compiler checks enabled.

See [contributing](./docs/contributing.md) for policy changes and exceptions.
