import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import API from '../../api/axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'

function ApplyNow() {

  const { user, loading } = useContext(UserContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ phone: "", resume: null, coverLetter: "" })
  const [formErr, setFormErr] = useState({})
  const [jobLoad, setJobLoad] = useState(true)
  const [job, setJob] = useState({})
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const fetchJob = async () => {
      window.scrollTo(0, 0);
      try {
        const res = await API.get(`/jobseeker/apply/${id}`)
        const data = res.data.job
        console.log(data)
        setJob(data)
      } catch (err) {
        console.log(err.message)
      } finally {
        setJobLoad(false)
      }
    }
    fetchJob()
  }, [id])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "resume") {
      setFormData({
        ...formData,
        resume: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    setFormErr((prev) => ({
      ...prev,
      [`${name}Err`]: ""
    }))

    setFormErr((prev) => ({
      ...prev,
      fullErr: ""
    }))
  }

  const handleForm = async (e) => {
    e.preventDefault()
    let errors = {}

    if (!formData.phone && !formData.resume && !formData.coverLetter) {
      errors.fullErr = 'Please fill the form'
      setFormErr(errors)
      return
    }

    if (!formData.phone || formData.phone.length !== 10) errors.phoneErr = 'Enter valid phone number'
    if (!formData.resume) errors.resumeErr = 'Upload your resume here'
    if (!formData.coverLetter) errors.coverLetterErr = 'Please enter cover letter'

    if (Object.keys(errors).length > 0) {
      setFormErr(errors)
      return
    }

    setSending(true)

    try {
      const data = new FormData()
      data.append('phone', formData.phone)
      data.append('resume', formData.resume)
      data.append('coverLetter', formData.coverLetter)

      await API.post(`/jobseeker/apply/${id}`, data)
      toast.success('Application sent successfully!')
      navigate('/browseJobs')
    } catch (err) {
      console.log(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      {
        (loading || jobLoad) ? (
          <div className="mt-25">
            <Loader />
          </div>
        ) : (
          <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 px-4 sm:px-6 lg:px-10 w-full mx-auto">

            {/* JOB-INFO */}
            <div className="hidden lg:block w-full max-w-2xl lg:w-1/2 rounded-2xl lg:sticky top-28 p-4 sm:p-8">
              <h1 className="text-3xl sm:text-4xl text-slate-700 font-semibold leading-snug">
                {job.title}
              </h1>
              <p className="text-slate-600 mt-1">
                {job.company?.name} • {job.jobLocation}
              </p>
              <p className="text-slate-700 text-lg mt-7 font-medium mb-2">Job Description</p>
              <p className="text-slate-600 text-sm">
                {job.describeRole}
              </p>
              <p className="text-slate-700 mt-6 text-lg">Skills</p>
              <p className="text-slate-600 mt-1 text-sm">
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </p>
              <p className="text-slate-700 mt-6 text-lg">Experience</p>
              <p className="text-slate-600 mt-1 text-sm">
                {job.experience} of experience in {job.title}
              </p>
              <div className="mt-6">
                <Link to={`/jobDetail/${id}`}
                  className="text-xs text-white px-4 py-3 rounded-xl bg-teal-700 hover:bg-teal-500">View Details</Link>
              </div>
            </div>

            {/* APPLY FORM */}
            <div
              className="w-full max-w-2xl lg:w-1/2 bg-white/30 shadow-[0_18px_40px_rgba(15,118,110,0.45)] rounded-2xl mb-10 mt-10 lg:mt-24 p-5 sm:p-8 border border-white/10">

              <form onSubmit={handleForm} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-medium text-slate-700 mb-6 sm:mb-8">
                  Application <span className="text-teal-600">form</span>
                </h2>

                {/* FULL NAME */}
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Full Name</label>
                  <input type="text" name="name" value={user.name} disabled
                    className="w-full px-4 cursor-not-allowed py-2 rounded-xl bg-white/20 border border-black/20 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400" />
                  <p id="nameFeedback" className="text-sm text-red-500"></p>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Email</label>
                  <input type="email" name="email" value={user.email} onChange={handleChange}
                    className="w-full cursor-not-allowed px-4 py-2 rounded-xl border border-black/20 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400" />
                  <p id="emailFeedback" className="text-sm text-red-500"></p>
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Phone</label>
                  <input type="number" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number"
                    className="w-full px-4 py-2 rounded-xl border border-black/20 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400" />
                  <p id="phoneFeedback" className="text-sm text-red-500">{formErr.phoneErr}</p>
                </div>

                {/* RESUME */}
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Resume (PDF)</label>
                  <input type="file" name="resume" onChange={handleChange}
                    className="w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-700/90 file:text-white hover:file:bg-teal-700/70" />
                  <p id="resumeFeedback" className="text-sm text-red-500">{formErr.resumeErr}</p>
                </div>

                {/* COVER LETTER */}
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Cover Letter</label>
                  <textarea name="coverLetter" rows="4" value={formData.coverLetter} onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-black/20 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    placeholder="Why should we hire you?" />
                  <p id="messageFeedback" className="text-sm text-red-500">{formErr.coverLetterErr}</p>
                  <p className="text-red-500 text-sm">{formErr.fullErr}</p>
                </div>

                {/* bUTTON */}
                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full py-3 rounded-xl text-white transition font-medium 
              ${sending ? "bg-teal-400 cursor-not-allowed" : "bg-teal-700/90 hover:bg-teal-400"}`}
                >
                  {sending ? "Sending..." : "Submit Application"}
                </button>

              </form>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default ApplyNow