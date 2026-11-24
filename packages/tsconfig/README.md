# @asmundwien/tsconfig

Shared strict TypeScript compiler presets for Node.js and runtime-neutral projects. See the [runtime baseline](../../docs/adr/0001-runtime-and-language-baseline.md) for developer and consumer requirements.

## Setup

Install `@asmundwien/tsconfig` with the TypeScript and `@types/node` peer versions in [package.json](./package.json).

| Preset | Use |
| --- | --- |
| `node.json` | Node.js projects. Includes `base.json`; supports ESM and CommonJS. |
| `base.json` | Shared policy with your own runtime or build environment. |

For a Node.js project, create `tsconfig.json`:

```json
{
	"extends": "@asmundwien/tsconfig/node.json",
	"compilerOptions": {
		"noEmit": true
	},
	"include": ["src/**/*"]
}
```

Run `pnpm exec tsc --project tsconfig.json` in CI. Set file selection and build options in your project's configuration. The example checks `src` without emitting files.

See [contributing](./docs/contributing.md) for policy changes and exceptions.
