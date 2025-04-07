import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ProductForm from "../Forms/ProductForm";
import { Context } from "../../context/ContextApi";
import { addProduct, updateProduct } from "../../services/product.api";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  width: {
    xs: "90%",
    sm: 400,   
  },
  maxHeight: "90vh",
  overflowY: "auto",
};


const ProductModal = ({ categories, setProducts, products }) => {
  const { mode, open, setOpen, activeProduct, showSnackbar } =
    useContext(Context);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantityInStock: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "update" && activeProduct) {
      setFormData({
        _id: activeProduct._id,
        name: activeProduct.name || "",
        category: activeProduct.category?._id || "",
        price: activeProduct.price || "",
        quantityInStock: activeProduct.quantityInStock || "",
        description: activeProduct.description || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        quantityInStock: "",
        description: "",
      });
    }
    setErrors({});
  }, [mode, activeProduct]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || formData.price < 0)
      newErrors.price = "Valid price is required";
    if (!formData.quantityInStock || formData.quantityInStock < 0)
      newErrors.quantityInStock = "Valid quantity is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantityInStock" ? Number(value) : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const data =
        mode === "create" ? await addProduct(formData) : await updateProduct(formData);
      showSnackbar({ message: data.message, severity: data.severity });
      if (mode === "update") {
        setProducts(prev =>
          [data.product, ...prev.filter(p => p._id !== data.product._id)]
        );        
      } else if(mode === 'create') {
        setProducts(prev => [data.product, ...prev]);
      }
    } catch (error) {
        showSnackbar({ message: error.message, severity: "error" });
    } finally {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          {mode === "create" ? "Add Product" : "Update Product"}
        </Typography>

        <ProductForm
          mode={mode}
          categories={categories}
          handleClose={handleClose}
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
        />
      </Box>
    </Modal>
  );
};

export default ProductModal;
