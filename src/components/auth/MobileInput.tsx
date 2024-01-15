import { useEffect, useRef } from "react";
import google from "../../assets/Icon google.svg";
import AuthFooter from "../user/AuthFooter";
import { MobileInputProps } from "../../interface/common/common";

const MobileInput = ({ number, onChange, handleSubmit }:MobileInputProps) => {
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  useEffect(() => {
    
    inputRef.current?.focus();
  }, []);
  
  return (
    <div className="h-3/4 w-[360px] border-2 border-white rounded-lg p-4 mt-8  flex flex-col items-center justify-center">
      <p className="text-2xl font-normal">What's your phone number?</p>
      <div className="w-full mt-4">
        <input
          className="p-3 w-full rounded-lg border-2 border-black"
          type="text"
          placeholder="Enter Phone Number"
          value={number}
          onChange={onChange}
          ref={inputRef}
        />
        <button
          onClick={handleSubmit}
          id="sign-in-button"
          className="w-full bg-primary text-white rounded-lg mt-6 p-3"
        >
          Continue
        </button>
      </div>
      <hr className="w-full border-black my-6" />
      <button className="w-full bg-white rounded-lg p-3 flex items-center justify-center gap-6">
        <img src={google} alt="" /> Continue with Google
      </button>
      <AuthFooter />
    </div>
  );
};

export default MobileInput;
