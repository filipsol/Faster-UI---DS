import { useState } from "react";
import { Button } from "../Button";
import type { ButtonVariant, ButtonSize } from "../Button";
import { Plus, ArrowRight, Trash2, Download, Check, Copy, Sparkles, ExternalLink } from "lucide-react";

export function ButtonPlayground() {
  const [variant, setVariant] = useState<ButtonVariant>("primary");
  const [danger, setDanger] = useState(false);
  const [size, setSize] = useState<ButtonSize>("md");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [label, setLabel] = useState("Button Label");
  const [iconType, setIconType] = useState<"none" | "leading" | "trailing" | "both">("none");
  const [copied, setCopied] = useState(false);

  const getLeadingIcon = () => {
    if (iconType === "leading" || iconType === "both") {
      return <Plus className="h-4 w-4" />;
    }
    return undefined;
  };

  const getTrailingIcon = () => {
    if (iconType === "trailing" || iconType === "both") {
      return <ArrowRight className="h-4 w-4" />;
    }
    return undefined;
  };

  const generatedJsx = `<Button
  variant="${variant}"${danger ? "\n  danger" : ""}
  size="${size}"${isLoading ? "\n  isLoading" : ""}${disabled ? "\n  disabled" : ""}${fullWidth ? "\n  fullWidth" : ""}${iconType === "leading" || iconType === "both" ? '\n  leadingIcon={<Plus className="h-4 w-4" />}' : ""}${iconType === "trailing" || iconType === "both" ? '\n  trailingIcon={<ArrowRight className="h-4 w-4" />}' : ""}
>
  ${label}
</Button>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedJsx);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Interactive Storybook Controls & Canvas */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-text">Interactive Component Canvas</h3>
          </div>
          <span className="rounded-md bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
            Live Preview
          </span>
        </div>

        {/* Canvas Display */}
        <div className="flex min-h-[140px] items-center justify-center p-8 bg-background">
          <div className={fullWidth ? "w-full max-w-sm" : ""}>
            <Button
              variant={variant}
              danger={danger}
              size={size}
              isLoading={isLoading}
              disabled={disabled}
              fullWidth={fullWidth}
              leadingIcon={getLeadingIcon()}
              trailingIcon={getTrailingIcon()}
            >
              {label}
            </Button>
          </div>
        </div>

        {/* Storybook-style Props Control Table */}
        <div className="border-t border-border bg-surface">
          <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Storybook Control Table
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-text">
              <thead className="border-y border-border bg-disabled-bg/30 text-text-muted">
                <tr>
                  <th className="px-4 py-2 font-medium">Property</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Control</th>
                  <th className="px-4 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono">
                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">variant</td>
                  <td className="px-4 py-2.5 text-text-muted">primary | outline | ghost | link</td>
                  <td className="px-4 py-2.5 font-sans">
                    <select
                      value={variant}
                      onChange={(e) => setVariant(e.target.value as ButtonVariant)}
                      className="rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    >
                      <option value="primary">primary</option>
                      <option value="outline">outline</option>
                      <option value="ghost">ghost</option>
                      <option value="link">link</option>
                    </select>
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Visual style variant matching Figma TDS.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">danger</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={danger}
                      onChange={(e) => setDanger(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-danger focus:ring-danger cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Status/Intent modifier: applies destructive styling to any variant.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">size</td>
                  <td className="px-4 py-2.5 text-text-muted">sm | md | lg</td>
                  <td className="px-4 py-2.5 font-sans">
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value as ButtonSize)}
                      className="rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    >
                      <option value="sm">sm (32px)</option>
                      <option value="md">md (40px)</option>
                      <option value="lg">lg (48px)</option>
                    </select>
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Component height & padding bounds.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">children</td>
                  <td className="px-4 py-2.5 text-text-muted">ReactNode</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="text"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      className="w-36 rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Button label text content.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">icons</td>
                  <td className="px-4 py-2.5 text-text-muted">leading / trailing</td>
                  <td className="px-4 py-2.5 font-sans">
                    <select
                      value={iconType}
                      onChange={(e) => setIconType(e.target.value as any)}
                      className="rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    >
                      <option value="none">None</option>
                      <option value="leading">Leading Icon</option>
                      <option value="trailing">Trailing Icon</option>
                      <option value="both">Both Icons</option>
                    </select>
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Optional slot icon decorators.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">isLoading</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={isLoading}
                      onChange={(e) => setIsLoading(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Renders loading spinner & sets aria-busy="true".
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">disabled</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={disabled}
                      onChange={(e) => setDisabled(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Disables interaction and applies muted palette.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">fullWidth</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={fullWidth}
                      onChange={(e) => setFullWidth(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Expands width to fill parent container.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="border-t border-border bg-disabled-bg/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase text-text-muted">Generated JSX</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text hover:bg-disabled-bg cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-background p-3 text-xs font-mono text-text">
            {generatedJsx}
          </pre>
        </div>
      </div>

      {/* Complete Figma Gallery */}
      <div className="flex flex-col gap-6">
        <h3 className="text-lg font-semibold text-text">Figma Variant & State Matrix</h3>

        {/* 4 Core Style Variants */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Primary */}
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            <span className="text-xs font-bold uppercase text-primary">Primary Variant</span>
            <Button variant="primary">Primary Action</Button>
            <Button variant="primary" leadingIcon={<Plus className="h-4 w-4" />}>
              Create Project
            </Button>
            <Button variant="primary" isLoading>
              Saving...
            </Button>
            <Button variant="primary" disabled>
              Disabled State
            </Button>
          </div>

          {/* Outline */}
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            <span className="text-xs font-bold uppercase text-text">Outline Variant</span>
            <Button variant="outline">Outline Action</Button>
            <Button variant="outline" leadingIcon={<Download className="h-4 w-4" />}>
              Export Data
            </Button>
            <Button variant="outline" isLoading>
              Loading...
            </Button>
            <Button variant="outline" disabled>
              Disabled State
            </Button>
          </div>

          {/* Ghost */}
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            <span className="text-xs font-bold uppercase text-text-muted">Ghost Variant</span>
            <Button variant="ghost">Ghost Action</Button>
            <Button variant="ghost" trailingIcon={<ArrowRight className="h-4 w-4" />}>
              Learn More
            </Button>
            <Button variant="ghost" isLoading>
              Syncing...
            </Button>
            <Button variant="ghost" disabled>
              Disabled State
            </Button>
          </div>

          {/* Link */}
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            <span className="text-xs font-bold uppercase text-primary">Link Variant</span>
            <Button variant="link">Inline Link Action</Button>
            <Button variant="link" trailingIcon={<ExternalLink className="h-4 w-4" />}>
              View Documentation
            </Button>
            <Button variant="link" isLoading>
              Connecting...
            </Button>
            <Button variant="link" disabled>
              Disabled Link
            </Button>
          </div>
        </div>

        {/* Danger Status Modifier Matrix */}
        <div className="rounded-xl border border-danger/30 bg-surface p-6">
          <div className="mb-4 flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-danger" />
            <h4 className="text-sm font-semibold uppercase tracking-wider text-danger">
              Danger Status Modifier (Applies across all variants)
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-text-muted">Primary + Danger</span>
              <Button variant="primary" danger leadingIcon={<Trash2 className="h-4 w-4" />}>
                Delete Resource
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-text-muted">Outline + Danger</span>
              <Button variant="outline" danger>
                Revoke Access
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-text-muted">Ghost + Danger</span>
              <Button variant="ghost" danger>
                Remove Member
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-text-muted">Link + Danger</span>
              <Button variant="link" danger>
                Cancel Subscription
              </Button>
            </div>
          </div>
        </div>

        {/* Sizing Scale */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
            TapTap 8pt Sizing Scale (32px, 40px, 48px)
          </h4>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="primary">
              Small (32px)
            </Button>
            <Button size="md" variant="primary">
              Medium (40px Default)
            </Button>
            <Button size="lg" variant="primary">
              Large (48px)
            </Button>
            <div className="h-8 w-px bg-border mx-2" />
            <Button size="sm" variant="outline">
              Small
            </Button>
            <Button size="md" variant="outline">
              Medium
            </Button>
            <Button size="lg" variant="outline">
              Large
            </Button>
            <div className="h-8 w-px bg-border mx-2" />
            <Button size="sm" variant="link">
              Small Link
            </Button>
            <Button size="md" variant="link">
              Medium Link
            </Button>
            <Button size="lg" variant="link">
              Large Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
