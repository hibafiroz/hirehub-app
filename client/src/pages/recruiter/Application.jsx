import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import AnimatedSection from "../../components/AnimatedSection";

function Application() {

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState(null);
  const [loadingId, setLoadingId] = useState(null)
  const [actionType, setActionType] = useState(""); // "shortlisted" or "rejected"

  const handleSearch = async (e) => {
    e.preventDefault()

    try {
      const res = await API.get(`/recruiter/application?title=${search}`)
      setApplications(res.data.applications)
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/recruiter/application");
        const app = res.data.applications;
        setApplications(app);
        console.log(app)
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    };
    fetchApplications();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      setLoadingId(id);
      setActionType(status);

      await API.post(`/recruiter/${id}/applicantStatus`, { status });

      // update list
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );

      // update selected panel
      setSelectedApp((prev) =>
        prev?._id === id ? { ...prev, status } : prev
      );

      console.log(selectedApp)

      toast.success("Status has been updated.");

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
      setActionType("");
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/background3.png')" }}></div>
      <div className="fixed inset-0 bg-white/70 -z-10"></div>


      {/* Title */}
      <div className="flex flex-col mb-10 sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800">
            Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Manage and track all job applications in one place.
          </p>
        </div>

        <form onSubmit={handleSearch}>
          <div className="flex items-center bg-white/30 shadow-[0_7px_60px_rgba(15,118,110,0.45)]
                                border border-black/20 hover:border-teal-400 hover:border-2 rounded-2xl w-full sm:w-80
                                transition-all duration-300 focus-within:border-teal-400
                                focus-within:shadow-[0_10px_80px_rgba(15,118,110,0.6)] overflow-hidden">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job title"
              className="flex-1 px-4 py-2.5 bg-transparent outline-none text-slate-700 placeholder:text-slate-500 text-sm"
            />

            <button
              type="submit"
              className="px-3 py-2 bg-teal-600 text-white hover:bg-teal-500 rounded-r-2xl"
            >
              <i className="fa-solid fa-magnifying-glass tetx-white text-sm"></i>
            </button>

          </div>
        </form>
      </div>

      {/* Table */}
      <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: Applicants List */}
          <div className="w-full bg-white/30 rounded-2xl p-4 space-y-3 h-auto lg:h-[80vh] overflow-visible lg:overflow-y-auto static lg:sticky top-24">
            {applications.map((app) => (
              <div
                key={app._id}
                onClick={() => setSelectedApp(app)}
                className={`p-3 rounded-xl cursor-pointer border hover:bg-teal-500/10
                            ${selectedApp?._id === app._id ? "bg-teal-600/20 border-teal-400" : "bg-white/60"}`}
              >
                <p className="text-sm font-medium">{app.applicant?.email}</p>
                <p className="text-xs text-slate-500">{app.job?.title}</p>

                <span className={`text-xs mt-1 inline-block 
                            ${app.status === "shortlisted" ? "text-green-600" :
                    app.status === "rejected" ? "text-red-600" : "text-teal-600"}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT: Details */}
          <div className="w-full lg:col-span-2 bg-white/40 rounded-2xl p-4 sm:p-6 h-auto lg:h-[80vh] overflow-visible lg:overflow-y-auto">
            {selectedApp ? (
              <>
                <h2 className="text-xl font-semibold mb-2">
                  {selectedApp.applicant?.email}
                </h2>

                <p className="text-sm text-slate-500 mb-4">
                  Applied for: {selectedApp.job?.title}
                </p>

                {/* Resume */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Resume</p>
                  <button
  onClick={() => window.open(selectedApp.resume, "_blank")}
>
  View Resume
</button>
                </div>

                {/* Cover Letter */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Cover Letter</p>
                  <p className="text-sm text-slate-700 whitespace-pre-line">
                    {selectedApp.coverLetter || "No cover letter provided"}
                  </p>
                </div>

                {/* Actions */}
                {selectedApp.status === "applied" && (
                  <div className="flex gap-3 mt-6">

                    {/* Shortlist */}
                    <button
                      onClick={() => handleStatus(selectedApp._id, "shortlisted")}
                      disabled={loadingId === selectedApp._id}
                      className="px-4 py-2 text-xs rounded-lg bg-green-600 text-white flex items-center gap-2"
                    >
                      {loadingId === selectedApp._id && actionType === "shortlisted" ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                          Shortlisting...
                        </>
                      ) : (
                        "Shortlist"
                      )}
                    </button>

                    {/* Reject */}
                    <button
                      onClick={() => handleStatus(selectedApp._id, "rejected")}
                      disabled={loadingId === selectedApp._id}
                      className="px-4 py-2 text-xs rounded-lg bg-red-600 text-white flex items-center gap-2"
                    >
                      {loadingId === selectedApp._id && actionType === "rejected" ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                          Rejecting...
                        </>
                      ) : (
                        "Reject"
                      )}
                    </button>

                  </div>
                )}
              </>
            ) : (
              <p className="text-slate-500 h-[60vh] flex items-center justify-center">
                Select an applicant to view details
              </p>
            )}
          </div>

        </div>
      </AnimatedSection>

    </div>
  );
}

export default Application;
