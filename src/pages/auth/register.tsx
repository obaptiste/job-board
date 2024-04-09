import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, TextField, Button } from "@mui/material";
import { registerUser } from "../../app/lib/auth";

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
      // Redirect to login page or show success message
    } catch (error) {
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
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("email", { required: true })}
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("password", { required: true })}
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
