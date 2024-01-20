import { Route, Routes } from "react-router";
import AdminDashboard from "../../screens/admin/AdminDashboard";
import Auth from "../../screens/admin/Auth";
import AdminPrivateRoute from "./AdminPrivateRoute";
import PricingModel from "../../screens/admin/PricingModel";
import Users from "../../screens/admin/Users";

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/authland" element={<Auth />} />
      <Route path="" element={<AdminPrivateRoute />}>
      </Route>
        <Route index element={<AdminDashboard />} />
        <Route path="/pricingmodel" element={<PricingModel />} />
        <Route path="/userslist" element={<Users />} />
    </Routes>
  );
};

export default AdminRoutes;
