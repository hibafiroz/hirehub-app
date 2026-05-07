import React, { useEffect, useState } from 'react'
import API from '../../api/axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeftToLine, CornerUpLeft, Undo } from "lucide-react";
import AnimatedSection from '../../components/AnimatedSection';

function EditJob() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "", jobLocation: "", jobMode: "", type: "", experience: "", salaryRange: "", skills: "", describeRole: "", responsibilities: "", requirements: "", goodToHave: ""
  })

  useEffect(() => {
    const fetchJob = async () => {
      const res = await API.get(`/recruiter/jobDetail/${id}`);
      const data = res.data.job;

      setFormData({
        title: data.title || "",
        jobLocation: data.jobLocation || "",
        jobMode: data.jobMode || "",
        type: data.type || "",
        experience: data.experience || "",
        salaryRange: data.salaryRange || "",

        // Convert arrays → string
        skills: data.skills ? data.skills.join(", ") : "",
        describeRole: data.describeRole || "",
        responsibilities: data.responsibilities
          ? data.responsibilities.join("\n")
          : "",
        requirements: data.requirements
          ? data.requirements.join("\n")
          : "",
        goodToHave: data.goodToHave
          ? data.goodToHave.join("\n")
          : "",
      });
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleForm = async (e) => {
    e.preventDefault()

    try {
      const jobPost = await API.post(`/recruiter/editJob/${id}`, formData)
      console.log(jobPost.data.message)
      navigate(`/recruiter/jobDetail/${id}`)
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }

  }

  return (
    <div>

      {/* BackgroundImage */}
      <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/background3.png')" }}></div>
      <div className="fixed inset-0 bg-white/70 -z-10"></div>

      <main className="w-full max-w-4xl lg:mt-6 sm:mt-12 pb-12 sm:pb-16 px-4 sm:px-6">

        {/* Title */}
        <div>
          <div className="flex flex-wrap gap-3 items-center mb-2">
            <Link to={`/recruiter/jobDetail/${id}`} className="flex items-center gap-2 text-slate-700 hover:text-teal-600 font-medium"><ArrowLeftToLine strokeWidth={3} size={22} /></Link>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800">Edit <span
              className="text-teal-500">Job</span> </h1>
          </div>
          <p className="text-slate-800 sm:ml-8 mb-6 sm:mb-8 text-xs sm:text-sm max-w-xl">
            Update the job details carefully to ensure candidates receive accurate and up-to-date information.
            Clear and precise descriptions help attract the right talent.
          </p>
        </div>

        {/* FORM */}
        <AnimatedSection>
          <form onSubmit={handleForm}
            className="sm:ml-6 shadow-[0_18px_40px_rgba(15,118,110,0.45)] space-y-6 bg-white/20 border border-black/10 rounded-2xl p-4 sm:p-8">

            <div className="grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="text-xs sm:text-sm text-slate-500">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border border-black/20 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-800 outline-none focus:border-teal-500"
                  placeholder="Job Title" />
              </div>

              <div>
                <label className="text-xs sm:text-sm text-slate-500">Location</label>
                <input type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border border-black/20 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-800 outline-none focus:border-teal-400"
                  placeholder="Location" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs sm:text-sm text-slate-500">Job Mode</label>
                <select name="jobMode" value={formData.jobMode} onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border border-black/20 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-800 outline-none">
                  <option value="Remote" >Remote</option>
                  <option value="Onsite" >Onsite</option>
                  <option value="Hybrid" >Hybrid</option>
                </select>
              </div>

              <div>
                <label className="text-xs sm:text-sm text-slate-500">Job Type</label>
                <select name="type" value={formData.type} onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border border-black/20 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-800 outline-none">
                  <option value="Full Time" >Full Time</option>
                  <option value="Part Time" >Part Time</option>
                  <option value="Internship" >Internship</option>
                </select >
              </div >
            </div >


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs sm:text-sm text-slate-500">Experience</label>
                <input type="text" name="experience" value={formData.experience} onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border border-black/20 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-800 outline-none"
                  placeholder="Experience" />
              </div>

              <div>
                <label className="text-xs sm:text-sm text-slate-500">Salary</label>
                <input type="text" name="salaryRange" value={formData.salaryRange} onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border border-black/20 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-800 outline-none"
                  placeholder="Salary Range" />
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-500">Skills</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange}
                className="w-full rounded-xl bg-white/5 border border-black/20 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-800 outline-none"
                placeholder="Skills (comma separated)" />
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-500">Description</label>
              <textarea rows="4" name="describeRole" value={formData.describeRole} onChange={handleChange}
                className="w-full rounded-xl bg-white/5 border border-black/20 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-800 outline-none"
                placeholder="Describe Role">{formData.describeRole}</textarea>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-500">Responsibilities</label>
              <textarea rows="4" name="responsibilities" value={formData.responsibilities} onChange={handleChange}
                className="w-full rounded-xl bg-white/5 border border-black/20 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-800 outline-none"
                placeholder="Responsibilities (one per line)">{formData.responsibilities} </textarea>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-500">Requirements</label>
              <textarea rows="4" name="requirements" value={formData.requirements} onChange={handleChange}
                className="w-full rounded-xl bg-white/5 border border-black/20 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-800 outline-none"
                placeholder="Requirements"> {formData.requirements}</textarea>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-500">Good to have</label>
              <textarea rows="3" name="goodToHave" value={formData.goodToHave} onChange={handleChange}
                className="w-full rounded-xl bg-white/5 border border-black/20 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-800 outline-none"
                placeholder="Good to have"> {formData.goodToHave} </textarea>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4">
              <Link to={`/recruiter/jobDetail/${id}`}
                className="w-full sm:w-auto text-center px-6 py-2.5 rounded-xl border border-black/20 text-slate-800 hover:bg-black/10">
                Cancel
              </Link>

              <button type="submit"
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 rounded-xl bg-teal-600/80 text-white font-medium hover:bg-teal-600/50 transition">Update
                Job
              </button>
            </div>

          </form >
        </AnimatedSection>

      </main >
    </div >
  )
}

export default EditJob