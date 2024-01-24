import { Loader } from "lucide-react";
import Navbar from "../../components/admin/Navbar";
import SideBar from "../../components/admin/SideBar";
import { useEffect, useState } from "react";
import { DriverData } from "../../interface/driver/driverInterface";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";
import RequestPopup from "../../components/admin/RequestPopup";

const Requests = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<DriverData[]>([]);
  const [driver, setDriver] = useState<DriverData | null>(null);
  const [popup, setPopup] = useState<boolean>(false);

  const viewDriver = (id: string) => {
    const driver = requests.find((request) => request._id === id);
    if (driver) setDriver(driver);
    setPopup(true);
  };

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      const data = await adminAxios.get(adminApi.getRequest);
      setRequests(() => data.data);
      setLoading(false);
    };
    fetchRequest();
  }, []);

  return (
    <>
      <div className={` ${popup ? "blur-sm " : ""}`}>
        <Navbar />
        <div className="flex overflow-y-hidden">
          <SideBar />
          <div className="bg-hover w-full flex flex-col gap-y-5">
            <div className="md:p-5 mx-2">
              <h1 className="font-bold text-4xl">Requests</h1>
            </div>

            <div className="bg-white h-[100vh] mx-2 rounded-md p-10 flex justify-center ">
              {loading ? (
                <Loader />
              ) : (
                
                
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-fit">
                   {requests.length > 0 ?
                   <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-black uppercase bg-secondary ">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Sr.No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Mobile
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Request Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((driver, index) => {
                        return (
                          <tr
                            key={driver._id}
                            className="bg-white border-b   text-black hover:bg-gray-600 hover:text-white"
                          >
                            <td className="px-6 py-4">{index + 1}</td>

                            <th
                              scope="row"
                              className="px-6 py-4 font-medium  whitespace-nowrap "
                            >
                              {driver.firstName + " " + driver.lastName}
                            </th>
                            <td className="px-6 py-4">
                              {driver.mobile
                                ? driver.mobile
                                : "Mobile Not provided"}
                            </td>
                            <td className="px-6 py-4">{driver.email}</td>
                            <td className="px-6 py-4">
                              {driver.joinedAt.split("T")[0]}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <p
                                onClick={() => viewDriver(driver._id)}
                                className={`cursor-pointer font-medium  hover:underline text-primary`}
                              >
                                View Request
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
              : <div className="font-bold text-4xl overflow-hidden"> No Requests</div> }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
              {popup&& driver && <RequestPopup setRequest={setRequests} setPopup={setPopup} driver={driver}/>}
    </>
  );
};

export default Requests;
