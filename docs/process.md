# Process

## Pull requests

The PR quality gate provides automated feedback before changes reach `main`. Review the `checks` result on your pull request and resolve failures before merging.

## Action updates

Review Dependabot pull requests to keep GitHub Actions dependencies current.

When changing action versions, run `gh actions-lock` and include the generated lockfile in your pull request. Run `gh actions-lock --verify` and `pnpm github-actions:check` before requesting review.
