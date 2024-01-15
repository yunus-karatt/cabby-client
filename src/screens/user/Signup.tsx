import CabbyNav from "../../components/user/CabbyNav";
import AuthFooter from "../../components/user/AuthFooter";
import React, { useState } from "react";
import { userAxios } from "../../constraints/axios/userAxios";
import userApi from "../../constraints/api/userApi";
import { useLocation } from "react-router";

const Signup = () => {

  const location=useLocation()
  const number=location.state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile:number,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async() => {
    const user = await userAxios.post(userApi.registerUser, formData);
    console.log(user)
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
