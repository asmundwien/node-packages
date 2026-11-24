import path from 'node:path';

import { createTypeScriptImportResolver, defaultMainFields } from 'eslint-import-resolver-typescript';
import { createNodeResolver } from 'eslint-plugin-import-x';

import type { Linter } from 'eslint';

const resolverPolicies = {
  generic: {
    // [correctness] Keep runtime-neutral ESM conditions and the existing bundler entry priorities.
    javascript: { conditionNames: ['import', 'default'], mainFields: ['module', 'main'] },
    typescript: { conditionNames: ['types', 'import', 'default'], mainFields: defaultMainFields },
  },
  node: {
    // [correctness] Match Node's ESM conditions and main entry, with declaration fields taking priority for TypeScript.
    javascript: { conditionNames: ['node', 'node-addons', 'module-sync', 'import', 'default'], mainFields: ['main'] },
    typescript: { conditionNames: ['types', 'node', 'node-addons', 'module-sync', 'import', 'default'], mainFields: ['types', 'typings', 'main'] },
  },
  react: {
    // [correctness] Preserve runtime-neutral JavaScript tooling resolution and browser-aware TypeScript resolution with bundler entry priorities.
    javascript: { conditionNames: ['import', 'default'], mainFields: ['module', 'main'] },
    typescript: { conditionNames: ['types', 'browser', 'import', 'default'], mainFields: defaultMainFields },
  },
};

type Runtime = keyof typeof resolverPolicies;

function importResolution({ runtime, tsconfigRootDir }: {
  readonly runtime: Runtime;
  readonly tsconfigRootDir: string;
}): Linter.Config[] {
  const policy = resolverPolicies[runtime];

  return [
    {
      files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
      name: '@asmundwien/lint/import-resolution/javascript',
      settings: {
        // [correctness] Resolve ESM JavaScript entries using the selected runtime's conditions and package fields.
        'import-x/resolver-next': [createNodeResolver({
          ...policy.javascript,
          extensions: ['.mjs', '.cjs', '.js', '.jsx', '.json', '.node'],
        })],
      },
    },
    {
      files: ['**/*.{ts,tsx,mts,cts}'],
      languageOptions: { parserOptions: { tsconfigRootDir } },
      name: '@asmundwien/lint/import-resolution/typescript',
      settings: {
        // [correctness] Resolve aliases from the root tsconfig while applying the runtime's TypeScript entry policy.
        'import-x/resolver-next': [createTypeScriptImportResolver({
          ...policy.typescript,
          project: path.join(tsconfigRootDir, 'tsconfig.json'),
        })],
      },
    },
  ];
}

export { importResolution };

export type { Runtime };
