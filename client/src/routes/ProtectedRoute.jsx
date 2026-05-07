import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Navbar from '../components/Navbar'
import AccessDenied from '../components/AccessDenied'
import Loader from '../components/Loader'

function ProtectedRoute({ children }) {
    const { user, loading } = useContext(UserContext)
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        )
    }
    return (
        <div>
            {
                user ? children : (
                    <>
                        <AccessDenied />
                    </>
                )
            }
        </div>
    )
}

export default ProtectedRoute