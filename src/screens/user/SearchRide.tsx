import Navbar from "../../components/user/Navbar";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { SelectDestination } from "../../components/user/SelectDestination";
import Markers from "../../components/user/Markers";
import { useSelector } from "react-redux";
import { CurrentRideData, rootState } from "../../interface/user/userInterface";
import axios from "axios";
import MapboxRoute from "../../components/user/MapboxRoute";
import { Socket, io } from "socket.io-client";
import ListCabs from "../../components/user/ListCabs";
import LoaderFetchDriver from "../../components/user/LoaderFetchDriver";
import { toast } from "react-toastify";
import CurrentUserRideInfo from "../../components/user/CurrentUserRideInfo";
import UserMap from "../../components/user/UserMap";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const SearchRide = () => {
  const { userInfo } = useSelector((state: rootState) => state.userAuth);

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
  const [showInput, setShowInput] = useState(true);
  const [currentRideData, setCurrentRideData] =
    useState<CurrentRideData | null>(null);
  const [driverCoors, setDriverCoors] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [rideStatus, setRideStatus] = useState<"started" | "ended" | null>(
    null
  );

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

    setSocketIO(socket);
    if (socket) {
      socket.on("connect", () => {
        console.log("connected to socket");
        socket.on(
          "sendAvailableCabs",
          (data: { cabId: string[]; rideId: string }) => {
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
          setCurrentRideData(() => rideData[0]);

          setShowInput(() => false);
        });

        socket.on(
          "updateDriverCoordsForDriver",
          (data: {
            pos: { coords: { longitude: number; latitude: number } };
            rideId: string;
            userId: string;
          }) => {
            setDriverCoors(() => data.pos.coords);
          }
        );

        socket.on("rideStarted", (data: { rideId: string; userId: string }) => {
          if (data.userId === userInfo._id) {
            setRideStatus(() => "started");
          }
        });
      });
    } else {
      console.log("cannot connect");
    }

    return () => {
      socket.disconnect();
      socketIO?.disconnect();
      setSocketIO(null);
    };
  }, []);

  const getDirection = async (
    sourceLat: number,
    sourceLong: number,
    desLat: number,
    desLong: number
  ) => {
    const res =
      await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${sourceLong},${sourceLat};${desLong},${desLat}?overview=full&geometries=geojson
&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`);
    console.log({ res }, "from directionData");
    setDirectionData(() => res.data);
  };

  // getting direction from driver coors to user source
  useEffect(() => {
    currentRideData &&
      getDirection(
        currentRideData?.driverCoordinates.latitude,
        currentRideData?.driverCoordinates.longitude,
        currentRideData?.sourceCoordinates.latitude,
        currentRideData?.sourceCoordinates.longitude
      );
    setDriverCoors(() => currentRideData?.driverCoordinates);
  }, [currentRideData]);

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

  useEffect(() => {
    if (rideStatus === "started") {
      if(driverCoors)
      getDirection(
        driverCoors?.latitude,
        driverCoors?.longitude,
        destination.latitude,
        destination.longitude
      );
    }
  }, [rideStatus]);
  return (
    <>
      <div
        className={`md:h-[100vh] bg-secondary ${loaderFetchDriver && "blur"} `}
      >
        <Navbar />
        <div className=" bg-secondary w-[100%] h-[100%] flex flex-col md:flex-row gap-x-3 p-6 gap-y-6">
          <div className="md:flex-shrink-0 md:w-1/4">
            {showInput ? (
              <SelectDestination
                socketIO={socketIO}
                // setShowCabs={setShowCabs}
                duration={(directionData?.routes[0].duration / 60).toFixed(2)}
                distance={parseFloat(
                  (directionData?.routes[0].distance / 1000).toFixed(2)
                )}
              />
            ) : (
              <CurrentUserRideInfo
                rideStatus={rideStatus}
                rideData={currentRideData ? currentRideData : undefined}
              />
            )}
          </div>
          {showCabs && availableCabs.length > 0 && (
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
              />
            </div>
          )}
          {mapLoaded && (
            <div className="w-full md:h-full h-[300px] bg-white rounded-lg relative">
              {/* <ReactMapGL
                ref={mapRef}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                  longitude: location.lng,
                  latitude: location.lat,
                  zoom: 15,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
              >
                {!destination.lat &&
                  !destination.long &&
                  !source.lat &&
                  !source.long && (
                    <Marker
                      ref={markRef}
                      latitude={location.lat}
                      longitude={location.lng}
                      draggable
                      onDragEnd={(e) =>
                        setCurrentLocation(() => ({
                          lat: e.lngLat.lat,
                          lng: e.lngLat.lng,
                        }))
                      }
                    />
                  )}

                {showInput ? (
                  <Markers />
                ) : (
                  <Markers
                    destinationProps={currentRideData?.sourceCoordinates}
                    sourceProps={driverCoors}
                  />
                )}

                {directionData?.routes && (
                  <MapboxRoute
                    coordinates={
                      directionData?.routes[0]?.geometry?.coordinates
                    }
                  />
                )}
                <NavigationControl position="bottom-right" />
                <GeolocateControl
                  position="top-left"
                  trackUserLocation
                  onGeolocate={(e) =>
                    setCurrentLocation(() => ({
                      lat: e.coords.latitude,
                      lng: e.coords.longitude,
                    }))
                  }
                />
              </ReactMapGL> */}

              {mapLoaded && (
                <UserMap
                rideStatus={rideStatus}
                  currentCoors={currentLocation}
                  source={source}
                  destination={destination}
                  directionData={directionData}
                  driverCoors={driverCoors}
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
