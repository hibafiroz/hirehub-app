import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";

function Login() {

  const { user, setUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [formErr, setFormErr] = useState({ emailErr: "", passwordErr: "", fullErr: "" })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErr = {}

    if (!formData.password && !formData.email) {
      newErr.fullErr = 'Please fill the form'
      setFormErr(newErr)
      return
    }

    if (!formData.email) {
      newErr.emailErr = 'Please enter your email'
    }

    if (!formData.password) {
      newErr.passwordErr = 'Please enter your password'
    }

    if (Object.keys(newErr).length > 0) {
      setFormErr(newErr)
      return
    }
    try {
      const loginPost = await API.post("/authentication/login", formData);
      const userData=loginPost.data.user
      setUser(userData);

      if (userData.role === 'jobseeker') {
        navigate("/jobseeker/browseJobs");
      } else if (userData.role === 'recruiter') {
        navigate("/recruiter/home");
      } else {
        navigate("/admin/home");
      }
      
    } catch (err) {
      setFormErr({
        ...formErr,
        fullErr: err.response?.data?.message || err.message
      });
    }
  }


  return (
    <div
      className="mt-4 relative min-h-screen flex items-center justify-center gap-20 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/ui/background3.png')" }}
    >

      <div className="absolute inset-0 bg-white/60 z-0"></div>

      {/* LEFT SIDE */}
      <div className="hidden sm:flex flex-col mb-10 mt-10">
        <div className="relative z-10 space-y-6 py-12">
          <h1 className="text-5xl text-slate-900 font-semibold">
            <div>Welcome back,</div>
            <div>
              continue your{" "}
              <span className="text-teal-700">career</span>
            </div>
            <div className="text-teal-700">journey with us</div>
          </h1>

          <p className="text-sm text-teal-600 leading-relaxed">
            Login to access your saved jobs, applications,
            <br />
            and personalized job recommendations.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3 bg-white/30 p-2 shadow-[0_10px_20px_rgba(15,118,110,0.45)] border border-black/20 rounded-2xl text-sm">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-black/20 text-xs">
              01
            </div>
            <p className="text-teal-700">
              Track all your applied jobs in one place.
            </p>
          </div>

          <div className="flex items-center p-2 bg-white/30 shadow-[0_18px_40px_rgba(15,118,110,0.45)] border border-black/20 rounded-2xl gap-3 text-sm">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-black/20 text-xs">
              02
            </div>
            <p className="text-teal-700">
              Get personalized job matches instantly.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="px-10 py-12 mt-12 w-[25rem] rounded-3xl bg-white/30 shadow-[0_18px_50px_rgba(15,118,110,0.45)] backdrop-blur">
        <div>
          <h2 className="text-xl sm:text-3xl font-semibold text-slate-900">
            <span className="text-teal-700">Login</span> to your account
          </h2>

          <p className="text-xs text-slate-600 mb-6 mt-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-teal-600 font-medium hover:underline hover:text-teal-400"
            >
              Create one
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm text-slate-600">Email</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-black/30 bg-white/80 px-3 py-2 text-sm outline-none shadow-sm focus:ring-1 focus:ring-teal-500"
            />
            <p className="text-xs mt-1 font-semibold text-red-600">{formErr.emailErr}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-black/30 bg-white/80 px-3 py-2 text-sm outline-none shadow-sm focus:ring-1 focus:ring-teal-500"
            />
            <p className="text-xs mt-1 font-semibold text-red-600">{formErr.passwordErr}</p>
          </div>

          <p className="text-xs mt-1 font-semibold text-red-600">{formErr.fullErr}</p>
          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 rounded-lg bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,118,110,0.45)] hover:scale-[1.03] transition"
          >
            Login
          </button>

          <p className="text-xs text-slate-600 text-center pt-2">
            Access your applications, saved jobs, and personalized job recommendations.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;