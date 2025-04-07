import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
  price: z.number().positive("Price must be a positive number"),
  quantityInStock: z.number().int().nonnegative("Quantity must be 0 or more"),
  description: z.string().optional(),
});

export const updateProductSchema = z.object({
  _id: z.string({ required_error: "Id is required" }).min(1, "_id is required"),
  name: z.string().min(1, "Name is required"),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
  price: z.number().nonnegative("Price must be non-negative"),
  quantityInStock: z.number().int().nonnegative("Quantity must be non-negative"),
  description: z.string().optional(),
});

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.errors[0]?.message || "Invalid request",
      severity: "warning",
    });
  }
};
