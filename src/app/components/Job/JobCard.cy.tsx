import React from "react";
import JobCard from "./JobCard";
import JobCardProps from "./JobCard";

describe("<JobCard />", () => {
  const job = {
    id: 1,
    title: "Software Engineer",
    company: "ABC Company",
    location: "San Francisco, CA",
  };
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<JobCard job={job} {...JobCardProps} />);
  });
});
