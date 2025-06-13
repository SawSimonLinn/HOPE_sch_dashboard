"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import { teachers as teacherData } from "@/data/teachers";
import type { Teacher } from "@/data/teachers";
import Modal from "@/components/Modal";
import {
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

export default function TeacherDetails() {
  const router = useRouter();
  const { id } = useParams();
  const teacherId = Number(id);

  const [teachers, setTeachers] = useState<Teacher[]>(teacherData);
  const [editing, setEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [teacher, setTeacher] = useState<Teacher | null>(
    teachers.find((t) => t.id === teacherId) || null
  );

  if (!teacher) {
    return (
      <div className="flex">
        <ResponsiveSidebar />
        <main className="ml-0 md:ml-15 p-8 w-full">
          <p className="text-red-500">Teacher not found</p>
        </main>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    setTeachers((prev) => prev.map((t) => (t.id === teacherId ? teacher : t)));
    setEditing(false);
  };

  const deleteTeacher = () => {
    const filtered = teachers.filter((t) => t.id !== teacherId);
    setTeachers(filtered);
    router.push("/teachers");
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-10">
        <ResponsiveSidebar />
      </div>

      <main className="flex-1 md:ml-64 overflow-y-auto p-4 sm:p-6 max-h-screen">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
          {/* 🧁 Title and Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {editing ? "Edit Teacher" : `${teacher.name}'s Details`}
            </h1>

            {/* 🌙 Mobile: Icons Only */}
            <div className="flex sm:hidden gap-2">
              {editing ? (
                <button
                  onClick={saveChanges}
                  className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => router.push("/teachers")}
                className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
            </div>

            {/* ☀️ Tablet/Desktop: Full Buttons */}
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => router.push("/teachers")}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                ← Back
              </button>
              {editing ? (
                <button
                  onClick={saveChanges}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>

          {/* 🧾 Details or Inputs */}
          {editing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <input
                name="name"
                value={teacher.name}
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                name="subject"
                value={teacher.subject}
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                name="email"
                value={teacher.email}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <strong>ID:</strong> {teacher.id}
              </div>
              <div>
                <strong>Name:</strong> {teacher.name}
              </div>
              <div>
                <strong>Subject:</strong> {teacher.subject}
              </div>
              <div>
                <strong>Email:</strong> {teacher.email}
              </div>
            </div>
          )}
        </div>

        {/* 🗑️ Delete Modal */}
        {showDeleteModal && (
          <Modal
            title="Confirm Delete"
            onClose={() => setShowDeleteModal(false)}
          >
            <p>
              Are you sure you want to delete <strong>{teacher.name}</strong>?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={deleteTeacher}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
}
