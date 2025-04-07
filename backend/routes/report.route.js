import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import reportController from "../controllers/report.controller.js";

const router = express.Router();

router.get("/product", authenticate, reportController.getProductReport);
router.get("/sale", authenticate, reportController.getSalesReport);

export default router;
