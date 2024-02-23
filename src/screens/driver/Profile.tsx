import DriverHeader from "../../components/driver/DriverHeader";
import SideBar from "../../components/driver/Sidebar";

const Profile = () => {
  return (
    <>
      <DriverHeader />
      <div className="flex">
        <SideBar />
        <div className="bg-hover w-full flex flex-col ">
          <div className="flex ms-2 mt-5">
            <div className={`bg-white rounded-t-md px-3 w-[115px] h-8 text-center`}>Profile</div>
            <div className={`bg-secondary rounded-t-md px-3 w-[115px] h-8 text-center`}>Vehicle</div>
          </div>
        <div className="bg-white h-[100vh] mx-2 rounded-b-md p-10 flex justify-center ">
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
