import { defineConfig } from "eslint/config";

import { setup } from "@asmundwien/lint/eslint";

const config = defineConfig(setup({
  runtime: "node",
  tsconfigRootDir: import.meta.dirname,
}), {
  files: ["src/eslint/node/index.ts"],
  rules: {
    // [standardization] Off (compatibility): Human-approved n import and plugin registration match eslint-plugin-n's default export name as required by import-x/no-rename-default; retain the two-character minimum for other identifiers in this module.
    "id-length": ["error", { exceptions: ["n"], min: 2 }],
  },
});

export default config;
