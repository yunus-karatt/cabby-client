import React, { useEffect, useState } from "react";
import DriverHeader from "../../components/driver/DriverHeader";
import SideBar from "../../components/driver/Sidebar";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { useSelector } from "react-redux";
import Spinner from "../../components/common/Spinner";
import { rootState } from "../../interface/user/userInterface";
import { RideData } from "../../interface/driver/driverInterface";

const Earnings = () => {
  const { driverInfo } = useSelector((state: rootState) => state.driverAuth);
  const [rideHistory, setRideHistory] = useState<RideData[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await driverAxios.get(
          `${driverApi.getRideHistory}/${driverInfo.id}`
        );
        setRideHistory(() => res.data);
        setLoading(false);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <DriverHeader />
      <div className="flex">
        <SideBar />
        <div className="bg-hover w-full flex flex-col gap-y-5">
          <div className="md:p-5 mx-2">
            <h1 className="font-bold text-4xl">Ride History</h1>
          </div>

          <div className="bg-white h-[100vh] mx-2 rounded-md p-10 flex justify-center ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-fit">
              {loading ? (
                <Spinner />
              ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-black uppercase bg-secondary ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.NO
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Ride ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Fare
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Earnings
                      </th>
                      {/* <th scope="col" className="px-6 py-3"></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {rideHistory?.map((data, i) => {
                      return (
                        <tr className="bg-white border-b   text-black hover:bg-gray-600 hover:text-white">
                          <td className="px-6 py-4">{i + 1}</td>

                          <td
                            // scope="row"
                            className="px-6 py-4"
                          >
                            {data._id}
                          </td>
                          <td className="px-6 py-4">₹{data.price} </td>
                          <td className="px-6 py-4">₹{data.price-(data.price*10/100)}</td>
                          {/* <td className="px-6 py-4">₹{data.price}</td>
                        <td className="px-6 py-4">
                          {formatDateTime(
                            data.pickUpDate ? data.pickUpDate : data.date
                          )}
                        </td> */}
                          {/* <td className="px-6 py-4 text-right">Start Ride</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Earnings;
