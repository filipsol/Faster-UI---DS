import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "ghost", "link"],
      description: "Visual style variant matching Figma TapTap Design System hierarchy.",
      table: { defaultValue: { summary: "primary" } },
    },
    danger: {
      control: "boolean",
      description: "Intent/Status modifier: applies destructive/danger palette to any active variant.",
      table: { defaultValue: { summary: "false" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Button dimensions (sm: 32px, md: 40px, lg: 48px).",
      table: { defaultValue: { summary: "md" } },
    },
    isLoading: {
      control: "boolean",
      description: "Replaces leading icon/content with animated spinner and disables interaction.",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Applies disabled styling and blocks click events.",
      table: { defaultValue: { summary: "false" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Expands button width to 100% of container.",
      table: { defaultValue: { summary: "false" } },
    },
    children: {
      control: "text",
      description: "Text or elements rendered inside the button.",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Icons for stories
const PlusIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const TrashIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Interactive Button",
  },
};

export const Primary: Story = {
  args: { variant: "primary", children: "Primary Action" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline Action" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost Action" },
};

export const Link: Story = {
  args: { variant: "link", children: "Link Action" },
};

export const DangerPrimary: Story = {
  args: { variant: "primary", danger: true, children: "Delete Permanent", leadingIcon: <TrashIcon /> },
};

export const DangerOutline: Story = {
  args: { variant: "outline", danger: true, children: "Revoke Access" },
};

export const DangerGhost: Story = {
  args: { variant: "ghost", danger: true, children: "Remove" },
};

export const DangerLink: Story = {
  args: { variant: "link", danger: true, children: "Delete item" },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link Button
      </Button>
    </div>
  ),
};

export const DangerTypeMatrix: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" danger leadingIcon={<TrashIcon />}>
        Primary Danger
      </Button>
      <Button variant="outline" danger>
        Outline Danger
      </Button>
      <Button variant="ghost" danger>
        Ghost Danger
      </Button>
      <Button variant="link" danger>
        Link Danger
      </Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button {...args} size="sm" variant="primary">
          Small (32px)
        </Button>
        <Button {...args} size="md" variant="primary">
          Medium (40px)
        </Button>
        <Button {...args} size="lg" variant="primary">
          Large (48px)
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Button {...args} size="sm" variant="outline">
          Small
        </Button>
        <Button {...args} size="md" variant="outline">
          Medium
        </Button>
        <Button {...args} size="lg" variant="outline">
          Large
        </Button>
      </div>
    </div>
  ),
};

export const StatesMatrix: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="text-xs font-semibold uppercase text-text-muted">Default</div>
      <div className="text-xs font-semibold uppercase text-text-muted">With Icon</div>
      <div className="text-xs font-semibold uppercase text-text-muted">Loading</div>
      <div className="text-xs font-semibold uppercase text-text-muted">Disabled</div>

      {/* Primary */}
      <Button variant="primary">Primary</Button>
      <Button variant="primary" leadingIcon={<PlusIcon />}>
        Create
      </Button>
      <Button variant="primary" isLoading>
        Saving
      </Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>

      {/* Outline */}
      <Button variant="outline">Outline</Button>
      <Button variant="outline" leadingIcon={<DownloadIcon />}>
        Export
      </Button>
      <Button variant="outline" isLoading>
        Loading
      </Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>

      {/* Danger */}
      <Button variant="primary" danger>Danger</Button>
      <Button variant="primary" danger leadingIcon={<TrashIcon />}>
        Delete
      </Button>
      <Button variant="primary" danger isLoading>
        Deleting
      </Button>
      <Button variant="primary" danger disabled>
        Disabled
      </Button>

      {/* Ghost */}
      <Button variant="ghost">Ghost</Button>
      <Button variant="ghost" trailingIcon={<ArrowRightIcon />}>
        Details
      </Button>
      <Button variant="ghost" isLoading>
        Loading
      </Button>
      <Button variant="ghost" disabled>
        Disabled
      </Button>
    </div>
  ),
  parameters: { layout: "padded" },
};

export const WithLeadingIcon: Story = {
  args: {
    variant: "primary",
    leadingIcon: <PlusIcon />,
    children: "Create Item",
  },
};

export const WithTrailingIcon: Story = {
  args: {
    variant: "outline",
    trailingIcon: <ArrowRightIcon />,
    children: "Continue",
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: "outline",
    leadingIcon: <DownloadIcon />,
    trailingIcon: <ArrowRightIcon />,
    children: "Download Report",
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true, variant: "primary", children: "Full Width Button" },
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="w-80 max-w-full">
      <Button {...args} />
    </div>
  ),
};

export const ActionPair: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Confirm Changes</Button>
    </div>
  ),
};

export const DestructiveActionPair: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary" danger leadingIcon={<TrashIcon />}>
        Delete Permanently
      </Button>
    </div>
  ),
};

export const ClickInteraction: Story = {
  args: { children: "Click me" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Click me" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
