/**
 * Faster UI - Design Tokens: Colors
 * Storybook stories showcasing the full TapTap Design System color palette.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { palette, semanticColors } from "./colors";

function Swatch({
  name,
  value,
  isBase,
}: {
  name: string;
  value: string;
  isBase?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-2.5 bg-background shadow-xs hover:border-border-hover transition-colors">
      <div
        className="relative h-11 w-11 shrink-0 rounded-md border border-border/80 shadow-xs flex items-center justify-center"
        style={{ backgroundColor: value }}
      >
        {isBase && (
          <span className="text-xs font-bold text-white drop-shadow-sm select-none">
            P
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-text truncate flex items-center gap-1.5">
          <span>{name}</span>
          {isBase && (
            <span className="text-[10px] bg-primary/10 text-primary font-medium px-1.5 py-0.2 rounded">
              Base
            </span>
          )}
        </div>
        <div className="text-[11px] font-mono uppercase text-text-muted">{value}</div>
      </div>
    </div>
  );
}

function PaletteDoc() {
  const primaryGroups = [
    { title: "Black & White", key: "common", isScale: false },
    { title: "Neutral colors (no hue)", key: "neutral", isScale: true, baseKey: "600" },
    { title: "Primary colors", key: "primary", isScale: true, baseKey: "600" },
    { title: "Auxiliary colors", key: "auxiliary", isScale: true, baseKey: "600" },
    { title: "Semantic colors: Danger", key: "danger", isScale: true, baseKey: "600" },
    { title: "Semantic colors: Warning", key: "warning", isScale: true, baseKey: "600" },
    { title: "Semantic colors: Success", key: "success", isScale: true, baseKey: "600" },
    { title: "Semantic colors: Info", key: "info", isScale: true, baseKey: "600" },
  ] as const;

  return (
    <div className="flex flex-col gap-10 p-8 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold text-text mb-1">Color Palette Tokens</h2>
        <p className="text-sm text-text-muted">
          Official TapTap Design System (TDS) color palette tokens and semantic state mappings.
        </p>
      </div>

      {primaryGroups.map((group) => {
        const shades = palette[group.key as keyof typeof palette];
        if (!shades) return null;
        return (
          <div key={group.key} className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
              {group.title}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
              {Object.entries(shades)
                .sort(([a], [b]) => {
                  const numA = parseInt(a, 10);
                  const numB = parseInt(b, 10);
                  if (isNaN(numA) || isNaN(numB)) return a.localeCompare(b);
                  return numB - numA; // 700 down to 50
                })
                .map(([shade, value]) => (
                  <Swatch
                    key={shade}
                    name={`${group.key} ${shade}`}
                    value={value as string}
                    isBase={"baseKey" in group && group.baseKey === shade}
                  />
                ))}
            </div>
          </div>
        );
      })}

      <div className="border-t border-border pt-8">
        <h3 className="text-sm font-bold text-text mb-1">Semantic Component Tokens</h3>
        <p className="text-xs text-text-muted mb-4">
          Tokens resolved directly to component backgrounds, borders, hover, and active states.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <Swatch name="primary.default" value={semanticColors.primary.default} />
          <Swatch name="primary.hover" value={semanticColors.primary.hover} />
          <Swatch name="primary.active" value={semanticColors.primary.active} />
          <Swatch name="primary.subtle" value={semanticColors.primary.subtle} />
          <Swatch name="neutral.text" value={semanticColors.neutral.text} />
          <Swatch name="neutral.border" value={semanticColors.neutral.border} />
          <Swatch name="neutral.disabledBg" value={semanticColors.neutral.disabledBg} />
          <Swatch name="neutral.disabledText" value={semanticColors.neutral.disabledText} />
          <Swatch name="danger.default" value={semanticColors.danger.default} />
          <Swatch name="danger.hover" value={semanticColors.danger.hover} />
          <Swatch name="danger.active" value={semanticColors.danger.active} />
          <Swatch name="danger.subtle" value={semanticColors.danger.subtle} />
          <Swatch name="success.default" value={semanticColors.success.default} />
          <Swatch name="success.subtle" value={semanticColors.success.subtle} />
          <Swatch name="warning.default" value={semanticColors.warning.default} />
          <Swatch name="warning.subtle" value={semanticColors.warning.subtle} />
          <Swatch name="info.default" value={semanticColors.info.default} />
          <Swatch name="info.subtle" value={semanticColors.info.subtle} />
          <Swatch name="auxiliary.default" value={semanticColors.auxiliary.default} />
          <Swatch name="auxiliary.subtle" value={semanticColors.auxiliary.subtle} />
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Design Tokens/Colors",
  component: PaletteDoc,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PaletteDoc>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};

