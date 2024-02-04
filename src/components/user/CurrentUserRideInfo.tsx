import { CurrentRideData } from "../../interface/user/userInterface";
import avathar from "../../assets/avatar 1.png";
import { Circle, MessageSquare } from "lucide-react";

const CurrentUserRideInfo = ({ rideData }: { rideData?: CurrentRideData }) => {
  
  const otpString=rideData?.otp.toString()
  const otpArray=otpString?.split('')
  return (
    <div className=" bg-white h-[100%] overflow-y-scroll overflow-x-hidden rounded-lg flex flex-col p-5 gap-y-3">
      <div className="p-2">
        <p className="font-semibold text-xl">Driver</p>
        <div className="border-2 border-black p-3 mt-5 flex justify-between items-center">
          <img
            className="rounded-full w-[65px] h-[65px]"
            src={avathar}
            alt="avatar"
          />
          <p className="text-xl font-bold">
            {rideData?.driverData.firstName} {rideData?.driverData.lastName}
          </p>
          <MessageSquare className="cursor-pointer" />
        </div>
        <p className="font-semibold text-xl mt-5">Cab</p>

        <div className="border-2 border-black p-3 mt-5 flex justify-between items-center">
          <img
            className="rounded-full w-[65px] h-[65px]"
            src={rideData?.driverData.cabModel[0].image || avathar}
            alt="cab-photo"
          />
          <p className="text-xl font-bold">
            {rideData?.driverData.cabModel[0].cabType}
          </p>
          <p className="text-xl font-bold">₹{rideData?.price}</p>
        </div>
        <div className="mt-5">
          <p className="font-bold text-2xl">Pickup</p>
          <div className="bg-secondary p-2 mt-3 rounded-md">
            <p className="flex gap-x-3 font-semibold">
              <Circle /> {rideData?.sourceLocation}kaloor
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="font-bold text-2xl">Dropoff</p>
          <div className="bg-secondary p-2 mt-3 rounded-md">
            <p className="flex gap-x-3 font-semibold">
              <Circle /> {rideData?.sourceLocation}kaloor
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="font-bold text-2xl">OTP</p>
          <p className="text-text-secondary font-semibold">
            Please share your OTP with your Driver
          </p>
          <div className="flex gap-x-1 mt-3">
            {otpArray?.map((otp,i)=>{
              return(
                <div key={i} className="w-12 h-12 bg-secondary flex items-center justify-center font-bold text-xl">{otp}</div>

              )
            })}
            {/* <div className="w-12
             h-12 bg-secondary"></div>
            <div className="w-12 h-12 bg-secondary"></div>
            <div className="w-12 h-12 bg-secondary"></div>
            <div className="w-12 h-12 bg-secondary"></div>
            <div className="w-12 h-12 bg-secondary"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserRideInfo;