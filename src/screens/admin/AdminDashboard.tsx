import Navbar from "../../components/admin/Navbar";
import SideBar from "../../components/admin/SideBar";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="bg-hover w-full">AdminDashboard</div>
      </div>
    </>
  );
};

export default AdminDashboard;
