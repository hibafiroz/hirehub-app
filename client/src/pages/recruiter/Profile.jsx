import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api/axios'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'
import AnimatedSection from '../../components/AnimatedSection'

function Profile() {

    const [user, setUser] = useState([])
    const [company, setCompany] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchProfile = async () => {
            try {
                const res = await API.get('/recruiter/profile');
                setUser(res.data.user);
                console.log(res.data.company);
                setCompany(res.data.company);
            } catch (err) {
                toast.error(err.response?.data?.message || "Something went wrong ❌");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/background3.png')" }}></div>
            <div className="fixed inset-0 bg-white/70 -z-10"></div>

            <AnimatedSection>
                <main className="space-y-6 sm:space-y-8">

                    {
                        loading ? <div className="flex justify-center items-center h-screen">
                            <Loader />
                        </div> :
                            (<>

                                {/* PROFILE HEADER */}

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
                                               bg-white/80 rounded-2xl p-4 sm:p-6 shadow">
                                    <div>
                                        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
                                            {user.name}
                                        </h1>
                                        <p className="text-xs sm:text-sm text-slate-600">
                                            {user.email}  •  {user.company.name}
                                        </p>
                                        <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-teal-600/70 text-white">
                                            {user.role}
                                        </span>
                                    </div>

                                    <Link to="/recruiter/editProfile" className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl
                                       bg-teal-600 text-white font-medium hover:bg-teal-700 transition">
                                        Edit Profile
                                    </Link>
                                </div>

                                {/* COMPANY CARD */}
                                <div
                                    className="bg-white/30 shadow-[0_5px_50px_rgba(15,118,110,0.45)] border border-black/10 rounded-2xl p-4 sm:p-6 shadow space-y-4 sm:space-y-6">

                                    {/* COMPANY HEADER */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <img src={`http://localhost:5000/uploads/logo/${company.logo}`} className="w-20 h-20 sm:w-28 sm:h-28 object-contain rounded-xl shadow" alt="Company Logo" />

                                        <div>
                                            <h2 className="text-xl font-semibold text-slate-900">
                                                {company.name}
                                            </h2>
                                            <p className="text-sm text-slate-600">
                                                {company.industry}
                                            </p>
                                            <p className="text-sm text-teal-700 font-medium">
                                                {company.location}
                                            </p>
                                        </div>
                                    </div>

                                    {/* COMPANY BODY */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

                                        {/* ABOUT */}
                                        <div className="lg:col-span-2">
                                            <h3 className="text-slate-800 font-semibold mb-2">About Company</h3>
                                            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                                                {company.description}
                                            </p>
                                        </div>

                                        {/* DETAILS */}
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs text-slate-600">Website</p>
                                                <a href=" company.website " target="_blank"
                                                    className="text-teal-700 text-sm font-medium hover:underline">
                                                    {company.website}
                                                </a>
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-600">Email</p>
                                                <p className="text-teal-700 text-sm font-medium">
                                                    {company.email}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-600">Location</p>
                                                <p className="text-teal-700 text-sm font-medium">
                                                    {company.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>)
                    }
                </main>
            </AnimatedSection>

        </div>
    )
}

export default Profile