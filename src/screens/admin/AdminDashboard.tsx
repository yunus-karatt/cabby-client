import { useEffect, useState } from "react";
import DashboardCounts from "../../components/admin/DashboardCounts";
import Navbar from "../../components/admin/Navbar";
import SideBar from "../../components/admin/SideBar";
import { GraphData } from "../../interface/driver/driverInterface";
import Spinner from "../../components/common/Spinner";
import ChartComponent from "../../components/driver/ChartComponent";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";

const AdminDashboard = () => {
  const [graphData, setGraphData] = useState<GraphData[]>();
  const [scheduledData, setScheduledData] = useState<GraphData[]>();
  const [percentages, setPercentages] = useState<{
    ridingDriversPercentage: number;
    activeDriversPercentage: number;
    offlineDriversPercentage: number;
  }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const res = await adminAxios.get(adminApi.getGraphData);
      setGraphData(res.data.adminGraphData);
      setScheduledData(() => res.data.scheduledGraphData);
      setPercentages(()=>res.data.percentages)
      setLoading(false);
      } catch (error) {
        console.log(error)
      }
      
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="bg-hover w-full p-5">
          <DashboardCounts />
          <div className="w-full flex gap-x-2">
            <div className="w-1/2 mt-5">
              {loading ? (
                <div className="w-full flex justify-center">
                  <Spinner />{" "}
                </div>
              ) : (
                <ChartComponent graphData={graphData} />
              )}
            </div>
            <div className="w-1/2 mt-5">
              {loading ? (
                <div className="w-full flex justify-center">
                  <Spinner />{" "}
                </div>
              ) : (
                <ChartComponent isScheduled graphData={scheduledData} />
              )}
            </div>
          </div>

          <div className="h-[500px] bg-white mt-5 rounded-md w-full p-2">
            <h1 className="ms-12 font-bold text-2xl">Drivers Live Status</h1>
            <div className="flex items-center justify-evenly h-full w-full">
              <div className="relative flex items-center justify-center w-2/4 h-full">
                <div className="w-52 h-52 rounded-full bg-primary absolute left-20 text-center font-bold flex justify-center items-center text-white text-xl">
                  {percentages?.ridingDriversPercentage}%
                </div>
                <div className=" w-48 h-48 rounded-full bg-black absolute top-20 left-52 border-2 border-white flex justify-center items-center text-white font-bold">
                  {percentages?.activeDriversPercentage}%
                </div>
                <div className="w-44 h-44 rounded-full bg-gray-700 absolute  left-56 top-48 border-2 border-white flex justify-center items-center text-white font-bold">
                  {percentages?.offlineDriversPercentage}%
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center gap-x-3">
                  <div className="rounded-full bg-primary w-3 h-3"></div>
                  <p className="font-medium">Active Trips</p>
                </div>
                <div className="flex items-center gap-x-3">
                  <div className="rounded-full bg-black w-3 h-3"></div>
                  <p className="font-medium">Online Driver</p>
                </div>
                <div className="flex items-center gap-x-3">
                  <div className="rounded-full bg-gray-700 w-3 h-3"></div>
                  <p className="font-medium">Offline Driver</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
