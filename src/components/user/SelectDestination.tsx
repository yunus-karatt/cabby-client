import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestinationCoordinates,
  setSourceCoordinates,
} from "../../services/redux/slices/userCoordinates";
import { rootState } from "../../interface/user/userInterface";
// import { LocationSuggestion } from "../../interface/user/userInterface";

export const SelectDestination = () => {
  // const [from, setFrom] = useState<number[]>([]);
  // const [to, setTo] = useState<number[]>([]);
  const dispatch = useDispatch();

  const { destination, source } = useSelector(
    (state: rootState) => state.routeCoordinates
  );
  const [sourceL, setSource] = useState<{
    place_name: string;
    lat: number;
    long: number;
  }>({
    place_name: "",
    lat: 0,
    long: 0,
  });
  const [sourceChange, setSourceChange] = useState(false);
  const [destinationChange, setDestinationChange] = useState(false);
  const [destinationL, setDestination] = useState<{
    place_name: string;
    lat: number;
    long: number;
  }>({
    place_name: "",
    lat: 0,
    long: 0,
  });
  const [addressList, setAddressList] = useState<
    { place_name: string; lat: number; long: number }[]
  >([]);

  const getAddressList = async () => {
    try{

    
    if (
      (sourceL && sourceL.place_name) ||
      (destinationL && destinationL.place_name)
    ) {
      const query = sourceChange ? sourceL.place_name : destinationL.place_name;
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
            place_name: data.place_name,
            lat: data.geometry.coordinates[1],
            long: data.geometry.coordinates[0],
          };
        });
      });
    } else {
      console.log("no sourceL");
    }
  }catch(error){
    console.log(error)
  }
  };

  const onSourceAddressClick = (
    place_name: string,
    lat: number,
    long: number
  ) => {
    setAddressList([]);
    setSource(() => ({ place_name, lat, long }));
    dispatch(setSourceCoordinates({ lat, long }));
    setSourceChange(false);
  };
  const onDestinationAddressClick = (
    place_name: string,
    lat: number,
    long: number
  ) => {
    setAddressList([]);
    setDestination({ place_name, lat, long });
    dispatch(setDestinationCoordinates({ lat, long }));
    setDestinationChange(false)
  };

  const handleSearch = () => {
    console.log(destination);
    console.log(source);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(delay);
  }, [sourceL, destinationL]);

  return (
    <div className=" md:w-1/4 bg-white h-fit rounded-lg flex flex-col p-5 gap-y-3">
      <h1 className="font-bold  text-xl">Get A Ride</h1>
      <div className="relative">
        <input
          className="w-full bg-secondary rounded-md p-3 "
          type="text"
          placeholder={`Pickup location`}
          value={sourceL?.place_name}
          onChange={(e) => {
            setSourceChange(true);
            setSource((prev) => ({ ...prev, place_name: e.target.value }));
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
                      onSourceAddressClick(data.place_name, data.lat, data.long)
                    }
                    className=""
                  >
                    {data.place_name}
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
          value={destinationL.place_name}
          onChange={(e) =>{
            setDestinationChange(true);
            setDestination((prev) => ({ ...prev, place_name: e.target.value }))
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
                        data.place_name,
                        data.lat,
                        data.long
                      )
                    }
                    className=""
                  >
                    {data.place_name}
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
