import CabbyNav from "../../components/auth/CabbyNav";
import React, { useState } from "react";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../services/firebase/config";
import {  CustomWindow } from "../../interface/common/common";
import OtpInputGroup from "../../components/auth/OtpInputGroup";
import MobileInput from "../../components/auth/MobileInput";
import { userAxios } from "../../constraints/axios/userAxios";
import userApi from "../../constraints/api/userApi";
import { ExistingUser } from "../../interface/user/userInterface";

const AuthPage = () => {
  const [existingUser,setExistingUser]=useState<ExistingUser|null>(null);
  const [number, setNumber] = useState("+919995868047");
  const [user, setUser] = useState<ConfirmationResult | null>(null);
  // const [axiosData, setAxiosData] = useState<AxiosData|null>(null);


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
    const response  = await userAxios.post(userApi.userexist, { mobile:number });
    if(response.data){
      setExistingUser(response.data)
      // dispatch(setCredentials(existingUser))
    }
    // setAxiosData(existingUser)
    sendOtp();
  };

  return (
    <>
      <CabbyNav />
      <div className="bg-secondary h-lvh flex justify-center items-center">
        {user  ? (
          <OtpInputGroup data={existingUser} number={number} role="user" />
        ) : (
          <MobileInput
            role="User"
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
