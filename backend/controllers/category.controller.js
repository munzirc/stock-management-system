import Category from "../models/category.model.js";

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const trimmedName = name.trim();

    const exists = await Category.findOne({ trimmedName });
    if (exists) {
      const err = new Error("Category already exists");
      err.status = 409;
      throw err;
    }

    const category = new Category({ name: trimmedName });
    await category.save();

    res.status(201).json({ message: "Category created", severity: "success" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({
        message: "Internal server error",
        severity: "error",
      });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export default {
  addCategory,
  deleteCategory,
  getAllCategories,
};
