import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"
import { ArrowLeftToLine } from "lucide-react";
import { UserContext } from "../context/UserContext";

function Aside() {

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();
  const path = location.pathname;
  const { logout } = useContext(UserContext)

  return (
    <div>
      {/* ================= MOBILE HEADER ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-teal-700/90 backdrop-blur shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <p className="text-white text-lg font-semibold">
            Hire <span className="text-teal-300 italic">Hub</span>
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
              Hire<span className="text-teal-500 italic">Hub</span>
            </h2>

            <button onClick={() => setOpen(false)} className="text-xl">
              ✕
            </button>
          </div>

          <nav className="space-y-2 text-sm">

            <Link
              to="/recruiter/home"
              className={`block px-4 py-2 rounded-lg ${path === "/recruiter/home"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
                }`}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/recruiter/dashboard"
              className={`block px-4 py-2 rounded-lg ${path === "/recruiter/dashboard"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
                }`}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              to="/recruiter/postJob"
              className={`block px-4 py-2 rounded-lg ${path === "/recruiter/postJob"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
                }`}
              onClick={() => setOpen(false)}
            >
              Post Job
            </Link>

            <Link
              to="/recruiter/jobList"
              className={`block px-4 py-2 rounded-lg ${path === "/recruiter/jobList"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
                }`}
              onClick={() => setOpen(false)}
            >
              Jobs List
            </Link>

            <Link
              to="/recruiter/application"
              className={`block px-4 py-2 rounded-lg ${path === "/recruiter/application"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
                }`}
              onClick={() => setOpen(false)}
            >
              Applications
            </Link>

            <Link
              to="/recruiter/profile"
              className={`block px-4 py-2 rounded-lg ${path === "/recruiter/profile"
                  ? "bg-teal-700/60 text-white"
                  : "text-slate-700 hover:bg-teal-800/20"
                }`}
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>

            <button
              onClick={() => {
                logout()
                navigate('/')
                setOpen(false)
              }}
              className="block px-4 py-2 rounded-lg text-red-500 hover:bg-red-500/20"
            >
              Logout
            </button>
          </nav>
        </aside>
      </div>

      
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-[17rem] h-screen z-40 flex-col bg-white/60 backdrop-blur p-6 shadow-2xl">

        <div className="flex items-center mb-6">
          <Link to={`/recruiter/home`} className="flex items-center text-slate-700 hover:text-teal-600 font-medium"><ArrowLeftToLine strokeWidth={2} size={22} /></Link>

          <h2 className="ml-2 text-teal-900 font-semibold text-2xl">
            Hire<span className="text-teal-500 italic">Hub</span>
          </h2>
        </div>

        <nav className="space-y-2 text-sm">

          <Link
            to="/recruiter/dashboard"
            className={`block px-4 py-2 rounded-lg ${path === "/recruiter/dashboard"
                ? "bg-teal-700/60 text-white"
                : "hover:bg-teal-800/20"
              }`}
          >
            Dashboard
          </Link>

          <Link
            to="/recruiter/postJob"
            className={`block px-4 py-2 rounded-lg ${path === "/recruiter/postJob"
                ? "bg-teal-700/60 text-white"
                : "hover:bg-teal-800/20"
              }`}
          >
            Post Job
          </Link>

          <Link
            to="/recruiter/jobList"
            className={`block px-4 py-2 rounded-lg ${path === "/recruiter/jobList"
                ? "bg-teal-700/60 text-white"
                : "hover:bg-teal-800/20"
              }`}
          >
            Jobs List
          </Link>

          <Link
            to="/recruiter/application"
            className={`block px-4 py-2 rounded-lg ${path === "/recruiter/application"
                ? "bg-teal-700/60 text-white"
                : "hover:bg-teal-800/20"
              }`}
          >
            Applications
          </Link>

          <Link
            to="/recruiter/profile"
            className={`block px-4 py-2 rounded-lg ${path === "/recruiter/profile"
                ? "bg-teal-700/60 text-white"
                : "hover:bg-teal-800/20"
              }`}
          >
            Profile
          </Link>

          <Link
            onClick={() => {
              setOpenModal(true)
            }}
            className={`block px-4 py-2 rounded-lg text-red-500 hover:bg-red-500/50 hover:text-white`}
          >
            Logout
          </Link>

        </nav>
      </aside>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          {/* Modal Box */}
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-lg">

            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Confirm Logout
            </h2>

            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">

              {/* Cancel */}
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              {/* Confirm */}
              <button
                onClick={() => {
                  logout();
                  setOpenModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Aside