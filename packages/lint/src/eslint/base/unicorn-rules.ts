import type { Linter } from 'eslint';

import { unicornApiRules } from './unicorn-api-rules.ts';
import { unicornArchitectureRules } from './unicorn-architecture-rules.ts';
import { unicornConventionRules } from './unicorn-convention-rules.ts';
import { unicornSafetyRules } from './unicorn-safety-rules.ts';

const unicornRules: Linter.RulesRecord = {
  ...unicornApiRules,
  ...unicornArchitectureRules,
  ...unicornConventionRules,
  ...unicornSafetyRules,
};

export { unicornRules };
