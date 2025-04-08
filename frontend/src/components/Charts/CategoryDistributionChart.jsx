import { Pie } from "react-chartjs-2";
import ChartCard from "../Cards/ChartCard";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const generateColors = (count) => {
  const palette = [
    "#60a5fa", "#f87171", "#34d399", "#fbbf24",
    "#a78bfa", "#f472b6", "#10b981", "#fb923c",
  ];
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
};

const CategoryDistributionChart = ({ categoryData = [] }) => {
  const chartData = {
    labels: categoryData.map((c) => c.name),
    datasets: [
      {
        label: "Category Share",
        data: categoryData.map((c) => c.count),
        backgroundColor: generateColors(categoryData.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <ChartCard title="📂 Category-wise Distribution" className="h-full">
      <Pie data={chartData} options={options} />
    </ChartCard>
  );
};

export default CategoryDistributionChart;
