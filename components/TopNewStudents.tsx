"use client";

import { Student } from "@/data/students";

type Props = {
  students: Student[];
};

export default function TopNewStudents({ students }: Props) {
  // Sort by registration date (latest first)
  const top5 = [...students]
    .sort(
      (a, b) =>
        new Date(b.registrationDate).getTime() -
        new Date(a.registrationDate).getTime()
    )
    .slice(0, 5);

  return (
    <div className="w-full flex flex-col">
      <h2 className="text-md font-semibold mb-7 text-gray-700">
        🆕 Top 5 New Students
      </h2>
      <ul className="space-y-4 text-sm text-gray-800">
        {top5.map((s) => (
          <li
            key={s.id}
            className="p-3 bg-gray-50 rounded-lg border flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-gray-500">
                Registered on {s.registrationDate}
              </p>
            </div>
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              Grade {s.grade}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
