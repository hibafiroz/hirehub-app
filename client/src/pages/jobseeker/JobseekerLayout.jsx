import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

function JobseekerLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default JobseekerLayout