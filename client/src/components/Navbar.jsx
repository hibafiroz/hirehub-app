import { Link, NavLink } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "./Loader"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, loading } = useContext(UserContext)

  if (loading) {
    return <Loader/>
  }

  if (!user || user.role === 'jobseeker') {

    return (
      <nav className="w-full py-4 shadow-lg fixed bg-teal-700/90 top-0 left-0 z-40">

        {/* MOBILE MENU */}
        <div className={`fixed top-0 left-0 h-full w-[18rem] bg-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition duration-300 z-50 p-6`}>

          <button onClick={() => setIsOpen(false)}>✕</button>

          <div className="mt-10 space-y-3">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/browseJobs" onClick={() => setIsOpen(false)}>Browse Jobs</Link>
            {user && <Link to='/profile' className="hover:text-teal-300 transition">Profile</Link>}
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-green-500">
              Login
            </Link>
          </div>
        </div>

        {/* NAVBAR */}
        <div className="max-w-7xl text-white mx-auto px-6 h-10 flex items-center justify-between">


          {/* HAMBURGER */}
          <button onClick={() => setIsOpen(true)} className="lg:hidden text-white text-2xl">
            ☰
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center justify-between w-full">

            {/* LEFT LOGO */}
            <h1 className="text-white text-xl font-semibold">
              Hire<span className="text-teal-200 font-bold italic">Hub</span>
            </h1>

            {/* CENTER MENU */}
            <div className="flex gap-14 text-[15px] font-medium">
              <NavLink to='/' className={({ isActive }) => isActive ? "text-teal-200 font-bold" : "text-white"}>Home</NavLink>
              <NavLink to='/browseJobs' className={({ isActive }) => isActive ? "text-teal-200 font-bold" : "text-white"}>Browse Jobs</NavLink>
              {user && <NavLink to='/profile' className={({ isActive }) => isActive ? "text-teal-200 font-bold" : "text-white"}>Profile</NavLink>}
              <NavLink to='/contact' className={({ isActive }) => isActive ? "text-teal-200 font-bold" : "text-white"}>Contact</NavLink>
            </div>

            {/* RIGHT BUTTON */}
            <div>
              {user ? (<button onClick={logout} className="bg-white/90 text-black hover:bg-teal-400/90 hover:text-white px-6 py-2.5 font-semibold rounded-xl transition">
                Logout
              </button>) : (
                <Link to='/login' className="bg-white/90 text-black hover:bg-teal-400/90 hover:text-white px-6 py-2.5 font-semibold rounded-xl transition">
                  Login
                </Link>
              )}
            </div>

          </div>

        </div>
      </nav>
    )
    
  } 

  else if (!user || user.role === 'recruiter') {
    return (
      <nav className="w-full py-4 shadow-lg fixed bg-teal-700/90 top-0 left-0 z-40">

        {/* MOBILE MENU */}
        <div className={`fixed top-0 left-0 h-full w-[18rem] bg-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition duration-300 z-50 p-6`}>

          <button onClick={() => setIsOpen(false)}>✕</button>

          <div className="mt-10 space-y-3">
            <Link to="/recruiter/home" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/recruiter/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <Link to='/recruiter/profile' className="hover:text-teal-300 transition">Profile</Link>
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-green-500">
              Login
            </Link>
          </div>
        </div>

        {/* NAVBAR */}
        <div className="max-w-7xl text-white mx-auto px-6 h-10 flex items-center justify-between">


          {/* HAMBURGER */}
          <button onClick={() => setIsOpen(true)} className="lg:hidden text-white text-2xl">
            ☰
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center justify-between w-full">

            {/* LEFT LOGO */}
            <h1 className="text-white text-xl font-semibold">
              Hire<span className="text-teal-200 font-bold italic">Hub</span>
            </h1>

            {/* CENTER MENU */}
            <div className="flex gap-14 text-[15px] font-medium">
              <NavLink to='/recuriter/home' className={({ isActive }) => isActive ? "text-teal-200 font-bold" : "text-white"}>Home</NavLink>
              <NavLink to='recruiter/dashboard' className={({ isActive }) => isActive ? "text-teal-200 font-bold" : "text-white"}>Dashboard</NavLink>
              <NavLink to='/recruiter/profile' className={({ isActive }) => isActive ? "text-teal-200 font-bold" : "text-white"}>Profile</NavLink>
            </div>

            {/* RIGHT BUTTON */}
            <div>
              {user ? (<button onClick={logout} className="bg-white/90 text-black hover:bg-teal-400/90 hover:text-white px-6 py-2.5 font-semibold rounded-xl transition">
                Logout
              </button>) : (
                <Link to='/login' className="bg-white/90 text-black hover:bg-teal-400/90 hover:text-white px-6 py-2.5 font-semibold rounded-xl transition">
                  Login
                </Link>
              )}
            </div>

          </div>

        </div>
      </nav>
    )
  }
}

export default Navbar