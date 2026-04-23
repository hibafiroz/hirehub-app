import React, { useContext } from 'react'
import Login from '../pages/auth/Login'
import { UserContext } from '../context/UserContext'

function ProtectedRoute({ children }) {
    const {user}=useContext(UserContext)
  return (
      <div>
          {
              user?children:<Login/>
          }
    </div>
  )
}

export default ProtectedRoute