"use client";

import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { students as studentList } from "@/data/students";
import type { Student } from "@/data/students";

export default function EditStudentPage() {
  const router = useRouter();
  const { id } = useParams();
  const studentId = Number(id);

  const originalStudent = studentList.find((s) => s.id === studentId);

  const [formData, setFormData] = useState<Student | null>(null);

  useEffect(() => {
    if (originalStudent) {
      setFormData({ ...originalStudent });
    }
  }, [originalStudent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) =>
      prev ? { ...prev, [name]: type === "checkbox" ? checked : value } : null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Student updated! (This is a static example)");
    router.push(`/students/${studentId}`);
  };

  if (!formData) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-6 text-gray-500">Loading student data...</main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">
        <h1 className="text-xl font-bold mb-6">Edit Student</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow rounded"
        >
          {[
            ["Name", "name"],
            ["Grade", "grade", "number"],
            ["Age", "age", "number"],
            ["Student ID", "studentId"],
            ["Personal ID", "personalId"],
            ["Date of Birth", "dob", "date"],
            ["Registration Date", "registrationDate", "date"],
            ["Years of Enroll", "yearsOfEnroll", "number"],
            ["Parent Name", "parentName"],
            ["Nationality", "nationality"],
            ["Religion", "religion"],
            ["Address", "address"],
            ["Contact Number", "contactNumber"],
            ["Church Name", "churchName"],
          ].map(([label, name, type = "text"]) => (
            <label key={name} className="flex flex-col gap-1">
              {label}
              <input
                name={name}
                type={type}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2"
              />
            </label>
          ))}

          <label className="flex flex-col gap-1">
            Gender
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <label className="flex items-center gap-2 mt-2">
            <input
              name="canTransferCertificate"
              type="checkbox"
              checked={formData.canTransferCertificate}
              onChange={handleChange}
            />
            Can Transfer Certificate
          </label>

          <div className="md:col-span-2 mt-4 mx-auto">
            <button
              type="submit"
              className="bg-white text-black px-15 py-2 rounded hover:text-black/60 hover:border-black/60 transition-all  border-black border-1 "
            >
              Update Student
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
