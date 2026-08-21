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
  "inline-flex items-center justify-center gap-1 rounded-[4px] font-medium cursor-pointer " +
  "transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-6 min-w-[54px] px-1 text-[12px] leading-[18px]", // Medium/Caption (12px / 18px, 24px height)
  md: "h-9 min-w-[82px] px-2 text-[14px] leading-[22px]", // Medium/Body (14px / 22px, 36px height)
  lg: "h-10 min-w-[90px] px-2 text-[16px] leading-[24px]", // Medium/Subtitle (16px / 24px, 40px height)
};

const linkSizeStyles: Record<ButtonSize, string> = {
  sm: "h-auto p-0 text-[12px] leading-[18px]",
  md: "h-auto p-0 text-[14px] leading-[22px]",
  lg: "h-auto p-0 text-[16px] leading-[24px]",
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
          "bg-danger text-white hover:bg-danger-hover active:bg-danger-active " +
          "disabled:bg-[#ffccd2] disabled:text-white"
        );
      case "outline":
        return (
          "font-normal bg-background text-danger border border-danger hover:bg-background hover:text-danger-hover hover:border-danger-hover " +
          "active:bg-background active:text-danger-active active:border-danger-active " +
          "disabled:bg-background disabled:text-disabled-text disabled:border-disabled-border"
        );
      case "ghost":
        return (
          "font-normal bg-transparent text-danger hover:bg-danger-subtle active:bg-danger-200 " +
          "disabled:bg-transparent disabled:text-disabled-text"
        );
      case "link":
        return (
          "font-normal bg-transparent text-danger hover:text-danger-hover active:text-danger-active " +
          "disabled:text-[#ffccd2]"
        );
    }
  }

  switch (effectiveVariant) {
    case "primary":
      return (
        "bg-primary text-white hover:bg-primary-hover active:bg-primary-active " +
        "disabled:bg-[#b0ebec] disabled:text-white"
      );
    case "outline":
      return (
        "font-normal bg-background text-text border border-border hover:bg-background hover:text-primary hover:border-primary " +
        "active:bg-background active:text-primary-active active:border-primary-active " +
        "disabled:bg-background disabled:text-disabled-text disabled:border-disabled-border"
      );
    case "ghost":
      return (
        "font-normal bg-transparent text-text hover:bg-neutral-100 active:bg-neutral-200 " +
        "disabled:bg-transparent disabled:text-disabled-text"
      );
    case "link":
      return (
        "font-normal bg-transparent text-primary hover:text-primary-hover active:text-primary-active " +
        "disabled:text-[#b0ebec]"
      );
  }
}

/** Small inline spinner used for the `isLoading` state. */
function Spinner({ size }: { size?: ButtonSize }) {
  const iconSizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <svg
      className={clsx(iconSizeClass, "animate-spin")}
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
      size = "lg",
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
        {isLoading && <Spinner size={size} />}
        {!isLoading && leadingIcon}
        {children}
        {!isLoading && trailingIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
