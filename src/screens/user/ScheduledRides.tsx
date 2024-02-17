import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/user/Navbar";
import { rootState } from "../../interface/user/userInterface";
import { useEffect, useState } from "react";
import { userAxios } from "../../constraints/axios/userAxios";
import userApi from "../../constraints/api/userApi";
import { ScheduledRideInterfaceWithDriver } from "../../interface/common/common";
import { useNavigate } from "react-router";
import avathar from "../../assets/avatar 1.png";
import { setUserCurrentRideData } from "../../services/redux/slices/userCurrentRideSlice";

const ScheduledRides = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: rootState) => state.userAuth);
  const [scheduledRideData, setScheduledRideData] = useState<
    ScheduledRideInterfaceWithDriver[]
  >([]);

  const handleBookNow = () => {
    navigate("/search-ride");
  };

  const formatDateTime = (dateTimeString: Date) => {
    const options: any = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour format
      timeZone: "Asia/Kolkata", // Set timezone to Indian Standard Time
    };
    return new Date(dateTimeString).toLocaleDateString("en-IN", options);
  };

  const viewOnMap = (rideId: string) => {
    const index = scheduledRideData.findIndex(
      (rideData) => rideData._id === rideId
    );
    dispatch(setUserCurrentRideData(scheduledRideData[index]));
    navigate("/current-ride");
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await userAxios.get(
        `${userApi.getScheduledRideByUserId}/${userInfo._id}`
      );
      console.log({res})
      setScheduledRideData(() => res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="h-lvh bg-secondary">
        <Navbar />
        <div className=" w-full bg-secondary flex flex-col gap-y-5 md:items-center justify-center py-3">
          {scheduledRideData.length ? (
            scheduledRideData.map((data) => {
              return (
                <div
                  key={data._id}
                  className="bg-white h-fit p-2 rounded-md md:w-[700px] w-[90%]"
                >
                  <div className="p-2 flex justify-between">
                    <p className="ms-5 font-bold text-3xl">Ride Details</p>
                    <p
                      className="text-primary bold text-xl cursor-pointer"
                      onClick={() => viewOnMap(data._id)}
                    >
                      View on Map
                    </p>
                  </div>
                  <hr />
                  <div className="flex md:flex-row p-2 flex-col">
                    <div className="md:w-[50%] w-[100%]  ms-5">
                      <p className="text-text-secondary text-lg">From</p>
                      <p className="font-bold text-xl first-letter:capitalize">
                        {data.sourceLocation}
                      </p>
                    </div>
                    <div className="md:w-[50%] ms-5">
                      <p className="text-text-secondary text-lg">To</p>
                      <p className="font-bold text-xl first-letter:capitalize">
                        {data.destinationLocation}
                      </p>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col p-2">
                    <div className="w-[50%] ms-5">
                      <p className="text-text-secondary text-lg">Distance</p>
                      <p className="font-bold text-xl first-letter:capitalize">
                        {data.distance}km
                      </p>
                    </div>
                    <div className="w-[50%] ms-5">
                      <p className="text-text-secondary text-lg">Amount</p>
                      <p className="font-bold text-xl first-letter:capitalize">
                        ₹ {data.price}
                      </p>
                    </div>
                    <div className="w-[50%] ms-5">
                      <p className="text-text-secondary text-lg">Pickup at</p>
                      <p className="font-bold text-xl first-letter:capitalize">
                        {formatDateTime(data.pickUpDate)}
                      </p>
                    </div>
                  </div>
                  <div className="ms-5 mt-5 p-2 font-bold text-3xl">
                    Driver Details
                  </div>
                  <hr />
                  <div className="flex gap-x-8 mt-3 p-2 ms-5">
                    <img
                      className="rounded-full w-[65px] h-[65px]"
                      src={avathar}
                      alt="avatar"
                    />
                    <p className="font-bold text-xl ">
                      {data?.driverData?.firstName}{" "}
                      {data?.driverData?.lastName}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col gap-y-8">
              <p className="font-semibold text-3xl">No Rides Scheduled</p>
              <button
                onClick={handleBookNow}
                className="bg-primary rounded-md px-4 py-2 w-full text-white"
              >
                Shedule Now
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ScheduledRides;
