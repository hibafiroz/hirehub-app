import React, { useEffect, useState } from 'react'
import API from '../../api/axios'

function Dashboard() {
    const [applications, setApplications] = useState([])

    useEffect(() => {
        const fetchRecentApplications = async () => {
            const res = await API.get('/recruiter/dashboard')
            console.log(res)
            const data = res.data.recentApplications
            setApplications(data)
        }
        fetchRecentApplications()
    },[])

    return (
        <div className="flex-1 px-4 sm:px-6 space-y-4 lg:pr-3 lg:space-y-2 mt-14 lg:mt-1">

            {/* TITLE */}
            <div>
                <h1
                    className="text-xl sm:text-2xl lg:text-3xl mt-4 sm:mt-6 mb-4 sm:mb-6 font-semibold text-slate-700">
                    Dashboard <span className="text-teal-600">Overview</span>
                </h1>
            </div>

            {/* SUMMARY CARDS */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-2">
                <div
                    className="bg-white/30 border border-white/10 shadow-[0_12px_40px_rgba(15,118,110,0.45)] rounded-2xl p-4">
                    <p className="text-sm text-slate-600">Total Jobs</p>
                    <h2 className="text-xl sm:text-2xl text-slate-600 font-semibold mt-2">
                        stats.totalJobs
                    </h2>
                </div>

                <div
                    className="bg-white/30 border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(15,118,110,0.45)] p-4"
                >
                    <p className="text-sm text-slate-600">Applications</p>
                    <h2 className="text-2xl text-slate-600 font-semibold mt-2">
                        stats.totalApplications
                    </h2>
                </div>

                <div
                    className="bg-white/30 border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(15,118,110,0.45)] p-4"
                >
                    <p className="text-sm text-slate-600">Pending</p>
                    <h2 className="text-2xl text-slate-600 font-semibold mt-2">
                        stats.pending
                    </h2>
                </div>

                <div
                    className="bg-white/30 border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(15,118,110,0.45)] p-4"
                >
                    <p className="text-sm text-slate-600">Shortlisted</p>
                    <h2 className="text-2xl text-slate-600 font-semibold mt-2">
                        stats.shortlisted
                    </h2>
                </div>
            </section>

            {/* CHARTS */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div
                    className="bg-white/20 shadow-[0_7px_40px_rgba(15,118,110,0.45)] border border-white/10 rounded-2xl p-4 sm:p-5"
                >
                    <h3 className="text-sm text-white mb-4">Weekly Job Postings</h3>
                    <canvas id="jobsChart" className="w-full max-h-[220px]"></canvas>
                </div>

                <div
                    className="bg-white/20 shadow-[0_7px_40px_rgba(15,118,110,0.45)] border border-white/10 rounded-2xl p-4 sm:p-5"
                >
                    <h3 className="text-sm text-white mb-4">Applications Trend</h3>
                    <canvas
                        id="applicationsChart"
                        className="w-full max-h-[220px]"
                    ></canvas>
                </div>
            </section>

            {/* DESKTOP RECENT APPLICATIONS */}
            <section className="hidden md:block bg-white/20 border border-white/20 shadow-[0_18px_40px_rgba(15,118,110,0.45)] rounded-2xl py-2 px-4 overflow-x-auto">
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
                        {applications.forEach((a, i) => {
                            <tr className="border-b border-white/5">
                                <td className="py-2 text-black">=i+1</td>
                                <td className="py-2 text-black">=a.applicant.name</td>
                                <td className="text-text-black">=a.job.title</td>
                                <td className="text-text-black">=a.job.type</td>
                                <td className="text-text-black">=a.job.jobMode</td>
                                <td className="px-3 py-1 text-xs font-semibold text-teal-600">
                                    =a.status
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </section>

            {/* MOBILE RECENT APPLICATIONS */}
            <section className="md:hidden space-y-3">

                {applications.map((a, i) => {
                    return (
                        <div key={i} className="bg-white/80 rounded-xl p-4 shadow space-y-1">

                            <p className="text-xs text-slate-500">Candidate</p>
                            <p className="text-sm font-medium">{a.applicant.name}</p>

                            <p className="text-xs text-slate-500 mt-2">Job</p>
                            <p className="text-sm">{a.job.title}</p>

                            <div className="flex gap-3 mt-2 text-xs">
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
        </div>
    )
}

export default Dashboard