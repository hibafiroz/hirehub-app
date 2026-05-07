import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Loader from "./Loader";

function DashboardCharts({ jobsPerWeek, applicationsPerWeek }) {
  const jobsChartRef = useRef(null);
  const appsChartRef = useRef(null);

  useEffect(() => {

    if (!jobsPerWeek || !applicationsPerWeek) return;

    const lastJobs = jobsPerWeek.slice(-4);
    const jobLabels = lastJobs.map(
      j => `Week ${j._id.week}`
    );
    
    const jobCounts = lastJobs.map(j => j.count);

    const lastApps = applicationsPerWeek.slice(-4);
    const appLabels = lastApps.map(
      a => `Week ${a._id.week}`
    );

    const appCounts = lastApps.map(a => a.count);

    const jobsChart = new Chart(jobsChartRef.current, {
      type: "bar",
      data: {
        labels: jobLabels,
        datasets: [{
          data: jobCounts,
          backgroundColor: "#52a096",
          borderRadius: 6
        }]
      },
      options: {
        plugins: { legend: { display: false } }
      }
    });

    const appsChart = new Chart(appsChartRef.current, {
      type: "line",
      data: {
        labels: appLabels,
        datasets: [{
          data: appCounts,
          borderColor: "#52a096",
          backgroundColor: "rgba(94,234,212,0.15)",
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        plugins: { legend: { display: false } }
      }
    });

    return () => {
      jobsChart.destroy();
      appsChart.destroy();
    };
  }, [jobsPerWeek, applicationsPerWeek]);

  if (!jobsPerWeek || !applicationsPerWeek) {
    return <Loader />
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div className="bg-white/20 rounded-2xl p-4">
        <h3 className="mb-4">Weekly Job Postings</h3>
        <canvas ref={jobsChartRef} height="200"></canvas>
      </div>

      <div className="bg-white/20 rounded-2xl p-4">
        <h3 className="mb-4">Applications Trend</h3>
        <canvas ref={appsChartRef} height="200"></canvas>
      </div>
    </div>
  );
}

export default DashboardCharts;