# @asmundwien/tsconfig

Strict TypeScript defaults shared across projects. Choose a preset for your runtime, then configure project-specific needs locally.

## Setup

Requires Node.js 24+ and TypeScript 6+.

```sh
pnpm add --save-dev @asmundwien/tsconfig typescript @types/node
```

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

## Choosing a preset

| Preset | Use |
| --- | --- |
| `node.json` | Code that runs directly in Node.js. Supports ESM and CommonJS. |
| `base.json` | Shared strictness when you need to choose your own runtime or build environment. |

Your project decides which files to check and how to build them.

## Contributing

See the [contributor guide](docs/contributing.md).

## License

[MIT](LICENSE)
