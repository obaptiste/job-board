import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Container, Typography, TextField, Button, Alert } from "@mui/material";
import { useRouter } from "next/router";
import ErrorBoundary from "@/app/shared/components/ErrorBoundary";
import styles from "@/app/styles/Login.module.css";

/**
 * Login page
 */

interface LoginFormData {
  email: string;
  password: string;
}

type LoginContentProps = {
  handleLogin: () => void;
};

const LoginPage: React.FC = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<LoginFormData>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Handle login form submission
   */

  const handleLogin = handleSubmit(async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "InvalidPassword") {
          setError("Invalid Password entered. Please try again.");
        } else if (result.error === "UserNotFound") {
          setError("No user found with that email address.");
        } else {
          setError(result.error);
        }
      }
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
  });

  // const onSubmit = async (data: LoginFormData) => {
  //   const { email, password } = data;
  //   try {
  //     const result = await signIn("credentials", {
  //       redirect: false,
  //       email,
  //       password,
  //     });

  //     if (result?.error) {
  //       if (result.error === "InvalidPassword") {
  //         setError("Login failure. Invalid password. Please try again.");
  //       }
  //     }
  //     //   console.log(result.error);

  //     //   setError("Login result failure. Please try again.");
  //     // } else {
  //     //   //redirect to hiring manager dashboard
  //     //   router.push("/dashboard/hiring-manager/jobs/");
  //     // }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       if (error.message === "UserNotFound") {
  //         setError("No user found with that email address.");
  //       } else if (error.message === "InvalidPassword") {
  //         setError("Login failure. Invalid password. Please try again");
  //       } // unknown error
  //       setError(error.message);
  //     }
  //     setError("Login failed. Please try again.");
  //   }
  // };

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
      <>
        {error && (
          <Typography color="error">
            <div className={styles.AlertButton}>
              <Alert severity="error">{error}</Alert>
            </div>
          </Typography>
        )}
      </>
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  );

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <ErrorBoundary>
        <Suspense fallback={<div>Authenticating...</div>}>
          <LoginContent handleLogin={handleLogin} />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

export default LoginPage;
