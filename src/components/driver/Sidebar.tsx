import { Link } from "react-router-dom";
import { useSidebarContext } from "../../context/SidebarContext";
import {
  BookDown,
  CalendarCheck,
  FileClock,
  FileText,
  IndianRupee,
  LayoutDashboard,
  Newspaper,
  Star,
  User,
  UserCog,
} from "lucide-react";
import { ElementType } from "react";
import { PageHeaderFirstSection } from "./DriverHeader";

const SideBar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 h-[100vh] ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={LayoutDashboard} title="Dashboard" url="/" />
        <SmallSidebarItem Icon={FileClock} title="RideHistory" url="/" />
        <SmallSidebarItem Icon={IndianRupee} title="Earnings" url="/" />
        <SmallSidebarItem Icon={Star} title="Feedback" url="/" />
        <SmallSidebarItem Icon={UserCog} title="Profile" url="/" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-black opacity-50"
        />
      )}
      <aside
        className={`w-64 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2  ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pb-4 p-2 sticky top-0 bg-primary text-white">
          <PageHeaderFirstSection />
        </div>
        <div className="h-[100vh]">

        <LargeSidebarItem isActive Icon={LayoutDashboard} title="Dashboard" url="/admin" />
        <hr />
        <LargeSidebarItem Icon={FileClock} title="Ride History" url="/" />
        <hr />
        <LargeSidebarItem Icon={IndianRupee} title="Earnings" url="/" />
        <hr />
        <LargeSidebarItem Icon={Star} title="Feedback and Ratings" url="/" />
        <hr />
        <LargeSidebarItem Icon={UserCog} title="Profile" url="/" />
        <hr />
        
        </div>
      </aside>
    </>
  );
};

export default SideBar;

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <Link
      to={url}
      className="py-4 px-1 flex flex-col items-center rounded-lg gap-1"
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </Link>
  );
}

type LargeSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  Icon,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <Link
      to={url}
      className={`w-full flex items-center  gap-4 p-3 hover:bg-secondary ${
        isActive ? "font-bold bg-secondary hover:bg-hover " : undefined
      }`}
    >
      <Icon className="w-6 h-6" />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </Link>
  );
}