import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Container, Typography, TextField, Button, Alert } from "@mui/material";
import ErrorBoundary from "@/app/shared/components/ErrorBoundary";
import { StylesContext } from "@material-ui/styles";
import styles from "@/styles/Login.module.css";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError(result.error);
      } else {
        //redirect to dashboard or show success page
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LoginContent = ({ handleLogin }: LoginContentProps) => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        fullWidth
        variant="outlined"
        sx={{ marginBottom: "1rem" }}
        {...register("email", { required: true })}
      />
      <TextField
        label="Password"
        fullWidth
        variant="outlined"
        sx={{ marginBottom: "1rem" }}
        type="password"
        {...register("password", { required: true })}
      />
      {error && (
        <Typography color="error">
          <div className={styles.AlertButton}>
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              {" "}
              {error}
            </Alert>
          </div>
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: "1rem" }}
      >
        Login
      </Button>
    </form>
  );

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login Page
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
