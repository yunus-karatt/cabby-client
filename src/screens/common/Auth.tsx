import CabbyNav from "../../components/user/CabbyNav";
import React, { useState } from "react";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../services/firebase/config";
import { AxiosData, CustomWindow } from "../../interface/common/common";
import OtpInputGroup from "../../components/auth/OtpInputGroup";
import MobileInput from "../../components/auth/MobileInput";
import { userAxios } from "../../constraints/axios/userAxios";
import userApi from "../../constraints/api/userApi";

const AuthPage = () => {
  let existingUser;
  const [number, setNumber] = useState("+91");
  const [user, setUser] = useState<ConfirmationResult | null>(null);
  const [axiosData, setAxiosData] = useState<AxiosData|null>(null);

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
            // ...
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
    existingUser = await userAxios.post(userApi.userexist, { number });
    setAxiosData(existingUser.data)
    sendOtp();
  };

  return (
    <>
      <CabbyNav />
      <div className="bg-secondary h-lvh flex justify-center items-center">
        {user ? (
          <OtpInputGroup user={axiosData} number={number}/>
        ) : (
          <MobileInput
            onChange={handleChange}
            number={number}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
};

export default AuthPage;
