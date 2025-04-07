import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import salesController from "../controllers/sales.controller.js";

const router = express.Router();

router.post("", authenticate, salesController.addSalesRecord);
router.get("", authenticate, salesController.getSalesHistory);

export default router;
