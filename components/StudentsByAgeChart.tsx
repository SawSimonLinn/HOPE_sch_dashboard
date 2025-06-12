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
  data: Record<number, number>; // age -> count
};

export default function StudentsByAgeChart({ data }: Props) {
  const labels = Object.keys(data).sort((a, b) => Number(a) - Number(b));
  const counts = labels.map((age) => data[Number(age)]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Students by Age",
        data: counts,
        backgroundColor: "#60A5FA", // blue-400
      },
    ],
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <h2 className="text-md font-semibold mb-4 text-gray-700">
        🎂 Students by Age
      </h2>
      <Bar data={chartData} />
    </div>
  );
}
