import { Box, Button, FormControl, FormHelperText, MenuItem, TextField } from '@mui/material'
import React from 'react'

const ProductForm = ({mode, categories, handleClose, formData,errors,handleChange, handleFormSubmit}) => {

  return (
    <form onSubmit={handleFormSubmit} noValidate>
          <FormControl fullWidth margin="normal" error={Boolean(errors.name)}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              error={Boolean(errors.name)}
            />
            {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="normal" error={Boolean(errors.category)}>
            <TextField
              label="Category"
              name="category"
              select
              value={formData.category}
              onChange={handleChange}
              required
              error={Boolean(errors.category)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
            {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="normal" error={Boolean(errors.price)}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              error={Boolean(errors.price)}
            />
            {errors.price && <FormHelperText>{errors.price}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="normal" error={Boolean(errors.quantityInStock)}>
            <TextField
              label="Quantity in Stock"
              name="quantityInStock"
              type="number"
              value={formData.quantityInStock}
              onChange={handleChange}
              required
              error={Boolean(errors.quantityInStock)}
            />
            {errors.quantityInStock && (
              <FormHelperText>{errors.quantityInStock}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Description"
              name="description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>

          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </Box>
        </form>
  )
}

export default ProductForm