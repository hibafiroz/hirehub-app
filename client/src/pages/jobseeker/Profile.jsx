import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import API from '../../api/axios'
import { Link } from 'react-router-dom';

function Profile() {

  const { user, setUser } = useContext(UserContext)

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name,
    phone: user?.phone || '',
    location: user?.location || '',
    experience: user.experience || '',
    skills: user?.skills || ''
  })

  const [formErr, setFormErr] = useState({
    phoneErr: '',
    locationErr: '',
    experienceErr: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        location: user.location || '',
        experience: user.experience || '',
        skills: user.skills || []
      })
    }
  }, [user])

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get('/jobseeker/profile')
      setUser(res.data.user)
    }
    fetchProfile()
  }, [])


  const handleChange = (e) => {
    const {name, value}=e.target
    if (name === "skills") {
      setFormData({
        ...formData,
        skills: value.split(',').map(skill => skill.trim())
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let errors={}

    if (formData.phone&&formData.phone.length !== 10) {
      errors.phoneErr='Invalid phone number'
    }

    if (formData.location&&formData.location.length <5 ) {
      errors.locationErr='Location must be atleast 5 characters'
    }

    if (Object.keys(errors).length > 0) {
      setFormErr(errors)
      return
    }

    try {
      const res = await API.put('/jobseeker/editProfile', {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        experience: formData.experience,
        skills: formData.skills
      })
      const updated = await API.get('/jobseeker/profile')
    setUser(updated.data.user)

    setOpen(false)

  } catch (err) {
    console.log(err.response?.data?.message || err.message);
  }
  }

  return (
    <div>
      <div className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/assets/images/background3.png')" }}></div>
      <div className="absolute inset-0 bg-white/60 -z-10"></div>

      <main className="max-w-3xl lg:max-w-5xl mx-auto px-4 sm:px-6 mt-20">

        {/*HEADER*/}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-slate-700">
              My <span className="text-teal-800">Profile</span>
            </h2>
            <p className="text-slate-600 mt-1">Manage your personal information</p>
          </div>

          {/*ACTIONS*/}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end mt-2 sm:mt-12">
            <button onClick={() => setOpen(true)}
              className="px-6 py-2 rounded-xl bg-teal-700/80 text-white hover:bg-teal-700/70">
              Edit Profile
            </button>

            <Link to="/application"
              className="px-6 py-2 rounded-xl bg-white text-center border border-black/20 text-slate-800 hover:bg-teal-700/70 hover:text-white">
              My Applications
            </Link>
          </div>

        </div>

        {/*PROFILE CARDS*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

          {/*BASIC INFO */}
          <div className="bg-white/50 shadow-[0_7px_40px_rgba(15,118,110,0.45)]
                  border border-black/20 rounded-2xl p-8 space-y-4">

            <h3 className="text-xl font-semibold text-slate-700">Basic Details</h3>

            <div>
              <label className="text-slate-500 text-sm">Name</label>
              <p className="text-slate-700 font-medium">
                {user?.name}
              </p>
            </div>

            <div>
              <label className="text-slate-500 text-sm">Email</label>
              <p className="text-slate-700 font-medium cursor-not-allowed" readOnly>
                {user?.email}
              </p>
            </div>

            <div>
              <label className="text-slate-500 text-sm">Phone</label>
              <p className="text-slate-700 font-medium">
                {user?.phone || "Not Added"}
              </p>
            </div>

            <div>
              <label className="text-slate-500 text-sm">Location</label>
              <p className="text-slate-700 font-medium">
                {user?.location || "Not Added"}
              </p>
            </div>
          </div>

          {/*PROFESSIONAL INFO*/}
          <div className="bg-white/50 shadow-[0_7px_40px_rgba(15,118,110,0.45)]
                  border border-black/20 rounded-2xl p-8 space-y-4">

            <h3 className="text-xl font-semibold text-slate-700">Professional Details</h3>

            <div>
              <label className="text-slate-500 text-sm">Skills</label>
              <p className="text-slate-700 font-medium">
                {user?.skills?.length ? (user.skills.join(', ')) : ("Not added")}
              </p>
            </div>

            <div>
              <label className="text-slate-500 text-sm">Experience</label>
              <p className="text-slate-700 font-medium">
                {user?.experience || "Not added"}
              </p>
            </div>

            <div>
              <label className="text-slate-500 text-sm">Role</label>
              <p className="text-slate-700 font-medium">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/*MODAL*/}

      {open &&
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative w-full max-w-lg sm:max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-teal-700">Edit Profile</h3>
              <button onClick={() => setOpen(false)}
                className="text-xl text-gray-500 hover:text-gray-700">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <input name="name" value={formData.name} onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 border border-gray-400" />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input name="email" value={user.email} readOnly
                    className="w-full cursor-not-allowed rounded-xl px-4 py-3 border border-gray-400" />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <input name="phone" value={formData.phone} placeholder="Enter Phone number" onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 border border-gray-400" />
                  <p className='mt-1 text-red-500 text-sm'>{formErr.phoneErr}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">Experience</label>
                  <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Enter work experience"
                    className="w-full rounded-xl px-4 py-3 border border-gray-400" />
                  <p className='mt-1 text-red-500 text-sm'>{formErr.experienceErr}</p>
                </div>
              </div>

              <div>
                  <label className="text-sm text-gray-600">Location</label>
                  <input name="location" value={formData.location} onChange={handleChange} placeholder="Enter Location"
                    className="w-full rounded-xl px-4 py-3 border border-gray-400" />
                  <p className='mt-1 text-red-500 text-sm'>{formErr.locationErr}</p>
                </div>

              <div className='mt-5'>
                <label className="text-sm text-gray-600">Skills (comma separated)</label>
                <input name="skills" placeholder="Mention your skills"
                  value={formData.skills ? formData.skills.join(', ') : ''} onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3 border border-gray-400" />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={()=>setOpen(false)}
                  className="px-5 py-2 rounded-xl bg-gray-200 border border-black/20 hover:bg-gray-300">
                  Cancel
                </button>

                <button type="submit" className="px-6 py-2 rounded-xl bg-teal-600 text-white hover:bg-teal-500">
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default Profile