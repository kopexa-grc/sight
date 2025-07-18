# @kopexa/use-callback-ref

A React hook for always referencing the latest callback.

---

## Overview

`@kopexa/use-callback-ref` is a utility hook for React that ensures your callback always points to the latest function instance, even across re-renders. This is especially useful for event handlers, effects, and subscriptions where you want to avoid stale closures.

- **Author:** Kopexa (<https://kopexa.com>)
- **License:** MIT
- **Repository:** [kopexa-grc/sight](https://github.com/kopexa-grc/sight)

## Features

- Guarantees the latest callback reference
- Prevents unnecessary re-renders
- TypeScript support
- Lightweight and dependency-free (except React)

## Installation

```sh
pnpm add @kopexa/use-callback-ref
# or
yarn add @kopexa/use-callback-ref
# or
npm install @kopexa/use-callback-ref
```

## Usage

```tsx
import { useCallbackRef } from '@kopexa/use-callback-ref';

function MyComponent() {
  const handleClick = useCallbackRef(() => {
    // Always the latest logic here
  });

  React.useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  return <button onClick={handleClick}>Click me</button>;
}
```

## API

### `useCallbackRef<T extends (...args: any[]) => any>(callback: T): T`

- **callback**: The function you want to always reference the latest version of.
- **Returns**: A stable function reference that always calls the latest callback.

#### Example

```tsx
const stableCallback = useCallbackRef((event) => {
  // ...
});
```

## Best Practices

- Use for event handlers, effects, and subscriptions.
- Avoid using for values that do not change or do not need to be stable.

## Why Kopexa?

Kopexa (<https://kopexa.com>) is dedicated to building reliable, developer-friendly open source tools. This package is designed with clarity, stability, and best practices in mind, inspired by the Google API Design Guide.

## License

MIT © Kopexa