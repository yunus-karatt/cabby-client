import { useLocation } from "react-router";
import CurrentRideInfo from "../../components/driver/CurrentRideInfo";
import DriverHeader from "../../components/driver/DriverHeader";
import Map from "../../components/driver/Map";
import { RideData } from "../../interface/driver/driverInterface";

const CurrentRide = () => {
  const location=useLocation();
  const rideData:RideData=location.state

  return (
    <>
      <DriverHeader />
      <div className="w-full h-[100vh] flex md:flex-row flex-col gap-3 p-2 bg-secondary">
        <div className="md:w-1/4 w-full bg-white rounded-md">
          <CurrentRideInfo rideData={rideData}/>
        </div>
        <div className="md:w-3/4 w-full h-full">
        <Map destination={rideData.destinationCoordinates} source={rideData.sourceCoordinates}/>
        </div>
      </div>
    </>
  );
};

export default CurrentRide;
