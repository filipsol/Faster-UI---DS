import { describe, it, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("renders nothing when closed", () => {
    render(
      <Dialog open={false} onClose={jest.fn()} title="Title">
        Content
      </Dialog>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders the dialog with title, description and content when open", () => {
    render(
      <Dialog
        open
        onClose={jest.fn()}
        title="Delete item"
        description="This cannot be undone."
      >
        Are you sure?
      </Dialog>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Delete item")).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Dialog open onClose={onClose} title="Title">
        Content
      </Dialog>
    );
    await user.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the overlay is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Dialog open onClose={onClose} title="Title">
        Content
      </Dialog>
    );
    await user.click(screen.getByTestId("dialog-overlay-backdrop"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on overlay click when closeOnOverlayClick is false", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Dialog open onClose={onClose} title="Title" closeOnOverlayClick={false}>
        Content
      </Dialog>
    );
    await user.click(screen.getByTestId("dialog-overlay-backdrop"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Dialog open onClose={onClose} title="Title">
        Content
      </Dialog>
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders footer content", () => {
    render(
      <Dialog open onClose={jest.fn()} title="Title" footer={<button>Confirm</button>}>
        Content
      </Dialog>
    );
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("hides the close button when hideCloseButton is set", () => {
    render(
      <Dialog open onClose={jest.fn()} title="Title" hideCloseButton>
        Content
      </Dialog>
    );
    expect(
      screen.queryByRole("button", { name: "Close dialog" })
    ).not.toBeInTheDocument();
  });

  it("moves focus into the dialog panel when opened", () => {
    render(
      <Dialog open onClose={jest.fn()} title="Title" hideCloseButton>
        <button>Focusable</button>
      </Dialog>
    );
    expect(screen.getByRole("button", { name: "Focusable" })).toHaveFocus();
  });

  it("provides an accessible name when no visible title is supplied", () => {
    render(
      <Dialog open onClose={jest.fn()} ariaLabel="Session expired" hideCloseButton>
        Please sign in again.
      </Dialog>
    );
    expect(screen.getByRole("dialog", { name: "Session expired" })).toBeInTheDocument();
  });

  it("keeps focus in a dialog with no focusable controls", async () => {
    const user = userEvent.setup();
    render(
      <Dialog
        open
        onClose={jest.fn()}
        ariaLabel="Notice"
        hideCloseButton
        hideCancelButton
        footer={null}
      >
        Informational content only.
      </Dialog>
    );
    const dialog = screen.getByRole("dialog", { name: "Notice" });
    expect(dialog).toHaveFocus();
    await user.tab();
    expect(dialog).toHaveFocus();
  });

  it("renders semantic types with status iconography", () => {
    const { rerender } = render(
      <Dialog open onClose={jest.fn()} type="info" title="Info Dialog">
        Content
      </Dialog>
    );
    expect(screen.getByText("Info Dialog")).toBeInTheDocument();

    rerender(
      <Dialog open onClose={jest.fn()} type="success" title="Success Dialog">
        Content
      </Dialog>
    );
    expect(screen.getByText("Success Dialog")).toBeInTheDocument();

    rerender(
      <Dialog open onClose={jest.fn()} type="warning" title="Warning Dialog">
        Content
      </Dialog>
    );
    expect(screen.getByText("Warning Dialog")).toBeInTheDocument();

    rerender(
      <Dialog open onClose={jest.fn()} type="danger" title="Danger Dialog">
        Content
      </Dialog>
    );
    expect(screen.getByText("Danger Dialog")).toBeInTheDocument();
  });

  it("renders default footer action buttons with custom labels and handles clicks", async () => {
    const user = userEvent.setup();
    const onOk = jest.fn();
    const onCancel = jest.fn();

    render(
      <Dialog
        open
        onClose={jest.fn()}
        title="Confirmation"
        okText="Submit Form"
        cancelText="Discard Draft"
        onOk={onOk}
        onCancel={onCancel}
      >
        Form Body
      </Dialog>
    );

    const okBtn = screen.getByRole("button", { name: "Submit Form" });
    const cancelBtn = screen.getByRole("button", { name: "Discard Draft" });

    expect(okBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();

    await user.click(okBtn);
    expect(onOk).toHaveBeenCalledTimes(1);

    await user.click(cancelBtn);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("hides cancel button when hideCancelButton is true", () => {
    render(
      <Dialog
        open
        onClose={jest.fn()}
        title="Notice"
        okText="Acknowledge"
        hideCancelButton
      >
        Notice content
      </Dialog>
    );

    expect(screen.getByRole("button", { name: "Acknowledge" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Cancel" })).not.toBeInTheDocument();
  });

});
