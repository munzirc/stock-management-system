import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../context/ContextApi";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.api";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, showSnackbar, setLoading } = useContext(Context);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({ username: "", password: "" });

  const validate = () => {
    let tempErrors = { username: "", password: "" };

    if (!username) {
      tempErrors.username = "Username is required";
    }

    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {

        try {
          await authService.login(username, password);
          await setIsAuthenticated(true);
          navigate("/dash");
        } catch (error) {
          showSnackbar({ message: error.message, severity: "error" });
        } finally {
          setLoading(false);
        }
      
    }
  };


  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h3" sx={{ color: "gray" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" error={!!errors.username}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <FormHelperText>{errors.username}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.password}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText>{errors.password}</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, bgcolor: "gray" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
