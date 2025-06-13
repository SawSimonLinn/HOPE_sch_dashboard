import Link from "next/link";
import { PiStudent } from "react-icons/pi";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-blue-100 p-4 fixed">
      <Link href="/">
        <h2 className="text-xl font-bold mb-6">HOPE Dashboard</h2>
      </Link>
      <nav className="flex flex-col gap-1">
        {/* <Link
          href="/"
          className="hover:bg-blue-200/50 py-2 rounded ps-2 transition-all"
        >
          🏠 Home
        </Link> */}
        <Link
          href="/students"
          className="hover:bg-blue-200/50 py-2 rounded ps-2 transition-all"
        >
          <div className="flex items-center gap-2">
            {" "}
            <PiStudent /> View Students
          </div>
        </Link>
        <Link
          href="/teachers"
          className="hover:bg-blue-200/50 py-2 rounded ps-2 transition-all"
        >
          <div className="flex items-center gap-2">
            {" "}
            <PiChalkboardTeacherLight /> View Teachers
          </div>
        </Link>
        <Link
          href="/students/add"
          className="hover:bg-blue-200/50 py-2 rounded ps-2 transition-all"
        >
          <div className="flex items-center gap-2">
            {" "}
            <IoMdAdd /> Add Student
          </div>
        </Link>
        <Link
          href="/teachers/add"
          className="hover:bg-blue-200/50 py-2 rounded ps-2 transition-all"
        >
          <div className="flex items-center gap-2">
            {" "}
            <IoMdAdd /> Add Teacher
          </div>
        </Link>
      </nav>
    </aside>
  );
}
