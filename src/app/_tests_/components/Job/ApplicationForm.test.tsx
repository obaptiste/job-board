import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ApplicationForm from "../../../components/Job/ApplicationForm";
import { createApplication } from "../../../lib/application";
import { SessionProvider } from "next-auth/react";

jest.mock("../../../lib/application", () => ({
  createApplication: jest.fn(),
}));

describe("ApplicationForm", () => {
  it("should call the onSubmit callback with the form data", async () => {
    const mockOnSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <SessionProvider>
        <ApplicationForm jobId={1} onSubmit={mockOnSubmit} />
      </SessionProvider>
    );

    const resumeInput = getByLabelText("Resume");
    const coverLetterInput = getByLabelText("Cover Letter");
    const submitButton = getByText("Submit Application");

    fireEvent.change(resumeInput, {
      target: {
        files: [
          new File(["test resume"], "resume.pdf", { type: "application/pdf" }),
        ],
      },
    });
    fireEvent.change(coverLetterInput, {
      target: { value: "This is a test cover letter." },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        resume: expect.any(FileList),
        coverLetter: "This is a test cover letter.",
      });
    });
  });
});
