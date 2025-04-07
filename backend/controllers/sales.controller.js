import Product from "../models/product.model.js";
import Sales from "../models/sales.model.js";

const addSalesRecord = async (req, res) => {
  try {
    const { productId, quantitySold } = req.body;

    if (!productId || !quantitySold) {
      return res
        .status(400)
        .json({ message: "All fields are required.", severity: "error" });
    }

    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found.", severity: "info" });

    if (product.quantityInStock < quantitySold) {
      return res
        .status(400)
        .json({ message: "Not enough stock available.", severity: "info" });
    }

    const sellingPrice = product.price;

    const sale = await Sales.create({
      productId,
      quantitySold,
      sellingPrice,
    });

    product.quantityInStock -= quantitySold;
    await product.save();

    res.status(201).json({
      sale,
      message: "Sale recorded successfully",
      severity: "success",
    });
  } catch (error) {
    console.error("Error recording sale:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", severity: "erorr" });
  }
};

const getSalesHistory = async (req, res) => {
  try {
    const sales = await Sales.find().populate("productId");
    if (!sales) {
      return res
        .status(204)
        .json({ message: "No Sales history found", severity: "info" });
    }
    res
      .status(200)
      .json({
        sales,
        message: "Successfully fetched sales history",
        severity: "success",
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", severity: "error" });
  }
};

export default {
  addSalesRecord,
  getSalesHistory,
};
