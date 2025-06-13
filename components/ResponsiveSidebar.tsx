"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaTimes } from "react-icons/fa";

export default function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* 🍔 Hamburger */}
      {!isDesktop && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 z-50 flex flex-col gap-1 w-8 h-8 justify-center items-center"
          aria-label="Toggle Sidebar"
        >
          <div
            className={`w-6 h-0.5 bg-black transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-black transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      )}

      {/* 🧱 Sidebar itself */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-40 shadow transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        ${isDesktop ? "translate-x-0 static block" : ""}`}
      >
        <Sidebar />
      </div>

      {/* 🌚 Overlay */}
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
