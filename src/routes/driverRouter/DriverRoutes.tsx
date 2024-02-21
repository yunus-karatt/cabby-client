import React from "react";
import { Route, Routes } from "react-router";
import DriverDashboard from "../../screens/driver/DriverDashboard";
import DriverAuthLand from "../../screens/driver/DriverAuthLand";
import Signup from "../../screens/driver/Signup";
import VehicleInput from "../../screens/driver/VehicleInput";
import DriverPrivateRoutes from "./DriverPrivateRoutes";
import DriverPublicRoute from "./DriverPublicRoute";
import CurrentRide from "../../screens/driver/CurrentRide";
import ScheduledRideList from "../../screens/driver/ScheduledRideList";
import RideHistory from "../../screens/driver/RideHistory";
import Earnings from "../../screens/driver/Earnings";
import Feedbacks from "../../screens/driver/Feedbacks";

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
        <Route path="/current-ride" element={<CurrentRide />} />
        <Route path="/list-scheduledride" element={<ScheduledRideList />} />
        <Route path="/ride-history" element={<RideHistory />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
      </Route>
    </Routes>
  );
};

export default DriverRoutes;
