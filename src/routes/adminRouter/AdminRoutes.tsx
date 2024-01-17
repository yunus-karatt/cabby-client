import { Route, Routes } from 'react-router'
import AdminDashboard from '../../screens/admin/AdminDashboard'
import Auth from '../../screens/admin/Auth'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path='/authland' element={<Auth />} />
    </Routes>
  )
}

export default AdminRoutes