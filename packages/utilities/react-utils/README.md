# @kopexa/react-utils

A powerful utility toolkit for advanced React development, part of the Kopexa Sight Design System.

---

## Overview

`@kopexa/react-utils` provides essential utilities for building robust, scalable, and maintainable React applications. It includes advanced context creation and ref management utilities, designed for modern React (v19+) and seamless integration with the Kopexa Sight ecosystem.

- **Author:** Kopexa (<https://kopexa.com>)
- **License:** MIT
- **Repository:** [kopexa-grc/sight](https://github.com/kopexa-grc/sight)

## Features

- **createContext**: Type-safe, ergonomic context creation with strict mode and custom error messages.
- **mergeRefs**: Effortlessly merge multiple refs (callback and object) for advanced component composition.
- **TypeScript-first**: Fully typed APIs for maximum safety and DX.
- **Zero dependencies**: Only peer-depends on React.

## Installation

```sh
pnpm add @kopexa/react-utils
# or
yarn add @kopexa/react-utils
# or
npm install @kopexa/react-utils
```

## API

### `createContext<T>(options?: CreateContextOptions<T>): [Provider, useContext, Context]`

A strict, ergonomic alternative to React's context API.

```tsx
import { createContext } from '@kopexa/react-utils';

const [Provider, useMyContext] = createContext<number>({
  name: 'MyContext',
  strict: true,
  hookName: 'useMyContext',
  providerName: 'MyProvider',
});

function MyComponent() {
  const value = useMyContext();
  // ...
}
```

#### Options
- `strict` (default: true): Throws if context is missing.
- `hookName`, `providerName`, `errorMessage`, `name`, `defaultValue`: Customize error and context behavior.

### `mergeRefs<T>(...refs: Ref<T>[]): Ref<T>`

Merge multiple refs (callback or object) into a single ref for advanced component composition.

```tsx
import { mergeRefs } from '@kopexa/react-utils';

function MyInput(props, ref) {
  return <input ref={mergeRefs(ref, props.innerRef)} />;
}
```

## Best Practices

- Use `createContext` for all new context providers in your app or library for safer, more maintainable code.
- Use `mergeRefs` when you need to forward refs to multiple consumers (e.g., HOCs, hooks, portals).

## Why Kopexa Sight?

Kopexa Sight is dedicated to building reliable, developer-friendly open source tools. This package is designed for clarity, stability, and best practices, inspired by the Google API Design Guide.

## License

MIT © Kopexa
