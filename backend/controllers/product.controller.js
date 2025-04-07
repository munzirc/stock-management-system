import mongoose from "mongoose";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

const addProduct = async (req, res) => {
  try {
    const { name, category, price, quantityInStock, description } = req.body;

    const isExists = await Category.findById(category);
    if (!isExists) {
      return res
        .status(400)
        .json({ message: "Invalid category", severity: "error" });
    }

    const newProduct = new Product({
      name,
      category,
      price,
      quantityInStock,
      description,
    });

    await newProduct.save();

    res
      .status(201)
      .json({product: newProduct , message: "Product added successfully", severity: "success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", severity: "error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      keyword = "",
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 12,
    } = req.query;

    const filters = {};

    if (keyword) {
      filters.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) {
      filters.category = category;
    }

    const min = Number(minPrice);
    const max = Number(maxPrice);

    const isValidMin = !isNaN(min) && min > 0;
    const isValidMax = !isNaN(max) && max > 0;

    if (isValidMin || isValidMax) {
      filters.price = {};
      if (isValidMin) filters.price.$gte = min;
      if (isValidMax) filters.price.$lte = max;
    }

    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    // console.log("filters",filters);

    const total = await Product.countDocuments(filters);
    const products = await Product.find(filters)
      .populate("category")
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    const totalPages = Math.ceil(total / parsedLimit);

    res.status(200).json({
      products,
      total,
      totalPages,
      currentPage: parsedPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      severity: "error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product ID format");
    }

    const product = await Product.findById(productId).populate("category");

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", severity: "warning" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", severity: "error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      _id: productId,
      name,
      category,
      price,
      quantityInStock,
      description,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product ID format");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        category,
        price,
        quantityInStock,
        description,
      },
      { new: true }
    ).populate("category");

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found", severity: "warning" });
    }

    res.status(200).json({
      product: updatedProduct,
      message: "Product updated successfully",
      severity: "success",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", severity: "error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product ID format");
    }

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        severity: "warning",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      severity: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      severity: "error",
    });
  }
};

export default {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
