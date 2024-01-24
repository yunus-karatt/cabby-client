import { useSelector } from "react-redux"
import { rootState } from "../../interface/user/userInterface"
import { Navigate, Outlet } from "react-router"

const DriverPublicRoute = () => {
  const {driverInfo}=useSelector((state:rootState)=>state.driverAuth)
  
  return(
    driverInfo? <Navigate to="/driver" />:<Outlet />
  )
  
}

export default DriverPublicRoute