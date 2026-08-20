import { useState } from "react";
import { Dialog } from "./Dialog";
import { Button } from "../Button";

function DialogHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete item"
        description="This action cannot be undone."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        Are you sure you want to delete this item?
      </Dialog>
    </>
  );
}

describe("Dialog (component)", () => {
  it("mounts successfully and stays closed by default", () => {
    cy.mount(<DialogHarness />);
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("opens on trigger click and shows title/description/content", () => {
    cy.mount(<DialogHarness />);
    cy.contains("button", "Open dialog").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("Delete item").should("be.visible");
    cy.contains("This action cannot be undone.").should("be.visible");
    cy.contains("Are you sure you want to delete this item?").should(
      "be.visible"
    );
  });

  it("closes when the close (X) button is clicked", () => {
    cy.mount(<DialogHarness />);
    cy.contains("button", "Open dialog").click();
    cy.get('[aria-label="Close dialog"]').click();
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("closes when clicking the overlay", () => {
    cy.mount(<DialogHarness />);
    cy.contains("button", "Open dialog").click();
    cy.get('[data-testid="dialog-overlay-backdrop"]').click("topLeft", { force: true });
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("closes when pressing Escape", () => {
    cy.mount(<DialogHarness />);
    cy.contains("button", "Open dialog").click();
    cy.get("body").type("{esc}");
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("closes via a footer action button", () => {
    cy.mount(<DialogHarness />);
    cy.contains("button", "Open dialog").click();
    cy.contains("button", "Delete").click();
    cy.get('[role="dialog"]').should("not.exist");
  });
});
