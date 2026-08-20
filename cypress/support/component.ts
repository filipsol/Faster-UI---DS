import { mount } from "cypress/react";
import "../../src/index.css";

Cypress.Commands.add("mount", mount);

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
