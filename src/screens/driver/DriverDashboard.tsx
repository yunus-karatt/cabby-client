import DriverHeader from "../../components/driver/DriverHeader";
import SideBar from "../../components/driver/Sidebar";

const DriverDashboard = () => {
  return (
    <>
      <DriverHeader />
      <div className="flex">
      <SideBar />
      <div className="flex items-center justify-center w-full bg-hover"> 
        <p className="font-bold text-6xl">Driver dashboard</p>
      </div>
      </div>
    </>
  );
};

export default DriverDashboard;
