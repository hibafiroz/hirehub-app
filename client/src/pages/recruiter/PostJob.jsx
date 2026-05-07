import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../api/axios'
import Loader from '../../components/Loader'
import toast from "react-hot-toast";
import AnimatedSection from '../../components/AnimatedSection';

function PostJob() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    jobLocation: "",
    jobMode: "Job Mode",
    type: "Job Type",
    experience: "",
    salaryRange: "",
    skills: "",
    describeRole: "",
    requirements: "",
    responsibilities: "",
    goodToHave: ""
  })

  const [formErr, setFormErr] = useState('')
  const [publish, setPublish] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    setFormErr({
      ...formErr,
      [`${name}Err`]: "",
      fullErr: ""
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let errors = {}

    const locationPattern = /^[A-Za-z ,]{2,50}$/
    const experiencePattern = /^(\d+\s*-\s*\d+|\d+\+|\d+)\s*(years?)?$/i
    const salaryRangePattern = /^[₹0-9, a-zA-Z\-–]{5,40}$/
    const skillsPattern = /^[A-Za-z0-9, +#.-]{3,200}$/
    const goodToHavePattern = /^[\s\S]{20,1000}$/

    if (!formData.title && !formData.jobLocation && formData.jobMode === "Job Mode" && formData.type === "Job Type" && !formData.experience && !formData.salaryRange && !formData.skills && !formData.describeRole && !formData.requirements && !formData.responsibilities) {
      errors.fullErr = 'Please fill the form'
      setFormErr(errors)
      return
    }

    if (!formData.title) {
      errors.titleErr = ' Enter title'
    }

    if (!formData.jobLocation || !locationPattern.test(formData.jobLocation)) {
      errors.jobLocationErr = ' Enter the location'
    }

    if (formData.type === "Job Type") {
      errors.typeErr = ' Select job type'
    }

    if (formData.jobMode === "Job Mode") {
      errors.jobModeErr = ' Enter job mode'
    }

    if (!formData.experience || !experiencePattern.test(formData.experience)) {
      errors.experienceErr = ' Enter the experience'
    }

    if (!formData.salaryRange || !salaryRangePattern.test(formData.salaryRange)) {
      errors.salaryRangeErr = 'Enter salary range'
    }

    if (!formData.skills || !skillsPattern.test(formData.skills)) {
      errors.skillsErr = 'Enter your skills'
    }

    if (!formData.describeRole) {
      errors.describeRoleErr = ' Describe the role'
    }

    if (!formData.requirements) {
      errors.requirementsErr = 'Enter job requirements'
    }

    if (!formData.responsibilities) {
      errors.responsibilitiesErr = 'Enter job responsibilities'
    }

    if (formData.goodToHave && !goodToHavePattern.test(formData.goodToHave)) {
      errors.goodToHaveErr = 'Invalid format'
    }

    if (Object.keys(errors).length > 0) {
      setFormErr(errors)
      return
    }

    setPublish(true)

    try {
      const postData = await API.post('/recruiter/postJob', formData)
      const data = postData.data.message
      console.log(data)
      toast.success("Job posted successfully!");
      navigate('/recruiter/jobList')
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setPublish(false)
    }
  }

  return (
    <div>
      <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/background3.png')" }}></div>
      <div className="fixed inset-0 bg-white/70 -z-10"></div>

      <main className="space-y-6">

        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 font-semibold text-black">
            Post a <span className="text-teal-700">New Job</span>
          </h1>
        </div>

        <AnimatedSection>
          {/* FORM */}
          <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto rounded-2xl
         shadow-[0_18px_40px_rgba(15,118,110,0.45)]
         space-y-3 p-4 sm:p-6 lg:p-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <input type="text" placeholder="Job Title" name="title" value={formData.title} onChange={handleChange}
                  className="w-full rounded-xl bg-white/70 border shadow-[0_5px_30px_rgba(15,118,110,0.45)] border-black/10 px-3 py-3 text-slate-900 outline-none focus:border-teal-400" />
                <p className="text-red-500 mt-1 text-sm">{formErr.titleErr}</p>
              </div>

              <div>
                <input type="text" placeholder="Location" name="jobLocation" value={formData.jobLocation} onChange={handleChange}
                  className="w-full rounded-xl bg-white/70 border shadow-[0_5px_30px_rgba(15,118,110,0.45)] border-black/10 px-3 py-3 text-slate-900 outline-none focus:border-teal-400" />
                <p className="text-red-500 mt-1 text-sm">{formErr.jobLocationErr}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <select name="jobMode" value={formData.jobMode} onChange={handleChange}
                  className="w-full rounded-xl bg-white/60 border shadow-[0_5px_30px_rgba(15,118,110,0.45)] border-black/10 px-3 py-3 text-slate-900 outline-none focus:border-teal-400">
                  <option>Job Mode</option>
                  <option>Remote</option>
                  <option>Onsite</option>
                  <option>Hybrid</option>

                </select>
                <p className="text-red-500 mt-1 text-sm">{formErr.jobModeErr}</p>
              </div>

              <div>
                <select name="type" value={formData.type} onChange={handleChange}
                  className="w-full rounded-xl bg-white/60 border shadow-[0_5px_30px_rgba(15,118,110,0.45)] border-black/10 px-3 py-3 text-slate-900 outline-none focus:border-teal-400">
                  <option>Job Type</option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Internship</option>
                </select>
                <p className="text-red-500 text-sm mt-1">{formErr.typeErr}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <input type="text" value={formData.experience} onChange={handleChange} placeholder="Experience" name="experience"
                  className="w-full rounded-xl bg-white border shadow-[0_5px_30px_rgba(15,118,110,0.45)] border-black/10 px-3 py-3 text-slate-900 outline-none focus:border-teal-400" />
                <p className="text-red-500 text-sm mt-1">{formErr.experienceErr}</p>
              </div>

              <div>
                <input type="text" value={formData.salaryRange} onChange={handleChange} placeholder="Salary Range" name="salaryRange"
                  className="w-full rounded-xl bg-white border shadow-[0_5px_30px_rgba(15,118,110,0.45)] border-black/10 px-3 py-3 text-slate-900 outline-none focus:border-teal-400" />
                <p className="text-red-500 text-sm">{formErr.salaryRangeErr}</p>
              </div>
            </div>

            <div>
              <input type="text" value={formData.skills} onChange={handleChange} placeholder="Required Skills (comma separated)" name="skills"
                className="w-full rounded-xl bg-white border shadow-[0_10px_40px_rgba(15,118,110,0.45)] border-black/10 px-3 py-3 text-slate-900 outline-none focus:border-teal-400" />
              <p className="text-red-500 text-sm mt-1">{formErr.skillsErr}</p>
            </div>

            <div>
              <textarea rows="4" name="describeRole" value={formData.describeRole} onChange={handleChange}
                placeholder="Briefly describe the job role and its purpose"
                className="w-full rounded-xl bg-white border shadow-[0_20px_50px_rgba(15,118,110,0.45)] border-black/10 px-3 py-3 text-slate-900 outline-none focus:border-teal-400"></textarea>
              <p className="text-red-500 text-sm mt-1">{formErr.describeRoleErr}</p>
            </div>

            <div>
              <textarea rows="4" value={formData.responsibilities} onChange={handleChange} name="responsibilities"
                placeholder="List the key responsibilities (comma separated)"
                className="w-full rounded-xl bg-white border shadow-[0_10px_40px_rgba(15,118,110,0.45)] border-black/10 px-3 py-3 text-slate-900 outline-none focus:border-teal-400"></textarea>
              <p className="text-red-500 text-sm mt-1">{formErr.responsibilitiesErr}</p>
            </div>

            <div>
              <textarea rows="4" value={formData.requirements} onChange={handleChange} name="requirements"
                placeholder="Requirements & qualifications (comma separated)"
                className="w-full rounded-xl bg-white border shadow-[0_5px_30px_rgba(15,118,110,0.45)] border-black/10 px-3 py-3 text-slate-900 outline-none focus:border-teal-400"></textarea>
              <p className="text-red-500 text-sm mt-1">{formErr.requirementsErr}</p>
            </div>

            <div>
              <textarea rows="3" value={formData.goodToHave} onChange={handleChange} name="goodToHave" placeholder="Good to have skills (optional)"
                className="w-full rounded-xl bg-white border shadow-[0_10px_50px_rgba(15,118,110,0.45)] border-black/10 px-3 py-3 text-slate-900 outline-none focus:border-teal-400"></textarea>
              <p className="text-red-500 text-sm mt-1">{formErr.goodToHaveErr}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-red-500">{formErr.fullErr}</p>
              <div className="flex flex-col sm:flex-row ml-auto gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
                <Link to="/recruiter/dashboard"
                  className="w-full sm:w-auto text-center px-6 py-2.5 rounded-xl border border-black/30 text-slate-700 hover:bg-black/10">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={publish}
                  className={`px-6 py-2.5 rounded-xl text-white transition
                ${publish ? "bg-gray-400 cursor-not-allowed" : "bg-teal-700 hover:bg-teal-500"}`}
                >
                  {publish ? "Publishing..." : "Publish Job"}
                </button>
              </div>
            </div>
          </form>
        </AnimatedSection>

      </main>

    </div>
  )
}

export default PostJob