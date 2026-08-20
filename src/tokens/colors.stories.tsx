/**
 * Faster UI - Design Tokens: Colors
 * Storybook stories showcasing the full TapTap Design System color palette.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { palette, semanticColors } from "./colors";

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-2.5 bg-background">
      <div
        className="h-10 w-10 shrink-0 rounded-md border border-border/80 shadow-xs"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0">
        <div className="text-xs font-semibold text-text truncate">{name}</div>
        <div className="text-[11px] font-mono text-text-muted">{value}</div>
      </div>
    </div>
  );
}

function PaletteDoc() {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-text mb-1">Color Palette Tokens</h2>
        <p className="text-xs text-text-muted">
          Primary brand (#15C5CE), neutrals, and semantic status color scales for Faster UI.
        </p>
      </div>

      {Object.entries(palette).map(([group, shades]) => (
        <div key={group} className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
            {group} scale
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {Object.entries(shades).map(([shade, value]) => (
              <Swatch key={shade} name={`${group}.${shade}`} value={value as string} />
            ))}
          </div>
        </div>
      ))}

      <div className="border-t border-border pt-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4">
          Semantic Status Tokens
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <Swatch name="primary.default" value={semanticColors.primary.default} />
          <Swatch name="primary.hover" value={semanticColors.primary.hover} />
          <Swatch name="primary.active" value={semanticColors.primary.active} />
          <Swatch name="primary.subtle" value={semanticColors.primary.subtle} />
          <Swatch name="danger.default" value={semanticColors.danger.default} />
          <Swatch name="danger.hover" value={semanticColors.danger.hover} />
          <Swatch name="danger.subtle" value={semanticColors.danger.subtle} />
          <Swatch name="success.default" value={semanticColors.success.default} />
          <Swatch name="success.subtle" value={semanticColors.success.subtle} />
          <Swatch name="warning.default" value={semanticColors.warning.default} />
          <Swatch name="warning.subtle" value={semanticColors.warning.subtle} />
          <Swatch name="info.default" value={semanticColors.info.default} />
          <Swatch name="info.subtle" value={semanticColors.info.subtle} />
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
