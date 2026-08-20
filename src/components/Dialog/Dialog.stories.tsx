import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Dialog } from "./Dialog";
import { Button } from "../Button";
import { Input } from "../Input";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    open: false,
    onClose: () => {},
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Dialog max-width (sm: 400px, md: 480px, lg: 640px).",
      table: { defaultValue: { summary: "md" } },
    },
    type: {
      control: "select",
      options: ["default", "info", "success", "warning", "error", "danger"],
      description: "Semantic type configuring status iconography and color accents.",
      table: { defaultValue: { summary: "default" } },
    },
    align: {
      control: "radio",
      options: ["left", "center"],
      description: "Alignment of title, description, and status icon.",
      table: { defaultValue: { summary: "left" } },
    },
    title: {
      control: "text",
      description: "Dialog header title.",
    },
    description: {
      control: "text",
      description: "Supporting text underneath the title.",
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "Whether clicking the backdrop closes the modal.",
      table: { defaultValue: { summary: "true" } },
    },
    closeOnEsc: {
      control: "boolean",
      description: "Whether pressing Escape closes the modal.",
      table: { defaultValue: { summary: "true" } },
    },
    hideCloseButton: {
      control: "boolean",
      description: "Hides the top-right X dismissal button.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogDemo(
  args: Omit<ComponentProps<typeof Dialog>, "open" | "onClose"> & {
    open?: boolean;
    onClose?: () => void;
  }
) {
  const [open, setOpen] = useState(args.open ?? false);

  useEffect(() => {
    if (args.open !== undefined) {
      setOpen(args.open);
    }
  }, [args.open]);

  const handleClose = () => {
    setOpen(false);
    args.onClose?.();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="primary">
        Open Dialog
      </Button>
      <Dialog
        {...args}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export const Playground: Story = {
  args: {
    title: "Confirm Action",
    description: "Please review the details before proceeding.",
    children: "This dialog can be customized using the Storybook controls table below.",
    size: "md",
    closeOnOverlayClick: true,
    closeOnEsc: true,
    hideCloseButton: false,
    open: false,
    onClose: () => {},
  },
  render: (args) => <DialogDemo {...args} />,
};

export const TypeInfo: Story = {
  render: () => (
    <DialogDemo
      type="info"
      title="System Maintenance Notice"
      description="Scheduled maintenance will occur on Sunday at 02:00 UTC."
      okText="Understood"
      hideCancelButton
    >
      All APIs and dashboards will remain online with read-only capabilities during the 15-minute maintenance window.
    </DialogDemo>
  ),
};

export const TypeSuccess: Story = {
  render: () => (
    <DialogDemo
      type="success"
      title="Tokens Successfully Published"
      description="Release v0.2.0 is now live in your production registry."
      okText="View Registry"
    >
      All linked repositories have been notified of updated color and spacing CSS variables.
    </DialogDemo>
  ),
};

export const TypeWarning: Story = {
  render: () => (
    <DialogDemo
      type="warning"
      title="Unsaved Configuration Detected"
      description="You have modified design token aliases without saving."
      okText="Leave Anyway"
      cancelText="Stay on Page"
    >
      Leaving this page now will discard all changes made during this session.
    </DialogDemo>
  ),
};

export const TypeDangerError: Story = {
  render: () => (
    <DialogDemo
      type="danger"
      title="Permanently Delete Workspace?"
      description="This action cannot be reverted."
      okText="Delete Workspace"
      cancelText="Keep Workspace"
      danger
    >
      All design systems, components, and user permissions will be immediately purged from the server.
    </DialogDemo>
  ),
};

export const CenteredConfirmDialog: Story = {
  render: () => (
    <DialogDemo
      type="warning"
      align="center"
      size="sm"
      title="Discard Draft Changes?"
      description="Are you sure you want to revert to the published token baseline?"
      okText="Discard"
      cancelText="Cancel"
    >
      Your local changes cannot be recovered once discarded.
    </DialogDemo>
  ),
};

export const DestructiveConfirmation: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button variant="danger" onClick={() => setOpen(true)}>
            Delete Project...
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            size="sm"
            title="Delete Project?"
            description="This action is permanent and cannot be undone."
            footer={
              <>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" danger onClick={() => setOpen(false)}>
                  Yes, Delete Project
                </Button>
              </>
            }
          >
            <p className="text-sm text-text">
              All associated design tokens, component assets, and version histories will be
              permanently erased.
            </p>
          </Dialog>
        </>
      );
    }
    return <Demo />;
  },
};

