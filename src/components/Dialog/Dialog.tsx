import {
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { X, Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "../Button";

export type DialogSize = "sm" | "md" | "lg";
export type DialogType = "default" | "info" | "success" | "warning" | "error" | "danger";
export type DialogAlign = "left" | "center";

export interface DialogProps {
  /** Controls whether the dialog is rendered/visible. */
  open: boolean;
  /** Called when the user requests to close the dialog (ESC, overlay click, close button). */
  onClose: () => void;
  /** Semantic type of the dialog (default, info, success, warning, error, danger). @default 'default' */
  type?: DialogType;
  /** Content alignment within the dialog. @default 'left' */
  align?: DialogAlign;
  /** Custom icon override. When type is set, a matching status icon is displayed automatically unless overridden. */
  icon?: ReactNode;
  /** Accessible title, rendered in the header and wired to aria-labelledby. */
  title?: ReactNode;
  /** Accessible name used when no visible title is rendered. */
  ariaLabel?: string;
  /** Optional supporting description, wired to aria-describedby. */
  description?: ReactNode;
  /** Dialog body content. */
  children?: ReactNode;
  /** Custom footer content. When omitted, standard action buttons are automatically generated. */
  footer?: ReactNode;
  /** Text for the confirmation action button. @default 'Confirm' */
  okText?: string;
  /** Text for the cancel action button. @default 'Cancel' */
  cancelText?: string;
  /** Callback fired when the confirm button is clicked. Defaults to onClose. */
  onOk?: () => void;
  /** Callback fired when the cancel button is clicked. Defaults to onClose. */
  onCancel?: () => void;
  /** Hides the cancel button in the generated footer (e.g. for informational alerts). @default false */
  hideCancelButton?: boolean;
  /** Gives the confirm button high-contrast destructive danger styling. */
  danger?: boolean;
  /** Size of the dialog panel (sm: 400px, md: 480px, lg: 640px). @default 'md' */
  size?: DialogSize;
  /** Closes the dialog when the overlay backdrop is clicked. @default true */
  closeOnOverlayClick?: boolean;
  /** Closes the dialog when Escape is pressed. @default true */
  closeOnEsc?: boolean;
  /** Hides the built-in close (X) button in the upper corner. @default false */
  hideCloseButton?: boolean;
  className?: string;
}

const sizeStyles: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Faster UI Dialog.
 *
 * TapTap Design System compliant modal dialog supporting:
 * - Types: default, info, success, warning, error, danger
 * - Alignments: left, center
 * - Sizing: sm (400px), md (480px), lg (640px)
 * - Built-in status iconography and automatic footer generation
 * - Focus trapping, keyboard navigation, and WAI-ARIA modal semantics
 */
export function Dialog({
  open,
  onClose,
  type = "default",
  align = "left",
  icon,
  title,
  ariaLabel,
  description,
  children,
  footer,
  okText = "Confirm",
  cancelText = "Cancel",
  onOk,
  onCancel,
  hideCancelButton = false,
  danger,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  hideCloseButton = false,
  className,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusable?.[0] ?? panel)?.focus();

    return () => {
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (closeOnEsc && event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [closeOnEsc, onClose]
  );

  if (!open) return null;

  const isDestructive = danger || type === "danger" || type === "error";

  // Resolve status icon
  const renderStatusIcon = () => {
    if (icon) return icon;
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" aria-hidden="true" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />;
      case "error":
      case "danger":
        return <AlertCircle className="h-5 w-5 text-danger" aria-hidden="true" />;
      default:
        return null;
    }
  };

  const statusIcon = renderStatusIcon();
  const isCentered = align === "center";

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-testid="dialog-overlay"
    >
      <div
        className="fixed inset-0 bg-overlay transition-opacity"
        aria-hidden="true"
        data-testid="dialog-overlay-backdrop"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel || "Dialog"}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={clsx(
          "relative z-10 w-full rounded-xl border border-border bg-background p-6 shadow-overlay outline-none",
          sizeStyles[size],
          className
        )}
      >
        {/* Top-Right Dismiss Button */}
        {!hideCloseButton && (
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer rounded-lg p-1.5 text-text-muted hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring transition-colors"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        {/* Centered Layout Header */}
        {isCentered && (
          <div className="mb-4 flex flex-col items-center text-center">
            {statusIcon && (
              <div
                className={clsx(
                  "mb-3 flex h-12 w-12 items-center justify-center rounded-full",
                  type === "info" && "bg-blue-500/10",
                  type === "success" && "bg-primary-subtle",
                  type === "warning" && "bg-amber-500/10",
                  (type === "error" || type === "danger") && "bg-danger-subtle",
                  type === "default" && "bg-disabled-bg"
                )}
              >
                {statusIcon}
              </div>
            )}
            {title && (
              <h2 id={titleId} className="text-lg font-semibold text-text">
                {title}
              </h2>
            )}
            {description && (
              <p id={descriptionId} className="mt-1.5 text-sm text-text-muted">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Left-Aligned Layout Header */}
        {!isCentered && (title || description || statusIcon) && (
          <div className="mb-4 pr-6">
            <div className="flex items-start gap-3">
              {statusIcon && <div className="mt-0.5 shrink-0">{statusIcon}</div>}
              <div className="flex-1">
                {title && (
                  <h2 id={titleId} className="text-lg font-semibold text-text">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id={descriptionId} className="mt-1 text-sm text-text-muted">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Body Content */}
        {children && (
          <div
            className={clsx(
              "text-sm text-text",
              isCentered && "text-center"
            )}
          >
            {children}
          </div>
        )}

        {/* Footer Actions */}
        {footer !== undefined ? (
          footer && (
            <div
              className={clsx(
                "mt-6 flex gap-3",
                isCentered ? "justify-center" : "justify-end"
              )}
            >
              {footer}
            </div>
          )
        ) : (
          <div
            className={clsx(
              "mt-6 flex items-center gap-3",
              isCentered ? "justify-center" : "justify-end"
            )}
          >
            {!hideCancelButton && (
              <Button
                variant="outline"
                onClick={onCancel ?? onClose}
              >
                {cancelText}
              </Button>
            )}
            <Button
              variant="primary"
              danger={isDestructive}
              onClick={onOk ?? onClose}
            >
              {okText}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

Dialog.displayName = "Dialog";
