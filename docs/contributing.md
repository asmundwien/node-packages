## Development

Use the Node version pinned in `package.json`.

Install dependencies with `pnpm install --frozen-lockfile`.

| Command                        | Behavior                                                                                                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `pnpm lint`                    | Runs each package's lint command and applies available ESLint fixes.                                                  |
| `pnpm lint:check`              | Checks each package without fixes and fails on ESLint errors or warnings.                                             |
| `pnpm package-manifests`       | Applies Sherif's automatic fixes to package manifests and workspace configuration.                                    |
| `pnpm package-manifests:check` | Checks package manifests for dependency consistency, valid workspace references and other Sherif rules without fixes. |
| `pnpm github-actions:check`    | Runs actionlint against all `.github/workflows/*.yml` files.                                                          |
| `pnpm rulesync:install`        | Installs the configured Rulesync rules.                                                                               |
| `pnpm rulesync:update`         | Updates the configured Rulesync rules.                                                                                |
| `pnpm rulesync:preview`        | Previews generated rules without writing them.                                                                        |
| `pnpm rulesync:apply`          | Writes generated rules.                                                                                               |

## Compiler and task configuration

`tsconfig.base.json` supplies strict checking, ES2022 output syntax, ESNext modules and bundler resolution with TypeScript 6.0.3. It does not choose libraries, ambient types, JSX, input files, output paths or emit policy. Workspaces must choose those settings in their own configurations and extend this base.
