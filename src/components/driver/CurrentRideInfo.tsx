import { Circle } from "lucide-react";
import avatar from "../../assets/avatar 1.png";
import { RideData } from "../../interface/driver/driverInterface";
import { useEffect, useState } from "react";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import ConfirmPopup from "../common/ConfirmPopup";
import GetInputPop from "../common/GetInputPop";

const CurrentRideInfo = ({ rideData,distance,pickup }: { rideData: RideData,distance?:string,pickup:boolean }) => {
  
  const [user, setUser] = useState<{firstName:string,lastName:string} | null>(null);
  const [isconfirmPopup,setIsConfirmPopup]=useState<boolean>(false)
  const [inputPop,setInputPop]=useState<boolean>(false)
  const [cancelReason,setCancelReason]=useState<string>('')
  
  const handleCancelRide=async()=>{
    setIsConfirmPopup(()=>true)
  }
  
  const handleCancelSubmission=async()=>{
    
  }

  //  Get user data
  useEffect(() => {
    const fetchData = async () => {
      const res = await driverAxios.get(
        `${driverApi.getUserData}/${rideData.userId}`
      );
      console.log(res.data)
      setUser(() => res.data);
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="p-5 px-8 flex md:flex-col items-center flex-row gap-8">
      <div className="flex flex-col gap-y-3">
        <h1 className="font-bold md:text-3xl">{distance} km away</h1>
        <p className="text-text-secondary opacity-80">Pickup {user?.firstName} {user?.lastName}</p>
      </div>
      <div className="hidden md:flex items-center  gap-x-6">
        <img src={avatar} alt="" />
        <p className="font-bold md:text-xl">{user?.firstName} {user?.lastName}</p>
      </div>
      <div>
        <p className="font-bold text-xl ">Ride Details</p>
        <div className={`gap-x-5 items-center mt-10 flex rounded p-3 ${pickup && 'bg-secondary'}`} >
          <Circle />
          <div>
            <p className="font-bold text-lg">Pickup</p>
            <p>{rideData.sourceLocation}</p>
          </div>
        </div>
        <div className={`gap-x-5 items-center mt-10 flex rounded p-3 ${!pickup && 'bg-secondary'}`} >
          <Circle />
          <div>
            <p className="font-bold text-lg">Drop off</p>
            <p>{rideData.destinationLocation}</p>
          </div>
        </div>
        <div className="text-center mt-5">
          <button onClick={handleCancelRide} className="border-2 py-2 px-10 border-danger rounded-full ">Cancel Ride</button>
        </div>
      </div>
    </div>
      {isconfirmPopup && <ConfirmPopup setConfirmPop={setIsConfirmPopup} setNextPopup={setInputPop}/>}
      {inputPop && <GetInputPop input={cancelReason} setInput={setCancelReason} setInputPop={setInputPop} submit={handleCancelSubmission}/>}
      </>
  );
};

export default CurrentRideInfo;
