import CabbyNav from "../../components/auth/CabbyNav";
import AuthFooter from "../../components/auth/AuthFooter";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { useDispatch } from "react-redux";
import { setDriverCredentials } from "../../services/redux/slices/driverAuthSlice";

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
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    setErrors((prev) => {
      return {
        ...prev,
        [e.target.name]: "",
      };
    });
  };

  const handleSubmit = async () => {
    const validationErrors = {
      firstName: "",
      lastName: "",
      email: "",
    };
    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      validationErrors.lastName = "Last Name is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid email address";
    }

    if (validationErrors.firstName || validationErrors.lastName || validationErrors.email) {
      setErrors(validationErrors);
      return;
    }
    try {
      const driver = await driverAxios.post(driverApi.register, formData);
      dispatch(setDriverCredentials(driver.data));
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
              className={`p-3 w-full rounded-lg border-2 border-black my-2 ${errors.firstName && "border border-danger"}`}
              type="text"
              placeholder="Enter Your First Name"
            />
            <p className="text-danger">{errors.firstName}</p>
            <label htmlFor="lastName">Last Name</label>

            <input
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
              id="lastName"
              className={`p-3 w-full rounded-lg border-2 border-black my-2 ${errors.lastName && "border border-danger"}`}
              type="text"
              placeholder="Enter Last Name"
            />
            <p className="text-danger">{errors.lastName}</p>
            <label htmlFor="email">Email</label>
            <input
              value={formData.email}
              onChange={handleChange}
              name="email"
              id="email"
              className={`p-3 w-full rounded-lg border-2 border-black my-2 ${errors.email && "border border-danger"}`}
              type="email"
              placeholder="Enter Your Email"
            />
            <p className="text-danger">{errors.email}</p>
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
