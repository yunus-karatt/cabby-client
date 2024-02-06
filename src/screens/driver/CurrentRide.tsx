import { useLocation } from "react-router";
import CurrentRideInfo from "../../components/driver/CurrentRideInfo";
import DriverHeader from "../../components/driver/DriverHeader";
import Map from "../../components/driver/Map";
import { RideData } from "../../interface/driver/driverInterface";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  DirectionsApiResponse,
  Geometry,
  Maneuver,
  Steps,
} from "../../interface/common/common";
import { getDistance } from "../../utils/utils";

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const CurrentRide = () => {
  const location = useLocation();
  const rideData: RideData = location.state;

  const [pickup, setPickup] = useState<boolean>(true);
  const [directionData, setDirectionData] = useState<DirectionsApiResponse>();
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  const [driverCoords, setDriverCoords] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [driverCoordsUpdates, setDriverCoordsUpdated] =
    useState<boolean>(false);
  const driverDummyLocation = useRef<number[][]>();
  const intervalRef = useRef<NodeJS.Timeout>();
  const [directionDataInitialised, setDirectionDataInitailised] =
    useState<boolean>(false);
  const [maneuver, setManeuver] = useState<Maneuver[]>();
  const [currentManeuver, setCurrentManeuver] = useState<Maneuver | null>(null);

  // manipulate driver coordinates
  const manipulateDriverCoors = () => {
    if (driverDummyLocation.current) {
      if (driverDummyLocation?.current?.length <= 0) {
        if (intervalRef) clearInterval(intervalRef.current);
        return;
      }
      const location = driverDummyLocation.current.shift();
      if (location) {
        const position: Position = {
          coords: {
            longitude: location[0],
            latitude: location[1],
          },
        };
        updateDriverLocation(position);
      }
    }
  };

  // update drivercoord by navigator watch callback
  const updateDriverLocation = (pos: Position) => {
    setDriverCoords(() => ({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    }));
  };

  const findCurrentManeuver = () => {
    if (maneuver) {
      const tempMan = [...maneuver];

      if (driverCoords) {
        if (
          currentManeuver?.location[0] === driverCoords.longitude &&
          currentManeuver.location[1] === driverCoords.latitude
        ) {
          setCurrentManeuver(null)
        }
        const distance = getDistance(
          driverCoords?.latitude,
          driverCoords?.longitude,
          maneuver[0]?.location[1],
          maneuver[0]?.location[0]
        );
        console.log({ distance });
        if (distance < 0.1) {
          const shiftedMan = tempMan.shift();
          setManeuver(() => tempMan);
          if (shiftedMan) setCurrentManeuver(shiftedMan);
        }
      }
    }
  };

  const isDriverWithinManeuver = (maneuver: {
    latitude: number;
    longitude: number;
  }): boolean => {
    // const threshold = 0.0001;
    if (driverCoords)
      return (
        Math.abs(driverCoords?.latitude - maneuver.latitude) === 0 &&
        Math.abs(driverCoords?.longitude - maneuver.longitude) === 0
      );
    else return false;
  };

  // GET CURRENT COORDS
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log({ pos });
      setDriverCoords(() => ({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }));
      setDriverCoordsUpdated(() => true);
      setMapLoading(() => false);
    });

    // const watchId = navigator.geolocation.watchPosition(updateDriverLocation);

    // return () => {
    //   navigator.geolocation.clearWatch(watchId);
    // };
  }, []);

  useEffect(() => {
    findCurrentManeuver();
  }, [driverCoords]);

  // GET DIRECTIONDATA
  useEffect(() => {
    const getDirections = async () => {
      try {
        if (driverCoords) {
          console.log({ driverCoords });
          const { data }: { data: DirectionsApiResponse } = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${
              driverCoords.longitude
            },${driverCoords.latitude};${
              rideData.sourceCoordinates.longitude
            },${
              rideData.sourceCoordinates.latitude
            }?overview=full&geometries=geojson&steps=true&access_token=${
              import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
            }`
          );

          setDirectionData(() => ({ ...data }));
          driverDummyLocation.current = data.routes[0].geometry.coordinates;
          setDirectionDataInitailised(true);
          setCurrentManeuver(() => data.routes[0].legs[0].steps[0].maneuver);
          const manevuerData = data.routes[0].legs[0].steps.map(
            (man) => man.maneuver
          );
          manevuerData?.shift();
          setManeuver(() => manevuerData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDirections();
  }, [driverCoordsUpdates]);

  useEffect(() => {
    if (driverDummyLocation.current) {
      if (driverDummyLocation?.current?.length > 0) {
        intervalRef.current = setInterval(manipulateDriverCoors, 500);

        return () => clearInterval(intervalRef.current);
      }
    } else {
      console.log("useEffect else condition");
    }
  }, [directionDataInitialised]);

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
        {!mapLoading && driverCoords && (
          <div className="relative md:w-3/4 w-full h-full">
            <Map
              destination={rideData.sourceCoordinates}
              source={driverCoords}
              directionData={directionData}
            />
            <div className="absolute top-2 rounded-md left-[50%] -translate-x-[50%] bg-white z-40 p-5">
              <p className="font-bold text-xl">
                {currentManeuver?.instruction}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CurrentRide;
