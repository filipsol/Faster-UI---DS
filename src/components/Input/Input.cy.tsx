import { Input } from "./Input";

describe("Input (component)", () => {
  it("mounts and renders with a label", () => {
    cy.mount(<Input label="Email" placeholder="you@example.com" />);
    cy.contains("label", "Email").should("be.visible");
    cy.get("input").should("be.visible");
  });

  it("accepts typed input", () => {
    cy.mount(<Input label="Name" />);
    cy.get("input").type("Faster UI").should("have.value", "Faster UI");
  });

  it("shows an error message and aria-invalid when invalid", () => {
    cy.mount(<Input label="Email" errorMessage="Email is required" />);
    cy.get("input").should("have.attr", "aria-invalid", "true");
    cy.contains("Email is required").should("be.visible");
  });

  it("does not accept input when disabled", () => {
    cy.mount(<Input label="Name" disabled />);
    cy.get("input").should("be.disabled");
  });

  it("fires onChange as the user types", () => {
    const onChange = cy.stub().as("onChange");
    cy.mount(<Input label="Name" onChange={onChange} />);
    cy.get("input").type("abc");
    cy.get("@onChange").should("have.been.called");
  });
});
