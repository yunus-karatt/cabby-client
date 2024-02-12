import Navbar from "../../components/user/Navbar";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";

import { SelectDestination } from "../../components/user/SelectDestination";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import ListCabs from "../../components/user/ListCabs";
import LoaderFetchDriver from "../../components/user/LoaderFetchDriver";
import { toast } from "react-toastify";
import UserMap from "../../components/user/UserMap";
import { DirectionsApiResponse } from "../../interface/common/common";
import { setUserSocket } from "../../services/redux/slices/userSocketSlice";
import { setUserCurrentRideData } from "../../services/redux/slices/userCurrentRideSlice";
import { useNavigate } from "react-router";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const SearchRide = () => {
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [socketIO, setSocketIO] = useState<Socket | null>(null);
  const [directionData, setDirectionData] = useState<any>();
  const { source, destination } = useSelector(
    (state: rootState) => state.routeCoordinates
  );
  const [showCabs, setShowCabs] = useState<boolean>(false);
  const [availableCabs, setAvailableCabs] = useState<string[]>([]);
  const [rideId, setRideId] = useState<string>("");
  const [loaderFetchDriver, setLoaderFetchDriver] = useState(false);
  const [isSearchingForAvailableCabs, setIsSearchingForAvailableCabs] =
    useState<boolean>(false);
  const [isScheduled, setisScheduled] = useState<boolean>(false);
  const [selectedDateTime, setSelectedDateTime] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrentLocation((prev) => ({
        ...prev,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }));
      setMapLoaded(true);
    });
  };

  // Socket
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_SERVER, {
      transports: ["websocket"],
    });
    dispatch(setUserSocket(socket));
    setSocketIO(socket);
    if (socket) {
      socket.on("connect", () => {
        console.log("connected to socket");
        socket.on(
          "sendAvailableCabs",
          (data: { cabId: string[]; rideId: string }) => {
            setIsSearchingForAvailableCabs(false);
            setShowCabs(true);
            setRideId(data.rideId);
            setAvailableCabs(() => data.cabId);
          }
        );
        socket.on("noDrivers", () => {
          setLoaderFetchDriver(() => false);
          setShowCabs(() => false);
          toast.error("sorry, No Nearby drivers found");
        });
        socket.on("approvedRide", (rideData: any) => {
          setLoaderFetchDriver(() => false);
          setShowCabs(() => false);
          // setCurrentRideData(() => rideData[0]);
          dispatch(setUserCurrentRideData(rideData[0]));
          navigate("/current-ride");
        });
      });
    } else {
      console.log("cannot connect");
    }
  }, []);

  const getDirection = async (
    sourceLat: number,
    sourceLong: number,
    desLat: number,
    desLong: number
  ) => {
    const res: { data: DirectionsApiResponse } =
      await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${sourceLong},${sourceLat};${desLong},${desLat}?overview=full&geometries=geojson&steps=true
&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`);
    console.log({ res }, "from directionData");
    setDirectionData(() => res.data);
  };

  // getting direction from source to destination on search
  useEffect(() => {
    if (
      destination.latitude &&
      destination.longitude &&
      source.latitude &&
      source.longitude
    ) {
      getDirection(
        source.latitude,
        source.longitude,
        destination.latitude,
        destination.longitude
      );
    }
  }, [destination, source]);

  // Get users initial location
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <>
      <div
        className={`md:h-[100vh] bg-secondary ${loaderFetchDriver && "blur"} `}
      >
        <Navbar />
        <div className=" bg-secondary w-[100%] h-[100%] flex flex-col md:flex-row gap-x-3 p-6 gap-y-6">
          <div className="md:flex-shrink-0 md:w-1/4">
            <SelectDestination
              searching={isSearchingForAvailableCabs}
              setSearching={setIsSearchingForAvailableCabs}
              socketIO={socketIO}
              duration={(directionData?.routes[0].duration / 60).toFixed(2)}
              distance={parseFloat(
                (directionData?.routes[0].distance / 1000).toFixed(2)
              )}
              isScheduled={isScheduled}
              setisScheduled={setisScheduled}
              setShowCabs={setShowCabs}
              selectedDateTime={selectedDateTime}
              setSelectedDateTime={setSelectedDateTime}
            />
          </div>
          {showCabs && (
            <div className="md:flex-shrink-0 md:w-1/3">
              <ListCabs
                rideId={rideId}
                socketIO={socketIO}
                duration={(directionData.routes[0].duration / 60).toFixed(2)}
                distance={parseFloat(
                  (directionData?.routes[0].distance / 1000).toFixed(2)
                )}
                availableCabs={availableCabs}
                setLoaderFetchDriver={setLoaderFetchDriver}
                scheduledRide={isScheduled}
                selectedDateTime={selectedDateTime}
              />
            </div>
          )}
          {mapLoaded && (
            <div className="w-full md:h-full h-[300px] bg-white rounded-lg relative">
              {mapLoaded && (
                <UserMap
                  currentCoors={currentLocation}
                  source={source}
                  destination={destination}
                  directionData={directionData}
                  // driverCoors={driverCoors}
                />
              )}

              <div className="absolute right-4 top-4 bg-primary  px-3 py-1 ">
                {directionData?.routes[0] && (
                  <div>
                    <h2 className="text-white">
                      Distance:
                      <span className="font-bold mr-3 text-white">
                        {(directionData.routes[0].distance / 1000).toFixed(2)}
                        KM
                      </span>
                      Duration:
                      <span className="font-bold">
                        {(directionData.routes[0].duration / 60).toFixed(2)} Min
                      </span>
                    </h2>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {loaderFetchDriver && <LoaderFetchDriver />}
    </>
  );
};

export default SearchRide;
