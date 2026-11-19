# Configuration policy

The lint and compiler packages constrain agent-generated code to reduce human review burden. Choose constraints for a concrete risk or deliberate convention, not strictness alone. Prevention does not require a prior incident. Fix the underlying concern rather than evade a check.

## Decision rationale

Give each rule exactly one single-line rationale comment immediately before its configuration. Combine requirements and exceptions in that line; do not wrap it or add separate rationale comments.

Keep rationale beside each configuration decision, including overrides. Explain the chosen value and material tradeoffs. Label it with applicable purposes in this order:

| Purpose                    | Intent                                                                        |
| -------------------------- | ----------------------------------------------------------------------------- |
| `correctness`              | Prevent bugs, unsafe operations, and broken contracts.                        |
| `architectural-prevention` | Restrict risks in complexity, coupling, ownership, effects, and resource use. |
| `standardization`          | Choose predictable source and tooling conventions.                            |
| `enforcement-integrity`    | Preserve checks and prevent bypasses.                                         |

Use `// [purpose, ...] Reason.` for enforced requirements. For relaxed requirements, use `// [purpose, ...] Off (reason): Explanation.` For deliberate exclusions, use `// [purpose, ...] Omit (reason): name; explanation.` Record exclusions without adding ineffective settings.

For `Off` and `Omit`, labels describe the relaxed requirement. Choose a reason:

| Reason          | Required rationale                                                     |
| --------------- | ---------------------------------------------------------------------- |
| `covered`       | Replacement check and its prerequisites.                               |
| `compatibility` | Conflicting contract, required pattern, and affected scope.            |
| `scope`         | Accepted pattern or trusted input, excluded scope, and remaining risk. |

## Exceptions

Exceptions require human approval, a narrow scope, a concrete reason, and an accepted code pattern. Expanding the scope or pattern requires renewed approval. Agents must not approve or broaden their own exceptions.
