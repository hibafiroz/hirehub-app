import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
      <div>
      <Navbar />
        <Outlet />
    </div>
  )
}

export default AuthLayout