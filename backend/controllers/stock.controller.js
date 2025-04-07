import Product from "../models/product.model.js";
import Sales from "../models/sales.model.js";

export const getStockOverview = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const matchStage = {};
    if (startDate || endDate) {
      matchStage["salesData.soldAt"] = {};
      if (startDate) matchStage["salesData.soldAt"].$gte = new Date(startDate);
      if (endDate) matchStage["salesData.soldAt"].$lte = new Date(endDate);
    }

    const aggregationPipeline = [
      {
        $lookup: {
          from: "sales",
          localField: "_id",
          foreignField: "productId",
          as: "salesData",
        },
      },
      {
        $unwind: { path: "$salesData", preserveNullAndEmptyArrays: true },
      },
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          category: { $first: "$category" },
          quantityInStock: { $first: "$quantityInStock" },
          price: { $first: "$price" },
          totalSold: {
            $sum: { $ifNull: ["$salesData.quantitySold", 0] },
          },
          revenue: {
            $sum: {
              $multiply: [
                { $ifNull: ["$salesData.sellingPrice", 0] },
                { $ifNull: ["$salesData.quantitySold", 0] },
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: {
          path: "$categoryData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          categoryName: "$categoryData.name",
        },
      },
    ];

    const products = await Product.aggregate(aggregationPipeline);

    const totalProducts = products.length;
    const stockValue = products.reduce(
      (sum, p) => sum + p.price * p.quantityInStock,
      0
    );
    const totalItemsSold = products.reduce((sum, p) => sum + p.totalSold, 0);
    const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
    const averagePrice =
      totalProducts > 0
        ? products.reduce((sum, p) => sum + p.price, 0) / totalProducts
        : 0;

    const lowStock = products
      .filter((p) => p.quantityInStock < 5 && p.quantityInStock > 0)
      .map(({ _id, name, categoryName, quantityInStock }) => ({
        _id,
        name,
        category: categoryName,
        quantityInStock,
      }));

    const outOfStock = products
      .filter((p) => p.quantityInStock === 0)
      .map(({ _id, name, categoryName, quantityInStock }) => ({
        _id,
        name,
        category: categoryName,
        quantityInStock,
      }));

    const slowMoving = products
      .filter((p) => p.totalSold < 3)
      .map(({ _id, name, categoryName, quantityInStock }) => ({
        _id,
        name,
        category: categoryName,
        quantityInStock,
      }));

    const totalCategories = await Product.distinct("category");

    const recentlyAdded = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("category", "name")
      .select("name category quantityInStock");

    const recentlyAddedFormatted = recentlyAdded.map((item) => ({
      _id: item._id,
      name: item.name,
      category: item.category?.name || "Unknown",
      quantityInStock: item.quantityInStock,
    }));

    return res.status(200).json({
      totalProducts,
      totalCategories: totalCategories.length,
      stockValue,
      totalItemsSold,
      totalRevenue,
      averagePrice: Math.round(averagePrice),
      lowStock,
      outOfStock,
      recentlyAdded: recentlyAddedFormatted,
      slowMoving,
    });
  } catch (err) {
    console.error("Stock overview error:", err);
    res.status(500).json({ message: "Failed to fetch stock overview" });
  }
};





export default {
  getStockOverview,
};
