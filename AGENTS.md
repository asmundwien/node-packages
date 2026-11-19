## Documentation

### All documentation must be canonical

Documentation is never historical unless that is its explicit purpose. Describe the current behavior, contracts and procedures as the authoritative reference. Omit implementation history, future plans, status commentary and lists of what the system does not do. Update it alongside implementation changes. This also applies to comments and jsdocs.

### Never repeat yourself

Keep each fact in one authoritative location and link to it elsewhere.

## Installing node modules locally

Unless you have a very spesiffic reason not to, always use package versions that satisfy the default waiting period enforced by `pnpm`.
