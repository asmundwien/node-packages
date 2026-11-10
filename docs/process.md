# Process

## Pull requests

Create a topic branch and open a pull request targeting `main`. The [PR quality gate](../.github/workflows/quality-gate.yml) runs when the pull request opens and when new commits are pushed to it.

The workflow exposes one result, `checks`. It installs dependencies from the frozen lockfile and runs the read-only manifest and workflow checks listed in [Contributing](contributing.md). Its token has read-only repository contents access, and checkout does not retain credentials.

Review the changed files and the `checks` result before merging. Resolve failures in the topic branch and push the fixes to run the gate again. A new run cancels an unfinished run for the same pull request.

The workflow runs on pull requests targeting `main`, not on direct pushes to `main`. Required status checks and review requirements are configured separately in GitHub repository rulesets.

## Action updates

Review Dependabot pull requests to keep GitHub Actions dependencies current.

When changing action versions, run `gh actions-lock` and include the generated lockfile in your pull request. Run `gh actions-lock --verify` and `pnpm github-actions:check` before requesting review.
