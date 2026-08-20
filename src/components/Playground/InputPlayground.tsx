import { useState } from "react";
import { Input } from "../Input";
import type { InputSize, InputStatus } from "../Input";
import { Mail, Search, Lock, Info, Check, Copy, Sparkles, User, Globe, DollarSign } from "lucide-react";
import { Button } from "../Button";

export function InputPlayground() {
  const [size, setSize] = useState<InputSize>("md");
  const [status, setStatus] = useState<InputStatus>("default");
  const [label, setLabel] = useState("Email Address");
  const [placeholder, setPlaceholder] = useState("you@example.com");
  const [helperText, setHelperText] = useState("We will never share your personal information.");
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [clearable, setClearable] = useState(false);
  const [showPasswordToggle, setShowPasswordToggle] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);
  const [required, setRequired] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [inputType, setInputType] = useState("text");
  const [iconType, setIconType] = useState<"none" | "search" | "mail" | "lock" | "user" | "info">("mail");
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  // Gallery interactive states
  const [galleryPassword, setGalleryPassword] = useState("TapTapSecret2026");
  const [gallerySearch, setGallerySearch] = useState("design tokens");
  const [galleryDomain, setGalleryDomain] = useState("faster-ui");
  const [galleryCount, setGalleryCount] = useState("Exploring TapTap Design System");

  const getLeadingIcon = () => {
    switch (iconType) {
      case "mail":
        return <Mail className="h-4 w-4" />;
      case "search":
        return <Search className="h-4 w-4" />;
      case "lock":
        return <Lock className="h-4 w-4" />;
      case "user":
        return <User className="h-4 w-4" />;
      default:
        return undefined;
    }
  };

  const getTrailingIcon = () => {
    if (iconType === "info") {
      return <Info className="h-4 w-4 text-text-muted" />;
    }
    return undefined;
  };

  const generatedJsx = `<Input
  label="${label}"
  placeholder="${placeholder}"
  size="${size}"${inputType !== "text" ? `\n  type="${inputType}"` : ""}${status !== "default" ? `\n  status="${status}"` : ""}${prefix ? `\n  prefix="${prefix}"` : ""}${suffix ? `\n  suffix="${suffix}"` : ""}${clearable ? "\n  clearable" : ""}${showPasswordToggle ? "\n  showPasswordToggle" : ""}${showCount ? `\n  showCount${maxLength ? `\n  maxLength={${maxLength}}` : ""}` : ""}${required ? "\n  required" : ""}${disabled ? "\n  disabled" : ""}${!fullWidth ? "\n  fullWidth={false}" : ""}${helperText && !errorMessage && !warningMessage && !successMessage ? `\n  helperText="${helperText}"` : ""}${errorMessage ? `\n  errorMessage="${errorMessage}"` : ""}${warningMessage ? `\n  warningMessage="${warningMessage}"` : ""}${successMessage ? `\n  successMessage="${successMessage}"` : ""}${iconType === "mail" ? '\n  leadingIcon={<Mail className="h-4 w-4" />}' : ""}${iconType === "search" ? '\n  leadingIcon={<Search className="h-4 w-4" />}' : ""}${iconType === "lock" ? '\n  leadingIcon={<Lock className="h-4 w-4" />}' : ""}${iconType === "user" ? '\n  leadingIcon={<User className="h-4 w-4" />}' : ""}${iconType === "info" ? '\n  trailingIcon={<Info className="h-4 w-4" />}' : ""}
/>`;

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
            <h3 className="text-sm font-semibold text-text">Interactive Input Canvas</h3>
          </div>
          <span className="rounded-md bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
            Live Preview
          </span>
        </div>

        {/* Canvas Display */}
        <div className="flex min-h-[140px] items-center justify-center p-8 bg-background">
          <div className="w-full max-w-sm">
            <Input
              size={size}
              status={status}
              label={label}
              placeholder={placeholder}
              helperText={helperText}
              errorMessage={errorMessage}
              warningMessage={warningMessage}
              successMessage={successMessage}
              prefix={prefix || undefined}
              suffix={suffix || undefined}
              clearable={clearable}
              showPasswordToggle={showPasswordToggle}
              showCount={showCount}
              maxLength={maxLength}
              required={required}
              disabled={disabled}
              fullWidth={fullWidth}
              type={inputType}
              leadingIcon={getLeadingIcon()}
              trailingIcon={getTrailingIcon()}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onClear={() => setValue("")}
            />
          </div>
        </div>

        {/* Storybook Control Table */}
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
                  <td className="px-4 py-2.5 font-semibold text-primary">label</td>
                  <td className="px-4 py-2.5 text-text-muted">string</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="text"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      className="w-36 rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Accessible label linked to input element.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">placeholder</td>
                  <td className="px-4 py-2.5 text-text-muted">string</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="text"
                      value={placeholder}
                      onChange={(e) => setPlaceholder(e.target.value)}
                      className="w-36 rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Placeholder prompt when input is empty.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">status</td>
                  <td className="px-4 py-2.5 text-text-muted">default | error | warning | success</td>
                  <td className="px-4 py-2.5 font-sans">
                    <select
                      value={status}
                      onChange={(e) => {
                        const newStatus = e.target.value as InputStatus;
                        setStatus(newStatus);
                        if (newStatus === "error") setErrorMessage("Invalid input entry.");
                        else setErrorMessage("");
                        if (newStatus === "warning") setWarningMessage("Warning: verify domain.");
                        else setWarningMessage("");
                        if (newStatus === "success") setSuccessMessage("Verified format.");
                        else setSuccessMessage("");
                      }}
                      className="rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    >
                      <option value="default">default</option>
                      <option value="error">error</option>
                      <option value="warning">warning</option>
                      <option value="success">success</option>
                    </select>
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Validation border & semantic indicator state.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">size</td>
                  <td className="px-4 py-2.5 text-text-muted">sm | md | lg</td>
                  <td className="px-4 py-2.5 font-sans">
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value as InputSize)}
                      className="rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    >
                      <option value="sm">sm (32px)</option>
                      <option value="md">md (40px)</option>
                      <option value="lg">lg (48px)</option>
                    </select>
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Input height and typography sizing.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">prefix / suffix</td>
                  <td className="px-4 py-2.5 text-text-muted">string | ReactNode</td>
                  <td className="px-4 py-2.5 font-sans flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="Prefix"
                      value={prefix}
                      onChange={(e) => setPrefix(e.target.value)}
                      className="w-16 rounded border border-border bg-background px-1.5 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    />
                    <input
                      type="text"
                      placeholder="Suffix"
                      value={suffix}
                      onChange={(e) => setSuffix(e.target.value)}
                      className="w-16 rounded border border-border bg-background px-1.5 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Inline static text decorators (e.g. $, https://, .com).
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">clearable</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={clearable}
                      onChange={(e) => setClearable(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Shows inline clear 'X' button when input has value.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">showPasswordToggle</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={showPasswordToggle}
                      onChange={(e) => {
                        setShowPasswordToggle(e.target.checked);
                        if (e.target.checked) setInputType("password");
                      }}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Enables eye show/hide password toggle button.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">showCount</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showCount}
                      onChange={(e) => {
                        setShowCount(e.target.checked);
                        if (e.target.checked && !maxLength) setMaxLength(50);
                      }}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                    {showCount && (
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxLength ?? ""}
                        onChange={(e) => setMaxLength(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-16 rounded border border-border bg-background px-1.5 py-1 text-xs text-text"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Live character count in bottom-right corner.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">helperText</td>
                  <td className="px-4 py-2.5 text-text-muted">string</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="text"
                      value={helperText}
                      onChange={(e) => setHelperText(e.target.value)}
                      className="w-48 rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Secondary hint text under input.
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
                      <option value="mail">Leading Mail</option>
                      <option value="search">Leading Search</option>
                      <option value="lock">Leading Lock</option>
                      <option value="user">Leading User</option>
                      <option value="info">Trailing Info</option>
                    </select>
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Slot iconography decorators.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">required</td>
                  <td className="px-4 py-2.5 text-text-muted">boolean</td>
                  <td className="px-4 py-2.5 font-sans">
                    <input
                      type="checkbox"
                      checked={required}
                      onChange={(e) => setRequired(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-focus-ring cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Displays red asterisk (*) in label.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2.5 font-semibold text-primary">type</td>
                  <td className="px-4 py-2.5 text-text-muted">text | email | password | search | number</td>
                  <td className="px-4 py-2.5 font-sans">
                    <select
                      value={inputType}
                      onChange={(e) => setInputType(e.target.value)}
                      className="rounded border border-border bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-focus-ring"
                    >
                      <option value="text">text</option>
                      <option value="email">email</option>
                      <option value="password">password</option>
                      <option value="search">search</option>
                      <option value="number">number</option>
                    </select>
                  </td>
                  <td className="px-4 py-2.5 font-sans text-text-muted">
                    Native input element type attribute.
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
                    Expands input width to 100% of parent container.
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
                    Applies muted background and blocks typing.
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
        <h3 className="text-lg font-semibold text-text">Figma Input Types & States</h3>

        {/* Section 1: Types & Features */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. Search with Clearable */}
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5">
            <span className="text-xs font-bold uppercase text-primary">Search with Clearable Action</span>
            <Input
              label="Search Components"
              type="search"
              placeholder="Filter by name..."
              leadingIcon={<Search className="h-4 w-4" />}
              clearable
              value={gallerySearch}
              onChange={(e) => setGallerySearch(e.target.value)}
              onClear={() => setGallerySearch("")}
              helperText="Type text to see interactive clear 'X' button."
            />
          </div>

          {/* 2. Password with Reveal Toggle */}
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5">
            <span className="text-xs font-bold uppercase text-primary">Password with Reveal Toggle</span>
            <Input
              label="Account Password"
              type="password"
              showPasswordToggle
              value={galleryPassword}
              onChange={(e) => setGalleryPassword(e.target.value)}
              leadingIcon={<Lock className="h-4 w-4" />}
              helperText="Click eye icon to toggle plain text."
              required
            />
          </div>

          {/* 3. Prefix & Suffix Addons */}
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5">
            <span className="text-xs font-bold uppercase text-primary">Prefix & Suffix Addons</span>
            <Input
              label="Workspace URL"
              prefix="https://"
              suffix=".taptap.io"
              value={galleryDomain}
              onChange={(e) => setGalleryDomain(e.target.value)}
              helperText="Static prefix and suffix inside container."
              required
            />
          </div>

          {/* 4. Currency / Price Input */}
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5">
            <span className="text-xs font-bold uppercase text-text">Currency & Addon Prefix</span>
            <Input
              label="Budget Allocation"
              prefix={<DollarSign className="h-3.5 w-3.5" />}
              suffix="USD"
              placeholder="0.00"
              defaultValue="2500"
              helperText="Formatted financial amount."
            />
          </div>

          {/* 5. Character Counter Input */}
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5">
            <span className="text-xs font-bold uppercase text-text">Character Counter</span>
            <Input
              label="Project Description"
              value={galleryCount}
              onChange={(e) => setGalleryCount(e.target.value)}
              showCount
              maxLength={40}
              helperText="Live character length constraint."
            />
          </div>

          {/* 6. Disabled State */}
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5">
            <span className="text-xs font-bold uppercase text-text-muted">Disabled State</span>
            <Input
              label="Read-Only API Key"
              value="taptap_sec_live_984128"
              disabled
              leadingIcon={<Globe className="h-4 w-4" />}
              helperText="Managed by workspace administrators."
            />
          </div>
        </div>

        {/* Section 2: Validation States Matrix */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
            TapTap Validation States Matrix (Default, Success, Warning, Error)
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="Default State"
              placeholder="Standard input"
              helperText="Normal guidance text."
            />
            <Input
              label="Success State"
              defaultValue="jordan@taptap.io"
              status="success"
              successMessage="Email verified."
            />
            <Input
              label="Warning State"
              defaultValue="weak_password"
              status="warning"
              warningMessage="Low entropy password."
            />
            <Input
              label="Error State"
              defaultValue="invalid-format"
              errorMessage="Must be a valid email."
              required
            />
          </div>
        </div>

        {/* Section 3: Sizing & Composite Sign-In Form */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Sizing Comparison */}
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
              TapTap 8pt Sizing Scale (32px, 40px, 48px)
            </h4>
            <Input size="sm" label="Small Input (32px)" placeholder="Compact UI contexts" />
            <Input size="md" label="Medium Input (40px Default)" placeholder="Standard forms" />
            <Input size="lg" label="Large Input (48px)" placeholder="Prominent search / hero bars" />
          </div>

          {/* Complete Composite Form Layout */}
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
            <div className="border-b border-border pb-3">
              <h4 className="text-base font-semibold text-text">Sign In Composite Form</h4>
              <p className="text-xs text-text-muted">Production form composition using TapTap components</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              <Input
                label="Work Email"
                type="email"
                placeholder="name@company.com"
                leadingIcon={<Mail className="h-4 w-4" />}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                leadingIcon={<Lock className="h-4 w-4" />}
                showPasswordToggle
                required
                helperText="Must be at least 8 characters."
              />
              <Button variant="primary" fullWidth className="mt-2">
                Continue to Dashboard
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
