import Link from "next/link";

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
          📄 View Students
        </Link>
        <Link
          href="/teachers"
          className="hover:bg-blue-200/50 py-2 rounded ps-2 transition-all"
        >
          🧑‍🏫 View Teachers
        </Link>
        <Link
          href="/students/add"
          className="hover:bg-blue-200/50 py-2 rounded ps-2 transition-all"
        >
          ➕ Add Student
        </Link>
        <Link
          href="/teachers/add"
          className="hover:bg-blue-200/50 py-2 rounded ps-2 transition-all"
        >
          ➕ Add Teacher
        </Link>
      </nav>
    </aside>
  );
}
