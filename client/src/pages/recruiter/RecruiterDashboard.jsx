import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function RecruiterDashboard() {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex">

      {/* ================= MOBILE HEADER ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-teal-700/90 backdrop-blur shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <p className="text-white text-lg font-semibold">
            Job<span className="text-teal-300 italic">Portal</span>
          </p>

          <button onClick={() => setOpen(true)} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div className={`fixed inset-0 z-40 lg:hidden ${open ? "block" : "hidden"}`}>

        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        ></div>

        {/* Sidebar */}
        <aside
          className={`absolute left-0 top-0 h-full w-[17rem]
          bg-white/90 backdrop-blur
          shadow-[0_18px_40px_rgba(15,118,110,0.45)]
          p-6
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-teal-900 font-semibold text-xl">
              Job<span className="text-teal-500 italic">Portal</span>
            </h2>

            <button onClick={() => setOpen(false)} className="text-xl">
              ✕
            </button>
          </div>

          <nav className="space-y-2 text-sm">

            <Link
              to="/recruiter/home"
              className={`block px-4 py-2 rounded-lg ${
                path === "/recruiter/home"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
              }`}
            >
              Home
            </Link>

            <Link
              to="/recruiter/dashboard"
              className={`block px-4 py-2 rounded-lg ${
                path === "/recruiter/dashboard"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/recruiter/post-Job"
              className={`block px-4 py-2 rounded-lg ${
                path === "/recruiter/post-Job"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
              }`}
            >
              Post Job
            </Link>

            <Link
              to="/recruiter/job-List"
              className={`block px-4 py-2 rounded-lg ${
                path === "/recruiter/job-List"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
              }`}
            >
              Jobs List
            </Link>

            <Link
              to="/recruiter/application"
              className={`block px-4 py-2 rounded-lg ${
                path === "/recruiter/application"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
              }`}
            >
              Applications
            </Link>

            <Link
              to="/recruiter/profile"
              className={`block px-4 py-2 rounded-lg ${
                path === "/recruiter/profile"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
              }`}
            >
              Profile
            </Link>

            <Link
              to="/authentication/logout"
              className="block px-4 py-2 rounded-lg text-red-500 hover:bg-red-500/20"
            >
              Logout
            </Link>
          </nav>
        </aside>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-[17rem] h-screen sticky top-0 flex-col bg-white/60 backdrop-blur border p-6 shadow-xl">

        <div className="flex items-center mb-6">
          <Link to="/recruiter/home" className="text-teal-700 text-lg font-bold">
            ↩
          </Link>
          <h2 className="ml-4 text-teal-900 font-semibold text-xl">
            Job<span className="text-teal-500 italic">Portal</span>
          </h2>
        </div>

        <nav className="space-y-2 text-sm">

          <Link
            to="/recruiter/dashboard"
            className={`block px-4 py-2 rounded-lg ${
              path === "/recruiter/dashboard"
                ? "bg-teal-700/60 text-white"
                : "hover:bg-teal-800/20"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/recruiter/post-Job"
            className={`block px-4 py-2 rounded-lg ${
              path === "/recruiter/post-Job"
                ? "bg-teal-700/60 text-white"
                : "hover:bg-teal-800/20"
            }`}
          >
            Post Job
          </Link>

          <Link
            to="/recruiter/job-List"
            className={`block px-4 py-2 rounded-lg ${
              path === "/recruiter/job-List"
                ? "bg-teal-700/60 text-white"
                : "hover:bg-teal-800/20"
            }`}
          >
            Jobs List
          </Link>

          <Link
            to="/recruiter/application"
            className={`block px-4 py-2 rounded-lg ${
              path === "/recruiter/application"
                ? "bg-teal-700/60 text-white"
                : "hover:bg-teal-800/20"
            }`}
          >
            Applications
          </Link>

          <Link
            to="/recruiter/profile"
            className={`block px-4 py-2 rounded-lg ${
              path === "/recruiter/profile"
                ? "bg-teal-700/60 text-white"
                : "hover:bg-teal-800/20"
            }`}
          >
            Profile
          </Link>

        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 min-h-screen relative font-[Urbanist]">

        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/assets/images/background3.png')" }}
        ></div>

        <div className="absolute inset-0 bg-white/70 -z-10"></div>

        <div className="pt-16 lg:pt-4 p-4">
          <Outlet />
        </div>

      </main>
    </div>
  );
}

export default RecruiterDashboard;