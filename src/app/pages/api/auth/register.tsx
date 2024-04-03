import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, TextField, Button } from "@mui/material";
import { registerUser } from "../../../lib/auth";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      // TODO: Redirect to login page  or show success message
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("name", { required: true })}
          label="Name"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          {...register("password", { required: true, minLength: 6 })}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
