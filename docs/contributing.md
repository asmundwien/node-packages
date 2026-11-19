## Development

Install dependencies with `pnpm install --frozen-lockfile`. `pnpm install` also provisions the Node version defined in `package.json`'s `devEngines.runtime`.

| Command                        | Behavior                                                                                                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `pnpm lint`                    | Runs each package's lint command and applies available ESLint fixes.                                                  |
| `pnpm lint:check`              | Checks each package without fixes and fails on ESLint errors or warnings.                                             |
| `pnpm typecheck`               | Checks each package's compiler project, including its selected source files and tooling.                              |
| `pnpm package-manifests`       | Applies Sherif's automatic fixes to package manifests and workspace configuration.                                    |
| `pnpm package-manifests:check` | Checks package manifests for dependency consistency, valid workspace references and other Sherif rules without fixes. |
| `pnpm github-actions:check`    | Runs actionlint against all `.github/workflows/*.yml` files.                                                          |
| `pnpm rulesync:install`        | Installs the configured Rulesync rules.                                                                               |
| `pnpm rulesync:update`         | Updates the configured Rulesync rules.                                                                                |
| `pnpm rulesync:preview`        | Previews generated rules without writing them.                                                                        |
| `pnpm rulesync:apply`          | Writes generated rules.                                                                                               |

## Source and workspace execution

Implement package source, scripts and tests in TypeScript ESM. Keep JavaScript limited to small tool configuration entry points or explicit interoperability requirements.

Installing dependencies, running checks and using workspace packages must not require a build first. Keep type checking separate from execution and include it in CI.
