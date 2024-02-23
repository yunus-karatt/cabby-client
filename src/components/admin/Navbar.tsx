import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useSidebarContext } from "../../context/SidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import { useState } from "react";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";
import { logout } from "../../services/redux/slices/adminAuthSlice";

const Navbar = () => {
  const { adminInfo } = useSelector((state: rootState) => state.adminAuth);
  const [showDiv, setShowDiv] = useState(false);
  const dispatch=useDispatch()

  const toggleDiv = () => {
    setShowDiv((state) => !state);
  };
  const handleLogOut=async()=>{
   const res= await adminAxios.post(adminApi.logout)
   if(res.data){
    dispatch(logout())
   }
  }

  return (
    <>
      <nav className="flex gap-10 lg:gap-20 justify-between bg-primary text-white  w-full p-2 relative">
        <PageHeaderFirstSection />
        <button
          onMouseEnter={toggleDiv}
          onClick={toggleDiv}
          className="bg-white rounded-full px-5 py-2 text-primary hover:bg-hover"
        >
          {adminInfo.name}
          <ChevronDown className="inline" />
        </button>
        {showDiv && (
          <div
            className="p-4 bg-secondary text-black w-[200px] h-[200px] absolute right-2 top-16 rounded-md z-50"
            onMouseEnter={() => setShowDiv(true)}
            onMouseLeave={() => setShowDiv(false)}
          >
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/admin/profile" className="flex gap-3"><User /> Profile</Link>
              <hr />
              <p  className="flex gap-3 cursor-pointer" onClick={handleLogOut}><LogOut /> Logout</p>
              <hr />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

export function PageHeaderFirstSection() {
  const { toggle } = useSidebarContext();

  return (
    <div className={`gap-4 items-center flex-shrink-0 flex`}>
      <Menu onClick={toggle} />

      <Link
        to={"/admin"}
        className="first-letter:font-medium first-letter:text-xl "
      >
        Cabby
      </Link>
    </div>
  );
}
