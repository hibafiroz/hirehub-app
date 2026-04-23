import React, { useContext, useEffect, useState } from 'react'
import API from '../api/axios';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

function BrowseJobCard() {

    const { user } = useContext(UserContext)
    const [jobs, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState({});

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await API.get("/jobseeker/browseJobs");
            setJobs(res.data.jobs)
        };
        fetchJobs();
    }, []);

    return (
        <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Available <span className="text-teal-700">Jobs</span>
            </h2>

            <div className="space-y-6">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="bg-white border shadow-lg rounded-2xl p-6 hover:scale-[1.01] transition"
                    >
                        <h3 className="text-lg font-semibold">
                            {job.title}
                        </h3>

                        <p className="text-sm text-slate-500">
                            {job.company?.name} • {job.jobLocation}
                        </p>

                        <div className="flex gap-2 mt-3 text-xs">
                            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700">
                                {job.type}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-slate-100">
                                {job.jobMode}
                            </span>
                        </div>

                        <p className="text-sm text-slate-600 mt-4 line-clamp-2">
                            {job.describeRole}
                        </p>

                        <div className="mt-5 flex justify-between items-center">
                            <Link
                                to={`/job/${job._id}`}
                                className="text-sm text-teal-600 font-medium"
                            >
                                View Details
                            </Link>

                            {user ? (
                                appliedJobs[job._id] ? (
                                    <p className="text-green-500 text-sm" disabled>
                                        Applied
                                    </p>
                                ) : (
                                    <Link to='/applyNow' className="bg-teal-600 text-white px-4 py-2 rounded text-sm">
                                        Apply
                                    </Link>
                                )
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm bg-teal-600 text-white rounded"
                                >
                                    Apply
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrowseJobCard