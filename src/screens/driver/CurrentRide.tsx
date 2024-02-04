import { useLocation } from "react-router";
import CurrentRideInfo from "../../components/driver/CurrentRideInfo";
import DriverHeader from "../../components/driver/DriverHeader";
import Map from "../../components/driver/Map";
import { RideData } from "../../interface/driver/driverInterface";
import { useEffect, useState } from "react";
import axios from "axios";
import { DirectionsApiResponse } from "../../interface/common/common";

const CurrentRide = () => {
  const location = useLocation();
  const rideData: RideData = location.state;
  const [driverCoords, setDriverCoords] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });
  const [directionData, setDirectionData] = useState<DirectionsApiResponse>();

  const [mapLoading, setMapLoading] = useState(true);
  const [pickup,setPickup]=useState<boolean>(true)
  // get current coords
  const getCurrentCoords = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setDriverCoords(() => ({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }));
      setMapLoading(false);
    });
  };

  const getDirectionRoute = async () => {
    try {
      console.log(driverCoords.latitude);
      console.log(import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);
      const res = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${
          driverCoords.longitude
        },${driverCoords.latitude};${rideData.sourceCoordinates.longitude},${
          rideData.sourceCoordinates.latitude
        }?overview=full&geometries=geojson&access_token=${
          import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
        }`
      );
      console.log("res", res.data);
      setDirectionData(() => res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // driver initial coordinates
  useEffect(() => {
    getCurrentCoords();
  }, []);

  // get directional route
  useEffect(() => {
    if (driverCoords.latitude && rideData.sourceCoordinates.latitude) {
      getDirectionRoute();
    }
  }, [driverCoords]);
  return (
    <>
      <DriverHeader />
      <div className="w-full h-[100vh] flex md:flex-row flex-col gap-3 p-2 bg-secondary">
        <div className="md:w-1/4 w-full bg-white rounded-md">
          <CurrentRideInfo pickup={pickup} rideData={rideData} distance={(directionData &&(directionData?.routes[0]?.distance / 1000).toFixed(2))}/>
        </div>
        {!mapLoading && (
          <div className="md:w-3/4 w-full h-full">
            <Map
              destination={rideData.destinationCoordinates}
              source={rideData.sourceCoordinates}
              directionData={directionData}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CurrentRide;
