# Contributing to @asmundwien/lint

For consumer configuration, layers, peers and lint policy, see the [package README](../README.md).

## Configuration modules

Each module has its own declaration in `eslint/`.

## Rule override comments

Every locally authored rule entry, including additions, option changes and `off` entries, must have an immediately preceding comment that explains why the selected upstream settings are insufficient or unsuitable and what behavior the override requires.

- For conflicting or duplicate checks, name the exact replacement rule and the check it owns.
- For compatibility exclusions, name the unavailable API or incompatible plugin behavior and the affected Node or ESLint version.
- For policy choices, state the concrete accepted or rejected code pattern. Explain the chosen options when they change upstream behavior.
- For checks absent from a preset, state the missing enforcement and the requirement it adds.

An upstream overlay needs one comment explaining why that overlay is selected. Descriptions such as "not needed", "best practice" or a restatement of the rule name are insufficient. Reasons must describe verified behavior rather than guesses.

Remove an override when the inherited setting already has the same severity and options. Remove an `off` entry when the inherited rule is already absent or disabled, or its empty configuration performs no checks. Keep policy explanations beside effective overrides rather than retaining inactive entries as a record of reviewed rules.
