import { AlignJustify, ArrowRight, ChevronDown, Divide, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { rootState } from "../../interface/user/userInterface";

const Navbar = () => {
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const { userInfo } = useSelector((state: rootState) => state.userAuth);

  const [isOpen, setIsOpen] = useState(false);
  const [manageProfile, setManageProfile] = useState(false);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };
  const toggleProfile = () => {
    setManageProfile((open) => !open);
  };
  useEffect(() => {
    if (isMediumScreen) {
      setIsOpen(false);
    }
  }, [isMediumScreen]);

  return (
    <>
      <nav className="flex justify-between pt-2 bg-primary text-white items-center w-full overflow-x-hidden">
        <div className="items-center flex justify-between mx-8 p-2">
          <Link
            to={"/"}
            className="first-letter:font-medium first-letter:text-xl"
          >
            Cabby
          </Link>
        </div>
        <div className="flex gap-6 mx-2 md:mx-4 p-2 justify-center items-center relative">
          <div
            className={`${
              isOpen &&
              "absolute right-0 top-16 text-black bg-hover h-full w-full z-50"
            }`}
          >
            <ul
              className={`${
                isOpen
                  ? "ms-4 text-3xl flex flex-col gap-5"
                  : "md:flex gap-5 hidden"
              }`}
            >
              <li
                className={`cursor-pointer hover:underline ${isOpen && "mt-5"}`}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? "underline" : "")}
                  to={"/about"}
                >
                  {" "}
                  About us
                </NavLink>
              </li>
              <li className="cursor-pointer hover:underline">
                <NavLink
                  className={({ isActive }) => (isActive ? "underline" : "")}
                  to={"/help"}
                >
                  {" "}
                  Help
                </NavLink>
              </li>
            </ul>
          </div>
          {userInfo ? (
            <>
              <button
                className="bg-white rounded-full px-5 py-2 text-primary hover:bg-hover"
                onClick={toggleProfile}
              >
                {userInfo.firstName}
                <ChevronDown className="inline" />
              </button>
            </>
          ) : (
            <>
              <button className="rounded-full px-5 py-2 hover:bg-secondary " onClick={toggleProfile}>
                Login
              </button>

              <button className="bg-secondary rounded-full px-5 py-2 text-primary hover:bg-hover" onClick={toggleProfile}>
                signup
              </button>
            </>
          )}
          <div className=" md:hidden cursor-pointer me-3 ">
            {isOpen ? (
              <X onClick={toggleMenu} />
            ) : (
              <AlignJustify onClick={toggleMenu} />
            )}
          </div>
        </div>
      </nav>
      {manageProfile && (
        <div
          className={`animate-slidedown fixed  top-[66px]
         right-0 w-full h-full text-black bg-white z-50 text-3xl font-medium md:text-5xl`}
        >
          <div className="flex justify-center w-full h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-evenly items-center h-2/4">
              <div className="flex items-center border-b-2 border-black hover:border-primary hover:text-primary p-5">
                <h2 className=" me-5 "><Link to="/authland">Ride With Cabby</Link></h2>
                <ArrowRight />
              </div>
              <div className="flex items-center border-b-2 border-black hover:border-primary hover:text-primary p-5">
                <h2 className=" me-5 ">Drive With Cabby</h2>
                <ArrowRight />
              </div>
              {userInfo &&
              <div className="flex items-center border-b-2 border-black hover:border-primary hover:text-primary p-5">
                <h2 className=" me-5 ">Manage Account</h2>
                <ArrowRight />
              </div>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
