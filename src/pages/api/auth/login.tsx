//login page using material ui for the user to login
import {
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { Lock, Email } from "@mui/icons-material";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Card sx={{ padding: "2rem", minWidth: "300px" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "1rem" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Password"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "1rem" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
    </Grid>
  );
};

export default LoginPage;
