import { useEffect, useState } from "react";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";
import { DashboardCount } from "../../interface/admin/adminInterface";
import Spinner from "../../components/common/Spinner";
const DashboardCounts = () => {
  const [dashboardCounts, setDashboardCounts] = useState<DashboardCount>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await adminAxios.get(adminApi.getDashboardCount);
        setDashboardCounts(() => res.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-evenly">
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded h-[200px] w-[250px] font-bold text-2xl gap-y-5 hover:-translate-x-1 hover:shadow-md ">
        <p className="font-thin text-text-secondary">Total Rides</p>
        {loading ? <Spinner /> : <p>{dashboardCounts?.completedCount}</p>}
      </div>
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded h-[200px] w-[250px] font-bold text-2xl gap-y-5 hover:-translate-x-1 hover:shadow-md ">
        <p className="font-thin text-text-secondary">Cancelled Rides</p>
        {loading ? <Spinner /> : <p>{dashboardCounts?.cancelledCount}</p>}
      </div>
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded h-[200px] w-[250px] font-bold text-2xl gap-y-5 hover:-translate-x-1 hover:shadow-md ">
        <p className="font-thin text-text-secondary">Active Rides</p>
        {loading ? <Spinner /> : <p>{dashboardCounts?.activeRides}</p>}
      </div>
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded h-[200px] w-[250px] font-bold text-2xl gap-y-5 hover:-translate-x-1 hover:shadow-md ">
        <p className="font-thin text-text-secondary">Total Revenue</p>
        {loading ? <Spinner /> : <p>₹{dashboardCounts?.totalRevenue}</p>}
      </div>
    </div>
  );
};

export default DashboardCounts;