export const FormDialog: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");

      return (
        <>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Invite Team Member
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            size="md"
            title="Invite to TapTap Workspace"
            description="Invited members will receive an email with onboarding instructions."
            footer={
              <>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setOpen(false)}
                  disabled={!name || !email}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Work Email"
                type="email"
                placeholder="jordan@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                helperText="Must match your corporate domain."
              />
            </div>
          </Dialog>
        </>
      );
    }
    return <Demo />;
  },
};

export const InfoAlert: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button variant="outline" onClick={() => setOpen(true)}>
            View Token Release Notes
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            size="md"
            title="Design Tokens Synchronized"
            description="Version 2.4.0 successfully applied."
            footer={
              <Button variant="primary" onClick={() => setOpen(false)}>
                Got it
              </Button>
            }
          >
            <p className="text-sm text-text">
              The latest TapTap Design System tokens have been loaded. All components now utilize
              standardized 8px radii, WCAG 2.1 AA compliant color contrasts, and CSS variable mapping.
            </p>
          </Dialog>
        </>
      );
    }
    return <Demo />;
  },
};

export const LongScrollableContent: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Terms & Conditions
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            size="lg"
            title="Terms of Service"
            description="Please review our terms of service before continuing."
            footer={
              <>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Decline
                </Button>
                <Button variant="primary" onClick={() => setOpen(false)}>
                  Accept & Continue
                </Button>
              </>
            }
          >
            <div className="flex max-h-60 flex-col gap-3 overflow-y-auto pr-2 text-sm text-text">
              <p>
                <strong>1. Scope of Service:</strong> Faster UI provides standardized component
                primitives and token architectures for multi-platform web applications.
              </p>
              <p>
                <strong>2. Accessibility Requirements:</strong> All components are engineered to
                satisfy WCAG 2.1 AA criteria, including keyboard focus loops, ARIA attributes, and
                color contrast bounds.
              </p>
              <p>
                <strong>3. Design Tokens:</strong> Semantic tokens must not be bypassed with raw
                inline hex color overrides.
              </p>
              <p>
                <strong>4. Distribution:</strong> The library is packaged for both CommonJS and
                ECMAScript Modules with bundled TypeScript declarations.
              </p>
            </div>
          </Dialog>
        </>
      );
    }
    return <Demo />;
  },
};

export const WithoutCloseButton: Story = {
  args: {
    title: "Processing Request",
    description: "Please wait while we update the token registry...",
    children: "This operation usually completes within a few moments.",
    hideCloseButton: true,
    closeOnOverlayClick: false,
    closeOnEsc: false,
    open: false,
    onClose: () => {},
  },
  render: (args) => <DialogDemo {...args} />,
};

export const Sizes: Story = {
  args: {
    title: "Dialog Size Preview",
    children: "This modal demonstrates sizing proportions from the TapTap specification.",
    open: false,
    onClose: () => {},
  },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <DialogDemo key={size} {...args} size={size} title={`${size.toUpperCase()} Dialog (${size === "sm" ? "400px" : size === "md" ? "480px" : "640px"})`} />
      ))}
    </div>
  ),
};

export const OpenCloseInteraction: Story = {
  args: {
    title: "Interactive Dialog",
    children: "Testing modal open and close automation.",
    open: false,
    onClose: () => {},
  },
  render: (args) => <DialogDemo {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const trigger = within(canvasElement).getByRole("button", {
      name: "Open Dialog",
    });
    await userEvent.click(trigger);
    const dialog = await canvas.findByRole("dialog");
    await expect(dialog).toBeVisible();
    const closeButton = canvas.getByRole("button", { name: "Close dialog" });
    await userEvent.click(closeButton);
    await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
  },
};
