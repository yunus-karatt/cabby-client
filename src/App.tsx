import { Route, Routes } from "react-router";
import "./App.css";
import UserRoutes from "./routes/userRouter/UserRoutes";

function App() {
  return (
    <>
    <Routes >
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
    </>
  );
}

export default App;
