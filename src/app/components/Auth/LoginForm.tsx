import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Container, Typography, TextField, Button } from "@mui/material";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<LoginFormData>();

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
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("email", { required: true })}
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          margin="normal"
        />
        <TextField
          {...register("password", { required: true })}
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" fullWidth color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
