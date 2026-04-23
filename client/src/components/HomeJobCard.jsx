import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../api/axios"

function HomeJobCard() {

    const [jobs, setJobs] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await API('/home')
            setJobs(res.data.jobs)
        }
        fetchData()
    }, [])

    return (
        <>
            {jobs?.map((item, index) => (
                <Link
                    key={index}
                    to={`/jobs/${item.title}`}
                    className="block px-10 py-6 w-72 text-center bg-white/90 rounded-2xl shadow-lg transition"
                >
                    <h3 className="text-slate-800 text-lg font-semibold">
                        {item.title}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                        View jobs →
                    </p>
                </Link>
            ))}
        </>
    )
}

export default HomeJobCard