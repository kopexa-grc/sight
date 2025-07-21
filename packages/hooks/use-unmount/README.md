# @kopexa/use-unmount

A React hook that runs a cleanup function when the component is unmounted.

> This is an internal utility, not intended for public usage.

## Installation

```sh
yarn add @kopexa/use-unmount
# or
npm i @kopexa/use-unmount
```

## Usage

```tsx
import { useUnmount } from '@kopexa/use-unmount';

function MyComponent() {
  useUnmount(() => {
    // Cleanup logic here
  });
  return <div>...</div>;
}
```

## Credits

This hook is adapted from [usehooks-ts/use-unmount](https://github.com/juliencrn/usehooks-ts) with credit to the original authors.

## About kopexa

- Website: [https://kopexa.com](https://kopexa.com)
- GitHub: [https://github.com/kopexa-grc/sight](https://github.com/kopexa-grc/sight)

## Contribution

Contributions are welcome! See the [contributing guidelines](https://github.com/kopexa-grc/sight/blob/master/CONTRIBUTING.md) for details.

## License

This project is licensed under the terms of the [MIT license](https://github.com/kopexa-grc/sight/blob/master/LICENSE).