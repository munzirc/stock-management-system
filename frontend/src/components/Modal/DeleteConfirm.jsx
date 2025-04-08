import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { deleteProduct } from "../../services/product.api";
import { Context } from "../../context/ContextApi";

const DeleteConfirmModal = ({ setProducts }) => {
  const {
    activeProduct,
    modalOpen,
    setModalOpen,
    showSnackbar,
    setActiveProduct,
  } = useContext(Context);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async () => {
    try {
      const data = await deleteProduct(activeProduct._id);
      showSnackbar({ message: data.message, severity: data.severity });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== activeProduct._id)
      );
    } catch (error) {
      showSnackbar({ message: error.message, severity: "error" });
    } finally {
      setActiveProduct(null);
      setModalOpen(false);
    }
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          padding: 2,
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle>
        <Typography variant={isMobile ? "h6" : "h5"}>Delete Product</Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: isMobile ? "0.85rem" : "1rem",
          }}
        >
          Are you sure you want to delete{" "}
          <strong>{activeProduct?.name}</strong>?
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={() => setModalOpen(false)}
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          sx={{textTransform: "none"}}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="error"
          size={isMobile ? "small" : "medium"}
          sx={{textTransform: "none"}}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;
