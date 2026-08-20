# Faster UI

A production-ready React component library for the **Faster UI** design system based on the TapTap Design System (TDS) specifications. Featuring **Button**, **Input**, and **Dialog** — built with React 19, TypeScript, and Tailwind CSS v4, backed by centralized design tokens, and documented with Storybook 10.

## Stack

| Concern            | Tool                                  |
| ------------------ | -------------------------------------- |
| Framework          | React 19 + TypeScript                 |
| Styling            | Tailwind CSS v4 (CSS-first `@theme`)  |
| Design tokens      | CSS custom properties + typed TS token objects |
| Unit & Integration | Jest + React Testing Library          |
| Component & E2E    | Cypress Component Testing             |
| Documentation      | Storybook 10                          |
| CI/CD              | GitHub Actions                        |
| Packaging          | Vite library mode (ESM + CJS + `.d.ts`) |

## Getting started

```bash
npm install
npm run dev              # Vite playground app (src/App.tsx)
npm run storybook        # Storybook on http://localhost:6006
npm test                 # Jest + React Testing Library (43 tests)
npm run cy:open          # Cypress component tests (interactive)
npm run cy:run           # Cypress component tests (headless)
npm run build:lib        # Build the publishable npm package into dist/
npm run typecheck        # TypeScript check across app, jest, and cypress configs
```

## Project structure

```
src/
  tokens/            # Design tokens (TS objects + colors.stories.tsx doc page)
  styles/tokens.css  # CSS custom properties, mapped into Tailwind via @theme inline
  components/
    Button/
      Button.tsx           # Button implementation
      Button.test.tsx      # Jest + RTL unit tests
      Button.cy.tsx        # Cypress component test
      Button.stories.tsx   # Storybook stories & interactions
      index.ts
    Input/
      Input.tsx            # Input implementation
      Input.test.tsx       # Jest + RTL unit tests
      Input.cy.tsx         # Cypress component test
      Input.stories.tsx    # Storybook stories & interactions
      index.ts
    Dialog/
      Dialog.tsx           # Dialog modal implementation
      Dialog.test.tsx      # Jest + RTL unit tests
      Dialog.cy.tsx        # Cypress component test
      Dialog.stories.tsx   # Storybook stories & interactions
      index.ts
    Playground/            # Interactive testbed components
  index.ts                 # Public library entry point
```

## Design tokens

Colors, spacing, typography, radii, and shadow primitives are **never hardcoded inside components**. 

- **Single Source of Truth**: Defined as CSS custom properties in [src/styles/tokens.css](src/styles/tokens.css) and exposed to Tailwind utility classes via `@theme inline` (e.g. `--color-primary` → `bg-primary`, `text-primary`, `border-primary`).
- **Brand Palette**: Aligned with the TapTap Design System primary brand token `#15C5CE` (Cyan/Teal), hover `#11AFB8`, active/pressed `#0E8E95`, subtle tint `#E6F9FA`, and neutral scales (#1F2329 primary text, #8F959E muted, #E5E7EB borders).
- **Status Scales**: Danger (`#F54A45`), Success (`#15C5CE`), Warning (`#FF8800`), and Info (`#2F74FF`).
- **Typed TypeScript Representation**: Exported via [src/tokens/colors.ts](src/tokens/colors.ts) and [src/tokens/primitives.ts](src/tokens/primitives.ts) for JavaScript consumers (charts, canvas, inline styles) and documented in the Storybook "Design Tokens/Colors" catalog.
- **Dark Theme**: Comprehensive dark theme support via `.dark` and `[data-theme="dark"]` token overrides.

## Components

### Button
- **Variants**: `primary`, `outline`, `ghost`, `link`.
- **Modifiers**: `danger` (destructive intent on any variant), `fullWidth`.
- **Sizes**: `sm` (32px), `md` (40px default), `lg` (48px).
- **States & Slots**: `isLoading` (animated spinner with `aria-busy` and interaction lock), `disabled`, `leadingIcon`, and `trailingIcon`.
- **Accessibility**: Renders a native `<button>` element with `forwardRef` and high-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-focus-ring`).

### Input
- **Sizes**: `sm` (32px), `md` (40px default), `lg` (48px).
- **Statuses**: `default`, `error`, `success`, `warning` with status badge icons.
- **Micro-interactions**: 
  - Clear button ("X") with Figma-exact circular background and white icon on typing, hover, and pressed states.
  - Password reveal toggle (`type="password"`).
  - Character limit indicator (`showCount`, `maxLength`).
  - Prefix and suffix add-on slots.
- **Accessibility**: Auto-associates label (`htmlFor`), helper text, and error messages via `aria-describedby`; sets `aria-invalid` on errors; error text uses `role="alert"`.

### Dialog
- **Figma Alignment**: Fully matches TapTap Design System modal specs.
- **Types**: `info`, `success`, `warning`, `danger`, `primary`.
- **Alignments**: `left` (icon adjacent to header) and `center` (hero icon with centered content).
- **Status Badges**: Dedicated circular status icons with subtle tint backgrounds.
- **Action Buttons**: Configurable `okText`, `cancelText`, `onOk`, `onCancel`, `hideCancelButton`, and `danger`.
- **Accessibility**: WAI-ARIA compliant modal (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`), automated Tab focus trap, focus restoration to trigger on dismiss, and dismissible via Escape, overlay click, or close button.

