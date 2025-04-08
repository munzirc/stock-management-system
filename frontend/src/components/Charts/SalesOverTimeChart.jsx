import { Line } from "react-chartjs-2";
import ChartCard from "../Cards/ChartCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesOverTimeChart = ({ salesData }) => {
  const chartData = {
    labels: salesData.map((s) =>
      new Date(s._id).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    ),
    datasets: [
      {
        label: "Total Sales",
        data: salesData.map((s) => s.totalQuantity),
        borderColor: "#3b82f6",
        backgroundColor: "#93c5fd",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <ChartCard title="📆 Sales Over Time" className="h-full">
      <Line key="sales-overtime" data={chartData} options={options} />
    </ChartCard>
  );
};

export default SalesOverTimeChart;
