import { useState } from "react";
import AuthFooter from "../user/AuthFooter";
import OtpInput from "./OtpInput";
import { CustomWindow } from "../../interface/common/common";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";

const OtpInputGroup = ({ number }: { number: string }) => {
  const { userInfo } = useSelector((state: rootState) => state.userAuth);
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

  const handleInputChange = (inputId: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [inputId]: value,
    }));
  };

  const handleSubmit = () => {
    const otp: string =
      inputValues.input1 +
      inputValues.input2 +
      inputValues.input3 +
      inputValues.input4 +
      inputValues.input5 +
      inputValues.input6;

    const customWindow = window as CustomWindow;
    if (customWindow.confirmationResult) {
      customWindow.confirmationResult
        .confirm(otp)
        .then(() => {
          // User signed in successfully.
          // const user = result.user;
          if (!userInfo) {
            navigate("/signup", { state: number });
          } else {
            navigate("/");
          }
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error);
        });
    }
  };

  return (
    <div
      id="OTPInputGroup"
      data-autosubmit="true"
      className="h-3/4 w-[360px] border-2 border-white rounded-lg p-4 mt-8  flex flex-col"
    >
      <p className="text-2xl font-bold my-5">
        {userInfo
          ? `Welcome back ${userInfo.firstName} ${userInfo.lastName},`
          : "Welcome "}
      </p>
      <p className="text-2xl font-normal">
        Enter the 4 digit code sent to you{" "}
      </p>
      <div className="w-full mt-4 flex gap-2">
        <OtpInput
          id="input1"
          value={inputValues.input1}
          onValueChange={handleInputChange}
          previousId={null}
          handleSubmit={handleSubmit}
          nextId="input2"
        />
        <OtpInput
          id="input2"
          value={inputValues.input2}
          onValueChange={handleInputChange}
          previousId="input1"
          handleSubmit={handleSubmit}
          nextId="input3"
        />
        <OtpInput
          id="input3"
          value={inputValues.input3}
          onValueChange={handleInputChange}
          previousId="input2"
          handleSubmit={handleSubmit}
          nextId="input4"
        />
        <OtpInput
          id="input4"
          value={inputValues.input4}
          onValueChange={handleInputChange}
          previousId="input3"
          handleSubmit={handleSubmit}
          nextId="input5"
        />
        <OtpInput
          id="input5"
          value={inputValues.input5}
          onValueChange={handleInputChange}
          previousId="input4"
          handleSubmit={handleSubmit}
          nextId="input6"
        />
        <OtpInput
          id="input6"
          value={inputValues.input6}
          onValueChange={handleInputChange}
          previousId="input5"
          handleSubmit={handleSubmit}
          nextId={null}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white rounded-lg mt-6 p-3"
      >
        Continue
      </button>
      <hr className="w-full border-black my-6" />
      <AuthFooter />
    </div>
  );
};

export default OtpInputGroup;
