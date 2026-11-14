import finalPlugin from '@eslint-react/eslint-plugin';
import { defineConfig } from 'eslint/config';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const react = defineConfig({
  files: ['**/*.{ts,tsx,mts,cts}'],
  languageOptions: {
    globals: globals.browser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
  name: '@asmundwien/lint/react',
  plugins: { '@eslint-react': finalPlugin, 'react-hooks': { meta: hooks.meta, rules: hooks.rules } },
  rules: {
    // [correctness] Raw HTML injection bypasses React's escaping and can execute attacker-controlled markup.
    '@eslint-react/dom-no-dangerously-set-innerhtml': 'error',
    // [correctness] React 19 removed findDOMNode, so generated DOM access must use supported refs.
    '@eslint-react/dom-no-find-dom-node': 'error',
    // [architectural-prevention] Forced synchronous commits interrupt React scheduling and can add blocking rendering work.
    '@eslint-react/dom-no-flush-sync': 'error',
    // [correctness] React 19 removed ReactDOM.hydrate, so hydration must use the supported hydrateRoot entry point.
    '@eslint-react/dom-no-hydrate': 'error',
    // [correctness] A button without an explicit type can submit its surrounding form when it was intended only to perform an action.
    '@eslint-react/dom-no-missing-button-type': 'error',
    // [correctness] An explicit iframe sandbox restricts embedded content rather than granting unrestricted browser capabilities by default.
    '@eslint-react/dom-no-missing-iframe-sandbox': 'error',
    // [correctness] React 19 removed ReactDOM.render, so mounting must use the supported createRoot entry point.
    '@eslint-react/dom-no-render': 'error',
    // [correctness] JavaScript URLs execute code in the page instead of navigating and can introduce script injection.
    '@eslint-react/dom-no-script-url': 'error',
    // [correctness] React requires an object for style props and rejects CSS strings at runtime.
    '@eslint-react/dom-no-string-style-prop': 'error',
    // [correctness] Unsupported or misspelled DOM props can leave the intended browser behavior or attribute unset.
    '@eslint-react/dom-no-unknown-property': 'error',
    // [correctness] Unsafe sandbox permission combinations let embedded content remove restrictions intended to isolate it.
    '@eslint-react/dom-no-unsafe-iframe-sandbox': 'error',
    // [correctness] noreferrer prevents linked pages from receiving the referrer or retaining an opener reference to this page.
    '@eslint-react/dom-no-unsafe-target-blank': 'error',
    // [standardization] Use React 19's useActionState name so generated form code follows the supported replacement for useFormState.
    '@eslint-react/dom-no-use-form-state': 'error',
    // [correctness] Void HTML elements cannot contain children, and passing children violates React's DOM element contract.
    '@eslint-react/dom-no-void-elements-with-children': 'error',
    // [standardization] Write children as nested JSX so generated component composition has one searchable representation.
    '@eslint-react/jsx-no-children-prop': 'error',
    // [correctness] Comment-like JSX text renders to users unless it uses a JSX comment expression.
    '@eslint-react/jsx-no-comment-textnodes': 'error',
    // [standardization] Put key before spreads to retain the selected automatic JSX runtime path instead of its createElement fallback.
    '@eslint-react/jsx-no-key-after-spread': 'error',
    // [correctness] A template-style dollar sign beside JSX interpolation becomes unintended visible text.
    '@eslint-react/jsx-no-leaked-dollar': 'error',
    // [correctness] A statement semicolon copied after a JSX expression becomes unintended visible text.
    '@eslint-react/jsx-no-leaked-semicolon': 'error',
    // [correctness] React does not support JSX namespace syntax, so generated namespaced elements violate the renderer contract.
    '@eslint-react/jsx-no-namespace': 'error',
    // [standardization] Omit redundant fragments so generated JSX has no extra grouping unless its expression contract needs it.
    '@eslint-react/jsx-no-useless-fragment': 'error',
    // [standardization] PascalCase names ending in Context distinguish generated context providers from ordinary values in JSX and search.
    '@eslint-react/naming-convention-context-name': 'error',
    // [standardization] Name useId results id or with an Id suffix so reviewers can recognize generated DOM identifiers.
    '@eslint-react/naming-convention-id-name': 'error',
    // [standardization] Name useRef results ref or with a Ref suffix so reviewers can recognize mutable references.
    '@eslint-react/naming-convention-ref-name': 'error',
    // [correctness] Functional state updates must use the pending state rather than a stale this.state snapshot.
    '@eslint-react/no-access-state-in-setstate': 'error',
    // [correctness] Positional keys can attach a prior item's state to a different item after insertion or reordering.
    '@eslint-react/no-array-index-key': 'error',
    // [standardization] Use explicit child data for counts so generated components do not depend on opaque Children traversal conventions.
    '@eslint-react/no-children-count': 'error',
    // [standardization] Iterate explicit child data so review can follow the collection without React Children traversal semantics.
    '@eslint-react/no-children-for-each': 'error',
    // [standardization] Transform explicit child data rather than opaque React elements so generated collection code uses one representation.
    '@eslint-react/no-children-map': 'error',
    // [standardization] Declare single-child props instead of runtime Children.only assertions so component contracts use the chosen props convention.
    '@eslint-react/no-children-only': 'error',
    // [standardization] Keep child collections as explicit arrays rather than reconstructing them through React's opaque children API.
    '@eslint-react/no-children-to-array': 'error',
    // [standardization] Generate function components and hooks, with error-boundary classes as the supported exception.
    '@eslint-react/no-class-component': 'error',
    // [architectural-prevention] Explicit props keep ownership of child inputs visible instead of overriding another element's props through cloning.
    '@eslint-react/no-clone-element': 'error',
    // [correctness] Pre-mount lifecycle effects can repeat or run for abandoned renders before React commits.
    '@eslint-react/no-component-will-mount': 'error',
    // [correctness] Receive-props lifecycle work can repeat before commit and overwrite state based on uncommitted props.
    '@eslint-react/no-component-will-receive-props': 'error',
    // [correctness] Pre-update lifecycle effects can run for an update that React never commits.
    '@eslint-react/no-component-will-update': 'error',
    // [standardization] Use React 19's context element spelling so generated providers follow the selected framework API.
    '@eslint-react/no-context-provider': 'error',
    // [standardization] Use useRef in function components as the chosen ref API instead of generating createRef calls intended for classes.
    '@eslint-react/no-create-ref': 'error',
    // [correctness] Mutating this.state bypasses React's update scheduling and can leave rendered output stale.
    '@eslint-react/no-direct-mutation-state': 'error',
    // [standardization] React 19 accepts ref as a prop, so generated components do not need the older forwardRef wrapper convention.
    '@eslint-react/no-forward-ref': 'error',
    // [correctness] Conditional JSX expressions can render values such as zero instead of omitting the intended child.
    '@eslint-react/no-leaked-conditional-rendering': 'error',
    // [standardization] Name anonymous memoized components so DevTools and failure diagnostics identify the generated component.
    '@eslint-react/no-missing-component-display-name': 'error',
    // [standardization] Name contexts so DevTools identifies the provider being inspected instead of displaying an anonymous context.
    '@eslint-react/no-missing-context-display-name': 'error',
    // [correctness] Missing list keys prevent React from reliably associating child state with the intended item across updates.
    '@eslint-react/no-missing-key': 'error',
    // [correctness] Nested component definitions create new component types that can remount children and discard their state.
    '@eslint-react/no-nested-component-definitions': 'error',
    // [correctness] Recreating lazy component declarations during rendering changes component identity and can reset child state.
    '@eslint-react/no-nested-lazy-component-declarations': 'error',
    // [architectural-prevention] Synchronous mount state updates add a second render before paint, a preventable rendering-cost pattern.
    '@eslint-react/no-set-state-in-component-did-mount': 'error',
    // [correctness] Synchronous state updates after an update can schedule another update indefinitely.
    '@eslint-react/no-set-state-in-component-did-update': 'error',
    // [correctness] Scheduling state updates during the pre-update lifecycle violates React's supported update lifecycle.
    '@eslint-react/no-set-state-in-component-will-update': 'error',
    // [standardization] Reserve use-prefixed names for hook functions so generated call sites communicate hook restrictions consistently.
    '@eslint-react/no-unnecessary-use-prefix': 'error',
    // [correctness] Renaming pre-mount work with UNSAFE_ does not stop effects from running before an abandoned render commits.
    '@eslint-react/no-unsafe-component-will-mount': 'error',
    // [correctness] UNSAFE_componentWillReceiveProps can run before commit, so deriving state there can use uncommitted props.
    '@eslint-react/no-unsafe-component-will-receive-props': 'error',
    // [correctness] UNSAFE_componentWillUpdate can perform effects for updates that React abandons before commit.
    '@eslint-react/no-unsafe-component-will-update': 'error',
    // [architectural-prevention] Fresh context value identities trigger consumer updates even when their underlying data has not changed.
    '@eslint-react/no-unstable-context-value': 'error',
    // [architectural-prevention] Fresh object or function defaults invalidate identity-based dependencies and memoization on every omitted-prop render.
    '@eslint-react/no-unstable-default-props': 'error',
    // [standardization] Remove unused class members so generated error boundaries do not retain misleading implementation code.
    '@eslint-react/no-unused-class-component-members': 'error',
    // [standardization] Use React 19's use API for context reads so generated components follow one selected context convention.
    '@eslint-react/no-use-context': 'error',
    // [architectural-prevention, standardization] Destructured state and matching setter names make updates recognizable; lazy expensive initializers avoid repeating work on renders.
    '@eslint-react/use-state': 'error',
    // [architectural-prevention] Missing listener cleanup retains callbacks and can continue handling events after the component's lifetime.
    '@eslint-react/web-api-no-leaked-event-listener': 'error',
    // [architectural-prevention] Missing intersection observer cleanup retains observation work and callbacks beyond the component's lifetime.
    '@eslint-react/web-api-no-leaked-intersection-observer': 'error',
    // [architectural-prevention] Uncleared intervals retain callbacks and repeat work after the component no longer owns them.
    '@eslint-react/web-api-no-leaked-interval': 'error',
    // [architectural-prevention] Missing resize observer cleanup retains observation work and callbacks beyond the component's lifetime.
    '@eslint-react/web-api-no-leaked-resize-observer': 'error',
    // [architectural-prevention] Uncleared timeouts retain callbacks that can run after the component that scheduled them unmounts.
    '@eslint-react/web-api-no-leaked-timeout': 'error',
    // [correctness] Calling components as functions bypasses React's component identity and hook lifecycle management.
    'react-hooks/capitalized-calls': 'error',
    // [correctness] Invalid React Compiler options can prevent compilation or apply a different transformation policy than intended.
    'react-hooks/config': 'error',
    // [correctness] try/catch around JSX construction cannot catch failures from React's later rendering of the child.
    'react-hooks/error-boundaries': 'error',
    // [correctness] Missing reactive dependencies leave hooks using captured values after those values have changed.
    'react-hooks/exhaustive-deps': 'error',
    // [correctness] Invalid compiler gating configuration can break the runtime selection of compiled component implementations.
    'react-hooks/gating': 'error',
    // [correctness] Render-time global mutations escape React's commit lifecycle and can survive abandoned or repeated renders.
    'react-hooks/globals': 'error',
    // [correctness] Mutating React-owned immutable inputs bypasses identity-based update detection and can leave output stale.
    'react-hooks/immutability': 'error',
    // [correctness] Known incompatible library APIs can return stale UI when React Compiler memoizes their results.
    'react-hooks/incompatible-library': 'error',
    // [architectural-prevention] Fresh object or function effect dependencies repeat effects even when their meaningful inputs have not changed.
    'react-hooks/memoized-effect-dependencies': 'error',
    // [architectural-prevention] Copying derived values into state through effects adds render passes and a second value that must stay synchronized.
    'react-hooks/no-deriving-state-in-effects': 'error',
    // [correctness] Compiler transformations must preserve existing manual memoization dependencies so cached behavior does not change.
    'react-hooks/preserve-manual-memoization': 'error',
    // [correctness] Impure render APIs can return different output for identical inputs when React repeats a render.
    'react-hooks/purity': 'error',
    // [correctness] Mutable ref reads or writes during rendering can make repeated renders disagree before React commits.
    'react-hooks/refs': 'error',
    // [enforcement-integrity] Suppressing React checks hides unresolved hook or compiler obligations from the preventive policy.
    'react-hooks/rule-suppression': 'error',

    // [correctness] React associates hook state with call order, so conditional or unsupported hook calls can read the wrong state or fail.
    'react-hooks/rules-of-hooks': 'error',
    // [architectural-prevention] Synchronous effect state updates add avoidable render passes when render or event handling can compute the value.
    'react-hooks/set-state-in-effect': 'error',
    // [correctness] Unconditional render-time state updates trigger another render and can loop until React aborts.
    'react-hooks/set-state-in-render': 'error',
    // [correctness] Dynamic component identities during rendering can remount children and discard their state.
    'react-hooks/static-components': 'error',
    // [standardization] Generate syntax supported by React Compiler so components stay within the selected compilation contract.
    'react-hooks/unsupported-syntax': 'error',
    // [correctness] Async or argument-taking useMemo callbacks violate its synchronous computation contract and can produce the wrong cached value.
    'react-hooks/use-memo': 'error',
    // [standardization] Reserve useMemo for returned values that callers use rather than generated discarded calculations or effect-like callbacks.
    'react-hooks/void-use-memo': 'error',
  },
  settings: {
    'react-x': {
      importSource: 'react',
      polymorphicPropName: 'as',
      version: '19.0.0',
    },
  },
});

export { react };
