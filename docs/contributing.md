## Development

Use the Node version pinned in `package.json`.

Install dependencies with `pnpm install --frozen-lockfile`.

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
