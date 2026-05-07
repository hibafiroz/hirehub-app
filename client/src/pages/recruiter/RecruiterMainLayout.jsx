import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AnimatedSection from '../../components/AnimatedSection'

function RecruiterMainLayout() {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer/>
    </>
  )
}

export default RecruiterMainLayout