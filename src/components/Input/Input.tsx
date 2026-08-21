import { forwardRef, useId, useRef, useState } from "react";
import type { InputHTMLAttributes, ReactNode, ChangeEvent } from "react";
import clsx from "clsx";
import { Eye, EyeOff, X, CheckCircle2, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";

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
  /** Size of the field (sm: 24px, md: 36px, lg: 40px). @default 'md' */
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
  /** Controls visibility of number steppers when type="number". @default true */
  showSteppers?: boolean;
  /** Callback fired when stepping number up or down. */
  onStep?: (value: number, direction: "up" | "down") => void;
  /** Stretches the input to fill its container width. @default true */
  fullWidth?: boolean;
  containerClassName?: string;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "h-6 text-xs leading-[18px] px-2 gap-1 rounded-sm",
  md: "h-9 text-sm leading-[22px] px-3 gap-2 rounded-sm",
  lg: "h-10 text-base leading-6 px-3 gap-2 rounded-sm",
};

const inputFontSizes: Record<InputSize, string> = {
  sm: "text-xs leading-[18px]",
  md: "text-sm leading-[22px]",
  lg: "text-base leading-6",
};

const iconSizes: Record<InputSize, string> = {
  sm: "[&>svg]:h-3.5 [&>svg]:w-3.5 text-xs",
  md: "[&>svg]:h-4 [&>svg]:w-4 text-sm",
  lg: "[&>svg]:h-[18px] [&>svg]:w-[18px] text-base",
};

const clearIconSizes: Record<InputSize, { btn: string; icon: string }> = {
  sm: { btn: "h-3.5 w-3.5", icon: "h-2 w-2 stroke-[2.5]" },
  md: { btn: "h-4 w-4", icon: "h-2.5 w-2.5 stroke-[2.5]" },
  lg: { btn: "h-4 w-4", icon: "h-2.5 w-2.5 stroke-[2.5]" },
};

const stepperSizes: Record<InputSize, { container: string; icon: string }> = {
  sm: {
    container: "w-2.5 h-full",
    icon: "h-2 w-2 stroke-[2.5]",
  },
  md: {
    container: "w-3 h-full",
    icon: "h-2.5 w-2.5 stroke-[2.5]",
  },
  lg: {
    container: "w-3.5 h-full",
    icon: "h-3 w-3 stroke-[2.5]",
  },
};

const helperSizeStyles: Record<InputSize, string> = {
  sm: "text-xs leading-[18px]",
  md: "text-xs leading-[18px]",
  lg: "text-xs leading-[18px]",
};

