import { Link } from "react-router-dom"
import HomeJobCard from "../components/HomeJobCard";
import { useEffect, useState } from "react";

function Home() {

  return (
    <div className="relative min-h-screen pt-7">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url('/ui/nnml.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-white/65 -z-10"></div>

      {/* HERO SECTION */}
      <section className="relative h-[32rem] flex items-center px-6 sm:px-12 lg:px-20">

  <div className="max-w-6xl mx-auto text-center">
    <h1 className="text-4xl sm:text-5xl font-[urbanist] font-semibold text-slate-800">
            Where Job Seekers   <span className="text-teal-600">Meet</span> Recruiters
            
          </h1>

    <p className="text-slate-600 text-lg mt-6 max-w-3xl">
      Find your dream job or hire top talent.
    </p>

    <div className="flex gap-4 ml-63 mt-8">
      <Link
        to="/register"
        className="px-6 py-3 rounded-lg bg-teal-700 text-white hover:scale-105 transition"
      >
        Get Started
      </Link>

      <Link
        to="/login"
        className="px-6 py-3 rounded-lg border border-teal-700 text-teal-700 font-semibold bg-white/10 backdrop-blur hover:scale-105 transition"
      >
        Sign In
      </Link>
    </div>
  </div>

</section>

      {/* FEATURED JOBS */}
      <section className="bg-teal-700/80 px-6 py-16">
        <h2 className="text-2xl text-center sm:text-3xl text-white mb-1">
          Discover jobs across <span className="text-teal-100">popular roles</span>
        </h2>

        <div className="grid sm:grid-cols-4 gap-4 justify-items-center mt-10">
          <HomeJobCard />
        </div>
        
      </section>

      {/* ABOUT */}
      <section className="mt-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-slate-900">
            About <span className="text-teal-700">JobPortal</span>
          </h2>

          <p className="mt-6 text-slate-700">
            JobPortal is a modern hiring platform connecting talent with companies.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="bg-teal-50 rounded-2xl p-6 shadow">
              <h3 className="text-teal-800 font-medium mb-2">For Job Seekers</h3>
              <p className="text-sm text-slate-700">
                Discover and apply for jobs easily.
              </p>
            </div>

            <div className="bg-teal-50 rounded-2xl p-6 shadow">
              <h3 className="text-teal-800 font-medium mb-2">For Recruiters</h3>
              <p className="text-sm text-slate-700">
                Find and manage candidates efficiently.
              </p>
            </div>

            <div className="bg-teal-50 rounded-2xl p-6 shadow">
              <h3 className="text-teal-800 font-medium mb-2">Trusted Platform</h3>
              <p className="text-sm text-slate-700">
                Secure and user-friendly experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pt-20 pb-20 mt-16 shadow-[0_7px_40px_rgba(15,118,110,0.45)] bg-teal-700/80 text-center text-white">
        <h2 className="text-3xl font-medium">How It Works</h2>

        <div className="grid gap-8 md:grid-cols-3 mt-12 px-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="bg-white text-black rounded-2xl p-6">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-teal-700 text-white rounded-lg">
                {step}
              </div>
              <h3 className="mb-2">
                {step === 1 && "Create Account"}
                {step === 2 && "Find or Post Jobs"}
                {step === 3 && "Apply & Track"}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mt-20 px-6 mb-10">
        <h2 className="text-3xl text-center font-medium text-teal-800 mb-10">
          Why Choose Us
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Verified Employers",
            "Easy Applications",
            "Email Notifications",
            "Secure & Private",
          ].map((item, i) => (
            <div key={i} className="bg-teal-700 text-white p-8 rounded-2xl">
              <h3 className="mb-2">{item}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;