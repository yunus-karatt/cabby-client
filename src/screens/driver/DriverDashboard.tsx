import { useEffect, useState } from "react";
import DriverHeader from "../../components/driver/DriverHeader";
import SideBar from "../../components/driver/Sidebar";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import { DashboardData } from "../../interface/driver/driverInterface";
import Spinner from "../../components/common/Spinner";
import ChartComponent from "../../components/driver/ChartComponent";

const DriverDashboard = () => {

  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const { driverInfo } = useSelector((state: rootState) => state.driverAuth);
  const [dashboardDataLoading, setDashboardDataLoading] =
    useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      const res = await driverAxios.get(
        `${driverApi.getDashboardData}/${driverInfo.id}`
      );
      setDashboardData(() => res.data);
      console.log(res.data);
      setDashboardDataLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <DriverHeader />
      <div className="flex">
        <SideBar />
        <div className="w-full  bg-hover ">
          <div className="flex justify-between w-full p-5">
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded h-[200px] w-[250px] font-bold text-2xl gap-y-5 hover:-translate-x-1 hover:shadow-md ">
              <p className="font-thin text-text-secondary">Completed Rides</p>
              {dashboardDataLoading ? (
                <Spinner />
              ) : (
                <p>{dashboardData?.completedRide}</p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded h-[200px] w-[250px] font-bold text-2xl gap-y-5 hover:-translate-x-1 hover:shadow-md">
              <p className="font-thin text-text-secondary">Upcoming Rides</p>
              {dashboardDataLoading ? (
                <Spinner />
              ) : (
                <p>{dashboardData?.upcomingScheduledRide}</p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded h-[200px] w-[250px] font-bold text-2xl gap-y-5 hover:-translate-x-1 hover:shadow-md">
              <p className="font-thin text-text-secondary">Total Earnings</p>
              {dashboardDataLoading ? (
                <Spinner />
              ) : (
                <p>₹ {(dashboardData?.revenue)?.toFixed(2)}</p>
              )}
            </div>
            <div></div>
          </div>
          <div className={`p-5 ${dashboardDataLoading && 'flex justify-center items-center'}`}>
           {dashboardDataLoading? <Spinner /> :<ChartComponent graphData={dashboardData?.quickRideGraphData} />}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default DriverDashboard;
