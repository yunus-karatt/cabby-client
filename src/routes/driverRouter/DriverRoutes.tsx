


import React from 'react'
import { Route, Routes } from 'react-router'
import DriverDashboard from '../../screens/driver/DriverDashboard'
import DriverAuthLand from '../../screens/driver/DriverAuthLand'
import Signup from '../../screens/driver/Signup'
import VehicleInput from '../../screens/driver/VehicleInput'

const DriverRoutes:React.FC = () => {
  return (
    <Routes>
      <Route index element={<DriverDashboard />} />
      <Route path='/authland' element={<DriverAuthLand />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/vehicle-registration' element={<VehicleInput />} />
    </Routes>
  )
}

export default DriverRoutes