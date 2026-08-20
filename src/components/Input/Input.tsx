import { forwardRef, useId, useImperativeHandle, useRef, useState } from "react";
import type { InputHTMLAttributes, ReactNode, ChangeEvent } from "react";
import clsx from "clsx";
import { Eye, EyeOff, X, CheckCircle2, AlertCircle } from "lucide-react";

export type InputSize = "sm" | "md" | "lg";
export type InputStatus = "default" | "error" | "warning" | "success";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /** Visible label rendered above the field. */
  label?: string;
  /** Helper text shown below the field when there is no error. */
  helperText?: string;
  /** Error message. When set, status is treated as 'error' and message replaces helperText. */
  errorMessage?: string;
  /** Warning message. */
  warningMessage?: string;
  /** Success message. */
  successMessage?: string;
  /** Validation status of the input. @default 'default' */
  status?: InputStatus;
  /** Size of the field (sm: 32px, md: 40px, lg: 48px). @default 'md' */
  size?: InputSize;
  /** Icon rendered at the start of the field. */
  leadingIcon?: ReactNode;
  /** Icon rendered at the end of the field. */
  trailingIcon?: ReactNode;
  /** Static prefix (text or element) rendered inside the input box (e.g. "https://", "$"). */
  prefix?: ReactNode;
  /** Static suffix (text or element) rendered inside the input box (e.g. ".com", "USD"). */
  suffix?: ReactNode;
  /** Enables an inline clear ('X') button when the input has content. */
  clearable?: boolean;
  /** Callback fired when the clear button is clicked. */
  onClear?: () => void;
  /** Displays a live character count in the bottom right corner (e.g., 12/50). */
  showCount?: boolean;
  /** Enables a toggle button to reveal/hide password for type="password". */
  showPasswordToggle?: boolean;
  /** Stretches the input to fill its container width. @default true */
  fullWidth?: boolean;
  containerClassName?: string;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "h-8 text-sm px-2.5",
  md: "h-10 text-sm px-3",
  lg: "h-12 text-base px-4",
};

