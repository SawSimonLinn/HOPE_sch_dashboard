"use client";

import { useState } from "react";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";
import { students as studentsData } from "@/data/students";
import type { Student } from "@/data/students";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

// icons
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function ViewStudents() {
  const [students, setStudents] = useState<Student[]>(studentsData);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [filterAge, setFilterAge] = useState("");

  const router = useRouter();

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editStudent) {
      setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
    }
  };

  const saveEdit = () => {
    if (editStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editStudent.id ? editStudent : s))
      );
      setEditStudent(null);
    }
  };

  const confirmDelete = () => {
    if (deleteStudent) {
      setStudents((prev) => prev.filter((s) => s.id !== deleteStudent.id));
      setDeleteStudent(null);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesName = student.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGrade = filterGrade
      ? student.grade === parseInt(filterGrade)
      : true;
    const matchesAge = filterAge ? student.age === parseInt(filterAge) : true;
    return matchesName && matchesGrade && matchesAge;
  });

  return (
    <div className="flex min-h-screen">
      <div className="md:block fixed top-0 left-0 h-screen w-64 z-10">
        <ResponsiveSidebar />
      </div>

      <main className="flex-1 md:ml-64 overflow-y-auto p-4 sm:p-6 max-h-screen">
        <h1 className="text-xl font-bold mb-6">View Students</h1>

        {/* 🔍 Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Filter by grade"
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Filter by age"
            value={filterAge}
            onChange={(e) => setFilterAge(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        {/* 📋 Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-blue-200 text-left text-gray-700">
                <th className="p-3 text-xs sm:text-sm w-12">#</th>
                <th className="p-3 text-xs sm:text-sm">Name</th>
                <th className="p-3 text-xs sm:text-sm">Grade</th>
                <th className="p-3 text-xs sm:text-sm">Age</th>
                <th className="p-3 text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className="border-t text-gray-700 hover:bg-blue-50 cursor-pointer"
                  onClick={() => router.push(`/students/${student.id}`)}
                >
                  <td className="p-3 text-xs sm:text-sm font-mono text-center">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>
                  <td className="p-3 text-xs sm:text-sm text-blue-700 font-semibold">
                    {student.name}
                  </td>
                  <td className="p-3 text-xs sm:text-sm text-left font-mono">
                    {student.grade.toString().padStart(2, "0")}
                  </td>
                  <td className="p-3 text-xs sm:text-sm text-left font-mono">
                    {student.age.toString().padStart(2, "0")}
                  </td>
                  <td className="p-3 text-xs sm:text-sm flex gap-2">
                    {/* Mobile icons */}
                    <button
                      className="block sm:hidden p-2  text-blue-400 rounded hover:bg-yellow-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditStudent(student);
                      }}
                      aria-label="Edit"
                      title="Edit"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      className="block sm:hidden p-2 text-red-400 rounded hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteStudent(student);
                      }}
                      aria-label="Delete"
                      title="Delete"
                    >
                      <MdDelete size={20} />
                    </button>

                    {/* Desktop text buttons */}
                    <button
                      className="hidden sm:block px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditStudent(student);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="hidden sm:block px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteStudent(student);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✏️ Edit Modal */}
        {editStudent && (
          <Modal title="Edit Student" onClose={() => setEditStudent(null)}>
            <form className="flex flex-col gap-3">
              <label>
                Name
                <input
                  name="name"
                  value={editStudent.name}
                  onChange={handleEditChange}
                  className="p-2 border rounded w-full"
                />
              </label>
              <label>
                Grade
                <input
                  name="grade"
                  type="number"
                  value={editStudent.grade}
                  onChange={handleEditChange}
                  className="p-2 border rounded w-full"
                />
              </label>
              <label>
                Age
                <input
                  name="age"
                  type="number"
                  value={editStudent.age}
                  onChange={handleEditChange}
                  className="p-2 border rounded w-full"
                />
              </label>
              <button
                type="button"
                onClick={saveEdit}
                className="bg-blue-600 text-white py-2 mt-2 rounded"
              >
                Save
              </button>
            </form>
          </Modal>
        )}

        {/* 🗑️ Delete Modal */}
        {deleteStudent && (
          <Modal title="Confirm Delete" onClose={() => setDeleteStudent(null)}>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteStudent.name}</strong>?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setDeleteStudent(null)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
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
