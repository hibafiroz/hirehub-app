import React, { useEffect, useState } from 'react'
import API from '../../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
import { ArrowLeftToLine } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection';

function JobDetail() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [openModal, setOpenModal] = useState(null)

  useEffect(() => {
    const fetchJob = async () => {
      const res = await API.get(`/recruiter/jobDetail/${id}`)
      const data = res.data.job
      console.log(data)
      setJob(data)
    }
    fetchJob()
  }, [id])

  const handleDlt = async (e) => {
    e.preventDefault()
    try {
      const jobDlt = await API.delete(`/recruiter/deleteJob/${id}`)
      toast.success('Job deleted successfully')
      navigate('/recruiter/jobList')
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setOpenModal(false)
    }
  }

  return (

    job ?
      <div>
        <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/background3.png')" }}></div>
        <div className="fixed inset-0 bg-white/70 -z-10"></div>

        <AnimatedSection>
          <main className="flex-1 sm:px-6 lg:mt-1">

            <div className="bg-white/5 border flex flex-col lg:flex-row gap-4 justify-between border-black/20 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-10">
              <div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                  <Link to={`/recruiter/jobList`} className="flex items-center gap-2 text-slate-700 hover:text-teal-600 font-medium"><ArrowLeftToLine strokeWidth={3} size={22} /></Link>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-700">
                    {job.title}
                  </h1>
                </div>

                <p className="text-slate-600 text-sm sm:text-base sm:ml-10">
                  {job.jobLocation}  •  {job.jobMode}  •  {job.type}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div>
                  <Link to={`/recruiter/editJob/${id}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 rounded-lg bg-teal-600/70 text-white hover:bg-teal-600/40">Edit</Link>
                </div>
                <div>

                  <button onClick={() => setOpenModal(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-red-600/50 text-white hover:bg-red-500/30">
                    Delete
                  </button>

                </div>
              </div>
            </div>


            <section className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-medium text-slate-700 mb-3">Description</h2>
              <p className="text-slate-600 leading-relaxed">
                {job.describeRole}
              </p>
            </section>

            {/* SKILLS */}
            <section className="p-6">
              <h2 className="text-xl font-medium text-slate-600 mb-3">Skills</h2>

              <div className="flex flex-wrap gap-3">
                {job.skills?.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>


            <section className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Experience */}
                <div className="bg-white/60 border border-black/10 rounded-xl p-4 shadow-xl hover:shadow-md transition">
                  <p className="text-sm text-slate-500 mb-1">Experience</p>
                  <h3 className="text-lg font-semibold text-slate-700">
                    {job.experience}
                  </h3>
                </div>

                {/* Salary */}
                <div className="bg-white/60 border border-black/10 rounded-xl p-4 shadow-xl hover:shadow-md transition">
                  <p className="text-sm text-slate-500 mb-1">Salary</p>
                  <h3 className="text-lg font-semibold text-slate-700">
                    {job.salaryRange}
                  </h3>
                </div>

              </div>
            </section>


            <section className="p-6">
              <h2 className="text-xl font-medium text-slate-700 mb-3">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                {job.responsibilities.map((item, index) => {
                  return (
                    <li key={index}>
                      {item}
                    </li>
                  )
                })
                }
              </ul>
            </section>


            <section className="p-6">
              <h2 className="text-xl font-medium text-slate-700 mb-3">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                {job.requirements.map((item, index) => {
                  return (
                    <li key={index}>
                      {item}
                    </li>
                  )
                })
                }
              </ul>
            </section>



            <section className="mb-8 p-6">
              <h2 className="text-xl font-medium text-slate-700 mb-3">Good to Have</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                {job.goodToHave.map((item, index) => {
                  return (
                    <li key={index}>
                      {item}
                    </li>
                  )
                })
                }
              </ul>
            </section>
          </main>
        </AnimatedSection>

        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            {/* Modal Box */}
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-lg">

              <h2 className="text-lg font-semibold text-slate-800 mb-2">
                Confirm Delete
              </h2>

              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to delete this Job?
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
                  onClick={handleDlt}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        )}

      </div> :
      <Loader />

  )

}

export default JobDetail