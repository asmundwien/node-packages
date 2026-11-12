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

## Configuration policy

The lint and compiler packages constrain agent-generated code to reduce human review burden. Choose constraints for a concrete risk or deliberate convention, not strictness alone. Prevention does not require a prior incident. Fix the underlying concern rather than evade a check.

### Decision rationale

Keep rationale beside each configuration decision, including overrides. Explain the chosen value and material tradeoffs. Label it with applicable purposes in this order:

| Purpose | Intent |
| --- | --- |
| `correctness` | Prevent bugs, unsafe operations, and broken contracts. |
| `architectural-prevention` | Restrict risks in complexity, coupling, ownership, effects, and resource use. |
| `standardization` | Choose predictable source and tooling conventions. |
| `enforcement-integrity` | Preserve checks and prevent bypasses. |

Use `// [purpose, ...] Reason.` for enforced requirements. For relaxed requirements, use `// [purpose, ...] Off (reason): Explanation.` For deliberate exclusions, use `// [purpose, ...] Omit (reason): name; explanation.` Record exclusions without adding ineffective settings.

For `Off` and `Omit`, labels describe the relaxed requirement. Choose a reason:

| Reason | Required rationale |
| --- | --- |
| `covered` | Replacement check and its prerequisites. |
| `compatibility` | Conflicting contract, required pattern, and affected scope. |
| `scope` | Accepted pattern or trusted input, excluded scope, and remaining risk. |

### Exceptions

Exceptions require human approval, a narrow scope, a concrete reason, and an accepted code pattern. Expanding the scope or pattern requires renewed approval. Agents must not approve or broaden their own exceptions.
