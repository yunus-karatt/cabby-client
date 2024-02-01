import { Circle } from "lucide-react";
import avatar from "../../assets/avatar 1.png";
import { RideData } from "../../interface/driver/driverInterface";
import { useEffect, useState } from "react";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";

const CurrentRideInfo = ({ rideData }: { rideData: RideData }) => {
  
  const [user, setUser] = useState<{firstName:string,lastName:string} | null>(null);
  
  
  //  Get user data
  useEffect(() => {
    const fetchData = async () => {
      const res = await driverAxios.get(
        `${driverApi.getUserData}/${rideData.userId}`
      );
      console.log(res.data)
      setUser(() => res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-5 px-8 flex md:flex-col items-center flex-row gap-8">
      <div className="flex flex-col gap-y-3">
        <h1 className="font-bold md:text-3xl">1 km away</h1>
        <p className="text-text-secondary opacity-80">Pickup {user?.firstName} {user?.lastName}</p>
      </div>
      <div className="hidden md:flex items-center  gap-x-6">
        <img src={avatar} alt="" />
        <p className="font-bold md:text-xl">{user?.firstName} {user?.lastName}</p>
      </div>
      <div>
        <p className="font-bold text-xl ">Ride Details</p>
        <div className="gap-x-5 items-center mt-10 flex ">
          <Circle />
          <div>
            <p className="font-bold text-lg">Pickup</p>
            <p>{rideData.sourceLocation}</p>
          </div>
        </div>
        <div className="gap-x-5 items-center mt-10 flex ">
          <Circle />
          <div>
            <p className="font-bold text-lg">Drop off</p>
            <p>{rideData.destinationLocation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentRideInfo;