## Accessibility decisions

- Native HTML elements (`<button>`, `<input>`) used throughout rather than simulated `div` elements.
- Strict focus management: custom `focus-visible` rings with offset and native focus trapping/restoration in `Dialog`.
- Form validation errors announced to screen readers via `role="alert"` and linked via `aria-describedby` / `aria-invalid`.
- WCAG 2.1 AA compliant color contrast across all light and dark token pairings.
- Automated accessibility checks via `@storybook/addon-a11y` configured to catch regressions in CI.

## Testing strategy

- **Jest + React Testing Library** (`*.test.tsx`, 43 tests): Verifies rendering, variant matrices, sizes, disabled/loading states, user interactions (`@testing-library/user-event`), and accessibility attributes.
- **Cypress Component Tests** (`*.cy.tsx`): Verifies real-browser mounting, layout, keyboard navigation, and the Dialog open/close lifecycle (Escape key, backdrop click, close button, and footer actions).
- Both test suites and TypeScript type checking (`tsc -b`) run automatically in CI.

## Storybook

Storybook 10 on Vite provides:
- Autodocs enabled for interactive props documentation tables.
- Dynamic `argTypes` controls for real-time visual property manipulation.
- Interaction tests using Storybook's `play` functions (`storybook/test`).
- Dedicated Visual Design Tokens catalog (`src/tokens/colors.stories.tsx`).

## CI/CD Workflow

The GitHub Actions workflow ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs on every push and pull request to `main`:
1. Install dependencies (`npm ci`)
2. Lint (`oxlint`)
3. Type check (`tsc -b --noEmit`)
4. Jest unit & integration tests (`npm test`)
5. Cypress component tests
6. Storybook production build (`npm run build-storybook`)
7. App and library production builds (`vite build` & `vite.lib.config.ts`)
8. Automated NPM release on `main` branch pushes

## Publishing & Usage

The library builds into `dist/` with dual ESM (`faster-ui.mjs`) and CommonJS (`faster-ui.cjs`) formats, bundled TypeScript declarations (`index.d.ts`), and compiled styles (`faster-ui.css`):

```tsx
import { Button, Input, Dialog } from "@filipsol/faster-ui";
import "@filipsol/faster-ui/styles.css";

function Example() {
  return (
    <Button variant="primary" size="md">
      Confirm
    </Button>
  );
}
```

## Scaling roadmap

1. **Automated Token Pipeline**: Connect Figma Tokens / Tokens Studio with Style Dictionary to generate CSS variables, TypeScript constants, iOS Swift, and Android Compose tokens automatically.
2. **Visual Regression Testing**: Integrate Chromatic / Percy in CI to catch pixel diffs across stories on every PR.
3. **Component Expansion**: Add Select/Dropdown, Checkbox, Radio, Switch, Tooltip, Toast, Badge, and Avatar.
4. **Multi-Brand Theming**: Leverage the semantic token layer to support multi-tenant white-labeling.
