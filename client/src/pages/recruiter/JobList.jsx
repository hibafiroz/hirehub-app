import React, { useEffect, useState } from 'react'
import API from '../../api/axios'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'
import AnimatedSection from '../../components/AnimatedSection'


function JobList() {

  const location = useLocation()

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchJobs = async () => {
      try {
        const res = await API.get('/recruiter/jobList');
        setJobs(res.data.jobs);
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong ❌");
      } finally {
        setLoading(false)
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await API.get(`/recruiter/jobList?title=${search}`);
      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/background3.png')" }}></div>
      <div className="fixed inset-0 bg-white/70 -z-10"></div>

      {location.state?.message && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {location.state.message}
        </div>
      )}

      <div className="space-y-6">


        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800">
              Jobs <span className="text-teal-600">List</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              View and manage all your posted jobs in one place.
            </p>
          </div>

          <form onSubmit={handleSearch}>
            <div className="flex items-center bg-white/30 shadow-[0_7px_60px_rgba(15,118,110,0.45)]
                                border border-black/20 hover:border-teal-400 hover:border-2 rounded-2xl w-full sm:w-80
                                transition-all duration-300 focus-within:border-teal-400
                                focus-within:shadow-[0_10px_80px_rgba(15,118,110,0.6)] overflow-hidden">

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by job title"
                className="flex-1 px-4 py-2.5 bg-transparent outline-none text-slate-700 placeholder:text-slate-500 text-sm"
              />

              <button
                type="submit"
                className="px-3 py-2 bg-teal-600 text-white hover:bg-teal-500 rounded-r-2xl"
              >
                <i className="fa-solid fa-magnifying-glass tetx-white text-sm"></i>
              </button>

            </div>
          </form>
        </div>

        {loading ?
          (
            <div className="flex justify-center items-center h-[80vh]">
              <Loader />
            </div>
          ) : (

            <>
              <AnimatedSection>
                {/* DESKTOP TABLE */}
                <section className="hidden md:block bg-white/40 border shadow-[0_5px_60px_rgba(15,118,110,0.45)]
                      border-white/10 rounded-2xl p-4 overflow-x-auto">

                  <table className="w-full text-sm">
                    <thead className="text-slate-500 border-b border-black/20">
                      <tr>
                        <th className="text-left py-3">Job ID</th>
                        <th className="text-left py-3">Job Title</th>
                        <th className="text-left py-3">Location</th>
                        <th className="text-left py-3">Type</th>
                        <th className="text-left py-3">Mode</th>
                        <th className="text-left py-3">Status</th>
                        <th className="text-left py-3">Job Detail</th>
                      </tr>
                    </thead>

                    <tbody className="text-slate-600">
                      {
                        jobs.map((job, i) => (
                          job ? (
                            <tr key={job._id} className="border-b border-black/20">
                              <td className="py-3">{i + 1}</td>

                              <td className="py-3">{job.title}</td>
                              <td className="py-3">{job.jobLocation}</td>
                              <td className="py-3">{job.type}</td>
                              <td className="py-3">{job.jobMode}</td>

                              <td>
                                <span
                                  className={`inline-block min-w-[80px] px-2 py-1 text-center rounded-full text-xs font-semibold
                          ${job.status === "pending"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : job.status === "approved"
                                        ? "bg-green-100 text-green-700"
                                        : job.status === "rejected"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                  {job.status}
                                </span>
                              </td>

                              <td className="py-3">
                                <Link
                                  to={`/recruiter/jobDetail/${job._id}`}
                                  className="px-4 py-2 text-xs rounded-lg bg-teal-600/70 text-white hover:bg-teal-600/60"
                                >
                                  View
                                </Link>
                              </td>
                            </tr>
                          ) : (
                            <Loader key={i} />
                          )
                        ))
                      }
                    </tbody>
                  </table>

                </section>
              </AnimatedSection>


              <AnimatedSection>
                {/* MOBILE CARDS */}
                <section className="md:hidden space-y-4">
                  {
                    jobs.map((job) => {
                      return (
                        <div key={job._id} className="bg-white/80 rounded-xl shadow p-4 space-y-2">

                          <div>
                            <p className="text-xs text-slate-500">Job Title</p>
                            <p className="font-medium text-slate-800">
                              {job.title}
                            </p>
                          </div>

                          <div className="text-sm text-slate-600">
                            {job.jobLocation}  •  {job.type}  •  {job.jobMode}
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">Salary</p>
                            <p className="text-sm">
                              {job.salaryRange}
                            </p>
                          </div>

                          <div>
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold
                  job.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  job.status === 'approved' ? 'bg-green-100 text-green-700' :
                  job.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700' ">
                              {job.status}
                            </span>
                          </div>

                          <div className="pt-2">
                            <Link to={`/recruiter/jobDetail/${job._id}`} className="inline-block w-full text-center px-4 py-2 text-xs rounded-lg
                      bg-teal-600 text-white hover:bg-teal-500">
                              View Job
                            </Link>
                          </div>

                        </div>
                      )
                    })
                  }
                </section>
              </AnimatedSection>
            </>
          )
        }
      </div>

    </div>
  )
}

export default JobList