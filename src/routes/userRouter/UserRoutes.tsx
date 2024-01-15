import React from "react";
import { Route, Routes } from "react-router";
import About from "../../screens/user/About";
import Help from "../../screens/user/Help";
import Home from "../../screens/user/Home";
import Auth from "../../screens/common/Auth";
import Signup from "../../screens/user/Signup";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      <Route path="/authland" element={<Auth />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default UserRoutes;
