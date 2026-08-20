import { useState } from "react";
import { Dialog } from "../Dialog";
import type { DialogSize, DialogType, DialogAlign } from "../Dialog";
import { Button } from "../Button";
import { Input } from "../Input";
import {
  Sparkles,
  Check,
  Copy,
  AlertTriangle,
  UserPlus,
  Info,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Sliders,
} from "lucide-react";

export function DialogPlayground() {
  // Configured Interactive Dialog State
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<DialogType>("default");
  const [align, setAlign] = useState<DialogAlign>("left");
  const [size, setSize] = useState<DialogSize>("md");
  const [title, setTitle] = useState("Confirm Workspace Changes");
  const [description, setDescription] = useState("Review your parameters before committing.");
  const [okText, setOkText] = useState("Confirm");
  const [cancelText, setCancelText] = useState("Cancel");
  const [danger, setDanger] = useState(false);
  const [hideCancelButton, setHideCancelButton] = useState(false);
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);
  const [closeOnEsc, setCloseOnEsc] = useState(true);
  const [hideCloseButton, setHideCloseButton] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const [divider, setDivider] = useState(false);
  const [copied, setCopied] = useState(false);

  // Figma Types Gallery State
  const [activeTypeModal, setActiveTypeModal] = useState<DialogType | null>(null);
  const [centeredModalOpen, setCenteredModalOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [sizeModal, setSizeModal] = useState<DialogSize | null>(null);
  const [dividerOpen, setDividerOpen] = useState(false);

  // Form states in modal
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  const generatedJsx = `<Dialog
  open={open}
  onClose={() => setOpen(false)}${type !== "default" ? `\n  type="${type}"` : ""}${align !== "left" ? `\n  align="${align}"` : ""}
  title="${title}"${description ? `\n  description="${description}"` : ""}
  size="${size}"${okText !== "Confirm" ? `\n  okText="${okText}"` : ""}${cancelText !== "Cancel" ? `\n  cancelText="${cancelText}"` : ""}${hideCancelButton ? "\n  hideCancelButton" : ""}${danger ? "\n  danger" : ""}${!closeOnOverlayClick ? "\n  closeOnOverlayClick={false}" : ""}${!closeOnEsc ? "\n  closeOnEsc={false}" : ""}${hideCloseButton ? "\n  hideCloseButton" : ""}${scrollable ? "\n  scrollable" : ""}${divider ? "\n  divider" : ""}
>
  <p className="text-sm text-text">
    This dialog is controlled dynamically by the Storybook props table.
  </p>
</Dialog>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedJsx);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Interactive Storybook Canvas & Controls */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-text">Interactive Dialog Canvas</h3>
          </div>
          <span className="rounded-md bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
            Live Preview
          </span>
        </div>

        {/* Canvas Display */}
        <div className="flex min-h-[140px] flex-col items-center justify-center gap-3 p-8 bg-background">
          <Button
            variant="primary"
            danger={danger || type === "danger" || type === "error"}
            onClick={() => setOpen(true)}
          >
            Open Configured Dialog
          </Button>
          <span className="text-xs text-text-muted">
            Click to trigger the modal with current Storybook table parameters
          </span>
        </div>

        {/* Active Dialog Modal */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          type={type}
          align={align}
          title={title}
          description={description}
          size={size}
          okText={okText}
          cancelText={cancelText}
          hideCancelButton={hideCancelButton}
          danger={danger}
          closeOnOverlayClick={closeOnOverlayClick}
          closeOnEsc={closeOnEsc}
          hideCloseButton={hideCloseButton}
          scrollable={scrollable}
          divider={divider}
        >
          <div className="flex flex-col gap-3 text-sm text-text">
            <p>
              This is the modal body. You can inspect keyboard focus trapping by pressing{" "}
              <kbd className="rounded bg-disabled-bg px-1.5 py-0.5 text-xs font-mono">Tab</kbd> or{" "}
              <kbd className="rounded bg-disabled-bg px-1.5 py-0.5 text-xs font-mono">Shift+Tab</kbd>.
            </p>
            <p className="text-xs text-text-muted">
              Press Escape or click outside the container to dismiss according to the configured controls.
            </p>
            {scrollable &&
              Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                <p key={n} className="text-xs text-text-muted">
                  Extra padding paragraph {n} to demonstrate the inner scroll container while the header and footer stay fixed.
                </p>
              ))}
          </div>
        </Dialog>

        {/* Storybook Control Table */}
        <div className="border-t border-border bg-surface">
          <div className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
            <Sliders className="h-3.5 w-3.5" />
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
                  <td className="px-4 py-2.5 font-semibold text-primary">type</td>
                  <td className="px-4 py-2.5 text-text-muted">
                    "default" | "info" | "success" | "warning" | "error" | "danger"
                  </td>
                  <td className="px-4 py-2.5 font-sans">
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as DialogType)}
                      className="rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    >
                      <option value="default">default (Standard)</option>
                      <option value="info">info (Informative blue)</option>
                      <option value="success">success (Success green)</option>
                      <option value="warning">warning (Cautionary amber)</option>
                      <option value="error">error (Critical red)</option>
                      <option value="danger">danger (Destructive red)</option>
                    </select>
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Semantic status type from TapTap Figma spec configuring status icon and theme.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">align</td>
                  <td className="px-4 py-2.5 text-text-muted">"left" | "center"</td>
                  <td className="px-4 py-2.5 font-sans">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="dialog-align"
                          value="left"
                          checked={align === "left"}
                          onChange={() => setAlign("left")}
                          className="text-primary focus:ring-focus-ring"
                        />
                        <span className="text-xs">Left</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="dialog-align"
                          value="center"
                          checked={align === "center"}
                          onChange={() => setAlign("center")}
                          className="text-primary focus:ring-focus-ring"
                        />
                        <span className="text-xs">Center</span>
                      </label>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Alignment for header, status icon, body text, and action buttons.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">size</td>
                  <td className="px-4 py-2.5 text-text-muted">"sm" | "md" | "lg"</td>
                  <td className="px-4 py-2.5 font-sans">
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value as DialogSize)}
                      className="rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    >
                      <option value="sm">sm (400px)</option>
                      <option value="md">md (480px)</option>
                      <option value="lg">lg (640px)</option>
                    </select>
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Maximum width constraints of the dialog panel.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">title</td>
                  <td className="px-4 py-2.5 text-text-muted">ReactNode</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-48 rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Header title text linked via aria-labelledby.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">description</td>
                  <td className="px-4 py-2.5 text-text-muted">ReactNode</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-48 rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Subtitle linked via aria-describedby.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">okText</td>
                  <td className="px-4 py-2.5 text-text-muted">string</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="text"
                      value={okText}
                      onChange={(e) => setOkText(e.target.value)}
                      className="w-32 rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Label for the primary confirmation button.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">cancelText</td>
                  <td className="px-4 py-2.5 text-text-muted">string</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="text"
                      value={cancelText}
                      onChange={(e) => setCancelText(e.target.value)}
                      className="w-32 rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Label for the secondary cancel button.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">hideCancelButton</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={hideCancelButton}
                      onChange={(e) => setHideCancelButton(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Hides the cancel button for single-action informational alerts.
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
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Applies high-contrast danger styling to the confirm button.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">closeOnOverlayClick</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={closeOnOverlayClick}
                      onChange={(e) => setCloseOnOverlayClick(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Dismisses dialog when clicking backdrop overlay.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">closeOnEsc</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={closeOnEsc}
                      onChange={(e) => setCloseOnEsc(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Dismisses dialog on Escape keyboard press.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">hideCloseButton</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={hideCloseButton}
                      onChange={(e) => setHideCloseButton(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Hides the top-right X dismissal button.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">scrollable</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={scrollable}
                      onChange={(e) => setScrollable(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Constrains dialog height and scrolls only the body, keeping header/footer fixed.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">divider</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={divider}
                      onChange={(e) => setDivider(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Renders a horizontal divider between the header and the body content.
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

      {/* Figma Dialog Types Matrix */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <h3 className="text-lg font-semibold text-text">Figma Dialog Types (TDS Spec)</h3>
        </div>
        <p className="text-sm text-text-muted">
          Click any card below to launch the corresponding semantic Dialog type from the TapTap Design System specification.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Default Type */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5 transition hover:border-primary/50">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-text">
                <HelpCircle className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider">Default / Standard</span>
              </div>
              <p className="text-xs text-text-muted">
                Clean modal with title, description, body container, and standard Confirm/Cancel actions.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setActiveTypeModal("default")}>
              Preview Default Dialog
            </Button>
          </div>

          {/* Info Type */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5 transition hover:border-blue-500/50">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-blue-500">
                <Info className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Info Type</span>
              </div>
              <p className="text-xs text-text-muted">
                Informational announcement featuring the blue status icon and single acknowledgment button.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setActiveTypeModal("info")}>
              Preview Info Dialog
            </Button>
          </div>

          {/* Success Type */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5 transition hover:border-primary/50">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Success Type</span>
              </div>
              <p className="text-xs text-text-muted">
                Action completion modal with TapTap green checkmark icon and positive confirmation.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setActiveTypeModal("success")}>
              Preview Success Dialog
            </Button>
          </div>

          {/* Warning Type */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5 transition hover:border-amber-500/50">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-amber-500">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Warning Type</span>
              </div>
              <p className="text-xs text-text-muted">
                Cautionary dialog alerting the user of unsaved changes or potential secondary effects.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setActiveTypeModal("warning")}>
              Preview Warning Dialog
            </Button>
          </div>

          {/* Danger / Error Type */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5 transition hover:border-danger/50">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-danger">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Danger / Error Type</span>
              </div>
              <p className="text-xs text-text-muted">
                Critical destructive confirmation with high-contrast red alert icon and danger button styling.
              </p>
            </div>
            <Button variant="danger" size="sm" onClick={() => setActiveTypeModal("danger")}>
              Preview Danger Dialog
            </Button>
          </div>

          {/* Center-Aligned Alert */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5 transition hover:border-primary/50">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-text">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider">Centered Layout</span>
              </div>
              <p className="text-xs text-text-muted">
                Centered status badge icon, centered headlines, and centered action buttons.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setCenteredModalOpen(true)}>
              Preview Centered Dialog
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Archetypes */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-text">Interactive Archetypes</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {/* Destructive */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-danger">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Destructive Confirmation</span>
              </div>
              <p className="text-xs text-text-muted">
                Delete confirmation modal with danger confirm button.
              </p>
            </div>
            <Button variant="danger" size="sm" onClick={() => setDestructiveOpen(true)}>
              Launch Delete Modal
            </Button>
          </div>

          {/* Form Modal */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <UserPlus className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Form Modal</span>
              </div>
              <p className="text-xs text-text-muted">
                Modal containing interactive inputs, field validation, and action buttons.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setFormOpen(true)}>
              Launch Form Modal
            </Button>
          </div>

          {/* Long Terms Modal */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-text-muted">
                <FileText className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Scrollable Legal Terms</span>
              </div>
              <p className="text-xs text-text-muted">
                Large size modal with inner scroll container for long documents.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setTermsOpen(true)}>
              Launch Terms Modal
            </Button>
          </div>

          {/* Dialog With Divider */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-text-muted">
                <Layers className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Dialog With Divider</span>
              </div>
              <p className="text-xs text-text-muted">
                Horizontal rule separating the title/description header from the body content.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setDividerOpen(true)}>
              Launch Divider Modal
            </Button>
          </div>
        </div>

        {/* Sizes Quick Launch */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
            Dialog Sizing Preview (sm: 400px, md: 480px, lg: 640px)
          </h4>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setSizeModal("sm")}>
              Preview Small (400px)
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSizeModal("md")}>
              Preview Medium (480px)
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSizeModal("lg")}>
              Preview Large (640px)
            </Button>
          </div>
        </div>
      </div>

      {/* Semantic Type Modals */}
      {/* 1. Default Type */}
      <Dialog
        open={activeTypeModal === "default"}
        onClose={() => setActiveTypeModal(null)}
        type="default"
        title="Default Dialog"
        description="Standard modal dialog according to the TapTap specification."
        okText="Confirm Action"
        cancelText="Cancel"
      >
        <p className="text-sm text-text">
          Default dialogs provide an unobstructed container for custom workflows, confirmations, or content panels.
        </p>
      </Dialog>

      {/* 2. Info Type */}
      <Dialog
        open={activeTypeModal === "info"}
        onClose={() => setActiveTypeModal(null)}
        type="info"
        title="System Maintenance Scheduled"
        description="Scheduled update for Sunday at 02:00 UTC."
        okText="Understood"
        hideCancelButton
      >
        <p className="text-sm text-text">
          All workspace tokens and components will remain active during the 15-minute maintenance window.
        </p>
      </Dialog>

      {/* 3. Success Type */}
      <Dialog
        open={activeTypeModal === "success"}
        onClose={() => setActiveTypeModal(null)}
        type="success"
        title="Tokens Successfully Published"
        description="Version 1.0.0 is now live in your production registry."
        okText="View Token Registry"
        cancelText="Close"
      >
        <p className="text-sm text-text">
          Your components have been updated with the latest token bindings and WCAG AA color definitions.
        </p>
      </Dialog>

      {/* 4. Warning Type */}
      <Dialog
        open={activeTypeModal === "warning"}
        onClose={() => setActiveTypeModal(null)}
        type="warning"
        title="Unsaved Changes Detected"
        description="You have unsaved modifications in the active theme editor."
        okText="Leave & Discard"
        cancelText="Stay on Page"
      >
        <p className="text-sm text-text">
          Leaving this view now will discard all temporary custom theme token overrides.
        </p>
      </Dialog>

      {/* 5. Danger Type */}
      <Dialog
        open={activeTypeModal === "danger"}
        onClose={() => setActiveTypeModal(null)}
        type="danger"
        title="Permanently Delete Workspace?"
        description="This action cannot be reverted."
        okText="Delete Workspace"
        cancelText="Keep Workspace"
        danger
      >
        <p className="text-sm text-text">
          All associated components, design tokens, and version histories will be immediately and permanently removed.
        </p>
      </Dialog>

      {/* 6. Centered Dialog */}
      <Dialog
        open={centeredModalOpen}
        onClose={() => setCenteredModalOpen(false)}
        type="success"
        align="center"
        size="sm"
        title="Deployment Complete"
        description="Your Faster UI design system has been successfully compiled and deployed."
        okText="Got it!"
        hideCancelButton
      >
        <p className="text-sm text-text">
          All package builds and CSS variables are ready for downstream consumption.
        </p>
      </Dialog>

      {/* 7. Destructive Confirmation */}
      <Dialog
        open={destructiveOpen}
        onClose={() => setDestructiveOpen(false)}
        type="danger"
        size="sm"
        title="Delete Project?"
        description="This action is permanent and cannot be undone."
        okText="Yes, Delete Project"
        cancelText="Cancel"
        danger
      >
        <p className="text-sm text-text">
          All associated design tokens, component assets, and version histories will be
          permanently removed from your workspace.
        </p>
      </Dialog>

      {/* 8. Form Dialog */}
      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        size="md"
        title="Invite Team Member"
        description="Add collaborators to your Faster UI design system workspace."
        footer={
          <>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setFormOpen(false);
                setInviteName("");
                setInviteEmail("");
              }}
              disabled={!inviteName || !inviteEmail}
            >
              Send Invitation
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4 py-1">
          <Input
            label="Full Name"
            placeholder="e.g. Jordan Lee"
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            required
          />
          <Input
            label="Work Email"
            type="email"
            placeholder="jordan@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
            helperText="An activation link will be sent to this email."
          />
        </div>
      </Dialog>

      {/* 9. Terms Dialog */}
      <Dialog
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        size="lg"
        scrollable
        title="Faster UI Terms of Service"
        description="Please review our terms of use before publishing."
        okText="Accept Terms"
        cancelText="Decline"
      >
        <div className="flex flex-col gap-3 pr-2 text-sm text-text">
          <p>
            <strong>1. Design Token Integrity:</strong> Components must strictly derive color and
            spacing from CSS custom properties.
          </p>
          <p>
            <strong>2. Accessibility Guarantee:</strong> Interactive components must support native
            keyboard focus traps, ARIA attributes, and high contrast visible focus outlines.
          </p>
          <p>
            <strong>3. Bundle Optimization:</strong> Zero runtime styling libraries are bundled into
            production builds.
          </p>
          {Array.from({ length: 15 }, (_, i) => i + 4).map((n) => (
            <p key={n}>
              <strong>{n}. Clause {n}:</strong> Additional term provided to demonstrate the fixed
              header/footer with an independently scrolling body for long documents.
            </p>
          ))}
        </div>
      </Dialog>

      {/* 10. Size Preview Dialog */}
      <Dialog
        open={sizeModal !== null}
        onClose={() => setSizeModal(null)}
        size={sizeModal || "md"}
        title={`${sizeModal?.toUpperCase()} Sized Dialog`}
        description={`Maximum width constraint: ${sizeModal === "sm" ? "400px" : sizeModal === "md" ? "480px" : "640px"}`}
        okText="Close Preview"
        hideCancelButton
      >
        <p className="text-sm text-text">
          This preview confirms that the modal calculates container proportions smoothly across small,
          medium, and large viewports.
        </p>
      </Dialog>

      {/* 11. Dialog With Divider */}
      <Dialog
        open={dividerOpen}
        onClose={() => setDividerOpen(false)}
        divider
        title="Update Billing Details"
        description="Changes apply to your next invoice cycle."
        okText="Save Changes"
        cancelText="Cancel"
      >
        <p className="text-sm text-text">
          The divider below the header keeps the title/description visually separated from the
          body content, useful for forms and denser information layouts.
        </p>
      </Dialog>
    </div>
  );
}
