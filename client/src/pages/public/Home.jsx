import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import HomeJobCard from "../../components/HomeJobCard";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from '../../components/Footer'
import { FaCheckCircle, FaPaperPlane, FaBell, FaLock } from "react-icons/fa";
import API from "../../api/axios";
import AnimatedSection from "../../components/AnimatedSection";

const sectionVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
}

function Home() {

  const [logos, setLogos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await API.get('/')
        const data = res.data.companyLogo
        console.log(data)
        setLogos(data)
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchLogo()
  }, [])

  return (
    <>
      <div className="relative min-h-screen md:pt-30 lg:pt-9">

        {/* BackgroundImage */}
        <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/image.png')" }}></div>
        <div className="fixed inset-0 bg-white/60 -z-10"></div>

        {/* HERO SECTION */}
        <AnimatedSection className='relative min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-20 overflow-hidden'>
          <div className="max-w-6xl mx-auto text-center">
            {/* Small badge */}
            <div className="inline-block px-3 py-1 sm:px-4 sm:py-1 mb-4 sm:mb-6 text-xs sm:text-sm rounded-full bg-teal-100 text-teal-700 font-medium">
              #1 Job Platform for Modern Hiring
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl tracking-wide sm:tracking-widest font-[urbanist] font-semibold text-slate-800 leading-tight">
              Hire Smarter.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
                Get Hired Faster.
              </span>
            </h1>

            <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-xs sm:max-w-2xl mx-auto leading-relaxed">
              Discover thousands of job opportunities from top companies.  <br />
              Our platform simplifies hiring with smart tools, real-time updates, and a seamless experience.

            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-8 sm:mt-10 flex-wrap">
              <Link
                to="/register"
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-teal-700 to-teal-500 text-white font-semibold shadow-lg shadow-teal-300/40 hover:scale-105 hover:shadow-xl transition duration-300">
                Get Started
              </Link>

              <Link
                to="/jobseeker-Login"
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl border border-teal-500 text-teal-600 font-semibold hover:bg-teal-50 transition duration-300">
                Sign In
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20 text-center">
              {[
                { number: "10K+", label: "Jobs Posted" },
                { number: "8K+", label: "Candidates" },
                { number: "500+", label: "Companies" },
                { number: "95%", label: "Success Rate" },
              ].map((item, i) => (
                <div key={i} className="bg-white/60 backdrop-blur rounded-xl py-4 px-3 shadow-[0_7px_40px_rgba(15,118,110,0.45)] w-full">
                  <h3 className="text-lg sm:text-xl font-semibold text-teal-700">{item.number}</h3>
                  <p className="text-xs sm:text-sm text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>

          </div>
        </AnimatedSection >


        {/* FEATURED JOBS */}
        <AnimatedSection className='bg-teal-700/80 px-4 sm:px-6 py-14 sm:py-16 mt-16 sm:mt-1'>
          <h2 className="text-xl sm:text-3xl text-center text-white mb-1 leading-snug">
            Discover jobs across <span className="text-teal-100">popular roles</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mt-10">            <HomeJobCard />
          </div>
        </AnimatedSection>


        {/* HOW IT WORKS */}
        <AnimatedSection className='pt-16 sm:pt-20 pb-16 sm:pb-20 mt-10 sm:mt-16 text-center px-4 sm:px-6'>
          <h2 className="text-2xl sm:text-3xl text-teal-700 font-medium">How It Works</h2>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3 mt-10 sm:mt-12">
            {[
              {
                title: "Create Account",
                desc: "Sign up as a job seeker or recruiter in just a few steps and set up your profile to get started."
              },
              {
                title: "Find or Post Jobs",
                desc: "Browse thousands of job listings or post openings to connect with the right candidates بسهولة."
              },
              {
                title: "Apply & Track",
                desc: "Apply to jobs, track your applications, and manage hiring all in one seamless platform."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white shadow-[0_7px_40px_rgba(15,118,110,0.45)] text-black rounded-2xl p-6 sm:p-8 hover:scale-105 transition"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-teal-700 text-white rounded-lg font-semibold">
                  {i + 1}
                </div>

                <h3 className="mb-2 text-lg font-medium">{item.title}</h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection >


        {/* ABOUT */}
        <AnimatedSection className='mt-20 sm:mt-28 bg-teal-700/80 px-4 sm:px-6 py-16 sm:py-20'>
          <div className="max-w-5xl mx-auto text-center">

            {/* LOGO */}
            <div className="w-40 sm:w-56 mx-auto lg:w-72 object-contain">
              <img
                src="/ui/hirehubLogo.png"
                alt="HireHub Logo"
                className="lg:w-66 sm:w-40 object-contain"
              />
            </div>

            {/* TITLE */}
            <h2 className="text-2xl sm:text-3xl font-medium text-white">
              About <span className="text-teal-200">HireHub</span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-6 text-sm sm:text-base text-white max-w-xs sm:max-w-2xl mx-auto leading-relaxed">
              HireHub is a modern hiring platform designed to connect talented job seekers
              with the right opportunities and help recruiters find the perfect candidates faster.
            </p>

            {/* CARDS */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              <div className="bg-teal-50 rounded-2xl p-6 shadow">
                <h3 className="text-teal-800 font-medium mb-2">For Job Seekers</h3>
                <p className="text-sm text-slate-700">
                  Explore jobs, apply بسهولة, and track your career growth.
                </p>
              </div>

              <div className="bg-teal-50 rounded-2xl p-6 shadow">
                <h3 className="text-teal-800 font-medium mb-2">For Recruiters</h3>
                <p className="text-sm text-slate-700">
                  Post jobs, manage applicants, and hire efficiently.
                </p>
              </div>

              <div className="bg-teal-50 rounded-2xl p-6 shadow">
                <h3 className="text-teal-800 font-medium mb-2">Why HireHub?</h3>
                <p className="text-sm text-slate-700">
                  Simple, fast, and built for a seamless hiring experience.
                </p>
              </div>

            </div>
          </div>
        </AnimatedSection >


        {/* WHY CHOOSE US */}
        <AnimatedSection className='mt-16 sm:mt-20 px-4 sm:px-6 mb-10'>
          <h2 className="text-2xl sm:text-3xl text-center font-medium text-teal-700 mb-10">
            Why Choose Us
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Verified Employers", icon: <FaCheckCircle /> },
              { title: "Easy Applications", icon: <FaPaperPlane /> },
              { title: "Email Notifications", icon: <FaBell /> },
              { title: "Secure & Private", icon: <FaLock /> },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-teal-700/80 text-white p-6 sm:p-8 rounded-2xl flex flex-col items-center text-center hover:scale-105 transition"
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-medium">{item.title}</h3>
              </div>
            ))}
          </div>
        </ AnimatedSection>

        {/* Logos */}
        <AnimatedSection className='py-14 sm:py-16 px-4 sm:px-6 text-center'>
          <h2 className="text-base sm:text-xl text-slate-600 mb-8 leading-relaxed">
            Trusted by professionals from leading companies
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 opacity-70">

            {
              loading ? (
                <div>
                  loading...
                </div>
              ) : (
                logos.map((item) => (
                  <img className="h-8 sm:h-10 lg:h-12 object-contain" key={item._id} src={item.logo} alt="logo" />
                )
                )
              )
            }

          </div>
        </AnimatedSection>
      </div >
      <Footer />
    </>
  );
}

export default Home;