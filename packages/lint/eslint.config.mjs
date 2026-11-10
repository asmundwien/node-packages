import { defineConfig } from "eslint/config";

import { base, node, typescript } from "@asmundwien/lint/eslint";

const config = defineConfig(base, typescript, node, {
  files: ["**/*.{ts,tsx,mts,cts}"],
  languageOptions: {
    parserOptions: { tsconfigRootDir: import.meta.dirname },
  },
});

export default config;
