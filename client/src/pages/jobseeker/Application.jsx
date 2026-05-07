import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api/axios'
import Loader from '../../components/Loader'

function Application() {

    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await API.get('/jobseeker/application')
                console.log(res.data.applications)
                setApplications(res.data.applications)
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchApplications()
    }, [])

    return (
        <div className='min-h-screen font-[Urbanist] relative pt-2 lg:pt-10 text-sm sm:text-base overflow-x-hidden'>
            
            <main className="max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-20 pt-20 sm:pt-24 pb-16 sm:pb-20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

                    <div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 leading-snug">
                            My <span className="text-teal-800">Applications</span>
                        </h2>
                        <p className="text-slate-600 mt-1">
                            Track all the jobs you've applied for
                        </p>
                    </div>

                    <Link to="/jobseeker/profile"
                        className="w-full sm:w-auto text-center px-5 py-2 rounded-xl border bg-teal-700/70 border-black/20 text-slate-100 hover:bg-teal-700/60">
                        Back to Profile
                    </Link>
                </div>

                { /*APPLICATION LIST*/}

                {
                    loading ? (
                        <div>
                            <Loader />
                        </div>
                    ) : (
                        
                            <>
                                {applications.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">
                            You haven't applied to any jobs yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {applications.map(app => (

                            <div key={app._id}
                                className="bg-white/10 backdrop-blur border border-black/20 rounded-2xl p-4 sm:p-6 shadow-[0_7px_40px_rgba(15,118,110,0.35)]">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start lg:items-center gap-4">
                                    
                                    { /* JOB INFO */}
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-slate-700 leading-snug">
                                            {app.job?.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-slate-600">
                                            {app.job?.company?.name} • {app.job?.jobLocation}
                                        </p>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Applied on {new Date(app.createdAt).toDateString()}
                                        </p>
                                    </div>

                                    { /* STATUS */}
                                    <div>
                                        {app.status === 'shortlisted' ? (
                                            <span className="inline-block px-4 py-2 rounded-full bg-green-200 text-green-700 text-sm">
                                                Shortlisted
                                            </span>
                                        ) : app.status === 'rejected' ? (
                                            <span className="inline-block px-4 py-2 rounded-full bg-red-200 text-red-700 text-sm">
                                                Rejected
                                            </span>
                                        ) : (
                                            <span className="inline-block px-4 py-2 rounded-full bg-yellow-200 text-yellow-700 text-sm">
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                        )}
                    </div>
                )
                }
                            </>
                    )
                }

                
            </main>
        </div>
    )
}

export default Application