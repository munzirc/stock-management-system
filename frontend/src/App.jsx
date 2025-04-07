import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Context } from "./context/ContextApi";

import { Alert, Snackbar } from "@mui/material";

import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Login from "./pages/Login";
import authService from "./services/auth.api";

function App() {
  const {
    setIsAuthenticated,
    setLoading,
    snackbar,
    showSnackbar,
    closeSnackbar,
  } = useContext(Context);

  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
      root.classList.add('dark');
  }, []);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        await authService.checkAuth();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        showSnackbar({
          message: "Session expired. Please login again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (location.pathname !== "/") {
      fetchAuth();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dash" element={<Dashboard />} />
        </Route>
      </Routes>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar.open}
        autoHideDuration={snackbar.autoHideDuration}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      
    </>
  );
}

export default App;
