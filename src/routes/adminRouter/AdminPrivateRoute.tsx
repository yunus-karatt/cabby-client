import { useSelector } from "react-redux"
import { rootState } from "../../interface/user/userInterface"
import { Navigate, Outlet } from "react-router"


const AdminPrivateRoute = () => {
  const {adminInfo}=useSelector((state:rootState)=>state.adminAuth)
  return (
    adminInfo ? <Outlet />: <Navigate to='/admin/authland' />
  )
}

export default AdminPrivateRoute