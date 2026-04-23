import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

function RecruiterHome() {
    const { user } = useContext(UserContext)
    return (
        <div>
            <section className="flex items-center justify-center px-4 sm:px-8 mt-24 sm:mt-44 mb-32">
                <div className="max-w-3xl w-full text-center">

                    <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 leading-tight">
                        Welcome back,
                        <span className="text-teal-700 block sm:inline">
                            {user.name}
                        </span>
                    </h1>

                    <p className="mt-4 text-slate-600 text-sm sm:text-base">
                        Manage your companies, post job openings, and track applications — all from one place.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="/recruiter/dashboard"
                            className="w-full sm:w-auto text-center px-7 py-3 rounded-xl bg-teal-700/90 text-white font-medium hover:bg-teal-600 transition shadow-lg">
                            View Dashboard
                        </a>

                        <a href="/recruiter/job-List"
                            className="w-full sm:w-auto text-center px-7 py-3 rounded-xl border border-teal-400 text-teal-600 hover:bg-teal-600 hover:text-white transition">
                            Job Posted List
                        </a>
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
                        <h3 className="text-slate-800 font-medium mb-2">Create / Choose Company</h3>
                        <p className="text-sm text-teal-700/80">Add or select a company to manage hiring.</p>
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
                    Why employers choose <span className="text-teal-600">Job<span className="italic">Portal</span></span>
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="bg-white/30 rounded-2xl p-6 shadow-lg">
                        <h3 className="text-slate-900 font-medium mb-2">Centralized Hiring</h3>
                        <p className="text-sm text-slate-600">Everything managed from one dashboard.</p>
                    </div>

                    <div className="bg-white/30 rounded-2xl p-6 shadow-lg">
                        <h3 className="text-slate-900 font-medium mb-2">Faster Hiring</h3>
                        <p className="text-sm text-slate-600">Reach candidates quickly and efficiently.</p>
                    </div>

                    <div className="bg-white/40 rounded-2xl p-6 shadow-lg">
                        <h3 className="text-slate-900 font-medium mb-2">Secure & Reliable</h3>
                        <p className="text-sm text-slate-600">Role-based secure access.</p>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default RecruiterHome