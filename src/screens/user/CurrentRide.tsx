import { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar";
import CurrentUserRideInfo from "../../components/user/CurrentUserRideInfo";
import {
  DirectionsApiResponse,
  Maneuver,
  Steps,
} from "../../interface/common/common";
import axios from "axios";
import { rootState } from "../../interface/user/userInterface";
import { useDispatch, useSelector } from "react-redux";
import { getDistance } from "../../utils/utils";
import UserMap from "../../components/user/UserMap";
import { useNavigate } from "react-router";
import { clearUserCurrentRideData } from "../../services/redux/slices/userCurrentRideSlice";

const CurrentRide = () => {

  const { userInfo } = useSelector((state: rootState) => state.userAuth);
  const { currentRideData } = useSelector(
    (state: rootState) => state.userCurrentRide
  );
  const { socketIO } = useSelector((state: rootState) => state.userSocket);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pickupReached, setPickupReached] = useState(false);

  useEffect(() => {
    socketIO?.on(
      "updateDriverCoordsForDriver",
      (data: {
        pos: { coords: { longitude: number; latitude: number } };
        rideId: string;
        userId: string;
      }) => {
        console.log("updatedDrivercoots");
        setDriverCoors(() => data.pos.coords);
      }
    );

    socketIO?.on(
      "driverReached",
      (data: { rideId: string; userId: string; driverId: string }) => {
        if (data.userId === userInfo._id) {
          setPickupReached(true);
        }
      }
    );

    socketIO?.on("rideStarted", (data: { rideId: string; userId: string }) => {
      if (data.userId === userInfo._id) {
        setRideStatus(() => "started");
      }
    });

    socketIO?.on("reachedDestination", (data) => {
      if (data.userId === userInfo._id) {
        setRideStatus(() => "ended");
        dispatch(clearUserCurrentRideData());
        data.quickRide = true;
        navigate(`/payment?rideId=${data.rideId}`);
      }
    });
  }, [socketIO]);

  const [directionData, setDirectionData] = useState<any>();

  // const { source, destination } = useSelector(
  //   (state: rootState) => state.routeCoordinates
  // );

  const [driverCoors, setDriverCoors] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [rideStatus, setRideStatus] = useState<
    "started" | "ended" | "initiated"
  >("initiated");
  const [currentManeuver, setCurrentManeuver] = useState<Maneuver | null>(null);
  const [maneuver, setManeuver] = useState<Maneuver[]>();
  const [currentStep, setCurrentStep] = useState<Steps[]>();

  const findCurrentManeuver = () => {
    if (maneuver) {
      const tempMan = [...maneuver];

      if (driverCoors) {
        if (
          currentManeuver?.location[0] === driverCoors.longitude &&
          currentManeuver.location[1] === driverCoors.latitude
        ) {
          const steps = directionData?.routes[0].legs[0].steps.filter(
            (step: Steps) => {
              return (
                step.maneuver.location[0] === driverCoors.longitude &&
                step.maneuver.location[1] === driverCoors.latitude
              );
            }
          );
          if (steps) setCurrentStep(steps);
          setCurrentManeuver(null);
        }
        const distance = getDistance(
          driverCoors?.latitude,
          driverCoors?.longitude,
          maneuver[0]?.location[1],
          maneuver[0]?.location[0]
        );
        if (distance < 0.1) {
          const shiftedMan = tempMan.shift();
          setManeuver(() => tempMan);
          if (shiftedMan) setCurrentManeuver(shiftedMan);
        }
      }
    }
  };

  const getDirection = async (
    sourceLat: number,
    sourceLong: number,
    desLat: number,
    desLong: number
  ) => {
    const res: { data: DirectionsApiResponse } =
      await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${sourceLong},${sourceLat};${desLong},${desLat}?overview=full&geometries=geojson&steps=true
&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`);
    setDirectionData(() => res.data);
    console.log(res.data);
    setCurrentManeuver(() => res.data.routes[0].legs[0].steps[0].maneuver);
    const manevuerData = res.data.routes[0].legs[0].steps.map(
      (man) => man.maneuver
    );
    manevuerData?.shift();
    setManeuver(() => manevuerData);
  };

  // getting direction from driver coors to user source
  useEffect(() => {
    currentRideData &&
      getDirection(
        currentRideData?.driverCoordinates?.latitude,
        currentRideData?.driverCoordinates?.longitude,
        currentRideData?.sourceCoordinates?.latitude,
        currentRideData?.sourceCoordinates?.longitude
      );
    setDriverCoors(() => currentRideData?.driverCoordinates);
  }, [currentRideData]);

  useEffect(() => {
    findCurrentManeuver();
  }, [driverCoors]);

  useEffect(() => {
    if (rideStatus === "started") {
      if (driverCoors)
        getDirection(
          driverCoors?.latitude,
          driverCoors?.longitude,
          currentRideData.destinationCoordinates.latitude,
          currentRideData.destinationCoordinates.longitude
        );
    }
  }, [rideStatus]);

  useEffect(() => {
    if (currentStep && currentStep[0].distance == 0) {
      if (rideStatus === "started") {
        setRideStatus("ended");
      }
    }
  }, [currentStep]);

  useEffect(() => {
    if (pickupReached) {
      if (Notification.permission === "granted") {
        new Notification("Pickup Reached", {
          body: "The driver has reached the pickup point.",
        });
      } else {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Pickup Reached", {
              body: "The driver has reached the pickup point.",
            });
          }
        });
      }
    }
  }, [pickupReached]);

  return (
    <>
      <div className={`md:h-[100vh] h-lvh bg-secondary`}>
        <Navbar />
        <div className=" bg-secondary w-[100%] h-[100%] flex flex-col md:flex-row gap-x-3 p-6 gap-y-6">
          <div className="md:flex-shrink-0 md:w-1/4">
            <CurrentUserRideInfo
              rideStatus={rideStatus}
              rideData={currentRideData ? currentRideData : undefined}
              distance={
                currentStep && (currentStep[0].distance / 1000).toFixed(2)
              }
            />
          </div>
          <div className="w-full md:h-full h-[300px] bg-white rounded-lg relative">
            <UserMap
              rideStatus={rideStatus}
              source={currentRideData?.sourceCoordinates}
              destination={currentRideData?.destinationCoordinates}
              directionData={directionData}
              driverCoors={driverCoors}
            />
          </div>
        </div>
         
      </div>
    </>
  );
};

export default CurrentRide;
