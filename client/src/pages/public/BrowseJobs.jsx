import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrowseJobCard from "../../components/BrowseJobCard";
import Navbar from "../../components/Navbar";
import AnimatedSection from "../../components/AnimatedSection";

function BrowseJobs() {

  const [filters, setFilters] = useState({
    jobMode: [],
    type: [],
    location: [],
    salary: [],
  });
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [submittedLocation, setSubmittedLocation] = useState("");

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prev) => {
      if (checked) {
        return {
          ...prev,
          [name]: [...prev[name], value],
        };
      } else {
        return {
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        };
      }
    });
  };

  const renderCheckbox = (name, value, label) => (
    <label className="flex items-center gap-2 text-sm text-slate-600 mb-2">
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={handleChange}
        className="accent-teal-600"
      />
      {label}
    </label>
  );

  return (
    <>
      <div className="min-h-screen font-[Urbanist] pt-24">

        {/* BACKGROUND */}
        <div
          className="fixed inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/ui/background3.png')" }}
        ></div>
        <div className="fixed inset-0 bg-white/70 -z-10"></div>

        {/* HERO */}
        <AnimatedSection>
          <section className="text-center px-4 sm:px-8 lg:px-10 mt-6 sm:mt-8 mb-16 sm:mb-20">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 leading-snug">
              Find your next <span className="text-teal-700">opportunity</span>
            </h1>

            <p className="mt-4 text-slate-600 max-w-xs sm:max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Browse jobs from top companies and apply to roles that match your
              skills and career goals.
            </p>

            {/* SEARCH */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmittedSearch(search);
                setSubmittedLocation(locationSearch);
              }}
              className="mt-8 sm:mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title or keyword"
                className="px-4 py-3 rounded-xl bg-white/10 border border-teal-500/90 focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-slate-400"
              />

              <input
                type="text"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                placeholder="Location"
                className="px-4 py-3 rounded-xl bg-white/10 border border-teal-500/90 focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-slate-400"
              />

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-teal-700 text-white hover:bg-teal-500 transition"
              >
                Search Jobs
              </button>

            </form>
          </section>

          {/* JOB LIST */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-20 sm:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
        
              {/* FILTER SIDEBAR */}
              <aside className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl p-6 shadow bg-white">
               <h3> All Filters </h3>

                {/* WORK MODE */}
                <div className="mb-6">
                  <p className="font-medium text-slate-700 mb-3">Work mode</p>
                  {renderCheckbox("jobMode", "Remote", "Remote")}
                  {renderCheckbox("jobMode", "Onsite", "Onsite")}
                  {renderCheckbox("jobMode", "Hybrid", "Hybrid")}
                </div>

                {/* WORK TYPE */}
                <div className="mb-6">
                  <p className="font-medium text-slate-700 mb-3">Work Type</p>
                  {renderCheckbox("type", "Full Time", "Full Time")}
                  {renderCheckbox("type", "Part Time", "Part Time")}
                  {renderCheckbox("type", "Internship", "Internship")}
                </div>

                {/* LOCATION */}
                <div className="mb-6">
                  <p className="font-medium text-slate-700 mb-3">Location</p>
                  {renderCheckbox("location", "Bangalore", "Bangalore")}
                  {renderCheckbox("location", "Hyderabad", "Hyderabad")}
                  {renderCheckbox("location", "Kochi", "Kochi")}
                  {renderCheckbox("location", "Kolkata", "Kolkata")}
                  {renderCheckbox("location", "Delhi", "Delhi")}
                </div>

                {/* SALARY */}
                <div className="mb-6">
                  <p className="font-medium text-slate-700 mb-3">Salary</p>
                  {renderCheckbox("salary", "0-3 LPA", "0-4 LPA")}
                  {renderCheckbox("salary", "4-7 LPA", "5-8 LPA")}
                  {renderCheckbox("salary", "8-12 LPA", "9-13 LPA")}
                  {renderCheckbox("salary", "13-14 LPA", "14-20 LPA")}
                  {renderCheckbox("salary", "15-20 LPA", "20-30 LPA")}
                </div>
              </aside>

              {/* JOB CARDS */}
              <BrowseJobCard filters={filters} search={submittedSearch} locationSearch={submittedLocation} />

            </div>
          </section >
        </AnimatedSection>
        
      </div >
    </>
  );
}

export default BrowseJobs