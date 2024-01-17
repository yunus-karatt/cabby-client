


import React from 'react'
import { Route, Routes } from 'react-router'
import DriverDashboard from '../../screens/driver/DriverDashboard'
import DriverAuthLand from '../../screens/driver/DriverAuthLand'

const DriverRoutes:React.FC = () => {
  return (
    <Routes>
      <Route index element={<DriverDashboard />} />
      <Route path='/auth' element={<DriverAuthLand />} />
    </Routes>
  )
}

export default DriverRoutes