/**
 * Faster UI Input.
 *
 * TapTap Design System compliant text input with support for:
 * - Sizing (sm: 24px, md: 36px, lg: 40px)
 * - Validation statuses: default, error, warning, success
 * - Prefix and Suffix text/addons
 * - Number steppers (TapTap Input-Number with chevron steppers)
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
      showSteppers = true,
      onStep,
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
      step,
      min,
      max,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const innerInputRef = useRef<HTMLInputElement | null>(null);

    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
    const [showPassword, setShowPassword] = useState(false);

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
    const isNumberType = type === "number";
    const displaySteppers = isNumberType && showSteppers;

    const handleRef = (element: HTMLInputElement | null) => {
      innerInputRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as { current: HTMLInputElement | null }).current = element;
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setUncontrolledValue("");
      }

      if (isControlled && innerInputRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;

        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(innerInputRef.current, "");
        } else {
          innerInputRef.current.value = "";
        }

        innerInputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
      }

      onClear?.();
    };

    const handleStep = (direction: "up" | "down") => {
      if (disabled) return;
      const numStep = typeof step === "number" ? step : Number(step) || 1;
      const minVal = min !== undefined ? Number(min) : -Infinity;
      const maxVal = max !== undefined ? Number(max) : Infinity;

      const currentNum = currentValue === "" ? 0 : Number(currentValue);
      const baseNum = Number.isNaN(currentNum) ? 0 : currentNum;

      let nextNum = direction === "up" ? baseNum + numStep : baseNum - numStep;

      // Handle precision decimals
      const stepStr = String(numStep);
      const decimals = stepStr.includes(".") ? stepStr.split(".")[1].length : 0;
      nextNum = Number(nextNum.toFixed(decimals));

      if (nextNum < minVal) nextNum = minVal;
      if (nextNum > maxVal) nextNum = maxVal;

      const nextStr = String(nextNum);
      if (!isControlled) {
        setUncontrolledValue(nextStr);
      }

      onStep?.(nextNum, direction);

      if (onChange && innerInputRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(innerInputRef.current, nextStr);
        } else {
          innerInputRef.current.value = nextStr;
        }
        const event = new Event("input", { bubbles: true });
        innerInputRef.current.dispatchEvent(event);
      }
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
          <div className="mb-1 flex items-center justify-between">
            <label
              htmlFor={inputId}
              className="block text-xs font-medium text-text"
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
            "flex items-center border bg-background font-normal transition-colors",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0",
            // Status border & ring variations
            hasError &&
              "border-danger focus-within:border-danger focus-within:ring-danger/20",
            hasWarning &&
              "border-amber-500/60 focus-within:border-amber-500 focus-within:ring-amber-500/20",
            hasSuccess &&
              "border-primary focus-within:border-primary focus-within:ring-primary/20",
            effectiveStatus === "default" &&
              "border-border hover:border-primary focus-within:border-primary focus-within:ring-primary/20",
            disabled &&
              "cursor-not-allowed border-disabled-border bg-disabled-bg text-disabled-text hover:border-disabled-border focus-within:ring-0",
            sizeStyles[size]
          )}
        >
          {/* Leading Icon */}
          {leadingIcon && (
            <span
              className={clsx(
                "inline-flex shrink-0 items-center justify-center text-text-muted transition-colors",
                disabled && "text-disabled-text",
                iconSizes[size]
              )}
              aria-hidden="true"
            >
              {leadingIcon}
            </span>
          )}

          {/* Prefix (e.g. "http://", "$", "¥") */}
          {prefix && (
            <span
              className={clsx(
                "shrink-0 select-none font-normal text-text-muted transition-colors",
                disabled && "text-disabled-text",
                inputFontSizes[size],
                // When prefix is alone (no suffix), gap is 12px (lg/md) and 8px (sm) according to TapTap Input-Prefix
                !suffix && (size === "sm" ? "mr-1" : "mr-1")
              )}
            >
              {prefix}
            </span>
          )}

          {/* Core Input Element */}
          <input
            ref={handleRef}
            id={inputId}
            type={effectiveType}
            value={isControlled ? value : uncontrolledValue}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            step={step}
            min={min}
            max={max}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={clsx(
              "w-full bg-transparent font-normal text-text outline-none placeholder:text-text-muted",
              "disabled:cursor-not-allowed disabled:text-disabled-text",
              isNumberType && "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              inputFontSizes[size],
              className
            )}
            {...rest}
          />

          {/* Suffix (e.g. ".com", "USD", "CNY") */}
          {suffix && (
            <span
              className={clsx(
                "shrink-0 select-none font-normal text-text-muted transition-colors",
                disabled && "text-disabled-text",
                inputFontSizes[size],
                // Spacing from input text: 12px (lg/md) and 8px (sm) according to TapTap Input-Suffix
                size === "sm" ? "ml-1" : "ml-1"
              )}
            >
              {suffix}
            </span>
          )}

          {/* Status Indicator Icon (Success / Warning / Error) */}
          {hasSuccess && !trailingIcon && !clearable && !displaySteppers && (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
          )}
          {hasWarning && !trailingIcon && !clearable && !displaySteppers && (
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
          )}

          {/* Clearable 'X' Button */}
          {clearable && currentValue.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className={clsx(
                "shrink-0 inline-flex items-center justify-center rounded-full",
                "bg-[#cacaca] text-white hover:bg-[#8e8e8e] active:bg-[#4b4b4b]",
                "dark:bg-[#475569] dark:hover:bg-[#64748b] dark:active:bg-[#334155]",
                "focus:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring cursor-pointer transition-colors",
                clearIconSizes[size].btn
              )}
              aria-label="Clear input"
            >
              <X className={clearIconSizes[size].icon} aria-hidden="true" />
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
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
            </button>
          )}

          {/* Number Stepper Controls (TapTap Input-Number) */}
          {displaySteppers && (
            <div
              className={clsx(
                "flex flex-col justify-center shrink-0 select-none py-0.5",
                stepperSizes[size].container
              )}
            >
              <button
                type="button"
                tabIndex={-1}
                disabled={disabled}
                onClick={() => handleStep("up")}
                aria-label="Increment value"
                className={clsx(
                  "flex items-center justify-center flex-1 transition-colors leading-none",
                  disabled
                    ? "cursor-not-allowed text-disabled-text"
                    : "cursor-pointer text-text-muted hover:text-text active:text-primary"
                )}
              >
                <ChevronUp className={stepperSizes[size].icon} aria-hidden="true" />
              </button>
              <button
                type="button"
                tabIndex={-1}
                disabled={disabled}
                onClick={() => handleStep("down")}
                aria-label="Decrement value"
                className={clsx(
                  "flex items-center justify-center flex-1 transition-colors leading-none",
                  disabled
                    ? "cursor-not-allowed text-disabled-text"
                    : "cursor-pointer text-text-muted hover:text-text active:text-primary"
                )}
              >
                <ChevronDown className={stepperSizes[size].icon} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Trailing Icon */}
          {trailingIcon && (
            <span
              className={clsx(
                "inline-flex shrink-0 items-center justify-center text-text-muted transition-colors",
                disabled && "text-disabled-text",
                iconSizes[size]
              )}
              aria-hidden="true"
            >
              {trailingIcon}
            </span>
          )}
        </div>

        {/* Bottom Helper / Status / Character Count Row - 4px gap mt-1 as in Figma */}
        {(hasError || hasWarning || hasSuccess || (effectiveStatus === "default" && helperText) || showCount) && (
          <div
            className={clsx(
              "mt-1 flex items-center justify-between gap-2",
              helperSizeStyles[size]
            )}
          >
            <div className="flex-1">
              {hasError && (
                <p id={errorId} role="alert" className="text-danger">
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
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

