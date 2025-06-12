"use client";

import { useParams, useRouter } from "next/navigation";
import { students as studentsData } from "@/data/students";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function StudentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const student = studentsData.find((s) => s.id === Number(id));
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!student) {
    return (
      <div className="p-10 text-red-600 font-semibold">
        Student not found! 🥺
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {student.name}&apos;s Details
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/students/${student.id}/edit`)}
              className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-white shadow rounded p-6">
          <Info label="Student ID" value={student.studentId} />
          <Info label="Personal ID" value={student.personalId} />
          <Info label="Date of Birth" value={student.dob} />
          <Info label="Registration Date" value={student.registrationDate} />
          <Info
            label="Years of Enroll"
            value={student.yearsOfEnroll.toString()}
          />
          <Info label="Parent Name" value={student.parentName} />
          <Info label="Gender" value={student.gender} />
          <Info label="Nationality" value={student.nationality} />
          <Info label="Religion" value={student.religion} />
          <Info
            label="Transfer Certificate"
            value={student.canTransferCertificate ? "✅ Yes" : "❌ No"}
          />
          <Info label="Grade" value={student.grade.toString()} />
          <Info label="Age" value={student.age.toString()} />
          <Info label="Contact Number" value={student.contactNumber} />
          <Info label="Address" value={student.address} />
          <Info label="Church Name" value={student.churchName} />
        </div>

        {/* ❌ Delete Confirm Modal */}
        {showDeleteModal && (
          <Modal
            title="Confirm Delete"
            onClose={() => setShowDeleteModal(false)}
          >
            <p className="text-sm">
              Are you sure you want to delete <strong>{student.name}</strong>?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded"
                onClick={() => {
                  alert("Delete action goes here 😘");
                  setShowDeleteModal(false);
                  router.push("/students");
                }}
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  );
}
