# Process

## Pull requests

Use pull requests to review changes before they reach `main`.
Resolve review feedback and ensure the PR quality gate passes before merging.

## Action updates

Review Dependabot pull requests to keep GitHub Actions dependencies current.

When changing action versions, run `gh actions-lock` and include the generated lockfile in your pull request. Run `gh actions-lock --verify` and `pnpm github-actions:check` before requesting review.
