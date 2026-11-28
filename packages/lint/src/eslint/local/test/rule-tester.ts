import { RuleTester as ESLintRuleTester } from 'eslint';
import { parser } from 'typescript-eslint';
import { describe, test } from 'vitest';

import type { TSESLint } from '@typescript-eslint/utils';

ESLintRuleTester.describe = describe;

ESLintRuleTester.itOnly = test.only;

ESLintRuleTester.it = test;

class RuleTester {
  readonly #tester: ESLintRuleTester;

  public constructor(config: ConstructorParameters<typeof ESLintRuleTester>[0] = {}) {
    this.#tester = new ESLintRuleTester({
      ...config,
      languageOptions: {
        ...config.languageOptions,
        parser,
      },
    });
  }

  public run(
    name: string,
    rule: TSESLint.LooseRuleDefinition,
    tests: Parameters<ESLintRuleTester['run']>[2],
  ): void {
    // SAFETY: The tester supplies the parser used by these native JavaScript/TypeScript rules.
    this.#tester.run(name, rule as Parameters<ESLintRuleTester['run']>[1], tests);
  }
}

export { RuleTester };
