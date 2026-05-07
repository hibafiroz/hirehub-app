import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import API from "../api/axios"

const MotionLink = motion(Link)

function HomeJobCard() {

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API('/')
                setJobs(res.data.jobs)
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
        <div className="ml-[55rem] py-20 text-white">
           Loading...
            </div>
        )
    }

    return (
    <>
        {(window.innerWidth < 640
            ? jobs?.slice(0, 3)
            : jobs
        )?.map((item) => (
            <MotionLink
                key={item._id}
                to={`/browseJobs?title=${item.title}`}
                className="block px-10 py-6 w-72 text-center bg-white/90 rounded-2xl shadow-lg transition"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(15, 118, 110, 0.18)" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                <h3 className="text-slate-800 text-lg font-semibold">
                    {item.title}
                </h3>

                <p className="text-slate-500 text-sm mt-1">
                    View jobs →
                </p>
            </MotionLink>
        ))}
    </>
)
}

export default HomeJobCard