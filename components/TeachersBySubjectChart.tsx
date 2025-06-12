"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: Record<string, number>; // subject -> count
};

export default function TeachersBySubjectChart({ data }: Props) {
  const labels = Object.keys(data);
  const counts = labels.map((key) => data[key]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Teachers by Subject",
        data: counts,
        backgroundColor: [
          "#F87171", // red-400
          "#FBBF24", // yellow-400
          "#34D399", // green-400
          "#60A5FA", // blue-400
          "#A78BFA", // purple-400
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full">
      <h2 className="text-md font-semibold mb-4 text-gray-700">
        📘 Teachers by Subject
      </h2>
      <Doughnut data={chartData} className="m-auto" />
    </div>
  );
}
