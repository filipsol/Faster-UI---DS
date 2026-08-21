/**
 * Faster UI - Design Tokens: Spacing, Radius, Typography, Shadows
 * Mirrors CSS variables defined in `src/styles/tokens.css` and conforms
 */

export const radius = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  full: "9999px",
} as const;

export type RadiusToken = keyof typeof radius;

export const spacing = {
  0: "0px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  2.5: "10px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export type SpacingToken = keyof typeof spacing;

export const typography = {
  fontFamily: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif",
    mono: "Consolas, Menlo, Monaco, 'Courier New', monospace",
    chinese: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif",
    english: "'SF UI Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, sans-serif",
    numbers: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, Arial, sans-serif",
    code: "Consolas, Menlo, Monaco, 'Courier New', monospace",
  },
  fontSize: {
    caption: "12px",
    body: "14px",
    subtitle: "16px",
    title: "18px",
    h3: "20px",
    h2: "24px",
    h1: "30px",
    // Standard t-shirt scale aliases for flexibility
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    caption: "18px",
    body: "22px",
    subtitle: "24px",
    title: "26px",
    h3: "28px",
    h2: "32px",
    h1: "38px",
    // Standard t-shirt scale aliases
    xs: "18px",
    sm: "22px",
    md: "24px",
    lg: "26px",
    xl: "28px",
    "2xl": "32px",
    "3xl": "38px",
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  letterSpacing: {
    tighter: "-0.02em",
    tight: "-0.01em",
    normal: "0em",
    wide: "0.01em",
    wider: "0.02em",
  },
  /**
   * TapTap Design System Type Scale (Seven styles: H1 to Caption)
   */
  typeScale: {
    h1: {
      name: "H1",
      fontSize: "30px",
      lineHeight: "38px",
      ratio: "30/38",
      description: "Primary page headers",
    },
    h2: {
      name: "H2",
      fontSize: "24px",
      lineHeight: "32px",
      ratio: "24/32",
      description: "Section headings",
    },
    h3: {
      name: "H3",
      fontSize: "20px",
      lineHeight: "28px",
      ratio: "20/28",
      description: "Sub-section headings & modal titles",
    },
    title: {
      name: "Title",
      fontSize: "18px",
      lineHeight: "26px",
      ratio: "18/26",
      description: "Card titles & prominent UI labels",
    },
    subtitle: {
      name: "Subtitle",
      fontSize: "16px",
      lineHeight: "24px",
      ratio: "16/24",
      description: "Subtitles, form labels & large body",
    },
    body: {
      name: "Body",
      fontSize: "14px",
      lineHeight: "22px",
      ratio: "14/22",
      description: "Standard body text & default UI copy",
    },
    caption: {
      name: "Caption",
      fontSize: "12px",
      lineHeight: "18px",
      ratio: "12/18",
      description: "Secondary annotations, captions & hints",
    },
  },
  /**
   * Semantic Heading presets matching TapTap Design System
   */
  headings: {
    h1: { fontSize: "30px", lineHeight: "38px", fontWeight: 500 },
    h2: { fontSize: "24px", lineHeight: "32px", fontWeight: 500 },
    h3: { fontSize: "20px", lineHeight: "28px", fontWeight: 500 },
    title: { fontSize: "18px", lineHeight: "26px", fontWeight: 500 },
    subtitle: { fontSize: "16px", lineHeight: "24px", fontWeight: 500 },
    body: { fontSize: "14px", lineHeight: "22px", fontWeight: 400 },
    caption: { fontSize: "12px", lineHeight: "18px", fontWeight: 400 },
  },
  /**
   * Semantic UI text presets
   */
  textStyles: {
    h1: { fontSize: "30px", lineHeight: "38px", fontWeight: 500 },
    h2: { fontSize: "24px", lineHeight: "32px", fontWeight: 500 },
    h3: { fontSize: "20px", lineHeight: "28px", fontWeight: 500 },
    title: { fontSize: "18px", lineHeight: "26px", fontWeight: 500 },
    subtitle: { fontSize: "16px", lineHeight: "24px", fontWeight: 500 },
    body: { fontSize: "14px", lineHeight: "22px", fontWeight: 400 },
    caption: { fontSize: "12px", lineHeight: "18px", fontWeight: 400 },
    buttonLg: { fontSize: "16px", lineHeight: "24px", fontWeight: 500 },
    buttonMd: { fontSize: "14px", lineHeight: "22px", fontWeight: 500 },
    buttonSm: { fontSize: "12px", lineHeight: "18px", fontWeight: 500 },
    inputLg: { fontSize: "16px", lineHeight: "24px", fontWeight: 400 },
    inputMd: { fontSize: "14px", lineHeight: "22px", fontWeight: 400 },
    inputSm: { fontSize: "12px", lineHeight: "18px", fontWeight: 400 },
  },
} as const;

export type FontSizeToken = keyof typeof typography.fontSize;
export type FontWeightToken = keyof typeof typography.fontWeight;
export type LineHeightToken = keyof typeof typography.lineHeight;
export type TypeScaleToken = keyof typeof typography.typeScale;
export type HeadingLevel = keyof typeof typography.headings;

export const shadow = {
  none: "none",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.04)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
  md: "0 4px 8px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
  lg: "0 8px 16px -4px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.04)",
  xl: "0 16px 24px -6px rgb(0 0 0 / 0.12), 0 6px 10px -4px rgb(0 0 0 / 0.06)",
  overlay: "0 20px 32px -4px rgb(0 0 0 / 0.16), 0 8px 16px -4px rgb(0 0 0 / 0.08)",
} as const;

export type ShadowToken = keyof typeof shadow;