/**
 * Faster UI Input.
 *
 * TapTap Design System compliant text input with support for:
 * - Sizing (sm: 32px, md: 40px, lg: 48px)
 * - Validation statuses: default, error, warning, success
 * - Prefix and Suffix text/addons
 * - Leading and Trailing icons
 * - Clearable 'X' button and Password reveal toggle
 * - Character count display
 * - Full WAI-ARIA accessibility (aria-invalid, aria-describedby, aria-live)
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      helperText,
      errorMessage,
      warningMessage,
      successMessage,
      status = "default",
      size = "md",
      leadingIcon,
      trailingIcon,
      prefix,
      suffix,
      clearable = false,
      onClear,
      showCount = false,
      showPasswordToggle = false,
      fullWidth = true,
      disabled,
      className,
      containerClassName,
      required,
      type = "text",
      value,
      defaultValue,
      onChange,
      maxLength,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value ?? "") : String(uncontrolledValue ?? "");
    const currentLength = currentValue.length;

    // Determine effective status
    const effectiveStatus: InputStatus = errorMessage
      ? "error"
      : warningMessage
      ? "warning"
      : successMessage
      ? "success"
      : status;

    const hasError = effectiveStatus === "error";
    const hasWarning = effectiveStatus === "warning";
    const hasSuccess = effectiveStatus === "success";

    const effectiveType = type === "password" && showPassword ? "text" : type;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setUncontrolledValue("");
      } else if (inputRef.current) {
        const valueSetter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value"
        )?.set;
        valueSetter?.call(inputRef.current, "");
        inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
      }
      onClear?.();
    };

    const describedBy = hasError
      ? errorId
      : helperText || warningMessage || successMessage
      ? helperId
      : undefined;

    return (
      <div className={clsx(fullWidth && "w-full", containerClassName)}>
        {/* Label and optional/required indicators */}
        {label && (
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor={inputId}
              className="block text-sm font-medium text-text"
            >
              {label}
              {required && (
                <span className="ml-0.5 text-danger" aria-hidden="true">
                  *
                </span>
              )}
            </label>
            {!required && !showCount && (
              <span className="text-xs text-text-muted">Optional</span>
            )}
          </div>
        )}

        {/* Input Wrapper Container */}
        <div
          className={clsx(
            "flex items-center gap-2 rounded-md border bg-background transition-colors",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-1",
            // Status border & ring variations
            hasError &&
              "border-danger-border focus-within:border-danger focus-within:ring-danger",
            hasWarning &&
              "border-amber-500/60 focus-within:border-amber-500 focus-within:ring-amber-500/50",
            hasSuccess &&
              "border-primary focus-within:border-primary focus-within:ring-focus-ring",
            effectiveStatus === "default" &&
              "border-border hover:border-border-hover focus-within:border-primary focus-within:ring-focus-ring",
            disabled &&
              "cursor-not-allowed border-disabled-border bg-disabled-bg text-disabled-text",
            sizeStyles[size]
          )}
        >
          {/* Leading Icon */}
          {leadingIcon && (
            <span className="shrink-0 text-text-muted" aria-hidden="true">
              {leadingIcon}
            </span>
          )}

          {/* Prefix (e.g. "https://", "$") */}
          {prefix && (
            <span className="shrink-0 select-none font-medium text-text-muted">
              {prefix}
            </span>
          )}

          {/* Core Input Element */}
          <input
            ref={inputRef}
            id={inputId}
            type={effectiveType}
            value={isControlled ? value : uncontrolledValue}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={clsx(
              "w-full bg-transparent text-text outline-none placeholder:text-text-muted",
              "disabled:cursor-not-allowed disabled:text-disabled-text",
              className
            )}
            {...rest}
          />

          {/* Suffix (e.g. ".com", "USD") */}
          {suffix && (
            <span className="shrink-0 select-none text-xs font-medium text-text-muted">
              {suffix}
            </span>
          )}

          {/* Status Indicator Icon (Success / Warning / Error) */}
          {hasSuccess && !trailingIcon && !clearable && (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          )}
          {hasWarning && !trailingIcon && !clearable && (
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
          )}

          {/* Clearable 'X' Button */}
          {clearable && currentValue.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="shrink-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-text-muted text-white hover:bg-[#6b7280] dark:hover:bg-[#475569] active:bg-[#4b5563] dark:active:bg-[#334155] focus:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring cursor-pointer transition-colors"
              aria-label="Clear input"
            >
              <X className="h-2.5 w-2.5 stroke-[2.5]" aria-hidden="true" />
            </button>
          )}

          {/* Password Show/Hide Toggle */}
          {type === "password" && showPasswordToggle && !disabled && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="shrink-0 text-text-muted hover:text-text focus:outline-none cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}

          {/* Trailing Icon */}
          {trailingIcon && (
            <span className="shrink-0 text-text-muted" aria-hidden="true">
              {trailingIcon}
            </span>
          )}
        </div>

        {/* Bottom Helper / Status / Character Count Row */}
        <div className="mt-1.5 flex items-center justify-between gap-2 text-xs">
          <div className="flex-1">
            {hasError && (
              <p id={errorId} role="alert" className="text-danger-text">
                {errorMessage || "This field contains an error."}
              </p>
            )}
            {hasWarning && (
              <p id={helperId} role="alert" className="text-amber-600 dark:text-amber-400">
                {warningMessage}
              </p>
            )}
            {hasSuccess && (
              <p id={helperId} className="text-primary">
                {successMessage}
              </p>
            )}
            {effectiveStatus === "default" && helperText && (
              <p id={helperId} className="text-text-muted">
                {helperText}
              </p>
            )}
          </div>

          {/* Character Count */}
          {showCount && (
            <span className="shrink-0 font-mono text-text-muted">
              {currentLength}
              {maxLength ? ` / ${maxLength}` : ""}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
