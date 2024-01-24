import { Link, useLocation } from "react-router-dom";
import { useSidebarContext } from "../../context/SidebarContext";
import {
  BookDown,
  CalendarCheck,
  FileText,
  IndianRupee,
  LayoutDashboard,
  Newspaper,
  User,
  UserCog,
} from "lucide-react";
import { ElementType } from "react";
import { PageHeaderFirstSection } from "./Navbar";

const SideBar = () => {
  const location=useLocation()
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  const isActive = (url: string): boolean => {
    return location.pathname === url;
  };
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={LayoutDashboard} title="Dashboard" url="/admin" />
        <SmallSidebarItem Icon={CalendarCheck} title="Bookings" url="/" />
        <SmallSidebarItem Icon={UserCog} title="Drivers" url="/admin/driverslist" />
        <SmallSidebarItem Icon={User} title="Users" url="/admin/userslist" />
        <SmallSidebarItem Icon={BookDown} title="Requests" url="/admin/requests" />
        <SmallSidebarItem Icon={FileText} title="Reports" url="/" />
        <SmallSidebarItem Icon={IndianRupee} title="Pricing Model" url="/" />
        <SmallSidebarItem Icon={Newspaper} title="Feedback" url="/" />
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

        <LargeSidebarItem isActive={isActive("/admin")} Icon={LayoutDashboard} title="Dashboard" url="/admin" />
        <hr />
        <LargeSidebarItem isActive={isActive("/admin/bookings")} Icon={CalendarCheck} title="Bookings" url="/admin/bookings" />
        <hr />
        <LargeSidebarItem isActive={isActive("/admin/driverslist")} Icon={UserCog} title="Drivers" url="/admin/driverslist" />
        <hr />
        <LargeSidebarItem isActive={isActive("/admin/userslist")} Icon={User} title="Users" url="/admin/userslist" />
        <hr />
        <LargeSidebarItem isActive={isActive("/admin/requests")} Icon={BookDown} title="Requests" url="/admin/requests" />
        <hr />
        <LargeSidebarItem isActive={isActive("/admin/reports")} Icon={FileText} title="Reports" url="/admin/reports" />
        <hr />
        <LargeSidebarItem isActive={isActive("/admin/pricingmodel")} Icon={IndianRupee} title="Pricing Model" url="/admin/pricingmodel" />
        <hr />
        <LargeSidebarItem isActive={isActive("/admin/feedbacks")} Icon={Newspaper} title="Feedback" url="/admin/feedbacks" />
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
