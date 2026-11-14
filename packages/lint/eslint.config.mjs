import { defineConfig } from "eslint/config";

import { base, node, typescript } from "@asmundwien/lint/eslint";

const config = defineConfig(base, typescript, node, {
  files: ["**/*.{ts,tsx,mts,cts}"],
  languageOptions: {
    parserOptions: { tsconfigRootDir: import.meta.dirname },
  },
}, {
  files: ["src/eslint/node/index.mjs"],
  rules: {
    // [standardization] Off (compatibility): Human-approved n import and plugin registration match eslint-plugin-n's default export name as required by import-x/no-rename-default; retain the two-character minimum for other identifiers in this module.
    "id-length": ["error", { exceptions: ["n"], min: 2 }],
  },
});

export default config;
