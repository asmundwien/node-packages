import reactPlugin from '@eslint-react/eslint-plugin';
import { defineConfig } from 'eslint/config';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const react = defineConfig({
  name: '@asmundwien/lint/react',
  files: ['**/*.{ts,tsx,mts,cts}'],
  languageOptions: {
    globals: globals.browser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
  plugins: { '@eslint-react': reactPlugin, 'react-hooks': { meta: hooks.meta, rules: hooks.rules } },
  settings: {
    'react-x': {
      importSource: 'react',
      version: '19.0.0',
      polymorphicPropName: 'as',
    },
  },
  rules: {
    // Do not read stale this.state inside a class setState update.
    '@eslint-react/no-access-state-in-setstate': 'error',
    // Use stable item identity rather than array positions as reconciliation keys.
    '@eslint-react/no-array-index-key': 'error',
    // Represent child collections explicitly instead of relying on Children.count traversal semantics.
    '@eslint-react/no-children-count': 'error',
    // Iterate explicit child data instead of traversing React's opaque children structure.
    '@eslint-react/no-children-for-each': 'error',
    // Map explicit child data instead of changing opaque children through Children.map.
    '@eslint-react/no-children-map': 'error',
    // Express single-child contracts in component props instead of runtime Children.only assertions.
    '@eslint-react/no-children-only': 'error',
    // Keep child data as explicit arrays instead of rebuilding it through Children.toArray.
    '@eslint-react/no-children-to-array': 'error',
    // Use function components and hooks; retain classes only for error boundaries.
    '@eslint-react/no-class-component': 'error',
    // Pass data through props instead of rewriting existing elements with cloneElement.
    '@eslint-react/no-clone-element': 'error',
    // Reject the legacy pre-mount lifecycle method that React cannot run safely.
    '@eslint-react/no-component-will-mount': 'error',
    // Reject the legacy receive-props lifecycle method that React cannot run safely.
    '@eslint-react/no-component-will-receive-props': 'error',
    // Reject the legacy pre-update lifecycle method that React cannot run safely.
    '@eslint-react/no-component-will-update': 'error',
    // Use React 19's Context provider element rather than the legacy Context.Provider spelling.
    '@eslint-react/no-context-provider': 'error',
    // Use useRef in function components so ref identity survives renders.
    '@eslint-react/no-create-ref': 'error',
    // Update class state through setState instead of mutating this.state directly.
    '@eslint-react/no-direct-mutation-state': 'error',
    // Pass ref as a React 19 prop instead of wrapping components with forwardRef.
    '@eslint-react/no-forward-ref': 'error',
    // Give anonymous memoized components display names that identify them in React DevTools.
    '@eslint-react/no-missing-component-display-name': 'error',
    // Give contexts display names that identify them in React DevTools.
    '@eslint-react/no-missing-context-display-name': 'error',
    // Supply reconciliation keys for every element produced by list rendering.
    '@eslint-react/no-missing-key': 'error',
    // Reject component definitions in JSX props and class renders beyond Hooks' dynamic JSX-use checks.
    '@eslint-react/no-nested-component-definitions': 'error',
    // Declare lazy imports outside components and hooks so their component identity remains stable.
    '@eslint-react/no-nested-lazy-component-declarations': 'error',
    // Avoid synchronous class state updates during mount that force an extra render.
    '@eslint-react/no-set-state-in-component-did-mount': 'error',
    // Avoid synchronous class state updates during update that can trigger repeated renders.
    '@eslint-react/no-set-state-in-component-did-update': 'error',
    // Do not schedule class state updates during the pre-update lifecycle.
    '@eslint-react/no-set-state-in-component-will-update': 'error',
    // Reserve the use prefix for functions that actually call hooks.
    '@eslint-react/no-unnecessary-use-prefix': 'error',
    // Reject UNSAFE_componentWillMount rather than retaining an unsafe lifecycle under a new name.
    '@eslint-react/no-unsafe-component-will-mount': 'error',
    // Reject UNSAFE_componentWillReceiveProps instead of deriving state in an unsafe lifecycle.
    '@eslint-react/no-unsafe-component-will-receive-props': 'error',
    // Reject UNSAFE_componentWillUpdate instead of running work before React commits an update.
    '@eslint-react/no-unsafe-component-will-update': 'error',
    // Keep context provider values referentially stable to avoid unrelated consumer renders.
    '@eslint-react/no-unstable-context-value': 'error',
    // Keep object and function default props stable instead of allocating them on every render.
    '@eslint-react/no-unstable-default-props': 'error',
    // Remove unused class component methods and properties, including error-boundary members.
    '@eslint-react/no-unused-class-component-members': 'error',
    // Read context with React 19's use API instead of the older useContext API.
    '@eslint-react/no-use-context': 'error',
    // Destructure state consistently, name matching setters and lazily evaluate expensive initializers.
    '@eslint-react/use-state': 'error',
    // Pass children as nested JSX content instead of a separate children prop.
    '@eslint-react/jsx-no-children-prop': 'error',
    // Use JSX comment expressions instead of accidentally rendering comment-like text.
    '@eslint-react/jsx-no-comment-textnodes': 'error',
    // Put key before spreads so the automatic JSX runtime does not fall back to createElement.
    '@eslint-react/jsx-no-key-after-spread': 'error',
    // Reject template-literal dollar signs accidentally copied into JSX interpolation text.
    '@eslint-react/jsx-no-leaked-dollar': 'error',
    // Reject statement semicolons accidentally copied into rendered JSX text.
    '@eslint-react/jsx-no-leaked-semicolon': 'error',
    // Reject JSX namespace syntax that React does not support.
    '@eslint-react/jsx-no-namespace': 'error',
    // Remove fragments that add no grouping while preserving fragments required by expression contracts.
    '@eslint-react/jsx-no-useless-fragment': 'error',
    // Render escaped content instead of bypassing React's escaping with dangerouslySetInnerHTML.
    '@eslint-react/dom-no-dangerously-set-innerhtml': 'error',
    // Use refs instead of finding DOM nodes through the removed findDOMNode API.
    '@eslint-react/dom-no-find-dom-node': 'error',
    // Let React schedule updates instead of forcing synchronous DOM commits with flushSync.
    '@eslint-react/dom-no-flush-sync': 'error',
    // Hydrate with hydrateRoot instead of the removed ReactDOM.hydrate API.
    '@eslint-react/dom-no-hydrate': 'error',
    // State button types explicitly so non-submit buttons do not submit forms by default.
    '@eslint-react/dom-no-missing-button-type': 'error',
    // Restrict embedded documents with an explicit iframe sandbox.
    '@eslint-react/dom-no-missing-iframe-sandbox': 'error',
    // Render through createRoot instead of the removed ReactDOM.render API.
    '@eslint-react/dom-no-render': 'error',
    // Reject javascript URLs that execute code instead of navigating to a document.
    '@eslint-react/dom-no-script-url': 'error',
    // Supply style objects instead of CSS strings that React does not accept.
    '@eslint-react/dom-no-string-style-prop': 'error',
    // Use known React DOM property names instead of misspelled or unsupported attributes.
    '@eslint-react/dom-no-unknown-property': 'error',
    // Reject iframe sandbox combinations that let embedded content escape its restrictions.
    '@eslint-react/dom-no-unsafe-iframe-sandbox': 'error',
    // Use noreferrer for new browsing contexts instead of exposing the opener and referrer.
    '@eslint-react/dom-no-unsafe-target-blank': 'error',
    // Use React 19's useActionState instead of the renamed useFormState API.
    '@eslint-react/dom-no-use-form-state': 'error',
    // Do not give children to DOM elements whose HTML contracts prohibit child content.
    '@eslint-react/dom-no-void-elements-with-children': 'error',
    // Remove component and hook event listeners during cleanup to prevent retained callbacks.
    '@eslint-react/web-api-no-leaked-event-listener': 'error',
    // Disconnect component and hook intersection observers during cleanup.
    '@eslint-react/web-api-no-leaked-intersection-observer': 'error',
    // Clear component and hook intervals during cleanup instead of retaining repeated work.
    '@eslint-react/web-api-no-leaked-interval': 'error',
    // Disconnect component and hook resize observers during cleanup.
    '@eslint-react/web-api-no-leaked-resize-observer': 'error',
    // Clear component and hook timeouts during cleanup instead of running after unmount.
    '@eslint-react/web-api-no-leaked-timeout': 'error',
    // Name createContext results as PascalCase components with a Context suffix.
    '@eslint-react/naming-convention-context-name': 'error',
    // Name useId results id or with an Id suffix so generated DOM identifiers are recognizable.
    '@eslint-react/naming-convention-id-name': 'error',
    // Name useRef results ref or with a Ref suffix so receiver references are recognizable.
    '@eslint-react/naming-convention-ref-name': 'error',
    // Reject typed conditional-render expressions that can leak non-element values into JSX.
    '@eslint-react/no-leaked-conditional-rendering': 'error',

    // Call hooks only in React components or hooks and preserve their call order.
    'react-hooks/rules-of-hooks': 'error',
    // Include every captured reactive value in hook dependency lists to prevent stale closures.
    'react-hooks/exhaustive-deps': 'error',
    // Keep component identities static instead of creating dynamic JSX component values during render.
    'react-hooks/static-components': 'error',
    // Require valid synchronous, argument-free useMemo callbacks that compute a value.
    'react-hooks/use-memo': 'error',
    // Preserve existing manual memoization when the compiler transforms a component or hook.
    'react-hooks/preserve-manual-memoization': 'error',
    // Reject libraries whose APIs cannot preserve React's memoization contract.
    'react-hooks/incompatible-library': 'error',
    // Do not mutate props, state or other values that React treats as immutable.
    'react-hooks/immutability': 'error',
    // Do not assign to or mutate global values during render.
    'react-hooks/globals': 'error',
    // Read and write ref.current outside render so render output does not depend on mutable refs.
    'react-hooks/refs': 'error',
    // Do not synchronously update state in effects when the value belongs in render or an event handler.
    'react-hooks/set-state-in-effect': 'error',
    // Catch child-render failures with error boundaries instead of try/catch around JSX.
    'react-hooks/error-boundaries': 'error',
    // Keep render deterministic instead of calling known impure APIs during render.
    'react-hooks/purity': 'error',
    // Do not unconditionally set state during render and trigger a render loop.
    'react-hooks/set-state-in-render': 'error',
    // Reject syntax that the React Compiler cannot safely transform.
    'react-hooks/unsupported-syntax': 'error',
    // Require valid React Compiler configuration options.
    'react-hooks/config': 'error',
    // Require valid React Compiler gating configuration.
    'react-hooks/gating': 'error',
    // Render capitalized components through JSX instead of invoking them as ordinary functions.
    'react-hooks/capitalized-calls': 'error',
    // Keep effect dependencies memoized instead of changing object or function identity every render.
    'react-hooks/memoized-effect-dependencies': 'error',
    // Derive state-dependent values during render instead of copying them into state through effects.
    'react-hooks/no-deriving-state-in-effects': 'error',
    // Reject suppression of React checks instead of hiding unsafe hook or compiler behavior.
    'react-hooks/rule-suppression': 'error',
    // Require useMemo to return a value and require the component or hook to use that result.
    'react-hooks/void-use-memo': 'error',
  },
});

export { react };
