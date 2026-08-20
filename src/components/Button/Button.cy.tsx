import { Button } from "./Button";

describe("Button (component)", () => {
  it("mounts successfully", () => {
    cy.mount(<Button>Click me</Button>);
    cy.get("button").should("be.visible").and("contain.text", "Click me");
  });

  it("renders all variants", () => {
    cy.mount(
      <div className="flex gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    );
    cy.contains("button", "Primary").should("be.visible");
    cy.contains("button", "Secondary").should("be.visible");
    cy.contains("button", "Danger").should("be.visible");
    cy.contains("button", "Ghost").should("be.visible");
  });

  it("fires a click handler when clicked", () => {
    const onClick = cy.stub().as("onClick");
    cy.mount(<Button onClick={onClick}>Submit</Button>);
    cy.get("button").click();
    cy.get("@onClick").should("have.been.calledOnce");
  });

  it("is disabled and non-interactive when disabled", () => {
    const onClick = cy.stub().as("onClick");
    cy.mount(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    cy.get("button").should("be.disabled");
    cy.get("button").click({ force: true });
    cy.get("@onClick").should("not.have.been.called");
  });

  it("shows a loading state", () => {
    cy.mount(<Button isLoading>Saving</Button>);
    cy.get("button").should("be.disabled").and("have.attr", "aria-busy", "true");
    cy.get("button svg").should("exist");
  });
});
