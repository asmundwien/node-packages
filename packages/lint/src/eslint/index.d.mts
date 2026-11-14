import type { Linter } from "eslint";

declare const base: Linter.Config[];
declare const typescript: Linter.Config[];
declare const node: Linter.Config[];
declare const react: Linter.Config[];
declare const vitest: Linter.Config[];

export { base, node, react, typescript, vitest };
