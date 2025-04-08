import { Bar } from "react-chartjs-2";
import ChartCard from "../Cards/ChartCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopSellingProductsChart = ({ productSales = [] }) => {
  const topProducts = productSales.slice(0, 5);

  const chartData = {
    labels: topProducts.map((p) => p.name),
    datasets: [
      {
        label: "Units Sold",
        data: topProducts.map((p) => p.quantitySold),
        backgroundColor: "#f59e0b",
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      },
    ],
  };

  const options = {
    indexAxis: "y", // horizontal bars
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} units`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <ChartCard title="🔢 Top Selling Products" className="h-full">
      <Bar data={chartData} options={options} />
    </ChartCard>
  );
};

export default TopSellingProductsChart;
