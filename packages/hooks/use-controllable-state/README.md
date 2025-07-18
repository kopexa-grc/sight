# @kopexa/use-controllable-state

A React hook for building controlled and uncontrolled components, designed for clarity and reliability in the style of the Google API Design Guide.

---

## Overview

`@kopexa/use-controllable-state` provides a robust pattern for managing state in React components that can be either controlled (via props) or uncontrolled (internal state). This hook is ideal for reusable UI components and libraries.

- **Author:** Kopexa (<https://kopexa.com>)
- **License:** MIT
- **Repository:** [kopexa-grc/sight](https://github.com/kopexa-grc/sight)

## Features

- Supports both controlled and uncontrolled usage
- Customizable change detection with `shouldUpdate`
- TypeScript support
- Lightweight and dependency-free (except React)

## Installation

```sh
pnpm add @kopexa/use-controllable-state
# or
yarn add @kopexa/use-controllable-state
# or
npm install @kopexa/use-controllable-state
```

## Usage

```tsx
import { useControllableState } from '@kopexa/use-controllable-state';

function MyComponent(props) {
  const [value, setValue] = useControllableState({
    value: props.value,
    defaultValue: 0,
    onChange: props.onChange,
  });

  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
```

## API

### `useControllableState<T>(props: UseControllableStateProps<T>): [T, Dispatch<SetStateAction<T>>]`

- **props**: See below for details.
- **Returns**: `[value, setValue]` — the current value and a setter function.

#### `UseControllableStateProps<T>`
- `value?`: Controlled value
- `defaultValue?`: Initial value for uncontrolled usage
- `onChange?`: Callback when value changes
- `shouldUpdate?`: Custom comparison function

## Best Practices

- Use for components that can be both controlled and uncontrolled.
- Provide clear documentation for consumers of your component.

## Why Kopexa?

Kopexa (<https://kopexa.com>) builds reliable, developer-friendly open source tools. This package is designed for clarity, stability, and best practices, inspired by the Google API Design Guide.

## License

MIT © Kopexa