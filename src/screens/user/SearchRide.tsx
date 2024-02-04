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

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const SearchRide = () => {
  const [location, setLocation] = useState({
    lng: 0,
    lat: 0,
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [socketIO, setSocketIO] = useState<Socket | null>(null);
  const markRef = useRef<mapboxgl.Marker>(null);
  const mapRef = useRef<any>(null);
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

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation((prev) => ({
        ...prev,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }));
      setMapLoaded(true);
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (currentRideData?.driverCoordinates.latitude) {
      mapRef.current.flyTo({
        center: [
          currentRideData?.driverCoordinates.longitude,
          currentRideData?.driverCoordinates.latitude,
        ],
        duration:2500
      });
    }
  }, [currentRideData]);

  // Source
  useEffect(() => {
    if (source.lat && source.long) {
      mapRef?.current?.flyTo({
        center: [source.long, source.lat],
        duration: 2500,
      });
    }
  }, [source]);

  // Destination
  useEffect(() => {
    if (destination.lat && destination.long) {
      mapRef?.current?.flyTo({
        center: [destination.long, destination.lat],
        duration: 2500,
      });
    }
    if (destination.lat && destination.long && source.lat && source.long) {
      getDirectionRoute();
    }
  }, [destination]);

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
          console.log("no drivers found");
          setLoaderFetchDriver(() => false);
          setShowCabs(() => false);
          toast.error("sorry, No Nearby drivers found");
        });
        socket.on("approvedRide", (rideData: any) => {
          console.log("socket", { rideData });
          setLoaderFetchDriver(() => false);
          setShowCabs(() => false);
          setCurrentRideData(() => rideData[0]);

          setShowInput(() => false);
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

  const getDirectionRoute = async () => {
    const res =
      await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${
        source.long
      },${source.lat};${destination.long},${
        destination.lat
      }?overview=full&geometries=geojson
&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`);
    setDirectionData(res.data);
  };

  const getDirection = async (
    sourceLat: number,
    sourceLong: number,
    desLat: number,
    desLong: number
  ) => {
    console.log("getdirecttion called");
    const res =
      await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${sourceLong},${sourceLat};${desLong},${desLat}?overview=full&geometries=geojson
&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`);
    setDirectionData(() => res.data);
  };

  useEffect(() => {
    currentRideData &&
      getDirection(
        currentRideData?.driverCoordinates.latitude,
        currentRideData?.driverCoordinates.longitude,
        currentRideData?.sourceCoordinates.latitude,
        currentRideData?.sourceCoordinates.longitude
      );
  }, [currentRideData]);

  return (
    <>
      <div className={`h-[100vh] bg-secondary ${loaderFetchDriver && "blur"} `}>
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
            <div className="w-full h-full bg-white rounded-lg relative">
              <ReactMapGL
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
                        setLocation(() => ({
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
                    sourceProps={currentRideData?.driverCoordinates}
                    icon
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
                    setLocation(() => ({
                      lat: e.coords.latitude,
                      lng: e.coords.longitude,
                    }))
                  }
                />
              </ReactMapGL>

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
