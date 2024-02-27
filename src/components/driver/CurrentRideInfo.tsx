import { Circle, MessageSquareText } from "lucide-react";
import avatar from "../../assets/avatar 1.png";
import { RideData } from "../../interface/driver/driverInterface";
import { useEffect, useRef, useState } from "react";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import ConfirmPopup from "../common/ConfirmPopup";
import GetInputPop from "../common/GetInputPop";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import Chat from "../common/Chat";

const CurrentRideInfo = ({
  rideData,
  distance,
  pickup,
  isAtPickupPoint,
  setOtpVerified,
  otpVerified,
  rideFinished,
}: {
  rideData: RideData;
  distance?: string;
  pickup: boolean;
  isAtPickupPoint: boolean;
  setOtpVerified: React.Dispatch<React.SetStateAction<boolean>>;
  otpVerified: boolean;
  rideFinished?: boolean;
}) => {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const [isconfirmPopup, setIsConfirmPopup] = useState<boolean>(false);
  const [inputPop, setInputPop] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>("");
  const { socketIO } = useSelector((state: rootState) => state.driverSocket);
  const otpRef = useRef<HTMLInputElement>(null);
  const [otpInput, setOtpInput] = useState<number | null>(null);
  const [otpError, setOtpError] = useState({ isError: false, message: "" });
  const [showChat, setShowChat] = useState<boolean>(false);

  const handleCancelRide = async () => {
    setIsConfirmPopup(() => true);
  };

  const handleCancelSubmission = async () => {
    console.log({ socketIO }, "here");
    socketIO?.emit("cancelRideBydriver", { hell: "hai" });
  };

  const verifyOTP = async () => {
    const stringOTP = otpInput?.toString();
    if (stringOTP?.length != 6) {
      setOtpError(() => ({
        isError: true,
        message: "OTP must be Six Numbers",
      }));
      return;
    }
    if (!otpInput) {
      setOtpError(() => ({ isError: true, message: "Please Enter OTP" }));
      return;
    }
    try {
      const res = await driverAxios.post(driverApi.verifyOTP, {
        rideId: rideData._id,
        OTP: otpInput,
      });
      if (res.data) {
        setOtpVerified(true);
        socketIO?.emit("otpVerified", {
          userId: rideData.userId,
          rideId: rideData._id,
        });
      } else {
        setOtpError(() => ({ isError: true, message: "OTP doesn't match" }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isAtPickupPoint && otpRef.current?.focus();
  }, [isAtPickupPoint]);

  //  Get user data
  useEffect(() => {
    const fetchData = async () => {
      const res = await driverAxios.get(
        `${driverApi.getUserData}/${rideData.userId}`
      );
      setUser(() => res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="p-5 px-8 flex md:flex-col items-center flex-row gap-8 min-h-full">
        {!showChat && (
          <>
            {" "}
            <div className="flex  justify-between">
              <div className="flex flex-col gap-y-3">
                {!rideFinished ? (
                  <h1 className="font-bold md:text-3xl">
                    {otpVerified ? (
                      <>
                        Ride in Progress..
                        <br />
                        {distance}KM
                      </>
                    ) : !isAtPickupPoint ? (
                      distance + " " + "km away"
                    ) : (
                      "Waiting for the Rider"
                    )}
                  </h1>
                ) : (
                  <h1 className="font-bold md:text-3xl">Reached Destination</h1>
                )}
                <p className="text-text-secondary opacity-80">
                  Pickup {user?.firstName} {user?.lastName}
                </p>
              </div>
              <div>
                <MessageSquareText
                  onClick={() => setShowChat((prev) => !prev)}
                  size={50}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="hidden md:flex items-center  gap-x-6">
              <img src={avatar} alt="" />
              <p className="font-bold md:text-xl">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <p className="font-bold text-xl ">Ride Details</p>
              <div
                className={`gap-x-5 items-center mt-10 flex rounded p-3 ${
                  pickup && "bg-secondary"
                }`}
              >
                <Circle />
                <div>
                  <p className="font-bold text-lg">Pickup</p>
                  <p>{rideData.sourceLocation}</p>
                </div>
              </div>
              <div
                className={`gap-x-5 items-center mt-10 flex rounded p-3 ${
                  !pickup && "bg-secondary"
                }`}
              >
                <Circle />
                <div>
                  <p className="font-bold text-lg">Drop off</p>
                  <p>{rideData.destinationLocation}</p>
                </div>
              </div>
              {isAtPickupPoint && !otpVerified && (
                <div className="flex flex-col gap-y-3">
                  <p className="font-bold text-lg">OTP</p>
                  <input
                    onChange={(e) => {
                      setOtpInput(e.target.valueAsNumber);
                      setOtpError(() => ({ isError: false, message: "" }));
                    }}
                    ref={otpRef}
                    value={otpInput ? otpInput : ""}
                    type="number"
                    name="otpInput"
                    id="otpInput"
                    className="border-2 w-full p-2 rounded"
                  />
                  {otpError.isError && (
                    <p className="text-danger font-semibold font-md">
                      {otpError.message}{" "}
                    </p>
                  )}
                  <button
                    onClick={verifyOTP}
                    className="bg-primary mt-3 rounded-md w-full p-1 text-white"
                  >
                    Start Ride
                  </button>
                </div>
              )}
              {pickup && <div className="text-center mt-5">
                <button
                  onClick={handleCancelRide}
                  className="border-2 py-2 px-10 border-danger rounded-full "
                >
                  Cancel Ride
                </button>
              </div>}
            </div>
          </>
        )}
        {
          showChat && <Chat setShowChat={setShowChat} role={'Driver'} rideId={rideData._id} isScheduled={rideData.pickUpDate ? true :false} />
        }
      </div>
      {isconfirmPopup && (
        <ConfirmPopup
          setConfirmPop={setIsConfirmPopup}
          setNextPopup={setInputPop}
        />
      )}
      {inputPop && (
        <GetInputPop
          input={cancelReason}
          setInput={setCancelReason}
          setInputPop={setInputPop}
          submit={handleCancelSubmission}
        />
      )}
    </>
  );
};

export default CurrentRideInfo;
