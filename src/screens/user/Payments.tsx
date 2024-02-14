import  { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar";
import {  useLocation, useNavigate } from "react-router-dom";
import { userAxios } from "../../constraints/axios/userAxios";
import userApi from "../../constraints/api/userApi";
import { RideData } from "../../interface/driver/driverInterface";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import { CustomWindow } from "../../interface/common/common";

const Payments = () => {
  const location = useLocation();
  const baseURL = import.meta.env.VITE_USER_BASE_URL;
  const data: {
    rideId: string;
    userId: string;
    driverId: string;
    quickRide: true;
  } = location.state;

  const [rideData, setRideData] = useState<RideData | null>(null);

  const { userInfo } = useSelector((state: rootState) => state.userAuth);

  const navigate=useNavigate()

  useEffect(() => {
    const fetchRideData = async () => {
      console.log(data.rideId);
      const res = await userAxios.get(`${userApi.getQuickRide}/${data.rideId}`);
      setRideData(() => res.data);
    };
    fetchRideData();
  }, []);

  const paymentHandler = async () => {
    try {
      const {
        data: { key },
      } = await userAxios.get(userApi.getKey);
      console.log({key})
      const {
        data: { order },
      } = await userAxios.post(userApi.payments, {
        amount: rideData?.price,
        rideId:rideData?._id
      });
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Cabby",
        description: "Go anywhere with cabby",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        // callback_url: `${baseURL}/paymentCapture`,
        handler:async function (response:any){
          const res=await userAxios.post('/paymentCapture',response)
          if(res.data){
            navigate('/')
          }
        },
        prefill: {
          name: userInfo.firstName,
          email: userInfo.email,
          contact: userInfo.mobile,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#BE3455",
        },
      };
      const razor = new (window as CustomWindow).Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] overflow-x-hidden">
      <Navbar />
      <div className="bg-secondary h-full w-full flex justify-center items-center">
        <div className="w-[40%] h-[80%] bg-white flex flex-col items-center gap-y-10 p-5 rounded-md shadow-md">
          <div>
            <h3 className="font-bold text-3xl">Payment Details</h3>
          </div>
          <div className="w-[80%] h-[70%] flex flex-col justify-evenly">
            <div className="flex justify-between">
              <p className="text-xl font-bold w-[50%]">Total Amount</p>
              <p className="text-xl font-bold ">{rideData?.price}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl font-bold w-[50%]">Distance</p>
              <p className="text-xl font-bold ">{rideData?.distance}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl font-bold w-[50%]">Pickup </p>
              <p className="text-xl font-bold overflow-hidden text-ellipsis w-[50%] text-end">
                {rideData?.sourceLocation}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl font-bold w-[50%]">Drop off</p>
              <p className="text-xl font-bold overflow-hidden text-ellipsis w-[50%] text-end">
                {rideData?.destinationLocation}
              </p>
            </div>
          </div>
          <button
            className="bg-primary w-[50%] rounded p-2 text-white shadow-md hover:opacity-80"
            onClick={paymentHandler}
          >
            Pay Now
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Payments;
