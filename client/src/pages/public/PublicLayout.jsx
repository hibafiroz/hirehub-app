import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import AnimatedSection from "../../components/AnimatedSection";

function PublicLayout() {
    return (
        <>
            <Navbar />
                <Outlet />
        </>
    )
}

export default PublicLayout