import {
  Box,
  Button,
  CircularProgress,
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
  const [loginloading, setLoginLoading] = useState(false);

  const { isAuthenticated, setIsAuthenticated, showSnackbar, setLoading } =
    useContext(Context);
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
        setLoginLoading(true);
        await authService.login(username, password);
        await setIsAuthenticated(true);
        navigate("/dash");
      } catch (error) {
        showSnackbar({ message: error.message, severity: "error" });
      } finally {
        setLoginLoading(false);
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/home-bg.png')" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white text-center w-full max-w-md">
          <h4 className="text-2xl font-semibold text-[#4B49AC] mb-4">Login</h4>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal" error={!!errors.username}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                InputProps={{
                  style: {
                    color: "#333",
                    borderColor: "white",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#555",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "#4B49AC",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4B49AC",
                    },
                  },
                  input: { color: "#333" },
                }}
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
                InputProps={{
                  style: {
                    color: "#333",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#555",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "#4B49AC",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4B49AC",
                    },
                  },
                  input: { color: "#333" },
                }}
              />
              <FormHelperText>{errors.password}</FormHelperText>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              disabled={loginloading}
              sx={{
                mt: 2,
                bgcolor: "#4B49AC",
                color: "white",
                "&:hover": {
                  bgcolor: "#3b3a96",
                },
              }}
              fullWidth
            >
              {loginloading ? (
                <div className="flex gap-2 items-center justify-center">
                  <CircularProgress size={16} color="inherit" />
                  <span className="normal-case">Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
