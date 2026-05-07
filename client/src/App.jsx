import React, { useContext, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/public/Home'
import JobseekerLogin from './pages/auth/JobSeekerLogin'
import Register from './pages/auth/Register'
import Footer from './components/Footer'
import BrowseJobs from './pages/public/BrowseJobs'
import UserProvider, { UserContext } from './context/UserContext'
import JobseekerProfile from './pages/jobseeker/Profile'
import ProtectedRoute from './routes/ProtectedRoute'
import JobseekerApplication from './pages/jobseeker/Application'
import Contact from './pages/public/Contact'
import ApplyNow from './pages/jobseeker/ApplyNow'
import JobseekerLayout from './pages/jobseeker/JobseekerLayout'
import RecruiterMainLayout from './pages/recruiter/RecruiterMainLayout'
import RecruiterHome from './pages/recruiter/Home'
import Dashboard from './pages/recruiter/Dashboard'
import RecruiterProfile from './pages/recruiter/Profile'
import RecruiterApplication from './pages/recruiter/Application'
import Company from './pages/recruiter/Company'
import JobList from './pages/recruiter/JobList'
import AuthLayout from './pages/auth/AuthLayout'
import RecruiterJobDetail from './pages/recruiter/JobDetail'
import EditJob from './pages/recruiter/EditJob'
import EditProfile from './pages/recruiter/EditProfile'
import PostJob from './pages/recruiter/PostJob'
import AdminPanel from './pages/admin/AdminPanel'
import AdminLayout from './pages/admin/AdminLayout'
import AdminJobDetail from './pages/admin/JobDetail'
import RecruiterLogin from './pages/auth/RecruiterLogin'
import JobDetail from './pages/public/JobDetail'
import PublicLayout from './pages/public/PublicLayout'
import RecruiterDashboardLayout from './pages/recruiter/RecruiterDashboardLayout'
import { Toaster } from 'react-hot-toast'
import API from './api/axios'
import Loader from './components/Loader'
import Lenis from "lenis"

function App() {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return (
        <div>

            {/* Toaster notification */}
            <Toaster position="top-right"
                toastOptions={{
                    style: {
                        maxWidth: '300px',// increase width
                        width: '100%',
                    },
                }}
            />

            <UserProvider>
            <Routes>
                <Route path='/' element={<PublicLayout />}>
                    <Route index element={<Home/>} />
                    <Route path='browseJobs' element={<BrowseJobs />} />
                    <Route path='browseJobs/:title' element={<BrowseJobs />} />
                    <Route path='jobDetail/:id' element={<JobDetail />} />
                    <Route path='contact' element={<Contact />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='jobseeker-Login' element={<JobseekerLogin />} />
                    <Route path='recruiter-Login' element={<RecruiterLogin />} />
                    <Route path='register' element={<Register />} />
                </Route>

                <Route path='/jobseeker' element={<JobseekerLayout />}>
                    <Route path='profile' element={<ProtectedRoute><JobseekerProfile /></ProtectedRoute>} />
                    <Route path='application' element={<ProtectedRoute><JobseekerApplication /></ProtectedRoute>} />
                    <Route path='apply/:id' element={<ProtectedRoute><ApplyNow /></ProtectedRoute>} />
                </Route>

                <Route path='/recruiter' element={<ProtectedRoute><RecruiterMainLayout /></ProtectedRoute>}>
                    <Route path='home' element={<RecruiterHome />} />
                    <Route path='company' element={<Company />} />
                </Route>

                <Route path='/recruiter' element={<ProtectedRoute><RecruiterDashboardLayout /></ProtectedRoute>}>
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='profile' element={<RecruiterProfile />} />
                    <Route path='application' element={<RecruiterApplication />} />
                    <Route path='jobList' element={<JobList />} />
                    <Route path='jobDetail/:id' element={<RecruiterJobDetail />} />
                    <Route path='editJob/:id' element={<EditJob />} />
                    <Route path='editProfile' element={<EditProfile />} />
                    <Route path='postJob' element={<PostJob />} />
                </Route>


                <Route path='/admin' element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                    <Route path='panel' element={<AdminPanel />} />
                    <Route path='jobDetail/:id' element={<AdminJobDetail />} />
                </Route>
                </Routes>
                </UserProvider>
        </div>
    )
}

export default App