import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import API from '../../api/axios'
import AnimatedSection from '../../components/AnimatedSection'

function Home() {
    const { user } = useContext(UserContext)
    const [stats, setStats] = useState({
        totalJobs: 0, totalApplications: 0, shortlisted: 0, pending: 0
    })

    useEffect(() => {
        const fetchStats = async () => {
            const res = await API.get('/recruiter/home')
            setStats({
                totalJobs: res.data.jobs.length,
                totalApplications: res.data.applications.length,
                shortlisted: res.data.shortlisted.length,
                pending: res.data.pendingApplications.length
            })
        }
        fetchStats()
    }, [])

    return (
        <div>

            {/* BackgroundImage */}
            <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/image.png')" }}></div>
            <div className="fixed inset-0 bg-white/60 -z-10"></div>

            <AnimatedSection>
                {/* Hero Section */}
                <section className="relative overflow-hidden min-h-screen flex items-center justify-center px-6 sm:px-10 py-24">

                    <div className="relative z-10 max-w-7xl w-full">

                        {/* Main Content */}
                        <div className="text-center max-w-4xl mx-auto">

                            <div className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-teal-100 text-teal-700 font-medium">
                                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
                                <p className="text-sm text-teal-700 font-medium tracking-wide">
                                    Smart Hiring Platform
                                </p>
                            </div>

                            <h1 className="text-4xl tracking-wider sm:text-5xl lg:text-5xl font-[urbanist] font-semibold text-slate-800 leading-tight">
                                Hire top talent{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
                                    faster & smarter.
                                </span>
                            </h1>

                            <p className="mt-7 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                                Simplify recruitment, manage applications effortlessly,
                                and build high-performing teams with an intelligent hiring workflow.
                            </p>

                            {/* Buttons */}
                            <div className="flex justify-center gap-4 mt-8 sm:mt-10 flex-wrap">
                                <Link
                                    to="/recruiter/dashboard"
                                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-teal-700 to-teal-500 text-white font-semibold shadow-lg shadow-teal-300/40 hover:scale-105 hover:shadow-xl transition duration-300">
                                    View Dashboard
                                </Link>

                                <Link
                                    to="/recruiter/jobList"
                                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl border border-teal-500 text-teal-600 font-semibold hover:bg-teal-50 transition duration-300">
                                    Manage Jobs
                                </Link>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-15 lg:px-50 text-center">

                           <div className="bg-white/60 backdrop-blur rounded-xl py-4 px-3 shadow-[0_7px_40px_rgba(15,118,110,0.45)]">
                               <h3 className="text-lg sm:text-xl font-semibold text-teal-700">
                                    {stats.totalJobs}
                                </h3>

                                <p className="mt-1 text-sm  text-slate-600 font-medium">
                                    Total Jobs
                                </p>
                            </div>

                            <div className="bg-white/60 backdrop-blur rounded-xl py-4 px-3 shadow-[0_7px_40px_rgba(15,118,110,0.45)]">
                                <h3 className="text-lg sm:text-xl font-semibold text-teal-700">
                                    {stats.totalApplications}
                                </h3>

                                <p className="mt-1 text-sm text-slate-600 font-medium">
                                    Applications
                                </p>
                            </div>

                            <div className="bg-white/60 backdrop-blur rounded-xl py-4 px-3 shadow-[0_7px_40px_rgba(15,118,110,0.45)]">
                                <h3 className="text-lg sm:text-xl font-semibold text-teal-700">
                                    {stats.shortlisted}
                                </h3>

                                <p className="mt-1 text-sm text-slate-600 font-medium">
                                    Shortlisted
                                </p>
                            </div>

                            <div className="bg-white/60 backdrop-blur rounded-xl py-4 px-3 shadow-[0_7px_40px_rgba(15,118,110,0.45)]">
                               <h3 className="text-lg sm:text-xl font-semibold text-teal-700">
                                    {stats.pending}
                                </h3>

                                <p className="mt-1 text-sm text-slate-600 font-medium">
                                    Pending
                                </p>
                            </div>

                        </div>

                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="bg-teal-700/90 px-4 sm:px-8 py-16">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-12">
                        How it <span className="text-teal-300">works</span>
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">

                        <div className="bg-white/90 backdrop-blur border border-white/10 rounded-2xl p-6">
                            <div
                                className="w-10 h-10 rounded-xl bg-teal-600/60 text-white flex items-center justify-center font-semibold mb-4">1
                            </div>
                            <h3 className="text-slate-800 font-medium mb-2">Create Company</h3>
                            <p className="text-sm text-teal-700/80">Add a company to manage hiring.</p>
                        </div>

                        <div className="bg-white/90 backdrop-blur border border-white/10 rounded-2xl p-6">
                            <div
                                className="w-10 h-10 rounded-xl bg-teal-600/60 text-white flex items-center justify-center font-semibold mb-4">2
                            </div>
                            <h3 className="text-slate-800 font-medium mb-2">Post Jobs</h3>
                            <p className="text-sm text-teal-700/80">Create job listings with required details.</p>
                        </div>

                        <div className="bg-white/90 backdrop-blur border border-white/10 rounded-2xl p-6">
                            <div
                                className="w-10 h-10 rounded-xl bg-teal-600/60 text-white flex items-center justify-center font-semibold mb-4">3
                            </div>
                            <h3 className="text-slate-800 font-medium mb-2">Review Applications</h3>
                            <p className="text-sm text-teal-700/80">Track and manage candidate applications.</p>
                        </div>

                        <div className="bg-white/90 backdrop-blur border border-white/10 rounded-2xl p-6">
                            <div
                                className="w-10 h-10 rounded-xl bg-teal-600/60 text-white flex items-center justify-center font-semibold mb-4">4
                            </div>
                            <h3 className="text-slate-800 font-medium mb-2">Hire & Manage</h3>
                            <p className="text-sm text-teal-700/80">Shortlist and finalize hiring smoothly.</p>
                        </div>

                    </div>
                </section>

                {/* WHY CHOOSE */}
                <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 text-center">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-10">
                        Why employers choose <span className="text-teal-600">Hire<span className="italic">Hub</span></span>
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        <div className="bg-white/30 shadow-[0_7px_40px_rgba(15,118,110,0.45)] rounded-2xl p-6">
                            <h3 className="text-slate-900 font-medium mb-2">Centralized Hiring</h3>
                            <p className="text-sm text-slate-600">Everything managed from one dashboard.</p>
                        </div>

                        <div className="bg-white/30 shadow-[0_7px_70px_rgba(15,118,110,0.45)] rounded-2xl p-6">
                            <h3 className="text-slate-900 font-medium mb-2">Faster Hiring</h3>
                            <p className="text-sm text-slate-600">Reach candidates quickly and efficiently.</p>
                        </div>

                        <div className="bg-white/40 shadow-[0_7px_40px_rgba(15,118,110,0.45)] rounded-2xl p-6">
                            <h3 className="text-slate-900 font-medium mb-2">Secure & Reliable</h3>
                            <p className="text-sm text-slate-600">Role-based secure access.</p>
                        </div>

                    </div>
                </section>

                {/* RECENT ACTIVITY */}
                <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16">

                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                            Recruitment <span className="text-teal-600">Insights</span>
                        </h2>

                        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                            Monitor hiring progress and stay updated with your recruitment performance.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">

                        <div className="bg-white/40 border border-white/30 backdrop-blur rounded-2xl p-6 shadow-[0_7px_40px_rgba(15,118,110,0.25)]">
                            <p className="text-sm text-slate-500 mb-2">
                                This Week
                            </p>

                            <h3 className="text-3xl font-bold text-teal-700">
                                {stats.totalApplications}
                            </h3>

                            <p className="mt-3 text-sm text-slate-600">
                                New applications received across all active job postings.
                            </p>
                        </div>

                        <div className="bg-white/40 border border-white/30 backdrop-blur rounded-2xl p-6 shadow-[0_7px_40px_rgba(15,118,110,0.25)]">
                            <p className="text-sm text-slate-500 mb-2">
                                Hiring Progress
                            </p>

                            <h3 className="text-3xl font-bold text-teal-700">
                                {stats.shortlisted}
                            </h3>

                            <p className="mt-3 text-sm text-slate-600">
                                Candidates shortlisted for the next hiring stages.
                            </p>
                        </div>

                        <div className="bg-white/40 border border-white/30 backdrop-blur rounded-2xl p-6 shadow-[0_7px_40px_rgba(15,118,110,0.25)]">
                            <p className="text-sm text-slate-500 mb-2">
                                Open Positions
                            </p>

                            <h3 className="text-3xl font-bold text-teal-700">
                                {stats.totalJobs}
                            </h3>

                            <p className="mt-3 text-sm text-slate-600">
                                Active opportunities currently available for candidates.
                            </p>
                        </div>

                    </div>
                </section>
            </AnimatedSection>

        </div>
    )
}

export default Home