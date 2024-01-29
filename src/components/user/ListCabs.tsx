import { useEffect, useState } from "react";
import { CabInteface } from "../../interface/common/common";
import { userAxios } from "../../constraints/axios/userAxios";
import userApi from "../../constraints/api/userApi";
import Spinner from "../common/Spinner";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import { toast } from "react-toastify";

const ListCabs = ({
  socketIO,
  distance,
  duration,
}: {
  socketIO: Socket | null;
  distance: number;
  duration: string;
}) => {
  const [cabs, setCabs] = useState<CabInteface[]>([]);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const { source, destination } = useSelector(
    (state: rootState) => state.routeCoordinates
  );
  const [selectedCabId, setSelectedCabId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const userId = useSelector((state: rootState) => state.userAuth.userInfo._id);

  const sendRideRequest = async () => {
    if (!selectedCabId) {
      toast.error("Please Select a Cab");
      return;
    }
    socketIO?.emit("getNearByDrivers", {
      source,
      destination,
      selectedCabId,
      duration,
      distance,
      amount,
      userId,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await userAxios.get(userApi.listCabs);
      setCabs(res.data);
    };
    fetchData();
  }, []);
  return (
    <div className="relative h-[100%]">
      <div className="bg-white rounded-md overflow-auto w-full h-full flex flex-col items-center">
        <h1 className="font-bold  text-2xl my-5 mx-20">Choose a Ride</h1>
        {cabs.length &&
          cabs.map((cab) => {
            return (
              <div
                onClick={() => {
                  setSelectedCabId(cab._id);
                  if (cab.basePrice && cab.pricePerKm)
                    setAmount(parseFloat((cab.basePrice + (cab.pricePerKm * distance)).toFixed(2)));
                }}
                tabIndex={0}
                className="hover:border-2 hover:border-black rounded-md focus:outline-none focus:border-2 focus:border-black  w-full flex justify-evenly items-center"
                key={cab._id}
              >
                {imageLoading && <Spinner />}
                <img
                  className={`${imageLoading ? "hidden" : "block"}`}
                  onLoad={() => setImageLoading(false)}
                  src={cab.image}
                  alt="cab-image"
                />
                <div>
                  <h2 className="font-bold text-xl">{cab.cabType}</h2>
                  Affordable cabs
                </div>
                {cab.basePrice && cab.pricePerKm && (
                  <p className="font-bold text-xl">
                    ₹{parseFloat((cab.basePrice + (cab.pricePerKm * distance)).toFixed(2))}
                  </p>
                )}
              </div>
            );
          })}
        <button
          onClick={sendRideRequest}
          className="w-3/4 my-5 bg-primary text-white rounded-md px-6 py-2"
        >
          Request Cab
        </button>
      </div>
    </div>
  );
};

export default ListCabs;
