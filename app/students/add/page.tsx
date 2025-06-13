"use client";

import { useState } from "react";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import { students as studentsData } from "@/data/students";
import type { Student } from "@/data/students";
import { useRouter } from "next/navigation";

export default function AddStudentPage() {
  const [students] = useState<Student[]>(studentsData);
  const [formData, setFormData] = useState<Student>({
    id: students.length + 1,
    name: "",
    grade: 1,
    age: 8,
    studentId: "",
    personalId: "",
    dob: "",
    registrationDate: "",
    yearsOfEnroll: 1,
    parentName: "",
    gender: "Male",
    nationality: "မြန်မာ",
    religion: "ခရစ်ယာန်",
    canTransferCertificate: false,
    address: "",
    contactNumber: "",
    churchName: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Student added! (Functionality can be extended to save in DB)");
    router.push("/students");
  };

  return (
    <div className="flex">
      <ResponsiveSidebar />
      <main className="ml-0 md:ml-15  p-8 w-full">
        <h1 className="text-xl font-bold mb-6">Add New Student</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow rounded"
        >
          <label className="flex flex-col gap-1">
            Name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Grade
            <input
              name="grade"
              type="number"
              value={formData.grade}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Age
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Student ID
            <input
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Personal ID
            <input
              name="personalId"
              value={formData.personalId}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Date of Birth
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Registration Date
            <input
              name="registrationDate"
              type="date"
              value={formData.registrationDate}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Years of Enroll
            <input
              name="yearsOfEnroll"
              type="number"
              value={formData.yearsOfEnroll}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Parent Name
            <input
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
              required
            />
          </label>
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
          <label className="flex flex-col gap-1">
            Nationality
            <input
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col gap-1">
            Religion
            <input
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex items-center gap-2">
            <input
              name="canTransferCertificate"
              type="checkbox"
              checked={formData.canTransferCertificate}
              onChange={handleChange}
            />
            Can Transfer Certificate
          </label>
          <label className="flex flex-col gap-1">
            Address
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col gap-1">
            Contact Number
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col gap-1">
            Church Name
            <input
              name="churchName"
              value={formData.churchName}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            />
          </label>

          <div className="md:col-span-2 mt-4 mx-auto">
            <button
              type="submit"
              className="bg-white text-black px-15 py-2 rounded hover:text-black/60 hover:border-black/60 transition-all  border-black border-1 "
            >
              Add Student
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
