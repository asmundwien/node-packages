import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { ESLint } from 'eslint';
import { describe, expect, onTestFinished, test } from 'vitest';

import { base, node, react, typescript } from '../src/eslint/index.mjs';

const profiles = [
  { extension: 'mjs', layers: [base], name: 'base JavaScript', runtime: 'generic' },
  { extension: 'mjs', layers: [base, node], name: 'Node JavaScript', runtime: 'node' },
  { extension: 'mts', layers: [base, typescript], name: 'base TypeScript', runtime: 'generic' },
  { extension: 'mts', layers: [base, typescript, node], name: 'Node TypeScript', runtime: 'node' },
  { extension: 'tsx', layers: [base, typescript, react], name: 'React TypeScript', runtime: 'browser' },
];

function createPackages(runtime) {
    return [
        { exports: { require: './entry.cjs' }, name: 'require-only', rejected: true },
        {
            // Export-map order is significant even though both conditions are present.
            exports: Object.fromEntries([['require', './missing.cjs'], ['import', './entry.mjs']]),
            name: 'require-before-import',
            rejected: false,
        },
        { exports: { default: './entry.mjs' }, name: 'default-only', rejected: false },
        { exports: { node: './entry.mjs' }, name: 'node-only', rejected: runtime !== 'node' },
        { exports: { 'node-addons': './entry.mjs' }, name: 'addon-only', rejected: runtime !== 'node' },
        { exports: { browser: './entry.mjs' }, name: 'browser-only', rejected: runtime !== 'browser' },
    ];
}

async function writePackages(directory, packages) {
    for (const fixture of packages) {
        const packageDirectory = path.join(directory, 'node_modules', fixture.name);
        await mkdir(packageDirectory, { recursive: true });
        await writeFile(path.join(packageDirectory, 'package.json'), JSON.stringify({
            exports: fixture.exports,
            name: fixture.name,
            type: 'module',
        }));
        await writeFile(path.join(packageDirectory, 'entry.mjs'), 'export const value = 1;\n');
        await writeFile(path.join(packageDirectory, 'entry.cjs'), 'exports.value = 1;\n');
    }
}

async function writeConsumer(directory, extension, packages) {
    await writeFile(path.join(directory, 'package.json'), JSON.stringify({ type: 'module' }));
    await writeFile(path.join(directory, 'tsconfig.json'), JSON.stringify({
        compilerOptions: { jsx: 'react-jsx', module: 'NodeNext', strict: true },
        include: ['*.mts', '*.tsx'],
    }));
    const source = packages.map((fixture, index) => `import { value as value${index} } from '${fixture.name}';\n`
    ).join('');
    const filePath = path.join(directory, `consumer.${extension}`);
    await writeFile(filePath, source);
    return filePath;
}

function createESLint(directory, layers) {
    return new ESLint({
        cwd: directory,
        overrideConfig: [
            ...layers.flat(),
            {
                files: ['**/*.{mts,tsx}'],
                languageOptions: { parserOptions: { tsconfigRootDir: directory } },
            },
        ],
        overrideConfigFile: true,
    });
}

describe('ESM export resolution', () => {
  test.each(profiles)('resolves ESM exports for $name using only its runtime conditions',
    async ({ extension, layers, runtime }) => {
      const directory = await mkdtemp(path.join(tmpdir(), 'lint-import-resolution-'));
      onTestFinished(() => rm(directory, { force: true, recursive: true }));
      const packages = createPackages(runtime);
      await writePackages(directory, packages);
      const filePath = await writeConsumer(directory, extension, packages);
      const eslint = createESLint(directory, layers);
      const [result] = await eslint.lintFiles([filePath]);

      expect(result.fatalErrorCount, JSON.stringify(result.messages)).toBe(0);
      expect(
        result.messages
          .filter((message) => message.ruleId === 'import-x/no-unresolved')
          .map((message) => packages[message.line - 1].name),
      ).toStrictEqual(packages.filter((fixture) => fixture.rejected).map((fixture) => fixture.name));
    });
});
