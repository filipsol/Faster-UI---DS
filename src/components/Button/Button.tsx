import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type ButtonVariant = "primary" | "outline" | "ghost" | "link" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Visual style variant matching Figma TapTap Design System. @default 'primary' */
  variant?: ButtonVariant;
  /** Intent / status modifier. When true, applies destructive/danger styling to any variant. */
  danger?: boolean;
  /** Size of the button. @default 'md' */
  size?: ButtonSize;
  /** Shows a spinner and disables interaction. */
  isLoading?: boolean;
  /** Stretches the button to fill its container width. */
  fullWidth?: boolean;
  /** Icon rendered before the label. */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: ReactNode;
  children?: ReactNode;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium cursor-pointer " +
  "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const linkSizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-1 text-sm",
  md: "h-10 px-1.5 text-sm",
  lg: "h-12 px-2 text-base",
};

function getVariantStyles(variant: ButtonVariant, isDanger: boolean): string {
  // If variant is explicitly 'danger', treat as primary danger
  const effectiveDanger = isDanger || variant === "danger";
  const normalizedVariant = variant === "secondary" ? "outline" : variant;
  const effectiveVariant = normalizedVariant === "danger" ? "primary" : normalizedVariant;

  if (effectiveDanger) {
    switch (effectiveVariant) {
      case "primary":
        return (
          "bg-danger text-primary-foreground hover:bg-danger-hover active:bg-danger-active " +
          "disabled:bg-disabled-bg disabled:text-disabled-text"
        );
      case "outline":
        return (
          "bg-background text-danger border border-danger/40 hover:bg-danger-subtle hover:border-danger active:bg-danger-subtle/80 " +
          "disabled:bg-disabled-bg disabled:text-disabled-text disabled:border-disabled-border"
        );
      case "ghost":
        return "bg-transparent text-danger hover:bg-danger-subtle active:bg-danger-subtle/80 disabled:text-disabled-text";
      case "link":
        return "bg-transparent text-danger hover:underline hover:text-danger-hover active:text-danger-active disabled:text-disabled-text disabled:no-underline";
    }
  }

  switch (effectiveVariant) {
    case "primary":
      return (
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active " +
        "disabled:bg-disabled-bg disabled:text-disabled-text"
      );
    case "outline":
      return (
        "bg-background text-text border border-border hover:bg-surface hover:border-border-hover active:bg-disabled-bg/50 " +
        "disabled:bg-disabled-bg disabled:text-disabled-text disabled:border-disabled-border"
      );
    case "ghost":
      return "bg-transparent text-text hover:bg-surface active:bg-disabled-bg/50 disabled:text-disabled-text";
    case "link":
      return "bg-transparent text-primary hover:underline hover:text-primary-hover active:text-primary-active disabled:text-disabled-text disabled:no-underline";
  }
}

/** Small inline spinner used for the `isLoading` state. */
function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/**
 * Faster UI Button.
 *
 * A single, reusable button adhering to Figma TapTap Design System.
 * Supports primary / secondary / ghost / link variants, danger status modifier,
 * three sizes, loading and disabled states, and optional leading/trailing icons.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      danger = false,
      size = "md",
      isLoading = false,
      fullWidth = false,
      leadingIcon,
      trailingIcon,
      disabled,
      className,
      children,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const isLink = variant === "link";

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={isLoading || undefined}
        className={clsx(
          baseStyles,
          isLink ? linkSizeStyles[size] : sizeStyles[size],
          getVariantStyles(variant, danger),
          fullWidth && "w-full",
          className
        )}
        {...rest}
      >
        {isLoading && <Spinner />}
        {!isLoading && leadingIcon}
        {children}
        {!isLoading && trailingIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
