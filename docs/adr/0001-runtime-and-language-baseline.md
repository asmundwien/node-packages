# Runtime and language baseline

Use Node.js 26 LTS for development and as the minimum runtime for consumers. Selecting the same LTS major for both keeps development assumptions consistent with the consumer contract. Browser applications retain their own runtime targets.

Pin developer toolchain versions for reproducible local and CI results. Consumers share the runtime minimum, not the exact developer toolchain patch versions.

Use a fixed yearly ECMAScript baseline supported by the selected runtime and compiler rather than a moving `ESNext` baseline. This permits modern standardized JavaScript without allowing a compiler upgrade to silently expand runtime requirements.

Review the baseline when a new Node.js LTS major arrives. Adoption is an explicit decision, not an automatic consequence of a dependency update.

## References

- [Node.js release policy](https://nodejs.org/en/about/previous-releases)
- [Published ECMAScript standard](https://ecma-international.org/publications-and-standards/standards/ecma-262/)
