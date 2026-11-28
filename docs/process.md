# Process

Use this guide to prepare pull requests and update GitHub Actions dependencies. See [Contributing](./contributing.md) for workspace setup and development commands.

## Pull requests

Use pull requests to review changes before they reach `main`.

## Action updates

Review [Dependabot](../.github/dependabot.yml) pull requests for GitHub Actions updates.

Install [GitHub CLI](https://cli.github.com/) and its [actions-lock extension](https://github.com/github/gh-actions-lock), then authenticate with GitHub before updating the action lockfile.

When changing action versions, run these commands from the repository root:

```sh
gh actions-lock
gh actions-lock --verify
pnpm github-actions:check
```

