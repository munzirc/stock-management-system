import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
    autoHideDuration: 3000,
  });
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [activeProduct, setActiveProduct] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  
  const showSnackbar = ({
    message,
    severity = "info",
    autoHideDuration = 3000,
  }) => {
    setSnackbar({
      open: true,
      message,
      severity,
      autoHideDuration,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        snackbar,
        showSnackbar,
        closeSnackbar,
        open,
        setOpen,
        mode,
        setMode,
        activeProduct,
        setActiveProduct,
        modalOpen,
        setModalOpen
      }}
    >
      {children}
    </Context.Provider>
  );
};
