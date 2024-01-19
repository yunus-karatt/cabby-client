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
import { setCredentials } from "../../services/redux/slices/adminAuthSlice";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";
import { useDispatch } from "react-redux";
import { CustomWindow } from "../../interface/common/common";
import { auth } from "../../services/firebase/config";
import { toast } from "react-toastify";

const Auth: React.FC = () => {
  let admin: Admin | null;
  const [number, setNumber] = useState("+919995868047");
  const [user, setUser] = useState<ConfirmationResult | null>(null);

  const dispatch = useDispatch();

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
    const response = await adminAxios.post(adminApi.getAdminWithMobile, {
      mobile: number,
    });
    if (response.data) {
      admin = response.data;
      console.log(response.data);
      dispatch(setCredentials(admin));
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
          <OtpInputGroup role="admin" number={number} />
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

export default Auth;
