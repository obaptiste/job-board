/// <reference types="@testing-library/jest-dom" />

import React from "react";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { expect } from "@jest/globals";

import "@testing-library/jest-dom";

import JobCard from "./JobCard";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("JobCard", () => {
  it("should render job details correctly", () => {
    const job = {
      id: 1,
      title: "Software Engineer",
      company: "ABC Company",
      location: "New York",
    };

    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: { name: "hiring_manager" } } },
    });

    render(<JobCard job={job} />);
    // @ts-ignore
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("ABC Company")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("New York")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("Edit Job")).toBeInTheDocument();
    // @ts-ignore
  });

  it("should render apply button for non-hiring managers", () => {
    const job = {
      id: 1,
      title: "Software Engineer",
      company: "ABC Company",
      location: "New York",
    };

    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: { name: "applicant" } } },
    });

    render(<JobCard job={job} />);

    // @ts-ignore
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("ABC Company")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("New York")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("Apply for Job")).toBeInTheDocument();
  });
});
