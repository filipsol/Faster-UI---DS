/**
 * Faster UI - Design Tokens: Colors
 *
 * Centralized color palette + semantic aliases aligned strictly with the TapTap Design System (TDS).
 * These values are mirrored as CSS custom properties in `src/styles/tokens.css`
 * (single source of truth for values lives there; this file re-exports typed
 * references for use in TS/TSX code).
 */

export const palette = {
  /** Black & White */
  common: {
    black: "#000000",
    white: "#ffffff",
  },
  /** Neutral colors (no hue) */
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e1e1e1",
    400: "#cacaca",
    500: "#8e8e8e",
    600: "#4b4b4b", // Primary neutral base (P)
    700: "#1f1f1f",
  },
  /** Primary colors */
  primary: {
    50: "#f9ffff",
    100: "#eefcfc",
    200: "#dff7f7",
    300: "#b0ebec",
    400: "#7ddde1",
    500: "#47cfd6",
    600: "#15c5ce", // Primary brand base (P)
    700: "#00abb6",
  },
  /** Auxiliary colors */
  auxiliary: {
    50: "#fffcfc",
    100: "#fff6f3",
    200: "#fff2ee",
    300: "#ffe1d6",
    400: "#ffc8b6",
    500: "#ffa487",
    600: "#ff8156", // Auxiliary base (P)
    700: "#fe632f",
  },
  /** Semantic Danger colors */
  danger: {
    50: "#fffbfb",
    100: "#fef2f2",
    200: "#ffe8ee",
    300: "#ffccd2",
    400: "#f49898",
    500: "#eb6f70",
    600: "#f64c4c", // Danger base (P)
    700: "#ec2d30",
  },
  /** Semantic Warning colors */
  warning: {
    50: "#fffdfa",
    100: "#fff9ee",
    200: "#fff7e1",
    300: "#ffeab3",
    400: "#ffdd82",
    500: "#ffc62b",
    600: "#ffad0d", // Warning base (P)
    700: "#fe9b0e",
  },
  /** Semantic Success colors */
  success: {
    50: "#f8fefc",
    100: "#f2faf6",
    200: "#e5f5ec",
    300: "#c0e5d1",
    400: "#97d4b4",
    500: "#6bc497",
    600: "#47b881", // Success base (P)
    700: "#0c9d61",
  },
  /** Semantic Info colors */
  info: {
    50: "#f8fcff",
    100: "#f1f8ff",
    200: "#e4f2ff",
    300: "#bdddff",
    400: "#93c8ff",
    500: "#4ba1ff",
    600: "#3b82f6", // Info base (P)
    700: "#3a70e2",
  },
  /** Aliases for backward compatibility */
  brand: {
    50: "#f9ffff",
    100: "#eefcfc",
    200: "#dff7f7",
    300: "#b0ebec",
    400: "#7ddde1",
    500: "#15c5ce", // Primary brand
    600: "#00abb6", // Hover / Active
    700: "#00abb6",
  },
  gray: {
    0: "#ffffff",
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e1e1e1",
    400: "#cacaca",
    500: "#8e8e8e",
    600: "#4b4b4b",
    700: "#1f1f1f",
    800: "#1f1f1f",
    900: "#1f1f1f",
  },
  red: {
    50: "#fffbfb",
    100: "#fef2f2",
    200: "#ffe8ee",
    300: "#ffccd2",
    400: "#f49898",
    500: "#eb6f70",
    600: "#f64c4c",
    700: "#ec2d30",
  },
  green: {
    50: "#f8fefc",
    100: "#f2faf6",
    500: "#6bc497",
    600: "#47b881",
    700: "#0c9d61",
  },
  amber: {
    50: "#fffdfa",
    100: "#fff9ee",
    500: "#ffc62b",
    600: "#ffad0d",
    700: "#fe9b0e",
  },
  blue: {
    50: "#f8fcff",
    100: "#f1f8ff",
    500: "#4ba1ff",
    600: "#3b82f6",
    700: "#3a70e2",
  },
} as const;

/** Semantic color tokens consumed by components. Values map 1:1 to CSS vars. */
export const semanticColors = {
  primary: {
    default: palette.primary[600],
    hover: palette.primary[500],
    active: palette.primary[700],
    subtle: palette.primary[100],
    border: palette.primary[600],
    foreground: palette.common.white,
  },
  neutral: {
    background: palette.common.white,
    surface: palette.neutral[50],
    border: palette.neutral[300],
    borderHover: palette.neutral[400],
    text: palette.neutral[700],
    textSecondary: palette.neutral[600],
    textMuted: palette.neutral[500],
    disabledBg: palette.neutral[100],
    disabledText: palette.neutral[400],
    disabledBorder: palette.neutral[200],
  },
  danger: {
    default: palette.danger[600],
    hover: palette.danger[500],
    active: palette.danger[700],
    subtle: palette.danger[100],
    border: palette.danger[600],
    text: palette.danger[600],
  },
  success: {
    default: palette.success[600],
    hover: palette.success[500],
    active: palette.success[700],
    subtle: palette.success[100],
  },
  warning: {
    default: palette.warning[600],
    hover: palette.warning[500],
    active: palette.warning[700],
    subtle: palette.warning[100],
  },
  info: {
    default: palette.info[600],
    hover: palette.info[500],
    active: palette.info[700],
    subtle: palette.info[100],
  },
  auxiliary: {
    default: palette.auxiliary[600],
    hover: palette.auxiliary[500],
    active: palette.auxiliary[700],
    subtle: palette.auxiliary[100],
  },
  focusRing: palette.primary[600],
} as const;

export type Palette = typeof palette;
export type SemanticColors = typeof semanticColors;

