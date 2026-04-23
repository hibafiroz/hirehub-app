import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Footer from './components/Footer'
import BrowseJobs from './pages/jobseeker/BrowseJobs'
import UserProvider from './context/UserContext'
import Profile from './pages/jobseeker/Profile'
import ProtectedRoute from './routes/ProtectedRoute'
import Application from './pages/jobseeker/Application'
import Contact from './pages/Contact'
import ApplyNow from './pages/jobseeker/ApplyNow'
import JobseekerLayout from './pages/jobseeker/JobseekerLayout'
import RecruiterLayout from './pages/recruiter/RecruiterLayout'
import RecruiterHome from './pages/recruiter/RecruiterHome'
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'
import Dashboard from './pages/recruiter/Dashboard'

function App() {
    const location = useLocation()
    const hideNavbar=location.pathname.startsWith('/recruiter/dashboard')
    return (
        <div>
            <UserProvider>
                {!hideNavbar && <Navbar/>}
                <Routes>
                    
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    <Route path='/jobseeker' element={<JobseekerLayout/>}>
                        <Route path='browseJobs' element={<BrowseJobs />} />
                        <Route path='contact' element={<Contact />} />
                        <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path='application' element={<ProtectedRoute><Application /></ProtectedRoute>} />
                        <Route path='applyNow' element={<ProtectedRoute><ApplyNow /></ProtectedRoute>} />
                    </Route>

                    <Route path='/recruiter' element={<RecruiterLayout />}>
                        <Route path='home' element={<RecruiterHome />} />

                        <Route path='dashboard' element={<RecruiterDashboard />}>
                            <Route index element={<Dashboard/>} />
                        </Route>
                    </Route>

                </Routes>
                <Footer />
            </UserProvider>
        </div>
    )
}

export default App