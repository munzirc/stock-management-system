import Product from "../models/product.model.js";
import Sales from "../models/sales.model.js";

const overviewAnalytics = async (req, res) => {
  try {
    const salesOverTime = await Sales.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$soldAt" },
          },
          totalQuantity: { $sum: "$quantitySold" },
          totalRevenue: {
            $sum: { $multiply: ["$quantitySold", "$sellingPrice"] },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const topSellingProducts = await Sales.aggregate([
      {
        $group: {
          _id: "$productId",
          quantitySold: { $sum: "$quantitySold" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          name: "$product.name",
          quantitySold: 1,
        },
      },
      { $sort: { quantitySold: -1 } },
      { $limit: 5 },
    ]);

    const categoryDistribution = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories", 
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $project: {
          _id: 0,
          name: "$category.name",
          count: 1,
        },
      },
    ]);

    res.status(200).json({
      salesOverTime,
      topSellingProducts,
      categoryDistribution,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export default { overviewAnalytics };
