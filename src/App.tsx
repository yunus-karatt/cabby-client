import { Route, Routes } from "react-router";
import "./App.css";
import UserRoutes from "./routes/userRouter/UserRoutes";
import DriverRoutes from "./routes/driverRouter/DriverRoutes";
import AdminRoutes from "./routes/adminRouter/AdminRoutes";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  return (
    <>
      <SidebarProvider>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/driver/*" element={<DriverRoutes />} />
          
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </SidebarProvider>
    </>
  );
}

export default App;
