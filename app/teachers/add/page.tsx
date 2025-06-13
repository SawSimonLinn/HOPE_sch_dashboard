"use client";

import { useState } from "react";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import { useRouter } from "next/navigation";

export default function AddTeacherPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    age: "",
    email: "",
    phone: "",
    hireDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("👩‍🏫 New teacher data:", formData);
    router.push("/teachers");
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-10">
        <ResponsiveSidebar />
      </div>

      <main className="flex-1 md:ml-64 overflow-y-auto p-4 sm:p-6 max-h-screen">
        <h1 className="text-xl font-bold mb-6">Add New Teacher</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="capitalize mb-1 text-sm text-gray-600">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                name={key}
                value={value}
                onChange={handleChange}
                className="p-2 border rounded"
                type={key === "age" ? "number" : "text"}
              />
            </div>
          ))}

          <button
            type="submit"
            className="sm:col-span-2 border-black border-1 text-black py-2 rounded mt-4"
          >
            Save Teacher
          </button>
        </form>
      </main>
    </div>
  );
}
