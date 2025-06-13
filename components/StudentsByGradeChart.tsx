"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  data: Record<number, number>;
};

export default function StudentsByGradeChart({ data }: Props) {
  const labels = Object.keys(data).sort((a, b) => Number(a) - Number(b));
  const values = labels.map((grade) => data[Number(grade)]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Students per Grade",
        data: values,
        backgroundColor: "#4F46E5", // indigo-600
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[350px] pb-6">
      <h2 className="text-md font-semibold mb-4 text-gray-700">
        Students by Grade
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
