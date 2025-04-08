import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

const ProductForm = ({
  mode,
  categories,
  handleClose,
  formData,
  errors,
  handleChange,
  handleFormSubmit,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "price", label: "Price", type: "number" },
    { name: "quantityInStock", label: "Quantity in Stock", type: "number" },
  ];

  return (
    <form onSubmit={handleFormSubmit} noValidate>
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#fff",
          mb: 2,
          fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
        }}
      >
        {mode === "create" ? "Add Product" : "Update Product"}
      </Typography>

      {fields.map(({ name, label, type }) => (
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(errors[name])}
          key={name}
        >
          <TextField
            label={label}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            required
            error={Boolean(errors[name])}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
                "& input::placeholder": { color: "#fff" },
              },
              "& .MuiInputLabel-root": {
                color: "#ccc",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#fff",
              },
              fontSize: isSmallScreen ? "0.875rem" : "1rem",
            }}
            InputLabelProps={{
              style: { fontSize: isSmallScreen ? "0.875rem" : "1rem" },
            }}
          />
          {errors[name] && <FormHelperText>{errors[name]}</FormHelperText>}
        </FormControl>
      ))}

      {/* Category dropdown */}
      <FormControl fullWidth margin="normal" error={Boolean(errors.category)}>
        <TextField
          label="Category"
          name="category"
          select
          value={formData.category}
          onChange={handleChange}
          required
          error={Boolean(errors.category)}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
            "& .MuiInputLabel-root": {
              color: "#ccc",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fff",
            },
            fontSize: isSmallScreen ? "0.875rem" : "1rem",
          }}
          InputLabelProps={{
            style: { fontSize: isSmallScreen ? "0.875rem" : "1rem" },
          }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
      </FormControl>

      {/* Description */}
      <FormControl fullWidth margin="normal">
        <TextField
          label="Description"
          name="description"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
            "& .MuiInputLabel-root": {
              color: "#ccc",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fff",
            },
            fontSize: isSmallScreen ? "0.875rem" : "1rem",
          }}
          InputLabelProps={{
            style: { fontSize: isSmallScreen ? "0.875rem" : "1rem" },
          }}
        />
      </FormControl>

      {/* Buttons */}
      <Box
        mt={3}
        display="flex"
        justifyContent="flex-end"
        gap={1}
        flexWrap="wrap"
      >
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            color: "#f44336",
            borderColor: "#f44336",
            "&:hover": {
              backgroundColor: "#f44336",
              color: "#fff",
            },
            fontSize: isSmallScreen ? "0.8rem" : "1rem",
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#4CAF50",
            "&:hover": {
              backgroundColor: "#43A047",
            },
            fontSize: isSmallScreen ? "0.8rem" : "1rem",
          }}
        >
          <span className="capitalize">
            {mode === "create" ? "Add Product" : "Update"}
          </span>
        </Button>
      </Box>
    </form>
  );
};

export default ProductForm;
