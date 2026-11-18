import path from 'node:path';

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

import { base } from './base/index.ts';
import { node } from './node/index.ts';
import { react } from './react/index.ts';
import { typescript } from './typescript/index.ts';
import { vitest } from './vitest/index.ts';

import type { Linter } from 'eslint';

/**
Project settings for {@link setup}.
*/
interface SetupOptions {
  /**
  Selects environment-specific rules, globals and import resolution. Use `generic` for runtime-neutral code, `node` for Node.js, or `react` for React 19 browser projects.
  */
  readonly runtime: 'generic' | 'node' | 'react';
  /**
  Absolute directory containing the project's `tsconfig.json`.
  */
  readonly tsconfigRootDir: string;
}

/**
Creates an ordered ESLint flat configuration for a TypeScript ESM project.

Shared rules and type-aware TypeScript checks always apply. Runtime settings follow the shared policy, and Vitest rules apply within their test-file scopes. TypeScript files must belong to the compiler project in `tsconfigRootDir`.

@param options - Runtime selection and compiler-project location.
@returns Flat configuration ready to export or compose with file-scoped overrides.

@example
```ts
export default setup({
  runtime: 'node',
  tsconfigRootDir: import.meta.dirname,
});
```
*/
function setup({ runtime, tsconfigRootDir }: SetupOptions): Linter.Config[] {
  const runtimeConfigs = { generic: [], node, react };
  const runtimeConditions = { generic: [], node: ['node', 'node-addons', 'module-sync'], react: ['browser'] };

  return [
    ...base,
    ...typescript,
    ...runtimeConfigs[runtime],
    {
      files: ['**/*.{ts,tsx,mts,cts}'],
      languageOptions: { parserOptions: { tsconfigRootDir } },
      name: '@asmundwien/lint/typescript/project-root',
      settings: {
        // [correctness] Resolve aliases from the parser's compiler project while preserving the selected runtime's ESM export conditions.
        'import-x/resolver-next': [createTypeScriptImportResolver({
          conditionNames: ['types', ...runtimeConditions[runtime], 'import', 'default'],
          project: path.join(tsconfigRootDir, 'tsconfig.json'),
        })],
      },
    },
    ...vitest,
  ];
}

export { setup };
export type { SetupOptions };
