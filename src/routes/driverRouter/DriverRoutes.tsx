import React from "react";
import { Route, Routes } from "react-router";
import DriverDashboard from "../../screens/driver/DriverDashboard";
import DriverAuthLand from "../../screens/driver/DriverAuthLand";
import Signup from "../../screens/driver/Signup";
import VehicleInput from "../../screens/driver/VehicleInput";
import DriverPrivateRoutes from "./DriverPrivateRoutes";
import DriverPublicRoute from "./DriverPublicRoute";

const DriverRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<DriverPublicRoute />}>

      <Route path="/authland" element={<DriverAuthLand />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/vehicle-registration" element={<VehicleInput />} />
      <Route path="" element={<DriverPrivateRoutes />}>
        <Route index element={<DriverDashboard />} />
      </Route>
    </Routes>
  );
};

export default DriverRoutes;
