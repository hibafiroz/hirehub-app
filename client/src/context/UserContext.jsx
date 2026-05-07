import { useEffect } from "react"
import { createContext, useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"

export const UserContext=createContext()

function UserProvider({ children }) {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logout = async () => {
    try {
      await API.post('/authentication/logout')
      setUser(null)
      navigate('/')
    } catch (err) {
      console.log(err.data?.message)
    } 
  }

  useEffect(() => {
    const userFetch = async () => {
      try {
        const res = await API.get('/authentication/userDetails')
        const data=res.data.user
        setUser(data)
        console.log()
      } catch (err) {
        console.log(err.response?.data)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    userFetch()
  },[])


  return (
    <UserContext.Provider value={{ user, setUser, logout, loading, setLoading }}>
      {children}
      </UserContext.Provider>
  )
}

export default UserProvider