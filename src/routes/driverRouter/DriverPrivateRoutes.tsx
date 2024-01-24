

import { useSelector } from "react-redux"
import { rootState } from "../../interface/user/userInterface"
import { Navigate, Outlet } from "react-router"



const DriverPrivateRoutes = () => {

  const {driverInfo}=useSelector((state:rootState)=>state.driverAuth)
  return(
    driverInfo? <Outlet />: <Navigate to="/driver/authland" />
  )

}

export default DriverPrivateRoutes