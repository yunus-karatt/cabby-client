import axios from "axios";
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

export const SelectDestination = ({
  socketIO,
  distance,
  duration
}: {
  socketIO: Socket|null;
  distance: number;
  duration: string;
}) => {
  const dispatch = useDispatch();

  const userId = useSelector((state: rootState) => state.userAuth.userInfo._id);

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


  const getAddressList = async () => {
    try {
      if (
        (sourceL && sourceL.placeName) ||
        (destinationL && destinationL.placeName)
      ) {
        const query = sourceChange
          ? sourceL.placeName
          : destinationL.placeName;
        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
          {
            params: {
              access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
              country: "in",
            },
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
    if (sourceL.latitude == destinationL.latitude && sourceL.longitude == destinationL.longitude) {
      toast.error("Please check you selected locations");
      return;
    }
    socketIO?.emit("getNearByDrivers", {
      source:sourceL,
      destination:destinationL,
      duration,
      distance,
      userId,
    });
    
  };

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
        <input
          className="w-full bg-secondary rounded-md p-3 "
          type="text"
          placeholder={`Pickup location`}
          value={sourceL?.placeName}
          onChange={(e) => {
            setSourceChange(true);
            setSource((prev) => ({ ...prev, placeName: e.target.value }));
          }}
        />
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
        <input
          className="bg-secondary rounded-md p-3 w-full"
          type="text"
          placeholder={`Dropoff location`}
          value={destinationL.placeName}
          onChange={(e) => {
            setDestinationChange(true);
            setDestination((prev) => ({ ...prev, placeName: e.target.value }));
          }}
        />
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
      >
        <option value=""> Pickup Now</option>
        <option value="schedule">Schedule Time</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-primary text-white p-3 rounded-md"
      >
        Search
      </button>
    </div>
  );
};
