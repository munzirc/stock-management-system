import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import salesRouter from "./routes/sales.route.js";
import stockRouter from "./routes/stock.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import reportRouter from "./routes/report.route.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/sales", salesRouter);
app.use("/api/stocks", stockRouter);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRouter);

app.get("/health", (req, res) => {
  res.status(200).json({message: "Stock Management API is running..."});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
