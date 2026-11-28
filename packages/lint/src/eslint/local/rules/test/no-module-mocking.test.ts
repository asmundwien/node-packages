import { RuleTester } from "../../test/rule-tester.ts";
import { noModuleMockingRule } from "../no-module-mocking.ts";


const tester = new RuleTester();
const error = { messageId: "moduleMock" };

tester.run("local/no-module-mocking", noModuleMockingRule, {
  invalid: [
    { code: "vi.mock('./user-store');", errors: [error] },
    { code: "jest.mock('./user-store');", errors: [error] },
    { code: "vi['doMock']('./user-store');", errors: [error] },
    { code: "jest.unstable_mockModule('./user-store');", errors: [error] },
    { code: "import { vi } from 'vitest'; vi.mock('./user-store');", errors: [error] },
    { code: "import { vi as testApi } from 'vitest'; testApi.mock('./user-store');", errors: [error] },
    { code: "vitest.mock('./user-store');", errors: [error] },
    { code: "import { vitest } from 'vitest'; vitest.mock('./user-store');", errors: [error] },
    { code: "import { vitest as testApi } from 'vitest'; testApi['doMock']('./user-store');", errors: [error] },
    { code: "type vi = {}; vi.mock('./module');", errors: [error] },
    { code: "interface vi {} vi.mock('./module');", errors: [error] },
    { code: "function test<vi>() { vi.mock('./module'); }", errors: [error] },
    { code: "import type { vi } from './types'; vi.mock('./module');", errors: [error] },
    { code: "import { type vi } from './types'; vi.mock('./module');", errors: [error] },
    { code: "import { vi as testApi } from 'vitest'; function test() { type testApi = {}; testApi.mock('./module'); }", errors: [error] },
    { code: "import { vitest as testApi } from 'vitest'; function test<testApi>() { testApi.mock('./module'); }", errors: [error] },
    { code: "type vitest = {}; vitest.mock('./module');", errors: [error] },
    { code: "import { vitest } from 'vitest'; function test() { interface vitest {} vitest.mock('./module'); }", errors: [error] },
    { code: "type jest = {}; jest.mock('./module');", errors: [error] },
    {
      code: "import { jest } from '@jest/globals'; jest.mock('./user-store');",
      errors: [error],
    },
  ],
  valid: [
    "const store = new InMemoryUserStore();",
    "vi.spyOn(store, 'save');",
    "const vi = { mock() {} }; vi.mock();",
    "function test(jest: { mock(): void }) { jest.mock(); }",
    "import { vi as localVi } from './helpers'; localVi.mock('./module');",
    "const vitest = { mock() {} }; vitest.mock();",
    "function test(vitest: { mock(): void }) { vitest.mock(); }",
    "import { vitest as testApi } from './helpers'; testApi.mock('./module');",
    "import type { vitest as testApi } from 'vitest'; testApi.mock('./module');",
    "import { type vi as testApi } from 'vitest'; testApi.mock('./module');",
    "import { vi as testApi } from 'vitest'; function test(testApi) { testApi.mock('./module'); }",
    "const vi = { mock() {} }; function test() { type vi = {}; vi.mock(); }",
    "const vitest = { mock() {} }; function test<vitest>() { vitest.mock(); }",
    "import { vitest as testApi } from 'vitest'; function test(testApi) { type testApi = {}; testApi.mock('./module'); }",
    "import type { vi } from 'vitest'; const vi = { mock() {} }; vi.mock();",
  ],
});
