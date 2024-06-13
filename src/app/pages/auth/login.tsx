//login page

"use client";

import { useState, Suspense } from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { Alert } from "@mui/material";
import ErrorBoundary from "@/app/shared/components/ErrorBoundary";
//import { register } from "module";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(""); // error message

  const handleLogin = async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "UserNotFound") {
          setError("No user found with that email address.");
        } else if (error.message === "InvalidPassword") {
          setError("Invalid Password.");
        } // unknown error
        else setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      // reset form fields only on successful login
      setEmail("");
      setPassword("");
    }
  };

  type LoginContentProps = {
    handleLogin: () => void;
  };

  const LoginContent = ({ handleLogin }: LoginContentProps) => (
    <form onSubmit={handleLogin}>
      <TextField
        label="Email"
        fullWidth
        variant="outlined"
        sx={{ marginBottom: "1rem" }}
        {...register("email")}
      />
      <TextField
        label="Password"
        fullWidth
        variant="outlined"
        sx={{ marginBottom: "1rem" }}
        {...register("password")}
        type="password"
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  );

  return (
    <Container>
      <ErrorBoundary>
        <Suspense fallback={<div>Authenticating...</div>}>
          <LoginContent handleLogin={handleLogin} />
        </Suspense>
      </ErrorBoundary>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit(handleLogin)}></form>
    </Container>
  );
};

export default Login;
