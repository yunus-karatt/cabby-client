import { useSelector } from 'react-redux'
import { rootState } from '../../interface/user/userInterface'
import { Navigate, Outlet } from 'react-router'

const UserPrivateRoutes = () => {
  const {userInfo}=useSelector((state:rootState)=>state.userAuth)
  return (
    userInfo ? <Outlet /> : <Navigate to="/authland"/>
    )
}

export default UserPrivateRoutes