import axios, { CancelTokenSource } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestinationCoordinates,
  setSourceCoordinates,
} from "../../services/redux/slices/userCoordinates";
// import { rootState } from "../../interface/user/userInterface";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";
import { rootState } from "../../interface/user/userInterface";
import Spinner from "../common/Spinner";
import { LocateFixed } from "lucide-react";

export const SelectDestination = ({
  socketIO,
  distance,
  duration,
  setSearching,
  searching,
  isScheduled,
  setisScheduled,
  setShowCabs,
  selectedDateTime,
  setSelectedDateTime,
}: {
  socketIO: Socket | null;
  distance?: number;
  duration?: string;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  searching: boolean;
  isScheduled?: boolean;
  setisScheduled?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCabs?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDateTime?: string;
  setSelectedDateTime?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useDispatch();

  const userId = useSelector((state: rootState) => state.userAuth.userInfo.id);

  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().slice(0, 5);
  const minDateTime = `${currentDate}T${currentTime}`;

  const [currentCoors, setCurrentCoors] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [sourceL, setSource] = useState<{
    placeName: string;
    latitude: number;
    longitude: number;
  }>({
    placeName: "",
    latitude: 0,
    longitude: 0,
  });

  const [sourceChange, setSourceChange] = useState(false);
  const [destinationChange, setDestinationChange] = useState(false);
  const [destinationL, setDestination] = useState<{
    placeName: string;
    latitude: number;
    longitude: number;
  }>({
    placeName: "",
    latitude: 0,
    longitude: 0,
  });

  const [addressList, setAddressList] = useState<
    { placeName: string; lat: number; long: number }[]
  >([]);

  const [cancelTokenSource, setCancelTokenSource] =
    useState<CancelTokenSource | null>(null);

  const getAddressList = async () => {
    console.log("getAddressList called");
    try {
      if (
        (sourceL && sourceL.placeName) ||
        (destinationL && destinationL.placeName)
      ) {
        console.log("inside if condition in getaddresslist");
        const query = sourceChange ? sourceL.placeName : destinationL.placeName;
        if (cancelTokenSource) {
          // If it exists, cancel the previous request
          cancelTokenSource.cancel();
        }
        // Create a new cancel token source
        const source = axios.CancelToken.source();
        setCancelTokenSource(source);

        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
          {
            params: {
              access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
              country: "in",
            },
            cancelToken: source.token,
          }
        );
        setAddressList(() => {
          return res.data.features.map((data: any) => {
            return {
              placeName: data.place_name,
              lat: data.geometry.coordinates[1],
              long: data.geometry.coordinates[0],
            };
          });
        });
      } else {
        console.log("no sourceL");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSourceAddressClick = (
    placeName: string,
    latitude: number,
    longitude: number
  ) => {
    setAddressList([]);
    setSource(() => ({ placeName, latitude, longitude }));
    dispatch(setSourceCoordinates({ latitude, longitude, placeName }));
    setSourceChange(false);
  };

  const onDestinationAddressClick = (
    placeName: string,
    latitude: number,
    longitude: number
  ) => {
    setAddressList([]);
    setDestination({ placeName, latitude, longitude });
    dispatch(setDestinationCoordinates({ latitude, longitude, placeName }));
    setDestinationChange(false);
  };

  const handleSearch = () => {
    if (!sourceL.latitude || !destinationL.latitude) {
      toast.error("Please select Locations");
      return;
    }
    if (
      sourceL.latitude == destinationL.latitude &&
      sourceL.longitude == destinationL.longitude
    ) {
      toast.error("Please check you selected locations");
      return;
    }
    if (isScheduled) {
      if (!selectedDateTime) {
        toast.error("Please select a Date");
      }
      if (selectedDateTime) {
        const selectedDateTimeObj = new Date(selectedDateTime);
        const currentDateTimeObj = new Date();
        if (selectedDateTimeObj <= currentDateTimeObj) {
          toast.error("Please select a future date and time");
          return;
        }
        setShowCabs && setShowCabs(true);
        setSearching(false);
      }
    } else {
      setSearching(true);
      socketIO?.emit("getNearByDrivers", {
        source: sourceL,
        destination: destinationL,
        duration,
        distance,
        userId,
      });
    }
  };
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrentCoors((prev) => ({
        ...prev,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }));
    });
  };

  const handleSourceCurrentLocation = async () => {
    try {
      const access_token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
      // getUserLocation();
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${currentCoors.longitude},${currentCoors.latitude}.json?access_token=${access_token}&limit=1`
      );

      setSourceChange(true);
      setSource((prev) => ({
        ...prev,
        placeName: res.data.features[0].place_name,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "schedule") setisScheduled && setisScheduled(true);
    else setisScheduled && setisScheduled(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateTime && setSelectedDateTime(e.target.value);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(delay);
  }, [sourceL, destinationL]);

  return (
    <div className=" bg-white h-fit rounded-lg flex flex-col p-5 gap-y-3">
      <h1 className="font-bold  text-xl">Get A Ride</h1>
      <div className="relative">
        <div className="flex items-center bg-secondary rounded p-1">
          <input
            className="w-full bg-secondary rounded-md p-3 outline-none"
            type="text"
            placeholder={`Pickup location`}
            value={sourceL?.placeName}
            onChange={(e) => {
              setSourceChange(true);
              setSource((prev) => ({ ...prev, placeName: e.target.value }));
            }}
          />
          <LocateFixed
            className="cursor-pointer"
            onClick={handleSourceCurrentLocation}
          />
        </div>
        {addressList.length > 0 && sourceChange && (
          <div className="z-50 absolute bg-white border border-secondary py-4 rounded-md border-t-0 flex flex-col gap-y-2">
            {addressList.map((data, index) => {
              return (
                <div
                  key={index}
                  className=" bg-white hover:bg-secondary rounded-md cursor-pointer px-3"
                >
                  <h1
                    onClick={() =>
                      onSourceAddressClick(data.placeName, data.lat, data.long)
                    }
                    className=""
                  >
                    {data.placeName}
                  </h1>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="relative">
        <div className="flex items-center bg-secondary rounded p-1">
          <input
            className="bg-secondary rounded-md p-3 w-full outline-none"
            type="text"
            placeholder={`Dropoff location`}
            value={destinationL.placeName}
            onChange={(e) => {
              setDestinationChange(true);
              setDestination((prev) => ({
                ...prev,
                placeName: e.target.value,
              }));
            }}
          />
          {/* <LocateFixed className="cursor-pointer" /> */}
        </div>
        {addressList.length > 0 && destinationChange && (
          <div className="absolute bg-white border border-secondary py-4 rounded-md border-t-0 flex flex-col gap-y-2">
            {addressList.map((data, index) => {
              return (
                <div
                  key={index}
                  className="hover:bg-secondary rounded-md cursor-pointer px-3"
                >
                  <h1
                    onClick={() =>
                      onDestinationAddressClick(
                        data.placeName,
                        data.lat,
                        data.long
                      )
                    }
                    className=""
                  >
                    {data.placeName}
                  </h1>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <select
        name="pickup-time"
        className=" rounded-md bg-secondary p-3 "
        id=""
        defaultValue="now"
        onChange={(e) => handleTimeChange(e)}
      >
        <option value="now"> Pickup Now</option>
        <option value="schedule">Schedule Time</option>
      </select>
      {isScheduled && (
        <input
          className="w-full bg-secondary p-3 rounded-md"
          type="datetime-local"
          value={selectedDateTime}
          min={minDateTime}
          onChange={(e) => handleDateChange(e)}
        />
      )}
      <button
        onClick={handleSearch}
        className="bg-primary text-white p-3 rounded-md flex justify-center gap-x-3"
      >
        {searching && <Spinner />}
        Search
      </button>
    </div>
  );
};
