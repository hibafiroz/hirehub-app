import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../api/axios'
import { UserContext } from '../../context/UserContext'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'
import { ArrowLeftToLine } from 'lucide-react'

function EditProfile() {

  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    companyname: "", companyemail: "", website: "", description: "", username: "", useremail: ""
  })

  useEffect(() => {
    const companyDetails = async () => {
      try {
        const res = await API.get('/recruiter/editProfile')
        const data = res.data.companyDetails
        console.log(data)
        setFormData({
          companyname: data.name,
          companyemail: data.email,
          website: data.website,
          description: data.description,
          username: user?.name,
          useremail: user?.email
        })
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    }
    companyDetails()
  }, [])

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
      const profilePost = await API.put('/recruiter/editProfile', formData)
      console.log(profilePost.data.message)
      navigate('/recruiter/profile')
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  if (loading) return <Loader />
  return (
    <div>
      
      {/* BackgroundImage */}
      <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/background3.png')" }}></div>
      <div className="fixed inset-0 bg-white/70 -z-10"></div>

      <main className="flex-1 w-full max-w-5xl mx-auto pb-12 sm:pb-16 px-4 sm:px-6">

        {/* Title */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
          <Link to={`/recruiter/profile`}  className="flex items-center gap-2 text-slate-700 hover:text-teal-600 font-medium"><ArrowLeftToLine strokeWidth={3} size={22} /></Link>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-600">Edit <span
              className="text-teal-600">Profile</span> </h2>
          </div>
          <p className="text-slate-600 sm:ml-8 mt-1 text-xs sm:text-sm">
            Manage your company and personal information
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleForm}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">

          {/* COMPANY */}
          <div
            className="bg-white/10 shadow-[0_18px_40px_rgba(15,118,110,0.45)] border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-600">Company Details</h3>

            <div>
              <label className="text-xs sm:text-sm text-slate-400">Name</label>
              <input name="companyname" value={formData.companyname} onChange={handleChange} placeholder="Full Name"
                className="w-full rounded-xl bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-600 border border-black/20" />
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-400">Email</label>
              <input name="companyemail" value={formData.companyemail} onChange={handleChange} placeholder="Email"
                className="w-full rounded-xl bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-600 border border-black/20" />
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-400">Website</label>
              <input name="website" value={formData.website} onChange={handleChange}
                className="w-full rounded-xl bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-600 border border-black/20" />
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-400">Description</label>
              <textarea name="description" rows="4" value={formData.description} onChange={handleChange}
                className="w-full rounded-xl bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-600 border border-black/20">{formData.description} </textarea>
            </div>
          </div>

          {/* RECRUITER */}
          <div
            className="bg-white/10 border border-white/10 shadow-[0_18px_40px_rgba(15,118,110,0.45)] rounded-2xl p-8 space-y-5">
            <h3 className="text-xl font-semibold text-slate-600">Recruiter Details</h3>

            <div>
              <label className="text-xs sm:text-sm text-slate-400">Name</label>
              <input name="username" value={formData.username} onChange={handleChange}
                className="w-full rounded-xl bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-600 border border-black/20" />
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-400">Email</label>
              <input name="useremail" value={formData.useremail} onChange={handleChange}
                className="w-full rounded-xl bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-slate-600 border border-black/20" />
            </div>

            <div>
              <label className="text-xs sm:text-sm cursor-not-allowed text-slate-400">Role</label>
              <input name="userrole" disabled value={user.role} onChange={handleChange}
                className="w-full rounded-xl cursor-not-allowed bg-white/10 px-4 py-3 text-slate-600 border border-black/20" />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="lg:col-span-2 flex justify-end gap-4 mt-2">
            <Link to="/recruiter/profile"
              className="w-full sm:w-auto text-center px-6 py-2.5 rounded-xl border border-black/20 text-black hover:bg-white/10">Cancel
            </Link>
            <button type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 rounded-xl bg-teal-600/70 text-white font-medium hover:bg-teal-600/50 transition">Save
              Changes
            </button>
          </div>
        </form>

      </main>
    </div>
  )
}

export default EditProfile