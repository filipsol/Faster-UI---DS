/**
 * Faster UI - Design Tokens: Colors
 *
 * Centralized color palette + semantic aliases aligned with the TapTap Design System.
 * These values are mirrored as CSS custom properties in `src/styles/tokens.css`
 * (single source of truth for values lives there; this file re-exports typed
 * references for use in TS/TSX code, e.g. building style maps without hardcoding hex values).
 */

export const palette = {
  /** TapTap Brand Cyan/Teal scale */
  brand: {
    50: "#e6f9fa",
    100: "#c2f2f5",
    200: "#93e7ec",
    300: "#5ed6de",
    400: "#32c8d2",
    500: "#15c5ce", // TapTap Primary Brand
    600: "#11afb8", // Hover
    700: "#0e8e95", // Active
    800: "#0b6f75",
    900: "#074e52",
  },
  /** Neutral Grays */
  gray: {
    0: "#ffffff",
    50: "#f7f8fa",
    100: "#f2f3f5",
    200: "#e5e7eb",
    300: "#cbd2d9",
    400: "#bfc4cc",
    500: "#8f959e",
    600: "#646a73",
    700: "#434851",
    800: "#2d3139",
    900: "#1f2329",
    950: "#0f1217",
  },
  /** Red / Danger scale */
  red: {
    50: "#feeceb",
    100: "#fcd6d4",
    300: "#f7918e",
    500: "#f54a45",
    600: "#d93636",
    700: "#ba2828",
  },
  /** Green / Success scale */
  green: {
    50: "#e6f9fa",
    100: "#c2f2f5",
    500: "#15c5ce",
    600: "#11afb8",
    700: "#0e8e95",
  },
  /** Amber / Warning scale */
  amber: {
    50: "#fff7e8",
    100: "#feecce",
    500: "#ff8800",
    600: "#e07400",
  },
  /** Blue / Info scale */
  blue: {
    50: "#edf5ff",
    100: "#d6e7ff",
    500: "#2f74ff",
    600: "#1e60e6",
    700: "#124ec7",
  },
} as const;

/** Semantic color tokens consumed by components. Values map 1:1 to CSS vars. */
export const semanticColors = {
  primary: {
    default: palette.brand[500],
    hover: palette.brand[600],
    active: palette.brand[700],
    subtle: palette.brand[50],
    border: palette.brand[500],
    foreground: palette.gray[0],
  },
  neutral: {
    background: palette.gray[0],
    surface: palette.gray[50],
    border: palette.gray[200],
    borderHover: palette.gray[300],
    text: palette.gray[900],
    textMuted: palette.gray[500],
    disabledBg: palette.gray[100],
    disabledText: palette.gray[400],
    disabledBorder: palette.gray[200],
  },
  danger: {
    default: palette.red[500],
    hover: palette.red[600],
    active: palette.red[700],
    subtle: palette.red[50],
    border: palette.red[500],
    text: palette.red[500],
  },
  success: {
    default: palette.green[500],
    subtle: palette.green[50],
  },
  warning: {
    default: palette.amber[500],
    subtle: palette.amber[50],
  },
  info: {
    default: "#2f74ff",
    subtle: "#edf5ff",
  },
  focusRing: palette.brand[500],
} as const;

export type Palette = typeof palette;
export type SemanticColors = typeof semanticColors;

