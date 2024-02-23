import { useEffect, useState } from "react";
import DashboardCounts from "../../components/admin/DashboardCounts";
import Navbar from "../../components/admin/Navbar";
import SideBar from "../../components/admin/SideBar";
import Spinner from "../../components/common/Spinner";
import { RideData } from "../../interface/driver/driverInterface";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [rideData, setRideData] = useState<RideData[]>();

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
      try {
        const res = await adminAxios.get(adminApi.getReports);
        setRideData(() => res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="bg-hover w-full p-5">
          <DashboardCounts />
          <div className="bg-white h-[100vh] mx-2 rounded-md p-10 flex justify-center mt-5">
            {loading ? (
              <Spinner />
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-fit">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-black uppercase bg-secondary ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.NO
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Driver ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Rider ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Commission
                      </th>
                      {/* <th scope="col" className="px-6 py-3"></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {rideData?.map((data, i) => {
                      return (
                        <tr
                          key={data._id}
                          className="bg-white border-b   text-black hover:bg-gray-600 hover:text-white"
                        >
                          <td className="px-6 py-4">{i + 1}</td>

                          <td
                            // scope="row"
                            className="px-6 py-4"
                          >
                            {data.driverId}
                          </td>
                          <td className="px-6 py-4">{data.userId}</td>
                          <td className="px-6 py-4">
                            {formatDateTime(
                              data.pickUpDate ? data.pickUpDate : data.date
                            )}
                          </td>
                          <td className="px-6 py-4">₹{data.price}</td>
                          <td className="px-6 py-4">
                            ₹{(data.price * 10) / 100}
                            {/* {formatDateTime(
                            data.pickUpDate ? data.pickUpDate : data.date
                          )} */}
                          </td>
                          {/* <td className="px-6 py-4 text-right">Start Ride</td> */}
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

export default Reports;
