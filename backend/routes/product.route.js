import express from "express";
import productController from "../controllers/product.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import { validate, productSchema, updateProductSchema } from "../middleware/product.validation.js";

const router = express.Router();

router.post("", authenticate, validate(productSchema), productController.addProduct);
router.get("", authenticate, productController.getAllProducts);
router.get("/:id", authenticate, productController.getProductById);
router.put("/", authenticate, validate(updateProductSchema), productController.updateProduct);
router.delete("/:id", authenticate, productController.deleteProduct);

export default router;
