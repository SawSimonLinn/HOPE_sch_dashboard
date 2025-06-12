"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { students } from "@/data/students";
import { teachers } from "@/data/teachers";
import StudentTeacherPie from "@/components/StudentTeacherPie";
import StudentsByGradeChart from "@/components/StudentsByGradeChart";
import TeachersBySubjectChart from "@/components/TeachersBySubjectChart";
import GradeTrackLineChart from "@/components/GradeTrackLineChart";
import TopNewStudents from "@/components/TopNewStudents";

export default function HomeDashboard() {
  const router = useRouter();

  const totalStudents = students.length;
  const totalTeachers = teachers.length;

  const studentsByGrade: Record<number, number> = {};
  const studentsByAge: Record<number, number> = {};
  const teachersBySubject: Record<string, number> = {};

  students.forEach((s) => {
    studentsByGrade[s.grade] = (studentsByGrade[s.grade] || 0) + 1;
    studentsByAge[s.age] = (studentsByAge[s.age] || 0) + 1;
  });

  teachers.forEach((t) => {
    teachersBySubject[t.subject] = (teachersBySubject[t.subject] || 0) + 1;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-0 md:ml-64 p-6 w-full space-y-8">
        {/* 🔲 ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="grid gap-3">
            {/* Top Stats (2 columns) */}
            <div className="grid grid-cols-2 gap-4 h-auto">
              <div
                className="cursor-pointer bg-white px-6 py-4 mb-auto rounded-xl shadow text-center hover:bg-blue-50 transition"
                onClick={() => router.push("/students")}
              >
                <h2 className="text-sm text-gray-500">Total Students</h2>
                <p className="text-3xl font-bold text-blue-600">
                  {totalStudents}
                </p>
              </div>
              <div
                className="cursor-pointer bg-white px-6 py-4 mb-auto rounded-xl shadow text-center hover:bg-yellow-50 transition"
                onClick={() => router.push("/teachers")}
              >
                <h2 className="text-sm text-gray-500">Total Teachers</h2>
                <p className="text-3xl font-bold text-yellow-500">
                  {totalTeachers}
                </p>
              </div>
            </div>

            {/* Grade Count */}
            <div className="bg-white p-6 rounded-xl shadow">
              <GradeTrackLineChart data={studentsByGrade} />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="bg-white p-6 rounded-xl shadow">
            <StudentsByGradeChart data={studentsByGrade} />
          </div>
        </div>

        {/* 🔲 ROW 2 (3 CHART COLUMNS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <StudentTeacherPie
              studentCount={totalStudents}
              teacherCount={totalTeachers}
            />
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <TopNewStudents students={students} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <TeachersBySubjectChart data={teachersBySubject} />
          </div>
        </div>
      </main>
    </div>
  );
}
