import { Link, useLocation } from "react-router-dom";
import { useSidebarContext } from "../../context/SidebarContext";
import {
  CalendarCheck,
  FileClock,
  IndianRupee,
  LayoutDashboard,
  Star,
  UserCog,
} from "lucide-react";
import { ElementType } from "react";
import { PageHeaderFirstSection } from "./DriverHeader";

const SideBar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  const location=useLocation()
  const isActive = (url: string): boolean => {
    return location.pathname === url;
  };
 
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 h-[100vh] ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={LayoutDashboard} title="Dashboard" url="/driver" />
        <SmallSidebarItem Icon={CalendarCheck} title="Scheduled" url="/driver/list-scheduledride" />
        <SmallSidebarItem Icon={FileClock} title="RideHistory" url="/driver/ride-history" />
        <SmallSidebarItem Icon={IndianRupee} title="Earnings" url="/driver/earnings" />
        <SmallSidebarItem Icon={Star} title="Feedback" url="/driver/feedbacks" />
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

        <LargeSidebarItem isActive={isActive("/driver")} Icon={LayoutDashboard} title="Dashboard" url="/driver" />
        <hr />
        <LargeSidebarItem isActive={isActive("/driver/list-scheduledride")} Icon={CalendarCheck} title="Scheduled Rides" url="/driver/list-scheduledride" />
        <hr />
        <LargeSidebarItem isActive={isActive("/driver/ride-history")} Icon={FileClock} title="Ride History" url="/driver/ride-history" />
        <hr />
        <LargeSidebarItem isActive={isActive("/driver/earnings")} Icon={IndianRupee} title="Earnings" url="/driver/earnings" />
        <hr />
        <LargeSidebarItem isActive={isActive("/driver/feedbacks")} Icon={Star} title="Feedback and Ratings" url="/driver/feedbacks" />
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
