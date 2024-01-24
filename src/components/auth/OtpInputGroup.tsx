import {  useState } from "react";
import AuthFooter from "./AuthFooter";
import OtpInput from "./OtpInput";
import { CustomWindow } from "../../interface/common/common";
import { useNavigate } from "react-router";
import { userAxios } from "../../constraints/axios/userAxios";
import userApi from "../../constraints/api/userApi";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";
import { toast } from "react-toastify";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import {  setUserCredentials } from "../../services/redux/slices/userAuthSlice";
import { setAdminCredentials } from "../../services/redux/slices/adminAuthSlice";
import { setDriverCredentials } from "../../services/redux/slices/driverAuthSlice";
import Spinner from "../common/Spinner";

const OtpInputGroup = ({
  number,
  role,
  data
}: {
  number: string;
  role: "user" | "admin" | "driver";
  data:{firstName?:string,lastName?:string,email?:string,mobile:string,_id:string,name?:string}|null
}) => {

  const dispatch=useDispatch()
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

  const [error,setError]=useState({isErr:false,message:""})
  const [isLoading,setIsLoading]=useState(false)

  const handleInputChange = (inputId: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [inputId]: value,
    }));
  };

  const handleSubmit = async () => {
    const otp: string =
      inputValues.input1 +
      inputValues.input2 +
      inputValues.input3 +
      inputValues.input4 +
      inputValues.input5 +
      inputValues.input6;

      if(otp.length!==6){
        setError(()=>({isErr:true,message:"OTP MUST HAVE SIX NUMBERS "}))
        return
      }
      
    const customWindow = window as CustomWindow;
    if (customWindow.confirmationResult) {
      setIsLoading(true)
      customWindow.confirmationResult
        .confirm(otp)
        .then(async () => {
          // User signed in successfully.
          // const user = result.user;
          setIsLoading(false)
          if (role === "user") {
            if (!data) {
              navigate("/signup", { state: number });
            } else {
              dispatch(setUserCredentials(data))
              setIsLoading(true)
              const res=await userAxios.post(userApi.loginWithMobile, { mobile: number });
              const {token}=res.data
              localStorage.setItem("userToken",token)
              setIsLoading(false)
              navigate("/");
            }
          }else if(role==="admin"){
            dispatch(setAdminCredentials(data))
            setIsLoading(true)

            const res=await adminAxios.post(adminApi.login,{mobile:number})
            const {token}=res.data
            localStorage.setItem("adminToken",token)
            setIsLoading(false)

            navigate("/admin")
          }else {
            if(!data){
                navigate("/driver/signup",{state:number})
            }else{
              setIsLoading(true)

              const res=await driverAxios.post(driverApi.loginWithMobile,{mobile:number})
              const {token}=res.data
              setIsLoading(false)
              dispatch(setDriverCredentials(data))
              localStorage.setItem("driverToken",token)
              navigate("/driver")
            }
          }
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          setError(()=>({isErr:true,message:"invalid otp"}))
          toast.error("OTP incorrect")
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
      {role==="user" &&<p className="text-2xl font-bold my-5">
        {data
          ? `Welcome back ${data.firstName} ${data.lastName},`
          : "Welcome "}
      </p>}
      {role==="admin" &&<p className="text-2xl font-bold my-5">
        {data
          ? `Welcome back ${data.name},`
          : "Welcome "}
      </p>}
      {role==="driver" &&<p className="text-2xl font-bold my-5">
        {data
          ? `Welcome back ${data.firstName} ${data.lastName},`
          : "Welcome "}
      </p>}
      <p className="text-2xl font-normal">
        Enter the 6 digit code sent to you{" "}
      </p>
      <div className="w-full mt-4 flex gap-2">
        <OtpInput
        error={error.isErr}
          id="input1"
          value={inputValues.input1}
          onValueChange={handleInputChange}
          previousId={null}
          handleSubmit={handleSubmit}
          nextId="input2"
        />
        <OtpInput
         error={error.isErr}
          id="input2"
          value={inputValues.input2}
          onValueChange={handleInputChange}
          previousId="input1"
          handleSubmit={handleSubmit}
          nextId="input3"
        />
        <OtpInput
         error={error.isErr}
          id="input3"
          value={inputValues.input3}
          onValueChange={handleInputChange}
          previousId="input2"
          handleSubmit={handleSubmit}
          nextId="input4"
        />
        <OtpInput
         error={error.isErr}
          id="input4"
          value={inputValues.input4}
          onValueChange={handleInputChange}
          previousId="input3"
          handleSubmit={handleSubmit}
          nextId="input5"
        />
        <OtpInput
         error={error.isErr}
          id="input5"
          value={inputValues.input5}
          onValueChange={handleInputChange}
          previousId="input4"
          handleSubmit={handleSubmit}
          nextId="input6"
        />
        <OtpInput
         error={error.isErr}
          id="input6"
          value={inputValues.input6}
          onValueChange={handleInputChange}
          previousId="input5"
          handleSubmit={handleSubmit}
          nextId={null}
        />
      </div>
      {error.isErr && (
          <p className="mt-1  text-[#ff0000] flex gap-x-2 rounded-sm">
            <AlertCircle /> {error.message}
          </p>
        )}
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white rounded-lg mt-6 p-3 flex justify-center gap-x-3"
      >
       {isLoading && <Spinner/>} Continue
      </button>
      <hr className="w-full border-black my-6" />
      <AuthFooter />
    </div>
  );
};

export default OtpInputGroup;
