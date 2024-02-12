import React, { useState } from "react";
import CabbyNav from "../../components/auth/CabbyNav";
import OtpInputGroup from "../../components/auth/OtpInputGroup";
import MobileInput from "../../components/auth/MobileInput";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
// import { useDispatch } from "react-redux";
import { CustomWindow } from "../../interface/common/common";
import { auth } from "../../services/firebase/config";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
// import { setCredentials } from "../../services/redux/slices/driverAuthSlice";
import { Driver } from "../../interface/driver/driverInterface";

const Auth: React.FC = () => {
  const [driver,setDriver]=useState<Driver >();
  const [number, setNumber] = useState("+919995868047");
  const [user, setUser] = useState<ConfirmationResult | null>(null);

  // const dispatch = useDispatch();

  const sendOtp = () => {
    try {
      (window as CustomWindow).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "sign-in-button",
        {
          size: "invisible",
          callback: () => {},
        }
      );
      const appVerifier = (window as CustomWindow).recaptchaVerifier;
      if (appVerifier) {
        signInWithPhoneNumber(auth, number, appVerifier).then(
          (confirmationResult) => {
            setUser(confirmationResult);
            (window as CustomWindow).confirmationResult = confirmationResult;
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNumber(e.target.value);

  const handleSubmit = async () => {
    
    const response = await driverAxios.post(driverApi.isDriverExist, {
      mobile: number,
    });
    if (response.data) {
      setDriver(response.data);
    } 
    sendOtp();
  };
  return (
    <>
      <CabbyNav />
      <div className="bg-secondary h-lvh flex justify-center items-center">
        {user ? (
          <OtpInputGroup data={driver} role="driver" number={number} />
        ) : (
          <MobileInput
            role="Driver"
            onChange={handleChange}
            number={number}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
};

export default Auth;
