import { useEffect, useRef, useState } from "react";
import AuthFooter from "./AuthFooter";
import { MobileInputProps } from "../../interface/common/common";
import Oauth from "./Oauth";
import { AlertCircle } from "lucide-react";
import Spinner from "../common/Spinner";

const MobileInput = ({
  number,
  onChange,
  handleSubmit,
  role,
  isLoading
}: MobileInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState(false);
  const validatePhoneNumber = (phoneNumber: string) => {
    const trimmedPhoneNumber = phoneNumber.trim();

    const phoneRegex = /^\+91\d{10}$/;

    if (!phoneRegex.test(trimmedPhoneNumber)) {
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    onChange(e);
  };

  const handleClick = () => {
    if (validatePhoneNumber(number)) handleSubmit();
    else setError(true);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={`h-3/4 w-[360px] border-2 border-white rounded-lg p-4 mt-8  flex flex-col items-center justify-center ${
        error && "border-[#ff0000]"
      }`}
    >
      <p className="text-2xl font-normal">What's your phone number?</p>
      <div className="w-full mt-4">
        <input
          className={`p-3 w-full rounded-lg border-2 border-black ${
            error && "border-[#ff0000]"
          }`}
          type="text"
          placeholder="Enter Phone Number"
          value={number}
          onChange={handleChange}
          ref={inputRef}
        />
        {error && (
          <p className="mt-1  text-[#ff0000] flex gap-x-2 rounded-sm">
            <AlertCircle /> Invalid phone number
          </p>
        )}
        <button
          onClick={handleClick}
          id="sign-in-button"
          className={`w-full bg-primary text-white rounded-lg mt-6 p-3 flex justify-center gap-x-3 ${
            error ? "bg-opacity-50" : ""
          }`}
        >
         {isLoading && <Spinner />} Continue
        </button>
      </div>
      <hr className="w-full border-black my-6" />
      {role!=="Admin" && <Oauth role={role}/>}
      <AuthFooter />
    </div>
  );
};

export default MobileInput;
