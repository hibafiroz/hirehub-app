import React, { useContext, useEffect, useState } from 'react'
import API from '../api/axios';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';
import { useSearchParams } from "react-router-dom";

function BrowseJobCard({ filters, search, locationSearch }) {

    const { user } = useContext(UserContext)
    const navigate=useNavigate()

    // Take title from URL
    const [searchParams, setSearchParams] = useSearchParams();
    const title = searchParams.get("title");

    const [jobs, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true)

    const buildQuery = () => {
        const params = new URLSearchParams();

        if (title) {
            params.append("title", title);
        }

        if (search) {
            params.append("search", search);
        }

        if (locationSearch) {
            params.append("location", locationSearch);
        }

        params.append("page", page);

        filters.jobMode.forEach(val => params.append("jobMode", val));
        filters.type.forEach(val => params.append("type", val));
        filters.location.forEach(val => params.append("location", val));
        filters.salary.forEach(val => params.append("salary", val));

        return params.toString();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchJobs = async () => {
            try {
                const query = buildQuery();
                const res = await API.get(`/browseJobs?${query}`);

                setJobs(res.data.jobs);
                console.log(res.data.jobs)
                setTotalPages(res.data.totalPages);
                setAppliedJobs(res.data.appliedJobs);

            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [filters, page, search, locationSearch, title]);


    useEffect(() => {
        if (search) {
            const params = new URLSearchParams(searchParams);
            params.delete("title");   // remove title while searching
            setSearchParams(params);
        }
    }, [search]);


    return (
        <>
            {
                loading ? (
                    <div className="flex justify-center items-center lg:ml-110 md:mb-20">
                        <Loader />
                    </div>
                ) : (
                    <div className="lg:col-span-3 w-full">

                            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-6">
                                Available <span className="text-teal-700">Jobs</span>
                        </h2>


                        <div className="space-y-6">
                            {jobs.map((job) => (
                                <div
                                    key={job._id}
                                    onClick={() => navigate(`/jobDetail/${job._id}`)}
                                    className="bg-white border mt-6 shadow-lg rounded-2xl p-4 sm:p-6 hover:scale-[1.01] transition cursor-pointer w-full"
                                >
                                    <h3 className="text-base sm:text-lg font-semibold leading-snug">
                                        {job.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                        {job.company?.name} • {job.jobLocation}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-3 text-xs">
                                        <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700">
                                            {job.type}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-slate-100">
                                            {job.jobMode}
                                        </span>
                                    </div>

                                    <p className="text-sm text-slate-600 mt-4 line-clamp-3 leading-relaxed">
                                        {job.describeRole}
                                    </p>

                                    <div className="mt-5 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between sm:items-center">
                                        
                                        {/* View Details (just text now) */}
                                        <span className="text-sm text-teal-600 font-medium">
                                            View Details
                                        </span>

                                        {/* Apply Button */}
                                        {user ? (
                                            appliedJobs[job._id] ? (
                                                <p className="text-teal-600 text-sm">
                                                    Applied
                                                </p>
                                            ) : (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // 🔥 prevent card click
                                                        navigate(`/jobseeker/apply/${job._id}`);
                                                    }}
                                                        className="bg-teal-600 text-white px-4 py-2 rounded text-sm w-full sm:w-auto"
                                                    >
                                                    Apply
                                                </button>
                                            )
                                        ) : (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate('/jobseeker-Login');
                                                }}
                                                    className="bg-teal-600 text-white px-4 py-2 rounded text-sm w-full sm:w-auto"
                                                >
                                                Apply
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-10 gap-2">

                            <button
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`px-4 py-2 rounded ${page === i + 1 ? "bg-teal-600 text-white" : "bg-gray-200"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Next
                            </button>

                        </div>
                    </div>
                )
            }

        </>
    )
}

export default BrowseJobCard