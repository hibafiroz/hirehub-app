import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../api/axios'
import Loader from '../../components/Loader'
import AnimatedSection from '../../components/AnimatedSection'

function JobDetail() {

  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [appliedJob, setAppliedJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API(`/jobDetail/${id}`)
        const data = res.data.job
        console.log(data)
        setJob(data)
        const applied = res.data.appliedJob
        setAppliedJob(applied)
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id])

  if (loading) return (<div className="flex justify-center items-center h-screen">
    <Loader />
  </div>)

  return (
    <>
      <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/background3.png')" }}></div>
      <div className="fixed inset-0 bg-white/70 -z-10"></div>
      
      <AnimatedSection>
        <main className="max-w-7xl min-h-screen pt-24 mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 place-items-center lg:place-items-stretch">
          {/* LEFT CONTENT */}

        <div className="lg:col-span-2 space-y-8 max-w-3xl mx-auto lg:mx-0">

          <div className="py-2 px-1 lg:p-6">
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/browseJobs" className="text-teal-800 mb-1 text-3xl hover:text-teal-500">⮜</Link>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                {job.title}
              </h1>
            </div>

            <p className="text-slate-600 mb-4 ml-10">
              {job.company.name}
            </p>

            <div className="flex flex-wrap gap-3 ml-10 text-sm">
              <span className="bg-teal-600/70 text-white px-3 py-1 rounded-full">
                {job.jobLocation}
              </span>
              <span className="bg-teal-600/70 text-white px-3 py-1 rounded-full">
                {job.jobMode}
              </span>
              <span className="bg-teal-600/70 text-white px-3 py-1 rounded-full">
                {job.type}
              </span>
              <span className="bg-teal-600/70 text-white px-3 py-1 rounded-full">
                {job.experience}
              </span>
              <span className="bg-teal-600/70 text-white px-3 py-1 rounded-full">
                {job.salaryRange}
              </span>
            </div>
          </div>

          {/* Job description */}
          <div className="px-2 sm:px-6 py-3">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4">Job Description</h2>
            <p className="text-slate-600 leading-relaxed">
              {job.describeRole}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="px-2 sm:px-6 py-3">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4">Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              {
                (job.responsibilities) &&
                job.responsibilities.map((item, i) => (
                  <li key={i}>
                    {item}
                  </li>
                ))
              }
            </ul>
          </div>

          {/* Requiremnets */}
          <div className="px-2 sm:px-6 py-3">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4">Requirements</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">

              {
                (job.requirements) &&
                job.requirements.map((item, i) => (
                  <li key={i}>
                    {item}
                  </li>
                ))
              }

            </ul>
          </div>

          {/* Good to have  */}

          <div className="px-2 sm:px-6 py-3">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4">Good to Have</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              {
                (job.goodToHave) &&
                job.goodToHave.map((item, i) => (
                  <li key={i}>
                    {item}
                  </li>
                ))
              }
            </ul>
          </div>

          {/* About Company */}
          <div className="px-2 sm:px-6 py-3">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4">About Company</h2>
            <p className="text-slate-600 leading-relaxed">
              {job.company.description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-1">
          <div
            className="sticky top-16 bg-white/30 shadow-[0_18px_40px_rgba(15,118,110,0.45)] border border-white/10 rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Ready to apply?</h3>
              <p className="text-sm text-slate-600">Submit your profile and get reviewed by the recruiter.</p>
            </div>

            {
              (appliedJob[job._id]) ?
                (<p className="block w-full text-center bg-teal-700/90 text-white font-semibold py-3 rounded-xl">
                  Applied
                </p>) :

                (<Link to={`/jobseeker/apply/${id}`}
                  className="block w-full text-center bg-teal-700/90 hover:bg-teal-700/70 text-white font-semibold py-3 rounded-xl transition">
                  Apply Now
                </Link>)
            }

            <div className="border-t border-white/10"></div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-700">Job Type</span>
                <span className="text-slate-600">
                  {job.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Work Mode</span>
                <span className="text-slate-600">
                  {job.jobMode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Location</span>
                <span className="text-slate-600">
                  {job.jobLocation}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Experience</span>
                <span className="text-slate-600">
                  {job.experience}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Salary</span>
                <span className="text-slate-600">
                  {job.salaryRange}
                </span>
              </div>
            </div>

            <div className="border-t border-black/20"></div>

            <div className="space-y-3 text-sm">
              <p className="text-slate-700">
                📅 Posted on:
                <span className="text-slate-600">
                  {job.createdAt ? job.createdAt.toDateString : 'Recently'}
                </span>
              </p>
              <p className="text-slate-700">
                ⏳ Application deadline:
                <span className="text-slate-600">
                  {job.deadline || 'Open until filled'}
                </span>
              </p>
              <p className="text-slate-700">
                🆔 Job ID:
                <span className="text-slate-600">
                  {job._id.toString().slice(-6)}
                </span>
              </p>
            </div>

            <div className="bg-white/10 border border-black/20 rounded-xl p-4 text-sm">
              <p className="text-slate-600">
                💡 <span className="font-medium text-slate-500">Recruiter Tip:</span><br />
                Make sure your resume highlights relevant experience and skills mentioned in this role.
              </p>
            </div>

            <p className="text-xs text-slate-300 text-center">
              Applications are reviewed on a rolling basis.
            </p>
          </div>
        </aside>
        </main>
        </AnimatedSection>
    </>
  )
}

export default JobDetail