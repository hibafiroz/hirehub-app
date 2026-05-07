import React, { useEffect, useState } from 'react'
import API from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import AnimatedSection from '../../components/AnimatedSection'

function Company() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '', location: '', industry: '', size: '', website: '', email: '', description: '', logo: ''
  })

  const [formErr, setFormErr] = useState({
    nameErr: '', locationErr: '', industryErr: '', sizeErr: '', websiteErr: '', emailErr: '', descriptionErr: '', logoErr: '', fullErr: ''
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "logo") {
      setFormData({
        ...formData,
        logo: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  }

  const handleForm = async (e) => {
    e.preventDefault()
    let errors = {}

    if (!formData.name && !formData.location && !formData.industry && !formData.size && !formData.website && !formData.email && !formData.description && !formData.logo) {
      errors.fullErr = 'Please fill the form'
      setFormErr(errors)
      return
    }

    if (!formData.name) {
      errors.nameErr = 'Enter your company name'
    }

    if (!formData.location) {
      errors.locationErr = 'Enter company location'
    }

    if (!formData.industry) {
      errors.industryErr = 'Enter your industry'
    }

    if (!formData.size) {
      errors.sizeErr = 'Enter company size'
    }

    if (!formData.website) {
      errors.websiteErr = 'Enter company website'
    }

    if (!formData.email) {
      errors.emailErr = 'Enter company email'
    }

    if (!formData.description) {
      errors.descriptionErr = 'Enter company description'
    }

    if (!formData.logo) {
      errors.logoErr = 'Please upload company logo'
    }

    if (Object.keys(errors).length > 0) {
      setFormErr(errors)
      return
    }

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("location", formData.location);
      data.append("industry", formData.industry);
      data.append("size", formData.size);
      data.append("website", formData.website);
      data.append("email", formData.email);
      data.append("description", formData.description);

      data.append("logo", formData.logo); // CRITICAL

      const res = await API.post('/recruiter/company', data);

      console.log(res.data.message);
      navigate('/recruiter/home');

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    }
  }

  return (
    <div>

      <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/background3.png')" }}></div>
      <div className="fixed inset-0 bg-white/70 -z-10"></div>

      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
                 mt-24 sm:mt-28 lg:mt-26
                 pb-12 sm:pb-16">
        {/* HEADING */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-600 font-semibold">
            Company <span className="text-teal-600">Details</span>
          </h1>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm">
            Add essential company information so candidates can discover and trust your brand.
          </p>
        </div>

        {/* FORM */}
        <AnimatedSection>
          <form
            onSubmit={handleForm}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 shadow-[0_18px_40px_rgba(15,118,110,0.45)]
              bg-white/10 border border-black/20 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm"
            >
            {/*enctype="multipart/form-data axios automatically handles this*/}

            {/* COMPANY NAME */}
            <div>
              <label className="block text-sm text-slate-700 mb-1">Company Name</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Company name" className="w-full rounded-xl bg-white/10 border border-black/20
                      px-4 py-2 text-black outline-none
                      focus:ring focus:ring-teal-400"/>
              <p className="text-red-500 text-sm">{formErr.nameErr}</p>
            </div>

            {/* LOACTION */}
            <div>
              <label className="block text-sm text-slate-700 mb-1">Location</label>
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Bangalore, India" className="w-full rounded-xl bg-white/10 border border-black/20
                  px-4 py-2 text-black outline-none focus:ring focus:ring-teal-400"/>
              <p className="text-red-500 text-sm">{formErr.locationErr}</p>
            </div>

            {/* INDUSTRY */}
            <div>
              <label className="block text-sm text-slate-700 mb-1">Industry</label>
              <input name="industry" value={formData.industry} onChange={handleChange} placeholder="IT, Finance, Healthcare" className="w-full rounded-xl bg-white/10 border border-black/20
                      px-4 py-2 text-black outline-none
                      focus:ring focus:ring-teal-400"/>
              <p className="text-red-500 text-sm">{formErr.industryErr}</p>
            </div>

            {/* COMPANY SIZE */}
            <div>
              <label className="block text-sm text-slate-700 mb-1">Company Size</label>
              <select name="size" value={formData.size} onChange={handleChange} className="w-full rounded-xl bg-white/10 border border-black/20
                       px-4 py-2 text-black outline-none
                       focus:ring focus:ring-teal-400">
                <option value="">Select size</option>
                <option>1–10</option>
                <option>11–50</option>
                <option>51–200</option>
                <option>200+</option>
              </select>
              <p className="text-red-500 text-sm">{formErr.sizeErr}</p>
            </div>

            {/* WEBSITE */}
            <div>
              <label className="block text-sm text-slate-700 mb-1">Website</label>
              <input name="website" value={formData.website} onChange={handleChange} placeholder="https://company.com" className="w-full rounded-xl bg-white/10 border border-black/20
                      px-4 py-2 text-black outline-none
                      focus:ring focus:ring-teal-400"/>
              <p className="text-red-500 text-sm">{formErr.websiteErr}</p>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-slate-700 mb-1">Contact Email</label>
              <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="hr@company.com" className="w-full rounded-xl bg-white/10 border border-black/20
                      px-4 py-2 text-black outline-none
                      focus:ring focus:ring-teal-400"/>
              <p className="text-red-500 text-sm">{formErr.emailErr}</p>
            </div>

            {/* DEXCRIPTION */}
            <div className="sm:col-span-2">
              <label className="block text-sm text-slate-700 mb-1">About Company</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Brief description about your company"
                className="w-full rounded-xl bg-white/10 border border-black/20
                         px-4 py-2 text-black outline-none
                         focus:ring focus:ring-teal-400"></textarea>
              <p className="text-red-500 text-sm">{formErr.descriptionErr}</p>
            </div>

            {/* LOGO */}
            <div>
              <label className="block text-sm text-slate-700 mb-1">Company Logo</label>
              <input type="file" name="logo" onChange={handleChange}
                className="w-full text-sm text-slate-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-teal-600 file:text-white
              hover:file:bg-teal-500 cursor-pointer"
              />
              <p className="text-red-500 mt-1 text-sm">{formErr.logoErr}</p>
            </div>

            <div className="sm:col-span-2 flex justify-stretch sm:justify-end">
              <button type="submit" className="w-full sm:w-auto px-8 py-3 rounded-xl
                       bg-teal-600 hover:bg-teal-500
                       text-white transition">
                Save Company
              </button>
            </div>

            <p className="text-red-500 text-sm">{formErr.fullErr}</p>
          </form>
        </AnimatedSection>

      </main>
    </div>
  )
}

export default Company