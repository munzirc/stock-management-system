import { useEffect, useState } from "react";
import { getStockOverview } from "../../services/stock.api";
import Card from "../Cards/Card";
import ProductTable from "../Tables/ProductTable";
import { Box, CircularProgress } from "@mui/material";

const StockOverview = () => {
  const [stockData, setStockData] = useState({
    totalProducts: 0,
    totalCategories: 0,
    stockValue: 0,
    totalItemsSold: 0,
    totalRevenue: 0,
    averagePrice: 0,
    lowStock: [],
    outOfStock: [],
    recentlyAdded: [],
    slowMoving: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Stock Overview";
    const fetchStockOverview = async () => {
      try {
        setLoading(true);
        const data = await getStockOverview();
        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock overview:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStockOverview();
  }, []);

  const {
    totalProducts,
    totalCategories,
    stockValue,
    totalItemsSold,
    totalRevenue,
    averagePrice,
    lowStock,
    outOfStock,
    recentlyAdded,
    slowMoving,
  } = stockData;

  return (
    <div className="w-full sm:p-4 h-full flex flex-col">
      <div className="w-full bg-[#F5F7FF] sm:rounded-lg overflow-y-auto shadow-[5px_5px_10px_-2px_rgba(0,0,0,0.1)]">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <CircularProgress color="primary" size={50} />
          </Box>
        ) : true ? (
          <div className="px-4 pt-6 pb-22 sm:p-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Card title="📦 Total Products" value={totalProducts} />
              <Card title="🗂️ Total Categories" value={totalCategories} />
              <Card title="💰 Stock Value" value={`₹${stockValue}`} />
              <Card title="💸 Total Revenue" value={`₹${totalRevenue}`} />
              <Card title="🏷️ Total Items Sold" value={`₹${totalItemsSold}`} />
              <Card title="⚠️ Low Stock" value={lowStock.length} />
              <Card title="❌ Out of Stock" value={outOfStock.length} />
              <Card title="📊 Avg. Price" value={`₹${averagePrice}`} />
            </div>

            {/* Tables */}
            <div className="space-y-6">
              {lowStock.length > 0 && (
                <ProductTable title="⚠️ Low Stock Items" products={lowStock} />
              )}
              {outOfStock.length > 0 && (
                <ProductTable
                  title="❌ Out of Stock Items"
                  products={outOfStock}
                />
              )}
              {recentlyAdded?.length > 0 && (
                <ProductTable
                  title="🆕 Recently Added Products"
                  products={recentlyAdded}
                />
              )}
              {slowMoving?.length > 0 && (
                <ProductTable
                  title="🐌 Slow-Moving Products"
                  products={slowMoving}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold">
            <span>No products Available!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockOverview;
