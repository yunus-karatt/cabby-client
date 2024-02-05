import { useLocation } from "react-router";
import CurrentRideInfo from "../../components/driver/CurrentRideInfo";
import DriverHeader from "../../components/driver/DriverHeader";
import Map from "../../components/driver/Map";
import { RideData } from "../../interface/driver/driverInterface";
import { useEffect, useState } from "react";
import axios from "axios";
import { DirectionsApiResponse, Maneuver } from "../../interface/common/common";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";

const CurrentRide = () => {
  const location = useLocation();
  const rideData: RideData = location.state;

  // const {socketIO}=useSelector((state:rootState)=>state.driverSocket.socketIO)

  const [driverCoords, setDriverCoords] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });
  const [directionData, setDirectionData] = useState<DirectionsApiResponse>();

  const [mapLoading, setMapLoading] = useState(true);
  const [pickup, setPickup] = useState<boolean>(true);
  const [maneuvers, setManeuvers] = useState<Maneuver[]>();

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
      if (directionData) {
        console.log("returned from getDirectonRoute");
        return;
      }
      const { data }: { data: DirectionsApiResponse } = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${
          driverCoords.longitude
        },${driverCoords.latitude};${rideData.sourceCoordinates.longitude},${
          rideData.sourceCoordinates.latitude
        }?overview=full&geometries=geojson&steps=true&access_token=${
          import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
        }`
      );
      console.log({ data });
      setDirectionData(() => data);
      setManeuvers(() =>
        data.routes[0].legs[0].steps.map((step) => step.maneuver)
      );
    } catch (error) {
      console.log(error);
    }
  };

  interface Position {
    coords: {
      latitude: number;
      longitude: number;
    };
  }

  // For test purpose
  const updateTestDriverLocation = () => {
    if (!maneuvers?.length) {
      console.log("maneuvers finished");
      clearInterval(interval);
    }
    const maneuver = maneuvers?.shift();
    if (maneuver && directionData) {
      const [longitude, latitude] = maneuver.location;
      const index = directionData?.routes[0].geometry.coordinates.findIndex(
        ([coordlongitude, coordlatitude]) =>
          coordlongitude === longitude && coordlatitude == latitude
      );
      const newCoordinate = [...directionData?.routes[0].geometry.coordinates];
      newCoordinate.splice(0, index );
      // console.log('coordinated',directionData?.routes[0].geometry.coordinates)

      setDirectionData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          routes: [
            {
              ...prev?.routes[0],
              geometry: {
                ...prev?.routes[0].geometry,
                coordinates: newCoordinate,
              },
            },
          ],
        };
      });
      setDriverCoords(() => ({ latitude, longitude }));
    }
  };
  const interval = setInterval(updateTestDriverLocation, 10000);

  // production
  const updateDriverLocation = (position: Position) => {
    setDriverCoords(() => position.coords);
    findCurrentManeuver();
  };

  const findCurrentManeuver = (): Maneuver | null => {
    if (maneuvers)
      for (let maneuver of maneuvers) {
        if (
          isDriverWithinManeuver({
            latitude: maneuver.location[1],
            longitude: maneuver.location[0],
          })
        )
          return maneuver;
      }
    return null;
  };

  const isDriverWithinManeuver = (maneuvarLocationa: {
    latitude: number;
    longitude: number;
  }): boolean => {
    const threshold: number = 0.0001;

    return (
      Math.abs(driverCoords.latitude - maneuvarLocationa.latitude) >
        threshold &&
      Math.abs(driverCoords.longitude - maneuvarLocationa.longitude) > threshold
    );
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

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(updateDriverLocation);
  }, []);

  return (
    <>
      <DriverHeader />
      <div className="w-full h-[100vh] flex md:flex-row flex-col gap-3 p-2 bg-secondary">
        <div className="md:w-1/4 w-full bg-white rounded-md">
          <CurrentRideInfo
            pickup={pickup}
            rideData={rideData}
            distance={
              directionData &&
              (directionData?.routes[0]?.distance / 1000).toFixed(2)
            }
          />
        </div>
        {!mapLoading && (
          <div className="relative md:w-3/4 w-full h-full">
            <Map
              destination={rideData.sourceCoordinates}
              source={driverCoords}
              directionData={directionData}
            />
            <div className="absolute top-2 rounded-md left-[50%] -translate-x-[50%] bg-white z-40 p-5">
              <p className="font-bold text-xl">
                {maneuvers? maneuvers[0]?.instruction:null}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CurrentRide;
