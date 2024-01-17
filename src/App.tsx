import { Route, Routes } from "react-router";
import "./App.css";
import UserRoutes from "./routes/userRouter/UserRoutes";
import DriverRoutes from "./routes/driverRouter/DriverRoutes";
import AdminRoutes from "./routes/adminRouter/AdminRoutes";

function App() {
  return (
    <>
    <Routes >
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/driver/*" element={<DriverRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
    </>
  );
}

export default App;
