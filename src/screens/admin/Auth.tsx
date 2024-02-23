import React, { useState } from "react";
import CabbyNav from "../../components/auth/CabbyNav";
import OtpInputGroup from "../../components/auth/OtpInputGroup";
import MobileInput from "../../components/auth/MobileInput";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Admin } from "../../interface/admin/adminInterface";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";
import { CustomWindow } from "../../interface/common/common";
import { auth } from "../../services/firebase/config";
import { toast } from "react-toastify";

const Auth: React.FC = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [number, setNumber] = useState("+919995868047");
  const [user, setUser] = useState<ConfirmationResult | null>(null);

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
        ).catch(error=>{console.log(error)})
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNumber(e.target.value);

  const handleSubmit = async () => {
    const response = await adminAxios.post(adminApi.getAdminWithMobile, {
      mobile: number,
    });
    if (response.data) {
      setAdmin(response.data);
      sendOtp();
    } else {
      toast.error("Please Check your number");
    }
  };
  return (
    <>
      <CabbyNav />
      <div className="bg-secondary h-lvh flex justify-center items-center">
        {user ? (
          <OtpInputGroup data={admin} role="admin" number={number} />
        ) : (
          <MobileInput
            role="Admin"
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
