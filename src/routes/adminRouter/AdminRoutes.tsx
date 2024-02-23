import { Route, Routes } from "react-router";
import AdminDashboard from "../../screens/admin/AdminDashboard";
import Auth from "../../screens/admin/Auth";
import AdminPrivateRoute from "./AdminPrivateRoute";
import PricingModel from "../../screens/admin/PricingModel";
import Users from "../../screens/admin/Users";
import Requests from "../../screens/admin/Requests";
import Drivers from "../../screens/admin/Drivers";
import AdminPublicRoute from "./AdminPublicRoute";
import Bookings from "../../screens/admin/Bookings";
import Reports from "../../screens/admin/Reports";
import Feedbacks from "../../screens/admin/Feedbacks";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminPublicRoute />}>
        <Route path="/authland" element={<Auth />} />
      </Route>
      <Route path="" element={<AdminPrivateRoute />}>
        <Route index element={<AdminDashboard />} />
        <Route path="/pricingmodel" element={<PricingModel />} />
        <Route path="/userslist" element={<Users />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/driverslist" element={<Drivers />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
