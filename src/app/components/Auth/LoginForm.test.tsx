import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  test("renders login form correctly", () => {
    render(<LoginForm />);

    // Assert that the email and password fields are rendered
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    //ts-ignore
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    // Assert that the submit button is rendered
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("submits form with correct data", () => {
    render(<LoginForm />);

    // Mock the signIn function
    const mockSignIn = jest.fn();
    jest.mock("next-auth/react", () => ({
      signIn: mockSignIn,
    }));

    // Fill in the email and password fields
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    // Assert that the signIn function is called with the correct data
    expect(mockSignIn).toHaveBeenCalledWith("credentials", {
      email: "test@example.com",
      password: "password123",
      callbackUrl: "/",
    });
  });
});
