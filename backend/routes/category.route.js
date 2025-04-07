import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import categoryController from '../controllers/category.controller.js';

const router = express.Router();

router.post("", authenticate, categoryController.addCategory );
router.get("", authenticate, categoryController.getAllCategories);
router.delete("/:id", authenticate, categoryController.deleteCategory);

export default router;