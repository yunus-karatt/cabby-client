import { useEffect, useState } from "react";
import { RideData } from "../../interface/driver/driverInterface";
import ProgressRing from "./ProgressRing";

const RideRequestPopup = ({
  rideData,
  acceptRideRequest,
  rejectRideRequest,
}: {
  rideData: RideData;
  acceptRideRequest: Function;
  rejectRideRequest: Function;
}) => {
  const [counter, setCounter] = useState<number>(15);
  const [formattedDate, setFormattedDate] = useState<string>();
  const [formattedTime, setFormattedTime] = useState<string>();
  const handleRejection = () => {
    rejectRideRequest();
  };
  const handleRideAccept = () => {
    acceptRideRequest();
  };

  useEffect(() => {
    if (rideData.pickUpDate) {
      const date = new Date(rideData.pickUpDate);

      const formattedDate = date.toLocaleDateString("en-IN");
      setFormattedDate(formattedDate);
      const formattedTime = date.toLocaleTimeString("en-IN");
      setFormattedTime(formattedTime);
    }
  }, []);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);

    if (counter === 0) {
      rejectRideRequest(true);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [counter]);

  return (
    <div className="p-3 py-8 w-[400px] min-h-[500px] bg-white absolute z-50 left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">New Ride Request</h1>
        <ProgressRing counter={counter} />
      </div>
      <hr className="mt-3" />
      <div className="flex p-3  gap-y-2 w-full justify-between">
        <div className="flex flex-wrap  gap-3 gap-y-6 justify-start w-full">
          <div className=" flex flex-col gap-y-2">
            <p className="text-text-secondary opacity-80">From</p>
            <p className="font-bold">{rideData?.sourceLocation}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="text-text-secondary opacity-80">To</p>
            <p className="font-bold">{rideData?.destinationLocation}</p>
          </div>
          <div className="w-[45%] flex flex-col gap-y-2">
            <p className="text-text-secondary opacity-80">Distance</p>
            <p className="font-bold">{rideData?.distance}</p>
          </div>
          <div className="w-[45%] flex flex-col gap-y-2">
            <p className="text-text-secondary opacity-80">Duration</p>
            <p className="font-bold">{rideData?.duration} MIN</p>
          </div>
          <div className="w-[45%] flex flex-col gap-y-2">
            <p className="text-text-secondary opacity-80">Amount</p>
            <p className="font-bold">₹ {rideData?.price}</p>
          </div>
          {rideData.pickUpDate && (
            <div className="w-[45%] flex flex-col gap-y-2">
              <p className="text-text-secondary opacity-80">pickup Time</p>
              <p className="font-bold">{formattedDate}</p>
              <p className="font-bold">{formattedTime}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-x-5">
        <button
          className="px-6 py-2 rounded-md font-bold mt-3 bg-success text-white hover:bg-opacity-50 "
          onClick={handleRideAccept}
        >
          Accept
        </button>
        <button
          className="px-6 py-2 rounded-md font-bold mt-3 bg-danger text-white hover:bg-opacity-50"
          onClick={handleRejection}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RideRequestPopup;
