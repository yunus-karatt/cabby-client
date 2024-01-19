import CabbyNav from "../../components/auth/CabbyNav";
import AuthFooter from "../../components/user/AuthFooter";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../services/redux/slices/driverAuthSlice";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const number = location.state;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: number,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const driver = await driverAxios.post(driverApi.register, formData);
      dispatch(setCredentials(driver.data));
      navigate("/driver/vehicle-registration");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CabbyNav />
      <div className="bg-secondary h-lvh flex justify-center items-center">
        <div className="h-3/4 w-[360px] border-2 border-white rounded-lg p-4 mt-8  flex flex-col items-center justify-center">
          <div className="w-full mt-4">
            <label htmlFor="firstName">First Name</label>
            <input
              value={formData.firstName}
              onChange={handleChange}
              id="firstName"
              name="firstName"
              className="p-3 w-full rounded-lg border-2 border-black my-2"
              type="text"
              placeholder="Enter Your First Name"
            />
            <label htmlFor="lastName">Last Name</label>

            <input
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
              id="lastName"
              className="p-3 w-full rounded-lg border-2 border-black my-2"
              type="text"
              placeholder="Enter Last Name"
            />
            <label htmlFor="email">Email</label>
            <input
              value={formData.email}
              onChange={handleChange}
              name="email"
              id="email"
              className="p-3 w-full rounded-lg border-2 border-black my-2"
              type="email"
              placeholder="Enter Your Email"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white rounded-lg mt-6 p-3"
            >
              Continue
            </button>
          </div>
          <hr className="w-full border-black my-6" />
          <AuthFooter />
        </div>
      </div>
    </>
  );
};

export default Signup;
