import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../api/axios'
import { ArrowLeftToLine } from 'lucide-react'
import Loader from '../../components/Loader'

function JobDetail() {

    const { id } = useParams()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchJobs = async () => {

            try {

                const res = await API.get(`/admin/jobDetail/${id}`)
                const data = res.data.job
                console.log(data)
                setJob(data)

            } catch (err) {

                console.log(err.message)

            } finally {

                setLoading(false)

            }
        }

        fetchJobs()

    }, [])

    return (
    <div className="min-h-screen relative">

        {/* BACKGROUND */}
        <div
            className="fixed inset-0 bg-cover bg-center -z-10"
            style={{ backgroundImage: "url('/ui/background3.png')" }}
        ></div>

        <div className="fixed inset-0 bg-white/75 -z-10"></div>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

            {loading ? (

                <div className="flex justify-center items-center min-h-[70vh]">
                    <Loader />
                </div>

            ) : (

                <div className="space-y-5">

                    {/* HEADER */}
                    <section className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-2xl p-5 shadow-[0_10px_35px_rgba(13,148,136,0.15)]">

                        <div className="flex items-start justify-between gap-4 flex-wrap">

                            <div>

                                <div className="flex items-center gap-3 flex-wrap">

                                    <Link
                                        to={`/admin/panel`}
                                        className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700"
                                    >
                                        <ArrowLeftToLine size={18} />
                                    </Link>

                                    <h1 className="text-3xl font-bold text-teal-700">
                                        {job.title}
                                    </h1>

                                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[11px] font-semibold">
                                        Pending Review
                                    </span>

                                </div>

                                <p className="mt-3 ml-12 text-sm text-slate-500">
                                    {job.jobLocation} • {job.jobMode} • {job.type}
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* MAIN GRID */}
                    <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-5">

                        {/* LEFT */}
                        <div className="space-y-5">

                            {/* DESCRIPTION */}
                            <section className="bg-white/75 backdrop-blur-xl rounded-2xl border border-white/30 p-5 shadow-[0_10px_35px_rgba(13,148,136,0.15)]">

                                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                                    Job Description
                                </h2>

                                <p className="text-md text-slate-600 leading-7">
                                    {job.describeRole}
                                </p>

                            </section>

                            {/* RESPONSIBILITIES */}
                            <section className="bg-white/75 backdrop-blur-xl rounded-2xl border border-white/30 p-5 shadow-[0_10px_35px_rgba(13,148,136,0.15)]">

                                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                                    Responsibilities
                                </h2>

                                <ul className="space-y-3">

                                    {job.responsibilities.map((r, index) => (

                                        <li
                                            key={index}
                                            className="flex items-start gap-3 text-md text-slate-600"
                                        >
                                            <span className="mt-2 w-2 h-2 rounded-full bg-teal-500"></span>

                                            <span>{r}</span>

                                        </li>

                                    ))}

                                </ul>

                            </section>

                            {/* REQUIREMENTS */}
                            <section className="bg-white/75 backdrop-blur-xl rounded-2xl border border-white/30 p-5 shadow-[0_10px_35px_rgba(13,148,136,0.15)]">

                                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                                    Requirements
                                </h2>

                                <ul className="space-y-3">

                                    {job.requirements.map((r, index) => (

                                        <li
                                            key={index}
                                            className="flex items-start gap-3 text-md text-slate-600"
                                        >
                                            <span className="mt-2 w-2 h-2 rounded-full bg-teal-500"></span>

                                            <span>{r}</span>

                                        </li>

                                    ))}

                                </ul>

                            </section>

                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div className="space-y-5">

                            {/* INFO */}
                            <section className="bg-white/75 backdrop-blur-xl rounded-2xl border border-white/30 p-5 shadow-[0_10px_35px_rgba(13,148,136,0.15)] space-y-5">

                                <div>

                                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                                        Company
                                    </p>

                                    <h3 className="text-md font-semibold text-slate-700 mt-1">
                                        {job.company?.name}
                                    </h3>

                                </div>

                                <div>

                                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                                        Experience
                                    </p>

                                    <h3 className="text-md font-semibold text-slate-700 mt-1">
                                        {job.experience}
                                    </h3>

                                </div>

                                <div>

                                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                                        Salary
                                    </p>

                                    <h3 className="text-md font-semibold text-slate-700 mt-1">
                                        {job.salaryRange}
                                    </h3>

                                </div>

                            </section>

                            {/* SKILLS */}
                            <section className="bg-white/75 backdrop-blur-xl rounded-2xl border border-white/30 p-5 shadow-[0_10px_35px_rgba(13,148,136,0.15)]">

                                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                                    Skills
                                </h2>

                                <div className="flex flex-wrap gap-2">

                                    {job.skills.map((skill, index) => (

                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium"
                                        >
                                            {skill}
                                        </span>

                                    ))}

                                </div>

                            </section>

                            {/* GOOD TO HAVE */}
                            <section className="bg-white/75 backdrop-blur-xl rounded-2xl border border-white/30 p-5 shadow-[0_10px_35px_rgba(13,148,136,0.15)]">

                                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                                    Good to Have
                                </h2>

                                <div className="flex flex-wrap gap-2">

                                    {job.goodToHave.map((g, index) => (

                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium"
                                        >
                                            {g}
                                        </span>

                                    ))}

                                </div>

                            </section>

                        </div>

                    </div>

                </div>
            )}

        </main>

    </div>
)
}

export default JobDetail