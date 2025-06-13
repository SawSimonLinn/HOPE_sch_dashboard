"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ResponsiveSidebar from "@/components/ResponsiveSidebar";

import { teachers, Teacher } from "@/data/teachers";
import Modal from "@/components/Modal";

export default function ViewTeachers() {
  const [search, setSearch] = useState("");
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [deleteTeacher, setDeleteTeacher] = useState<Teacher | null>(null);

  const router = useRouter();

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editTeacher) {
      setEditTeacher({ ...editTeacher, [e.target.name]: e.target.value });
    }
  };

  const saveEdit = () => {
    if (editTeacher) {
      // save logic here
      setEditTeacher(null);
    }
  };

  const confirmDelete = () => {
    if (deleteTeacher) {
      // delete logic here
      setDeleteTeacher(null);
    }
  };

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <ResponsiveSidebar />
      <main className="ml-0 md:ml-64  p-8 w-full">
        <h1 className="text-xl font-bold mb-6">View Teachers</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-1/3"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-yellow-200 text-left">
                <th className="p-3 text-xs sm:text-sm">#</th>
                <th className="p-3 text-xs sm:text-sm">Name</th>
                <th className="p-3 text-xs sm:text-sm">Subject</th>
                <th className="p-3 text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher, index) => (
                <tr
                  key={teacher.id}
                  className="border-t hover:bg-yellow-50 transition cursor-pointer"
                  onClick={() => router.push(`/teachers/${teacher.id}`)}
                >
                  <td className="p-3 text-xs sm:text-sm font-mono text-left">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>
                  <td className="p-3 text-xs sm:text-sm text-yellow-600 font-semibold">
                    {teacher.name}
                  </td>
                  <td className="p-3 text-xs sm:text-sm">{teacher.subject}</td>
                  <td
                    className="p-3 text-xs sm:text-sm flex gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setEditTeacher(teacher)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteTeacher(teacher)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editTeacher && (
          <Modal title="Edit Teacher" onClose={() => setEditTeacher(null)}>
            <form className="flex flex-col gap-3">
              <input
                name="name"
                value={editTeacher.name}
                onChange={handleEditChange}
                className="p-2 border rounded"
              />
              <input
                name="subject"
                value={editTeacher.subject}
                onChange={handleEditChange}
                className="p-2 border rounded"
              />
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

        {/* Delete Modal */}
        {deleteTeacher && (
          <Modal title="Confirm Delete" onClose={() => setDeleteTeacher(null)}>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteTeacher.name}</strong>?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setDeleteTeacher(null)}
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
