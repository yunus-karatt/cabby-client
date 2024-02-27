import SideBar from "../../components/driver/Sidebar";
import DriverHeader from "../../components/driver/DriverHeader";
import { useEffect, useState } from "react";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import { ScheduledRideInterface } from "../../interface/common/common";
import { useNavigate } from "react-router";
import Spinner from "../../components/common/Spinner";

const ScheduledRideList = () => {
  const { driverInfo } = useSelector((state: rootState) => state.driverAuth);
  const [scheduledRideData, setScheduledRideData] = useState<
    ScheduledRideInterface[]
  >([]);
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()

  const formatDateTime = (dateTimeString: Date) => {
    const options:any = {
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

  const handleStartRide=async(rideData:ScheduledRideInterface)=>{
    // const res=await driverAxios.get(`${driverApi.getSheduledRideByRideId}/${rideId}`)
    await driverAxios.post(`${driverApi.generateScheduledRideOTP}/${rideData._id}`)
    navigate('/driver/current-ride',{state:rideData})
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await driverAxios.get(
          `${driverApi.listScheduledRide}/${driverInfo.id}`
        );
        setLoading(false)
        setScheduledRideData(() => res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <DriverHeader />
        <div className="flex overflow-y-hidden">
          <SideBar />
          <div className="bg-hover w-full flex flex-col gap-y-5">
            <div className="md:p-5 mx-2">
              <h1 className="font-bold text-4xl">Scheduled Rides</h1>
            </div>

            <div className="bg-white h-[100vh] mx-2 rounded-md p-10 flex justify-center ">
              {loading ? <Spinner />: <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-fit">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-black uppercase bg-secondary ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Sr.No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        From
                      </th>
                      <th scope="col" className="px-6 py-3">
                        To
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Ride Distance
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Pickup Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledRideData &&
                      scheduledRideData.map((rideData, index) => {
                        return (
                          <tr key={rideData._id} className="bg-white border-b   text-black hover:bg-gray-600 hover:text-white">
                            <td className="px-6 py-4">{index+1}</td>

                            <td
                              // scope="row"
                              className="px-6 py-4"
                            >
                              {rideData.sourceLocation}
                            </td>
                            <td className="px-6 py-4">{rideData.destinationLocation}</td>
                            <td className="px-6 py-4">{rideData.distance}KM</td>
                            <td className="px-6 py-4">₹{rideData.price}</td>
                            <td className="px-6 py-4">{formatDateTime(rideData.pickUpDate)}</td>
                            <td className="px-6 py-4 text-right">
                              <p
                                className={`cursor-pointer font-medium  hover:underline text-primary`}
                                onClick={()=>handleStartRide(rideData)}
                              >
                                Start Ride
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduledRideList;
