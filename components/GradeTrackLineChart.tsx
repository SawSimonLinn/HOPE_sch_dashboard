"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

type Props = {
  data: Record<number, number>; // grade -> count
};

export default function GradeTrackLineChart({ data }: Props) {
  const labels = Object.keys(data).sort((a, b) => Number(a) - Number(b));
  const counts = labels.map((grade) => data[Number(grade)]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Students in Grade",
        data: counts,
        borderColor: "#3B82F6", // blue
        backgroundColor: "#DBEAFE", // light fill
        tension: 0.4,
        pointRadius: 5,
        fill: true,
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
    <div className="w-full md:w-[450px] h-[300px] sm:h-[250px] pb-5 mx-auto">
      <h2 className="text-md font-semibold mb-4 text-gray-700">
        Grade Track Overview
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
