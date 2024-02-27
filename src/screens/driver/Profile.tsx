import { useEffect, useState } from "react";
import DriverHeader from "../../components/driver/DriverHeader";
import ProfileData from "../../components/driver/ProfileData";
import SideBar from "../../components/driver/Sidebar";
import VehicleData from "./VehicleData";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import {  DriverProfile } from "../../interface/driver/driverInterface";
import Spinner from "../../components/common/Spinner";

const Profile = () => {
  const [isProfileView, setIsProfileView] = useState(true);
  const { driverInfo } = useSelector((state: rootState) => state.driverAuth);
  const [driver, setDrivers] = useState<DriverProfile>()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await driverAxios.get(
          `${driverApi.getProfile}/${driverInfo.id}`
        );
        setDrivers(()=>res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, []);

  return (
    <>
      <DriverHeader />
      <div className="flex">
        <SideBar />
        <div className="bg-hover w-full flex flex-col ">
          <div className="flex ms-2 mt-5">
            <div
              onClick={() => setIsProfileView(true)}
              className={`${
                isProfileView ? "bg-white" : "bg-secondary"
              } rounded-t-md p-3 w-[115px] h-8 text-center flex justify-center items-center font-semibold cursor-pointer`}
            >
              Profile
            </div>
            <div
              onClick={() => setIsProfileView(false)}
              className={`${
                !isProfileView ? "bg-white" : "bg-secondary"
              } rounded-t-md p-3 w-[115px] h-8 text-center flex justify-center items-center font-semibold cursor-pointer`}
            >
              Documents
            </div>
          </div>
          <div className="bg-white h-full mx-2 rounded-b-md p-10 flex flex-col gap-y-20 items-center">
            {driver ? isProfileView ? <ProfileData driverData={driver} /> : <VehicleData driverData={driver} /> :<Spinner /> }
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Profile;
