import React from "react";
import { Route, Routes } from "react-router";
import About from "../../screens/user/About";
import Help from "../../screens/user/Help";
import Home from "../../screens/user/Home";
import Auth from "../../screens/user/Auth";
import Signup from "../../screens/user/Signup";
import PageNotFound from "../../components/common/PageNotFound";
import SearchRide from "../../screens/user/SearchRide";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      <Route path="/authland" element={<Auth />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search-ride" element={<SearchRide />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default UserRoutes;
