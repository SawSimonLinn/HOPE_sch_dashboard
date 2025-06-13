"use client";

import { ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg sm:max-w-md mx-auto relative p-6 space-y-4 animate-fadeIn">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 🧁 Title */}
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
          {title}
        </h2>

        {/* 💬 Content */}
        <div className="space-y-3 divide-y divide-gray-200 text-sm text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}
