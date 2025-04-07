import Product from "../models/product.model.js";
import Sales from "../models/sales.model.js";
import { Parser } from "json2csv";

const getProductReport = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    if (!products) {
      throw new Error("No products found.");
    }

    const fields = [
      { label: "Product Name", value: "name" },
      { label: "Category", value: "category.name" },
      { label: "Price (₹)", value: "price" },
      { label: "Quantity In Stock", value: "quantityInStock" },
      { label: "Description", value: "description" },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(products);

    res.header("Content-Type", "text/csv");
    res.attachment("products_report.csv");
    res.status(200).send(csv);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to generate report", severity: "error" });
  }
};

const getSalesReport = async (req, res) => {
  try {
    const sales = await Sales.find().populate("productId");

    if (!sales || sales.length === 0) {
      throw new Error("No sales data found.");
    }

    const fields = [
      { label: "Product Name", value: "productId.name" },
      { label: "Selling Price (₹)", value: "sellingPrice" },
      { label: "Quantity Sold", value: "quantitySold" },
      {
        label: "Date Sold",
        value: (row) =>
          new Date(row.soldAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(sales);

    res.header("Content-Type", "text/csv");
    res.attachment("sales_report.csv");
    res.status(200).send(csv);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to generate sales report", severity: "error" });
  }
};

export default {
  getProductReport,
  getSalesReport,
};
