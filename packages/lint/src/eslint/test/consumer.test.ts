import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { ESLint } from 'eslint';
import { describe, test } from 'vitest';

import { setup } from '../index.ts';

import type { Linter } from 'eslint';

async function lintConsumer(code: string, hasEffect = false): Promise<Linter.LintMessage[]> {
  const directory = await mkdtemp(path.join(tmpdir(), 'lint-consumer-'));

  try {
    const filename = path.join(directory, 'source.ts');

    await writeFile(path.join(directory, 'tsconfig.json'), JSON.stringify({
      compilerOptions: { module: 'NodeNext', noEmit: true, strict: true, target: 'ESNext' },
      include: ['source.ts'],
    }));
    await writeFile(filename, code);

    const eslint = new ESLint({
      cwd: directory,
      overrideConfig: setup({ effect: hasEffect, runtime: 'generic', tsconfigRootDir: directory }),
      overrideConfigFile: true,
    });

    const [result] = await eslint.lintFiles([filename]);

    assert.ok(result !== undefined);
    assert.equal(result.fatalErrorCount, 0, JSON.stringify(result.messages));

    return result.messages;
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
}

const packageRoot = path.resolve(import.meta.dirname, '../../..');

async function lintRepeatedConsumer(): Promise<string> {
  const directory = await mkdtemp(path.join(tmpdir(), 'lint-reparse-'));

  try {
    await writeFile(path.join(directory, 'package.json'), JSON.stringify({ dependencies: { vitest: '*' }, type: 'module' }));
    await writeFile(path.join(directory, 'tsconfig.json'), JSON.stringify({
      compilerOptions: { module: 'NodeNext', noEmit: true, strict: true, target: 'ES2025' },
      include: ['source.ts'],
    }));
    await writeFile(path.join(directory, 'source.ts'), 'import { vi } from "vitest";\n\nexport const mock = vi.fn();\n');
    await symlink(path.join(packageRoot, 'node_modules'), path.join(directory, 'node_modules'), 'junction');

    const { promise, reject, resolve } = Promise.withResolvers<string>();

    execFile(process.execPath, ['--input-type=module', '-e', `
      import assert from 'node:assert/strict';
      import { ESLint } from 'eslint';
      import { setup } from './src/eslint/index.ts';
      process.env.CI = 'true';
      process.env.TSESTREE_SINGLE_RUN = 'true';
      const directory = ${JSON.stringify(directory)};
      const eslint = new ESLint({
        cwd: directory,
        overrideConfigFile: true,
        overrideConfig: setup({ runtime: 'node', tsconfigRootDir: directory }),
      });
      for (let pass = 0; pass < 2; pass++) {
        const [result] = await eslint.lintFiles(['source.ts']);
        assert.ok(result);
        console.log(JSON.stringify(result.messages));
      }
    `], { cwd: packageRoot, timeout: 15_000 }, (error, output) => {
      if (error !== null) {
        reject(error);

        return;
      }

      resolve(output);
    });

    return await promise;
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
}

describe(setup, () => {
test('consumer policy rejects reflective calls and accepts typed calls', async () => {
  const rejected = await lintConsumer('const invoke = () => 1; Reflect.apply(invoke, undefined, []);');
  const accepted = await lintConsumer('const invoke = () => 1; invoke();');

  assert.ok(rejected.some(message => message.ruleId === 'local/no-reflect-apply'));
  assert.ok(accepted.every(message => message.ruleId !== 'local/no-reflect-apply'));
});

test('consumer policy permits fresh reducer mutation and rejects accumulator copies', async () => {
  const accepted = await lintConsumer('export const values = [0, 1].reduce<number[]>((accumulator, item) => {\n  accumulator.push(item);\n\n  return accumulator;\n}, []);\n');
  const rejected = await lintConsumer('export const values = [0, 1].reduce<number[]>((accumulator, item) => [...accumulator, item], []);');

  assert.deepEqual(accepted, []);
  assert.ok(rejected.some(message => message.ruleId === 'local/no-reduce-accumulator-copy'));
});

test('consumer policy requires a safety invariant for single assertions', async () => {
  const rejected = await lintConsumer('declare const value: string; export const identifier = value as string & { readonly __brand: "Identifier" };');
  const accepted = await lintConsumer('declare const value: string;\n// SAFETY: The caller validated the identifier before branding it.\nexport const identifier = value as string & { readonly __brand: "Identifier" };');

  assert.ok(rejected.some(message => message.ruleId === 'local/require-safety-comment-for-type-assertion'));
  assert.ok(accepted.every(message => message.ruleId !== 'local/require-safety-comment-for-type-assertion' && message.ruleId !== '@typescript-eslint/no-unsafe-type-assertion'));
});

test('consumer policy rejects direct and transparently wrapped assertion chains once', async () => {
  const expressions = [
    '(value as string) as "selected"',
    '((value as string) satisfies string) as "selected"',
    '(value as string)! as "selected"',
  ];

  for (const expression of expressions) {
    const messages = await lintConsumer(`declare const value: "selected" | "other";\n// SAFETY: The caller selected this value before narrowing it.\nexport const selected = ${expression};\n`);
    const chainErrors = messages.filter(message => message.ruleId === 'local/no-chained-type-assertions');

    assert.equal(chainErrors.length, 1, JSON.stringify(messages));
  }
});

test('consumer policy accepts a justified assertion through transparent wrappers', async () => {
  const messages = await lintConsumer('declare const value: "selected" | "other";\n// SAFETY: The caller selected this value before narrowing it.\nexport const selected = (value satisfies "selected" | "other") as "selected";\n');

  assert.ok(messages.every(message => message.ruleId !== 'local/no-chained-type-assertions' && message.ruleId !== 'local/require-safety-comment-for-type-assertion' && message.ruleId !== '@typescript-eslint/no-unsafe-type-assertion'), JSON.stringify(messages));
});

test('consumer policy reports local boundary and collection violations', async () => {
  const messages = await lintConsumer('export function parse(value: unknown): string { return typeof value === "string" ? value : ""; }\nexport const selected = [1, 2].filter(value => value > 0).map(value => value + 1);');

  assert.ok(messages.some(message => message.ruleId === 'local/no-unknown-parameters'));
  assert.ok(messages.some(message => message.ruleId === 'local/no-runtime-typeof'));
  assert.ok(messages.some(message => message.ruleId === 'local/no-array-filter-map'));
});

test('effect construction policy applies only to opted-in consumers', async () => {
  const source = 'export const ready = { _tag: "Ready" };';
  const accepted = await lintConsumer(source);
  const rejected = await lintConsumer(source, true);

  assert.ok(accepted.every(message => !(message.ruleId?.startsWith('local-effect/') ?? false)));
  assert.ok(rejected.some(message => message.ruleId === 'local-effect/no-manual-tagged-construction'));
});

test('consumer policy preserves imported types across single-run reparses', async () => {
  assert.equal(await lintRepeatedConsumer(), '[]\n[]\n');
});
});

