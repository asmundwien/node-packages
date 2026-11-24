# Contributing

Use this guide to set up the workspace and run shared development commands. See [Process](./process.md) for pull request and GitHub Actions requirements.

## Development

Install Node.js compatible with `engines.node` and the pnpm version declared in `packageManager` in the [root package manifest](../package.json).
From the repository root, run `pnpm install --frozen-lockfile`. pnpm also provisions the Node.js version declared in `devEngines.runtime`.

Run the following commands from the repository root. Workspace tasks run through [Turborepo](../turbo.json) in packages that define the corresponding script.

| Command                        | Behavior                                                                                                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `pnpm lint`                    | Runs each package's lint command and applies available ESLint fixes.                                                  |
| `pnpm lint:check`              | Checks each package without fixes and fails on ESLint errors or warnings.                                             |
| `pnpm typecheck`               | Checks each package's compiler project and its selected files without emitting output.                                |
| `pnpm test`                    | Runs tests in workspace packages that define a test command.                                                          |
| `pnpm knip` or `pnpm knip:check` | Reports unused files, dependencies, and exports. Both commands run the same check.                                    |
| `pnpm package-manifests`       | Applies Sherif's automatic fixes to package manifests and workspace configuration.                                    |
| `pnpm package-manifests:check` | Checks package manifests for dependency consistency, valid workspace references and other Sherif rules without fixes. |
| `pnpm github-actions:check`    | Runs actionlint against all `.github/workflows/*.yml` files.                                                          |
| `pnpm rulesync:install`        | Installs skills from the sources in `rulesync.jsonc`, using `rulesync.lock` for locked sources.                        |
| `pnpm rulesync:update`         | Re-resolves configured sources and updates the installed skills and `rulesync.lock`.                                   |
| `pnpm rulesync:preview`        | Previews generated skills for the configured Rulesync target without writing them.                                    |
| `pnpm rulesync:apply`          | Writes generated skills for the configured Rulesync target.                                                           |

## Source and workspace execution

Implement package source, scripts, and tests in TypeScript ESM. Keep JavaScript limited to small tool configuration entry points or explicit interoperability requirements.

Use Node.js native type stripping to execute TypeScript source. Use `pnpm exec node` for direct execution with the provisioned runtime. Keep runtime syntax erasable, use explicit `.ts` extensions for relative TypeScript imports, and mark type-only imports with `import type`.

Workspace package exports must resolve to source files so installation, checks, and workspace consumers do not require a build first. Keep type checking separate from execution and include it in CI. See the [compiler configuration reference](../packages/tsconfig/README.md) for the shared compiler settings.
