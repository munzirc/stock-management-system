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

const RevenueTrendsChart = ({ salesData }) => {
  const chartData = {
    labels: salesData.map((s) =>
      new Date(s._id).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    ),
    datasets: [
      {
        label: "Revenue (₹)",
        data: salesData.map((s) => s.totalRevenue),
        backgroundColor: "#34d399", // green
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val) => `₹${val}`,
        },
      },
    },
  };

  return (
    <ChartCard title="💵 Revenue Trends">
      <Bar key="revenue-chart" data={chartData} options={options} />
    </ChartCard>
  );
};

export default RevenueTrendsChart;
