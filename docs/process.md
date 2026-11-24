# Process

Use this guide to prepare pull requests and update GitHub Actions dependencies. See [Contributing](./contributing.md) for workspace setup and development commands.

## Pull requests

Use pull requests to review changes before they reach `main`. Resolve review feedback and require the PR quality gate to pass before merging.

The [PR quality gate workflow](../.github/workflows/quality-gate.yml) runs for pull requests targeting `main` and defines the required automated checks. Run the corresponding [development commands](./contributing.md#development) locally before requesting review.

## Action updates

Review [Dependabot](../.github/dependabot.yml) pull requests for GitHub Actions updates.

Install [GitHub CLI](https://cli.github.com/) and its [actions-lock extension](https://github.com/github/gh-actions-lock), then authenticate with GitHub before updating the action lockfile.

When changing action versions, run these commands from the repository root:

```sh
gh actions-lock
gh actions-lock --verify
pnpm github-actions:check
```

Include any workflow changes and the generated [action lockfile](../.github/workflows/actions.lock) in the pull request. Do not edit the lockfile by hand. The verification command checks the lockfile against GitHub without changing workflows or the lockfile.
