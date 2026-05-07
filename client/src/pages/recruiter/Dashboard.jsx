import React, { useEffect, useState } from 'react'
import API from '../../api/axios'
import DashboardCharts from '../../components/DashboardCharts'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'
import AnimatedSection from '../../components/AnimatedSection'

function Dashboard() {
    const [applications, setApplications] = useState([])
    const [stats, setStats] = useState([])
    const [applicationsPerWeek, setApplicationsPerWeek] = useState([])
    const [jobsPerWeek, setJobsPerWeek] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get('/recruiter/dashboard')
                const recentApp = res.data.recentApplications
                const stats = res.data.stats
                const perWeek = res.data.applicationsPerWeek
                const jobsPerWeek = res.data.jobsPerWeek
                setApplications(recentApp)
                setStats(stats)
                setApplicationsPerWeek(perWeek)
                setJobsPerWeek(jobsPerWeek)
            } catch (err) {
                toast.error(err.response?.data?.message || "Something went wrong ❌");
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
    <div className="min-h-screen flex justify-center lg:block px-3 sm:px-5 lg:px-0">

        <div className="w-full max-w-md sm:max-w-2xl lg:max-w-none space-y-4 lg:space-y-2">

            <div
                className="fixed inset-0 bg-cover bg-center -z-10"
                style={{ backgroundImage: "url('/ui/background3.png')" }}
            ></div>

            <div className="fixed inset-0 bg-white/70 -z-10"></div>

            {/* TITLE */}
            <div className="text-center lg:text-left">
                <h1 className="text-2xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 font-semibold text-slate-700">
                    Dashboard <span className="text-teal-600">Overview</span>
                </h1>
            </div>

            {
                loading ? (
                    <div className="flex justify-center items-center min-h-[80vh]">
                        <Loader />
                    </div>
                ) : (
                    <AnimatedSection>
                        <>

                            {/* STATS CARDS */}
                            <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-2">
                                <div className="bg-white/30 border border-white/10 shadow-[0_12px_40px_rgba(15,118,110,0.45)] rounded-2xl p-4">
                                    <p className="text-sm text-slate-600">Total Jobs</p>
                                    <h2 className="text-xl sm:text-xl text-slate-600 font-semibold mt-2">
                                        {stats.totalJobs}
                                    </h2>
                                </div>

                                <div className="bg-white/30 border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(15,118,110,0.45)] p-4">
                                    <p className="text-sm text-slate-600">Applications</p>
                                    <h2 className="text-xl sm:text-2xl text-slate-600 font-semibold mt-2">
                                        {stats.totalApplications}
                                    </h2>
                                </div>

                                <div className="bg-white/30 border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(15,118,110,0.45)] p-4">
                                    <p className="text-sm text-slate-600">Pending</p>
                                    <h2 className="text-xl sm:text-2xl text-slate-600 font-semibold mt-2">
                                        {stats.pending}
                                    </h2>
                                </div>

                                <div className="bg-white/30 border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(15,118,110,0.45)] p-4">
                                    <p className="text-sm text-slate-600">Shortlisted</p>
                                    <h2 className="text-xl sm:text-2xl text-slate-600 font-semibold mt-2">
                                        {stats.shortlisted}
                                    </h2>
                                </div>
                            </section>

                            {/* CHARTS */}
                            <section>
                                <DashboardCharts
                                    jobsPerWeek={jobsPerWeek}
                                    applicationsPerWeek={applicationsPerWeek}
                                />
                            </section>

                            {/* DESKTOP RECENT APPLICATIONS */}
                            <section className="hidden lg:block bg-white/20 border border-white/20 shadow-[0_18px_40px_rgba(15,118,110,0.45)] rounded-2xl py-2 px-4 overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead className="text-slate-600 border-b border-white/10">
                                        <tr>
                                            <th className="text-left py-2">ID</th>
                                            <th className="text-left py-2">Candidate</th>
                                            <th className="text-left py-2">Job</th>
                                            <th className="text-left py-2">Type</th>
                                            <th className="text-left py-2">Mode</th>
                                            <th className="text-left py-2">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {applications.map((a, i) => (
                                            <tr key={a._id} className="border-b border-white/5">
                                                <td className="py-2 text-black">{i + 1}</td>
                                                <td className="py-2 text-black">{a.applicant.name}</td>
                                                <td className="text-black">{a.job.title}</td>
                                                <td className="text-black">{a.job.type}</td>
                                                <td className="text-black">{a.job.jobMode}</td>
                                                <td className="px-3 py-1 text-xs font-semibold text-teal-600">
                                                    {a.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>

                            {/* MOBILE + TABLET */}
                            <section className="lg:hidden space-y-3">

                                {applications.map((a, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="bg-white/80 rounded-xl p-3 sm:p-4 shadow space-y-1 break-words"
                                        >

                                            <p className="text-xs text-slate-500">Candidate</p>
                                            <p className="text-sm font-medium">{a.applicant.name}</p>

                                            <p className="text-xs text-slate-500 mt-2">Job</p>
                                            <p className="text-sm">{a.job.title}</p>

                                            <div className="flex gap-3 mt-2 text-xs flex-wrap">
                                                <span className="px-2 py-1 rounded bg-slate-200">
                                                    {a.job.type}
                                                </span>

                                                <span className="px-2 py-1 rounded bg-slate-200">
                                                    {a.job.jobMode}
                                                </span>
                                            </div>

                                            <p className="text-xs mt-2 text-teal-600 font-semibold">
                                                Status: {a.status}
                                            </p>

                                        </div>
                                    );
                                })}

                            </section>

                        </>
                    </AnimatedSection>
                )}
        </div>
    </div>
)
}

export default Dashboard