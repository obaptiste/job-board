import React from "react";
import ApplicationForm from "./ApplicationForm";

describe("<ApplicationForm />", () => {
  const mockOnSubmit = jest.fn();
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ApplicationForm jobId={1} onSubmit={mockOnSubmit} />);
  });
});
