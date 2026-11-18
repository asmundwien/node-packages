import { defineConfig } from "eslint/config";

import { setup } from "@asmundwien/lint/eslint";

const config = defineConfig(setup({
  runtime: "node",
  tsconfigRootDir: import.meta.dirname,
}), {
  files: ["src/eslint/**/*.ts"],
  rules: {
    // [standardization] Off (compatibility): Use camelCase bindings and properties and PascalCase types; human-approved exceptions in this package's policy source allow external object-literal keys requiring quotes and the exact Node global keys __dirname and __filename.
    "@typescript-eslint/naming-convention": [
      "error",
      { format: ["camelCase"], selector: "default" },
      { format: ["PascalCase"], selector: "typeLike" },
      { format: [], modifiers: ["requiresQuotes"], selector: "objectLiteralProperty" },
      { filter: "^__(dirname|filename)$", format: [], selector: "objectLiteralProperty" },
    ],
  },
}, {
  files: ["src/eslint/node/index.ts"],
  rules: {
    // [standardization] Off (compatibility): Human-approved n import and plugin registration match eslint-plugin-n's default export name as required by import-x/no-rename-default; retain the two-character minimum for other identifiers in this module.
    "id-length": ["error", { exceptions: ["n"], min: 2 }],
  },
});

export default config;
