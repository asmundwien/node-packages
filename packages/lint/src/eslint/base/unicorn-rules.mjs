import { unicornApiRules } from './unicorn-api-rules.mjs';
import { unicornArchitectureRules } from './unicorn-architecture-rules.mjs';
import { unicornConventionRules } from './unicorn-convention-rules.mjs';
import { unicornSafetyRules } from './unicorn-safety-rules.mjs';

/**
@type {import('eslint').Linter.RulesRecord}
*/
const unicornRules = {
  ...unicornApiRules,
  ...unicornArchitectureRules,
  ...unicornConventionRules,
  ...unicornSafetyRules,
};

export { unicornRules };
