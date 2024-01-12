import { AlignJustify, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    if (isMediumScreen) {
      setIsOpen(false);
    }
  }, [isMediumScreen]);

  return (
    <nav className="flex justify-between pt-2 mb-6 bg-primary text-white items-center w-full overflow-x-hidden">
      <div className="items-center flex justify-between mx-8 p-2">
        <Link
          to={"/"}
          className="first-letter:font-medium first-letter:text-xl"
        >
          Cabby
        </Link>
      </div>
      <div className="flex gap-6 mx-2 md:mx-4 p-2 justify-center items-center">
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
        <button className="rounded-full px-5 py-2 hover:bg-secondary">
          Login
        </button>
        <button className="bg-secondary rounded-full px-5 py-2 text-primary hover:bg-hover">
          signup
        </button>
        <div className=" md:hidden cursor-pointer me-3 ">
          {isOpen ? (
            <X onClick={toggleMenu} />
          ) : (
            <AlignJustify onClick={toggleMenu} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
