import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Input } from "./Input";
import { Button } from "../Button";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    onChange: fn(),
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Height and typography sizing (sm: 32px, md: 40px, lg: 48px).",
      table: { defaultValue: { summary: "md" } },
    },
    disabled: {
      control: "boolean",
      description: "Disables user input and applies muted disabled styles.",
      table: { defaultValue: { summary: "false" } },
    },
    required: {
      control: "boolean",
      description: "Displays a red required asterisk indicator next to label.",
      table: { defaultValue: { summary: "false" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Stretches input field to 100% of container width.",
      table: { defaultValue: { summary: "true" } },
    },
    label: {
      control: "text",
      description: "Accessible text label associated with the input field.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text displayed when field is empty.",
    },
    helperText: {
      control: "text",
      description: "Supporting text displayed below the input.",
    },
    errorMessage: {
      control: "text",
      description: "Error alert message; marks aria-invalid='true' and overrides helperText.",
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search", "tel", "url"],
      description: "Native HTML input type.",
      table: { defaultValue: { summary: "text" } },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Icons for stories
const MailIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const SearchIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const LockIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const InfoIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const Playground: Story = {
  args: {
    size: "md",
    label: "Email Address",
    placeholder: "you@example.com",
    helperText: "We will never share your personal details.",
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const Default: Story = {
  args: { label: "Full Name", placeholder: "Jane Doe" },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const PasswordInput: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    leadingIcon: <LockIcon />,
    helperText: "Must be at least 8 characters.",
    required: true,
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const SearchField: Story = {
  args: {
    label: "Search Documentation",
    type: "search",
    placeholder: "Type a command or search...",
    leadingIcon: <SearchIcon />,
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "taptap_creator",
    helperText: "This will be displayed on your public profile.",
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: "Company Email",
    placeholder: "alex@company.com",
    required: true,
    helperText: "Required for organization verification.",
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    label: "Email Address",
    defaultValue: "invalid-email-format",
    errorMessage: "Please enter a valid email address (e.g. user@domain.com)",
    required: true,
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Tenant ID",
    disabled: true,
    value: "TENANT-9842-PROD",
    helperText: "Tenant identifier cannot be modified.",
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-4">
      <Input {...args} size="sm" label="Small Field (32px)" placeholder="Small size" />
      <Input {...args} size="md" label="Medium Field (40px)" placeholder="Medium size" />
      <Input {...args} size="lg" label="Large Field (48px)" placeholder="Large size" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input
        label="With Leading Icon"
        placeholder="alex@example.com"
        leadingIcon={<MailIcon />}
      />
      <Input
        label="With Trailing Icon"
        placeholder="API Secret Key"
        trailingIcon={<InfoIcon />}
      />
      <Input
        label="With Both Icons"
        placeholder="Search projects..."
        leadingIcon={<SearchIcon />}
        trailingIcon={<InfoIcon />}
      />
    </div>
  ),
};

export const PrefixAndSuffix: Story = {
  args: {
    label: "Workspace Domain",
    prefix: "https://",
    suffix: ".taptap.io",
    defaultValue: "my-team",
    helperText: "Custom subdomain URL.",
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const ClearableSearch: Story = {
  args: {
    label: "Search Design System",
    type: "search",
    leadingIcon: <SearchIcon />,
    clearable: true,
    defaultValue: "Buttons & Dialogs",
    helperText: "Click the X button on the right to clear.",
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const PasswordWithToggle: Story = {
  args: {
    label: "Account Password",
    type: "password",
    showPasswordToggle: true,
    defaultValue: "SecretPass2026",
    leadingIcon: <LockIcon />,
    helperText: "Click the eye icon to reveal the password.",
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const CharacterCounter: Story = {
  args: {
    label: "Project Description",
    defaultValue: "Faster UI design system based on TapTap TDS.",
    showCount: true,
    maxLength: 50,
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
};

export const StatusValidationMatrix: Story = {
  render: () => (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-6 p-4">
      <Input label="Default Status" placeholder="Enter text..." helperText="Standard helper" />
      <Input
        label="Success Status"
        defaultValue="valid_account@taptap.io"
        status="success"
        successMessage="Account available."
      />
      <Input
        label="Warning Status"
        defaultValue="temporary_domain.xyz"
        status="warning"
        warningMessage="Domain expires soon."
      />
      <Input
        label="Error Status"
        defaultValue="invalid_entry"
        errorMessage="Invalid format detected."
        required
      />
    </div>
  ),
  parameters: { layout: "padded" },
};

export const LoginFormExample: Story = {
  render: () => (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-80 flex-col gap-4 rounded-xl border border-border bg-background p-6 shadow-md"
    >
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-text">Sign In</h3>
        <p className="text-xs text-text-muted">Enter your TapTap workspace credentials.</p>
      </div>
      <Input
        label="Email"
        type="email"
        placeholder="name@company.com"
        leadingIcon={<MailIcon />}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        leadingIcon={<LockIcon />}
        required
      />
      <Button variant="primary" fullWidth className="mt-2">
        Continue to Workspace
      </Button>
    </form>
  ),
};

export const TypingInteraction: Story = {
  args: { label: "Full Name", placeholder: "Type here..." },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Input {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Full Name");
    await userEvent.type(input, "Faster UI Input");
    await expect(input).toHaveValue("Faster UI Input");
    await expect(args.onChange).toHaveBeenCalled();
  },
};
