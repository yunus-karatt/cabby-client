

import { useSelector } from "react-redux"
import { rootState } from "../../interface/user/userInterface"
import { Navigate, Outlet } from "react-router"




const AdminPublicRoute = () => {
  const {adminInfo}=useSelector((state:rootState)=>state.adminAuth)
  return (
    adminInfo? <Navigate to="/admin" />:<Outlet />
  )
}

export default AdminPublicRoute