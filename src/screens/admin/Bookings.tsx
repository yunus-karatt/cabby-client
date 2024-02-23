import { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import SideBar from "../../components/admin/SideBar";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";
import Spinner from "../../components/common/Spinner";

const Bookings = () => {
  const [bookings, setBookings] = useState<any>();
  const [loading, setLoading] = useState(true);

  const formatDateTime = (dateTimeString: Date) => {
    const options: any = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour format
      timeZone: "Asia/Kolkata", // Set timezone to Indian Standard Time
    };
    return new Date(dateTimeString).toLocaleDateString("en-IN", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await adminAxios.get(adminApi.getBookings);
      setBookings(() => res.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex overflow-y-hidden">
        <SideBar />
        <div className="bg-hover w-full flex flex-col gap-y-5">
          <div className="md:p-5 mx-2">
            <h1 className="font-bold text-4xl">Scheduled Rides</h1>
          </div>
          <div className="mx-2 flex items-center gap-x-5"></div>
          <div className="bg-white h-[100vh] mx-2 rounded-md p-10 flex justify-center ">
            {loading ? (
              <Spinner />
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-fit w-full">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-black uppercase bg-secondary ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Sr.No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Rider
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Booking Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Driver
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Distance
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Fare
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings &&
                      bookings.map((data: any, i: number) => {
                        return (
                          <tr
                            key={data._id}
                            className="bg-white border-b cursor-pointer  text-black hover:bg-gray-600 hover:text-white"
                          >
                            <td className="px-6 py-4">{i + 1}</td>

                            <th
                              scope="row"
                              className="px-6 py-4 font-medium  whitespace-nowrap "
                            >
                              {data.userId.firstName}
                            </th>
                            <td className="px-6 py-4">
                              {formatDateTime(data.pickUpDate)}
                            </td>
                            <td className="px-6 py-4">
                              {data.driverId.firstName}
                            </td>
                            <td className="px-6 py-4">{data.distance} KM</td>
                            <td className="px-6 py-4">₹{data.price}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
