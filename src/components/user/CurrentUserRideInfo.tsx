import { CurrentRideData } from "../../interface/user/userInterface";
import avathar from "../../assets/avatar 1.png";
import { Circle, MessageSquare, MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import Chat from "../common/Chat";

const CurrentUserRideInfo = ({
  rideData,
  rideStatus,
  distance,
}: {
  rideStatus: "started" | "ended" | "initiated";
  rideData?: CurrentRideData ;
  distance?: string;
}) => {
  useEffect(() => console.log({ rideData }), []);

  const otpString = rideData?.otp?.toString();
  const otpArray = otpString?.split("");

  const [showOTP, setShowOTP] = useState<boolean>(true);
  const [showChat, setShowChat] = useState<boolean>(false);
  useEffect(() => {
    if (rideStatus === "started") {
      setShowOTP(() => false);
    }
  }, [rideStatus]);

  return (
    <div className="bg-white h-[100%] overflow-y-scroll overflow-x-hidden rounded-lg flex flex-col p-5 gap-y-3">
      {!showChat && (
        <div className={`p-2`}>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-y-3 my-3">
              <p className="font-bold md:text-3xl">
                {rideStatus === "initiated" && "Your Driver Is"}
                {rideStatus === "started" && "Ride In Progress"}
                {rideStatus === "ended" && "You are reached you destination"}
              </p>
              <p className="font-bold text-xl">{distance} Km away</p>
            </div>
            <MessageSquareText
              onClick={() => setShowChat((prev) => !prev)}
              size={60}
              className="cursor-pointer"
            />
          </div>
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
          <div></div>
          <div className="hidden md:block">
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
                  <Circle /> {rideData?.destinationLocation}kaloor
                </p>
              </div>
            </div>
          </div>
          {showOTP && (
            <div className="mt-5">
              <p className="font-bold text-2xl">OTP</p>
              <p className="text-text-secondary font-semibold">
                Please share your OTP with your Driver
              </p>
              <div className="flex gap-x-1 mt-3">
                {otpArray?.map((otp, i) => {
                  return (
                    <div
                      key={i}
                      className="w-12 h-12 bg-secondary flex items-center justify-center font-bold text-xl"
                    >
                      {otp}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {showChat && (
        <div className="">
          {rideData && (
            <Chat
            isScheduled={rideData?.pickUpDate ? true :false}
              setShowChat={setShowChat}
              role="User"
              rideId={rideData?._id}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentUserRideInfo;
