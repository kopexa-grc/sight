# Kopexa Design System

A modern, scalable React design system for building consistent, accessible, and beautiful user interfaces across Kopexa products and beyond.

---

## Overview

The Kopexa Design System is a monorepo powered by [Turborepo](https://turborepo.com), providing a robust foundation for UI development with:

- **React 19+** for component architecture
- **TypeScript** for type safety
- **Storybook** for interactive documentation and visual testing
- **Tsup** for fast, modern bundling
- **Vite** for lightning-fast development
- **Biome** for code quality and consistency
- **Changesets** for versioning and automated releases

> Built and maintained by [Kopexa](https://kopexa.com)

## Philosophy

- **Consistency:** Shared components, hooks, and utilities for a unified product experience.
- **Accessibility:** All components are designed with accessibility in mind.
- **Developer Experience:** Fast builds, type safety, and clear documentation.
- **Scalability:** Modular packages for easy extension and maintenance.

## Monorepo Structure

- `apps/` — Applications (e.g., Storybook, documentation)
- `packages/` — Core packages:
  - `components/` — UI components (e.g., Button, Dialog, Popover)
  - `hooks/` — React hooks (e.g., use-controllable-state, use-callback-ref)
  - `core/` — Theming, foundational utilities
  - `utilities/` — Shared utility packages (icons, motion, etc.)

## Getting Started

Clone the repo and install dependencies:

```sh
pnpm install
```

### Useful Commands

- `pnpm build` — Build all packages and Storybook
- `pnpm dev` — Run all packages locally with hot reload
- `pnpm lint` — Lint all packages
- `pnpm test` — Run all tests
- `pnpm changeset` — Generate a changeset for versioning
- `pnpm clean` — Clean up all `node_modules` and `dist` folders

## Developing Components

Each component lives in its own package under `packages/components/`. Example:

```tsx:packages/components/button/src/Button.tsx
import * as React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button({ children }: ButtonProps) {
  return <button type="button">{children}</button>;
}

Button.displayName = 'Button';
```

Add stories in the `stories/` directory for interactive docs and visual tests.

## Storybook

Run Storybook for live component previews and documentation:

```sh
pnpm dev
```

Visit [http://localhost:6006](http://localhost:6006) to explore components.

## Versioning & Publishing

We use [Changesets](https://github.com/changesets/changesets) for versioning and automated npm publishing. See `.github/workflows/release.yml` for CI details.

## Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/kopexa-grc/sight/blob/main/CONTRIBUTING.md).

## License

MIT © [Kopexa](https://kopexa.com)
