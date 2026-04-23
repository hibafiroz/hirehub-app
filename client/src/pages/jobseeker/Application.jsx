import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api/axios'

function Application() {

    const [applications, setApplications] = useState([])

    useEffect(() => {
        const fetchApplications = async () => {
            const res = await API.get('/jobseeker/application')
            setApplications(res.data.applications)
        }
        fetchApplications()
    })

    return (
        <div className='min-h-screen font-[Urbanist] relative pt-2 lg:pt-10 text-sm sm:text-base'>
            <main className="max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-20 pt-24 pb-20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

                    <div>
                        <h2 className="text-3xl font-semibold text-slate-800">
                            My <span className="text-teal-800">Applications</span>
                        </h2>
                        <p className="text-slate-600 mt-1">
                            Track all the jobs you've applied for
                        </p>
                    </div>

                    <Link to="/profile"
                        className="w-full sm:w-auto text-center px-5 py-2 rounded-xl border bg-teal-700/70 border-black/20 text-slate-100 hover:bg-teal-700/60">
                        Back to Profile
                    </Link>
                </div>

                { /*APPLICATION LIST*/}

                {applications.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">
                            You haven't applied to any jobs yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {applications.map(app => {

                            <div key={app.id}
                                className="bg-white/10 backdrop-blur border border-black/20 rounded-2xl p-6 shadow-[0_7px_40px_rgba(15,118,110,0.35)]">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                                    { /* JOB INFO */}
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-700">
                                            {app.job?.title}
                                        </h3>
                                        <p className="text-slate-600">
                                            {app.job?.company?.name} • {app.job?.jobLocation}
                                        </p>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Applied on {new Date(app.createdAt).toDateString()}
                                        </p>
                                    </div>

                                    { /* STATUS */}
                                    <div>
                                        {app.status === 'shortlisted' ? (
                                            <span className="px-4 py-2 rounded-full bg-green-200 text-green-700 text-sm">
                                                Shortlisted
                                            </span>
                                        ) : app.status === 'rejected' ? (
                                            <span className="px-4 py-2 rounded-full bg-red-200 text-red-700 text-sm">
                                                Rejected
                                            </span>
                                        ) : (
                                            <span className="px-4 py-2 rounded-full bg-yellow-200 text-yellow-700 text-sm">
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        }
                        )}
                    </div>
                )
                }
            </main>
        </div>
    )
}

export default Application