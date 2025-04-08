import { useEffect, useState } from "react";
import CategoryDistributionChart from "../Charts/CategoryDistributionChart";
import RevenueTrendsChart from "../Charts/RevenueTrendsChart";
import SalesOverTimeChart from "../Charts/SalesOverTimeChart";
import TopSellingProductsChart from "../Charts/TopSellingProductsChart";
import { getAnalyticsData } from "../../services/analytics.api";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    salesOverTime: [],
    topSellingProducts: [],
    categoryDistribution: [],
  });

  useEffect(() => {
    document.title = "Analytics"
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalyticsData();
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="w-full sm:p-4  h-full flex flex-col">
      <div className="w-full h-full bg-[#F5F7FF] sm:rounded-lg shadow-[5px_5px_10px_-2px_rgba(0,0,0,0.1)] ">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 overflow-y-auto gap-6 p-4 pb-22 sm:pb-4 ">
          <SalesOverTimeChart salesData={analyticsData.salesOverTime} />
          <TopSellingProductsChart
            productSales={analyticsData.topSellingProducts}
          />
          <RevenueTrendsChart salesData={analyticsData.salesOverTime} />
          <CategoryDistributionChart
            categoryData={analyticsData.categoryDistribution}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
