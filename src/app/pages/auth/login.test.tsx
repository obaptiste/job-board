/// <reference types="@testing-library/jest-dom" />

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import LoginPage from "./login";

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("LoginPage", () => {
  it("should render login form correctly", () => {
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(<LoginPage />);

    //ts-ignore
    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    //ts-ignore
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    //ts-ignore
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should display error message on login failure", async () => {
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: (
        callback: (arg0: { email: string; password: string }) => any
      ) => callback({ email: "test@example.com", password: "password" }),
    });

    (signIn as jest.Mock).mockResolvedValue({ error: "Login result failure" });

    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(
      await screen.findByText("Login result failure. Please try again.")
    ).toBeInTheDocument();

    expect(signIn).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
    });
  });

  it("should redirect to dashboard on successful login", async () => {
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: (callback) =>
        callback({ email: "test@example.com", password: "password" }),
    });

    (signIn as jest.Mock).mockResolvedValue({});

    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(window.location.href).toBe("/dashboard");
  });

  it("should display error message on login error", async () => {
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: (callback) =>
        callback({ email: "test@example.com", password: "password" }),
    });

    (signIn as jest.Mock).mockRejectedValue(new Error("Login failed"));

    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(
      await screen.findByText("Login failed. Please try again.")
    ).toBeInTheDocument();
  });
});
