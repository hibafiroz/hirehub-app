import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "./Loader";
import { FaArrowRight } from "react-icons/fa";

function Navbar() {
  const [openAside, setOpenAside] = useState(false);
  const { user, logout } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false)


  return (
    <>
      <nav className="w-full py-4 shadow-lg fixed bg-teal-700/90 top-0 left-0 z-40">

        {/* MOBILE MENU */}
        <div
          className={`fixed top-0 left-0 h-full w-[18rem] bg-white transform ${openAside ? "translate-x-0" : "-translate-x-full"
            } transition duration-300 z-50 p-6`}
        >
          <button onClick={() => setOpenAside(false)}>✕</button>

          <div className="mt-10 space-y-4 flex flex-col">

            {/* COMMON LINKS */}
            <Link to="/" onClick={() => setOpenAside(false)}>Home</Link>

            {/* JOBSEEKER */}
            {(!user || user.role === "jobseeker") && (
              <>
                <Link to="/browseJobs" onClick={() => setOpenAside(false)}>Browse Jobs</Link>
                {user && <Link to="/profile" onClick={() => setOpenAside(false)}>Profile</Link>}
                <Link to="/contact" onClick={() => setOpenAside(false)}>Contact</Link>
              </>
            )}

            {/* RECRUITER */}
            {user?.role === "recruiter" && (
              <>
                <Link to="/recruiter/home" onClick={() => setOpenAside(false)}>Home</Link>
                <Link to="/recruiter/dashboard" onClick={() => setOpenAside(false)}>Dashboard</Link>
                <Link to="/recruiter/profile" onClick={() => setOpenAside(false)}>Profile</Link>
              </>
            )}

            {/* AUTH BUTTONS */}
            {!user ? (
              <>
                <Link
                  to="/jobseeker-Login"
                  onClick={() => setOpenAside(false)}
                  className="text-green-600 font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/recruiter-Login"
                  onClick={() => setOpenAside(false)}
                  className="flex items-center gap-2 text-teal-600 font-medium"
                >
                  Recruiter
                  <FaArrowRight />
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setOpenAside(false);
                }}
                className="text-red-500 font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* NAVBAR */}
        <div className="max-w-7xl text-white mx-auto px-4 sm:px-6 h-10 flex items-center justify-between">

          {/* MOBILE NAV */}
          <div className="flex lg:hidden items-center justify-between w-full">

            {/* HAMBURGER */}
            <button
              onClick={() => setOpenAside(true)}
              className="text-2xl"
            >
              ☰
            </button>

            {/* LOGO */}
            <img
              src="/ui/hirehubLogo.png"
              alt="Logo"
              className="w-28 mt-3"
            />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center justify-between w-full">

            {/* LOGO */}
            <div>
              <img src='/ui/hirehubLogo.png' alt="Logo" className="w-32 mt-3" />
            </div>

            {/* NAV LINKS */}
            <div className="flex gap-16 mr-90 text-sm font-medium">

              {(!user || user.role === "jobseeker") && (
                <>
                  <NavLink to="/" className={({ isActive }) => isActive ? "text-teal-200 font-bold" : ""}>
                    Home
                  </NavLink>

                  <NavLink to="/browseJobs" className={({ isActive }) => isActive ? "text-teal-200 font-bold" : ""}>
                    Browse Jobs
                  </NavLink>

                  {user && (
                    <NavLink to="/jobseeker/profile" className={({ isActive }) => isActive ? "text-teal-200 font-bold" : ""}>
                      Profile
                    </NavLink>
                  )}

                  <NavLink to="/contact" className={({ isActive }) => isActive ? "text-teal-200 font-bold" : ""}>
                    Contact
                  </NavLink>
                </>
              )}

              {user?.role === "recruiter" && (
                <>
                  <NavLink to="/recruiter/home" className={({ isActive }) => isActive ? "text-teal-200 font-bold" : ""}>
                    Home
                  </NavLink>

                  <NavLink to="/recruiter/dashboard" className={({ isActive }) => isActive ? "text-teal-200 font-bold" : ""}>
                    Dashboard
                  </NavLink>

                  <NavLink to="/recruiter/profile" className={({ isActive }) => isActive ? "text-teal-200 font-bold" : ""}>
                    Profile
                  </NavLink>
                </>
              )}
            </div>

            {/* AUTH BUTTONS */}
            <div className="flex items-center gap-3">

              {!user ? (
                <>
                  {/* Primary Login */}
                  <Link
                    to="/jobseeker-Login"
                    className="bg-white text-black hover:bg-teal-400 hover:text-white px-6 py-2.5 font-semibold rounded-xl transition"
                  >
                    Login
                  </Link>

                  {/* Secondary Recruiter */}
                  <Link
                    to="/recruiter-Login"
                    className="flex items-center gap-2 border border-white px-5 py-2.5 rounded-xl hover:bg-white hover:text-teal-700 transition group"
                  >
                    Recruiter
                    <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                  </Link>
                </>
              ) : (
                <button onClick={() => setOpenModal(true)}
                  className="bg-white text-black hover:bg-red-500 hover:text-white px-6 py-2.5 font-semibold rounded-xl transition"
                >
                  Logout
                </button>
              )}

            </div>
          </div>

        </div>

      </nav>
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
    </>
  );
}

export default Navbar;