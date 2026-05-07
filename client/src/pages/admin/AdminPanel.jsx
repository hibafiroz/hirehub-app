import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api/axios'
import { UserContext } from '../../context/UserContext'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'

function AdminPanel() {

    const { logout } = useContext(UserContext)

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    // MODAL STATES
    const [openStatusModal, setOpenStatusModal] = useState(false)
    const [openLogoutModal, setOpenLogoutModal] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)
    const [actionType, setActionType] = useState("")

    const [stats, setStats] = useState({
        weeklyPosts: 0,
        reviewed: 0,
        pending: 0,
        approved: 0
    })

    useEffect(() => {

        const fetchJobs = async () => {
            try {

                const res = await API.get('/admin/panel')
                const data = res.data.jobs

                setJobs(data)

                // PENDING JOBS
                const pendingJobs = data.filter(
                    job => job.status === 'pending'
                )

                // WEEKLY POSTS
                const weeklyPosts = data.filter(job => {

                    const jobDate = new Date(job.createdAt)
                    const now = new Date()

                    const diffTime = now - jobDate
                    const diffDays = diffTime / (1000 * 60 * 60 * 24)

                    return diffDays <= 7

                }).length

                // REVIEWED
                const reviewed = data.filter(
                    job => job.status !== 'pending'
                ).length

                // approved
                const approved = data.filter(
                    job => job.status === 'approved'
                ).length

                setStats({
                    weeklyPosts,
                    reviewed,
                    pending: pendingJobs.length,
                    approved
                })
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [])

    // APPROVE
    const handleApprove = async (id) => {
        try {
            await API.post(`/admin/job/${id}/approve`)

            setJobs(prev =>
                prev.filter(job => job._id !== id)
            )

            setStats(prev => ({
                ...prev,
                pending: prev.pending - 1,
                reviewed: prev.reviewed + 1
            }))
            await toast.success("Job approved successfully.")
        } catch (err) {
            console.log(err.message)
        }
    }

    // REJECT
    const handleReject = async (id) => {
        try {
            await API.post(`/admin/job/${id}/reject`)

            setJobs(prev =>
                prev.filter(job => job._id !== id)
            )

            setStats(prev => ({
                ...prev,
                pending: prev.pending - 1,
                reviewed: prev.reviewed + 1
            }))

            await toast.success("Job rejected successfully.")

        } catch (err) {
            console.log(err.message)
        }
    }

    // FILTER PENDING JOBS
    const pendingJobs = jobs.filter(
        job => job.status === 'pending'
    )

    return (

        <div className="min-h-screen relative">

            {/* BACKGROUND */}
            <div
                className="fixed inset-0 bg-cover bg-center -z-10"
                style={{ backgroundImage: "url('/ui/background3.png')" }}
            ></div>

            <div className="fixed inset-0 bg-white/70 -z-10"></div>

            <div className="max-w-7xl mx-auto p-6">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">

                    <h1 className="text-2xl font-bold text-teal-800">
                        Admin Dashboard
                    </h1>

                    <button
                        onClick={() => setOpenLogoutModal(true)}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow"
                    >
                        Logout
                    </button>

                </div>

                {/* LOADING */}
                {loading ? (

                    <div className="flex justify-center items-center min-h-[80vh]">
                        <Loader />
                    </div>

                ) : (

                    <>
                        {/* STATS */}
                        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                            <div className="bg-white/30 border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(15,118,110,0.45)] p-4">
                                <p className="text-sm text-slate-600">
                                    Weekly Job Posts
                                </p>

                                <h2 className="text-2xl text-slate-600 font-semibold mt-2">
                                    {stats.weeklyPosts}
                                </h2>
                            </div>

                            <div className="bg-white/30 border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(15,118,110,0.45)] p-4">
                                <p className="text-sm text-slate-600">
                                    Total Reviewed
                                </p>

                                <h2 className="text-2xl text-slate-600 font-semibold mt-2">
                                    {stats.reviewed}
                                </h2>
                            </div>

                            <div className="bg-white/30 border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(15,118,110,0.45)] p-4">
                                <p className="text-sm text-slate-600">
                                    Total Pending Jobs
                                </p>

                                <h2 className="text-2xl text-slate-600 font-semibold mt-2">
                                    {stats.pending}
                                </h2>
                            </div>

                            <div className="bg-white/30 border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(15,118,110,0.45)] p-4">
                                <p className="text-sm text-slate-600">
                                    Total Approved Jobs
                                </p>

                                <h2 className="text-2xl text-slate-600 font-semibold mt-2">
                                    {stats.approved}
                                </h2>
                            </div>

                        </section>

                        {/* TABLE */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl overflow-hidden">

                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Pending Job Posts
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Review and manage recruiter submissions
                                    </p>
                                </div>

                            </div>

                            <div className="hidden md:block max-h-[460px] overflow-y-auto overflow-x-auto">

                                <table className="w-full text-sm">

                                    <thead className="sticky top-0 bg-white z-10 border-b">

                                        <tr className="text-gray-500">

                                            <th className="px-6 py-4 text-left font-medium">
                                                Job
                                            </th>

                                            <th className="px-6 py-4 text-left font-medium">
                                                Company
                                            </th>

                                            <th className="px-6 py-4 text-left font-medium">
                                                Location
                                            </th>

                                            <th className="px-6 py-4 text-left font-medium">
                                                Date
                                            </th>

                                            <th className="px-6 py-4 text-center font-medium">
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {pendingJobs.map(job => (

                                            <tr
                                                key={job._id}
                                                className="border-b hover:bg-gray-50 transition"
                                            >

                                                <td className="px-6 py-4">

                                                    <div>
                                                        <p className="font-semibold text-gray-800">
                                                            {job.title}
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            {job.type}
                                                        </p>
                                                    </div>

                                                </td>

                                                <td className="px-6 py-4 text-gray-700">
                                                    {job.company.name}
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {job.jobLocation}
                                                </td>

                                                <td className="px-6 py-4 text-gray-500">
                                                    {new Date(job.createdAt).toLocaleDateString()}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <div className="flex justify-center gap-2">

                                                        <Link
                                                            to={`/admin/jobDetail/${job._id}`}
                                                            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs"
                                                        >
                                                            View
                                                        </Link>

                                                        <button
                                                            onClick={() => {
                                                                setSelectedJob(job._id)
                                                                setActionType("approve")
                                                                setOpenStatusModal(true)
                                                            }}
                                                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs"
                                                        >
                                                            Approve
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                setSelectedJob(job._id)
                                                                setActionType("reject")
                                                                setOpenStatusModal(true)
                                                            }}
                                                            className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs"
                                                        >
                                                            Reject
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>
                    </>
                )}
            </div>

            {/* MODAL */}
            {openStatusModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl">

                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            Confirm {actionType === "approve" ? "Approval" : "Rejection"}
                        </h2>

                        <p className="text-sm text-slate-500 mb-6">
                            Are you sure you want to{" "}
                            <span className="font-medium">
                                {actionType}
                            </span>{" "}
                            this job post?
                        </p>

                        <div className="flex justify-end gap-3">

                            {/* CANCEL */}
                            <button
                                onClick={() => setOpenStatusModal(false)}
                                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100"
                            >
                                Cancel
                            </button>

                            {/* CONFIRM */}
                            <button
                                onClick={async () => {

                                    if (actionType === "approve") {
                                        await handleApprove(selectedJob)
                                    } else {
                                        await handleReject(selectedJob)
                                    }

                                    setOpenStatusModal(false)

                                }}
                                className={`px-4 py-2 rounded-lg text-white
                                ${actionType === "approve"
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-red-500 hover:bg-red-600"
                                    }`}
                            >
                                Yes, {actionType}
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* Logout Modal */}

            {openLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

                    {/* Modal Box */}
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-lg">

                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            Confirm Logout
                        </h2>

                        <p className="text-sm text-slate-500 mb-6">
                            Are you sure you want to logout?
                        </p>

                        <div className="flex justify-end gap-3">

                            {/* Cancel */}
                            <button
                                onClick={() => setOpenLogoutModal(false)}
                                className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-slate-100"
                            >
                                Cancel
                            </button>

                            {/* Confirm */}
                            <button
                                onClick={() => {
                                    logout();
                                    setOpenStatusModal(false);
                                }}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                            >
                                Logout
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default AdminPanel