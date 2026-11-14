# @asmundwien/tsconfig

Preventive compiler policy for agent-generated TypeScript, intended to reduce human review burden. Requires Node.js 24+.

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

Run `tsc` in CI. Set file selection and build options locally; the example checks `src` without emitting files.

See [contributing](./docs/contributing.md) for policy changes and exceptions.
