import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrowseJobCard from "../../components/BrowseJobCard";

function BrowseJobs() {

  return (
    <div className="min-h-screen font-[Urbanist] pt-24 relative">
      
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-no-repeat -z-10"
        style={{ backgroundImage: "url('/ui/background3.png')" }}
      ></div>
      <div className="absolute inset-0 bg-white/70 -z-10"></div>

      {/* HERO */}
      <section className="text-center px-6 sm:px-10 mt-8 mb-20">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Find your next <span className="text-teal-700">opportunity</span>
        </h1>

        <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
          Browse jobs from top companies and apply to roles that match your
          skills and career goals.
        </p>

        {/* SEARCH */}
        <div className="mt-10 max-w-4xl mx-auto grid gap-4 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="px-4 py-3 rounded-xl bg-white/10 border border-teal-500/90 placeholder-slate-400"
          />

          <input
            type="text"
            placeholder="Location"
            className="px-4 py-3 rounded-xl bg-white/10 border border-teal-500/90 placeholder-slate-400"
          />

          <button className="px-6 py-3 rounded-xl bg-teal-700 text-white hover:bg-teal-500 transition">
            Search Jobs
          </button>
        </div>
      </section>

      {/* JOB LIST */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 pb-28 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* FILTER SIDEBAR */}
          <aside className="hidden lg:block rounded-2xl p-6 shadow sticky top-28">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              All Filters
            </h3>

            {/* WORK MODE */}
            <div className="mb-6">
              <p className="font-medium mb-2">Work mode</p>
              {["Remote", "Onsite", "Hybrid"].map((mode) => (
                <label key={mode} className="block text-sm">
                  <input type="checkbox" className="mr-2" /> {mode}
                </label>
              ))}
            </div>

            {/* WORK TYPE */}
            <div className="mb-6">
              <p className="font-medium mb-2">Work Type</p>
              {["Full Time", "Part Time", "Internship"].map((type) => (
                <label key={type} className="block text-sm">
                  <input type="checkbox" className="mr-2" /> {type}
                </label>
              ))}
            </div>
          </aside>

          {/* JOB CARDS */}
          <BrowseJobCard/>

        </div>
      </section>
    </div>
  );
}

export default BrowseJobs;