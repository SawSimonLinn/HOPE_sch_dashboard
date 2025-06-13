"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  studentCount: number;
  teacherCount: number;
};

export default function StudentTeacherPie({
  studentCount,
  teacherCount,
}: Props) {
  const data = {
    labels: ["Students", "Teachers"],
    datasets: [
      {
        label: "School Ratio",
        data: [studentCount, teacherCount],
        backgroundColor: ["#3B82F6", "#F59E0B"], // blue & amber
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Student vs Teacher</h2>
      <Pie data={data} className="m-auto" />
    </div>
  );
}
