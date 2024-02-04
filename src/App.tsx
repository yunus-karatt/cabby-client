import { Route, Routes } from "react-router";
import "./App.css";
import UserRoutes from "./routes/userRouter/UserRoutes";
import DriverRoutes from "./routes/driverRouter/DriverRoutes";
import AdminRoutes from "./routes/adminRouter/AdminRoutes";
import { SidebarProvider } from "./context/SidebarContext";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <>
      <SidebarProvider>
        <Routes>
          <Route
            path="/*"
            element={
              <ErrorBoundary>
                <UserRoutes />
              </ErrorBoundary>
            }
          />

          <Route
            path="/driver/*"
            element={
              <ErrorBoundary>
                <DriverRoutes />
              </ErrorBoundary>
            }
          />

          <Route
            path="/admin/*"
            element={
              <ErrorBoundary>
                <AdminRoutes />
              </ErrorBoundary>
            }
          />
        </Routes>
      </SidebarProvider>
    </>
  );
}

export default App;
