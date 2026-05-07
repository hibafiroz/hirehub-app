import { Outlet } from "react-router-dom";
import Aside from "../../components/Aside";
import AnimatedSection from "../../components/AnimatedSection";

function RecruiterDashboardLayout() {
  return (
    <div className="flex">

      <Aside />

      <main className="flex-1 px-4 sm:px-6 py-6 mt-16 lg:mt-6">
        <div className="lg:ml-[17rem] lg:pt-1 p-4">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

export default RecruiterDashboardLayout;