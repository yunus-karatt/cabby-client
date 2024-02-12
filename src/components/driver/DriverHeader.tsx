import { Bell, ChevronDown, LogOut, Menu, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { rootState } from "../../interface/user/userInterface";
import { useSidebarContext } from "../../context/SidebarContext";
import { useEffect, useState } from "react";
import { logout } from "../../services/redux/slices/driverAuthSlice";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { Socket, io } from "socket.io-client";
import axios from "axios";
import { RideData } from "../../interface/driver/driverInterface";
import ConfirmPopup from "../common/ConfirmPopup";
import GetInputPop from "../common/GetInputPop";
import RideRequestPopup from "./RideRequestPopup";
import { setSocket } from "../../services/redux/slices/driverSocket";

const DriverHeader = () => {
  const { driverInfo } = useSelector((state: rootState) => state.driverAuth);
  const [isActive, setActive] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [socketIO, setSocketIO] = useState<Socket | null>();
  const [rideData, setRideData] = useState<RideData | null>(null);
  const [confirmPopup, setConfrimPopup] = useState<boolean>(false);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [inputPop, setInputPop] = useState<boolean>(false);
  const [rideRequestPop, setRideRequestPop] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleActive = async () => {
    console.log({driverInfo})
    const res = await driverAxios.put(driverApi.changeAvailability, {
      id: driverInfo.id,
    });
    setActive(() => res.data);
  };

  const toggleDiv = () => {
    setShowDiv((state) => !state);
  };

  const handleLogOut = async () => {
    const res = await driverAxios.post(
      `${driverApi.logout}?id=${driverInfo.id}`
    );
    if (res.data) {
      dispatch(logout());
    }
  };
  const getLiveCoordinates = (): Promise<{
    latitude: number;
    longitude: number;
  }> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coordinates = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          resolve(coordinates);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const getDistance = async (
    source: { lat: number; long: number },
    destination: { lat: number; long: number }
  ) => {
    const res =
      await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${
        source.long
      },${source.lat};${destination.long},${
        destination.lat
      }?overview=full&geometries=geojson
&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`);
    return parseFloat((res.data.routes[0].distance / 1000).toFixed(2));
  };

  const submitRejection = async () => {
    await driverAxios.post(driverApi.postRejectionReason, {
      driverId: driverInfo.id,
      rideId: rideData?._id,
      reason: rejectionReason,
    });
    setRejectionReason("");
  };

  const unloadHandler = async () => {
    await driverAxios.get(`${driverApi.goOffline}?id=${driverInfo.id}`);
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_SERVER, {
      transports: ["websocket"],
    });
    dispatch(setSocket(socket));
    setSocketIO(socket);
    if (socket) {
      socket.on("connect", () => {
        console.log("socket connected");
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

  // for tab closing

  useEffect(() => {
    window.addEventListener("unload", unloadHandler);
    return () => {
      window.removeEventListener("unload", unloadHandler);
    };
  }, []);

  if (socketIO) {
    socketIO.on("getDriverCoordinates", async (data) => {
      console.log('getDriverCoordinates',{data});
      const res: { latitude: number; longitude: number } =
        await getLiveCoordinates();
      let coordinates: { lat: number; lng: number } = {
        lat: res.latitude,
        lng: res.longitude,
      };
      // setLocation(coordinates);
      const source = { lat: coordinates.lat, long: coordinates.lng };
      const destination = { lat: data.latitude, long: data.longitude };
      const distance = await getDistance(source, destination);
      console.log({distance})

      if (distance <= 5) {
        socketIO.emit("driverDistance", {
          distance,
          driverId: driverInfo.id,
          cabId: driverInfo.cabModel,
          rideId: data.rideId,
          duration: data.duration,
        });
      }
    });

    socketIO.on(
      "getDriverConfirmation",
      (data: { driverId: string; rideData: RideData }) => {
        if (data.driverId === driverInfo.id) setRideData(data.rideData);
        setRideRequestPop(true);
      }
    );
  }

  const accepetRideRequest = async () => {
    const driverCoordinates: { latitude: number; longitude: number } =
      await getLiveCoordinates();
    setRideRequestPop(false);
    socketIO?.emit("approveRide", {
      ...rideData,
      driverId: driverInfo.id,
      driverCoordinates,
    });
    navigate("/driver/current-ride", { state: rideData });
  };

  const rejectRideRequest = (timeout = false) => {
    setRideRequestPop(false);
    if (!timeout) {
      setConfrimPopup(true);
    }
    if (timeout) {
      setInputPop(true);
    }
    socketIO?.emit("rejectRide", { ...rideData });
  };

  return (
    <>
      <nav
        className={`pt-2  bg-primary text-white items-center w-full overflow-x-hidden ${
          rideData || (confirmPopup && "blur")
        }`}
      >
        <div className="items-center flex justify-between mx-8 p-2">
          <PageHeaderFirstSection />
          <div className="flex gap-x-10 items-center">
            <p className="hidden md:block font-semibold">Notifications</p>
            <div className="bg-white rounded-xl  px-5 py-2 flex ">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onClick={handleActive}
                  value=""
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                <span className="ms-3 text-sm font-medium text-black hidden md:block">
                  {isActive ? "Go offline" : "Go Online"}
                </span>
              </label>
            </div>
            <div>
              <button
                onClick={toggleDiv}
                className="bg-white rounded-xl px-5 py-2 text-primary hover:bg-hover"
              >
                {driverInfo.firstName}
                <ChevronDown className="inline" />
              </button>
              {showDiv && (
                <div
                  className="p-4 bg-secondary text-black w-[200px] h-[200px] absolute right-2 top-16 rounded-md z-50"
                  onMouseEnter={() => setShowDiv(true)}
                  onMouseLeave={() => setShowDiv(false)}
                >
                  <div className="flex flex-col gap-2 mt-2">
                    <Link to="" className="flex gap-3">
                      <Bell /> Notifications
                    </Link>
                    <hr />
                    <Link to="" className="flex gap-3">
                      <User /> Profile
                    </Link>
                    <hr />
                    <p
                      className="flex gap-3 cursor-pointer"
                      onClick={handleLogOut}
                    >
                      <LogOut /> Logout
                    </p>
                    <hr />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {rideRequestPop && rideData && (
        <RideRequestPopup
          rideData={rideData}
          acceptRideRequest={accepetRideRequest}
          rejectRideRequest={rejectRideRequest}
        />
      )}
      {confirmPopup && (
        <ConfirmPopup
          setNextPopup={setInputPop}
          setConfirmPop={setConfrimPopup}
        />
      )}
      {inputPop && (
        <GetInputPop
          input={rejectionReason}
          setInput={setRejectionReason}
          setInputPop={setInputPop}
          submit={submitRejection}
        />
      )}
    </>
  );
};

export default DriverHeader;

export function PageHeaderFirstSection() {
  const { toggle } = useSidebarContext();

  return (
    <div className={`gap-4 items-center flex-shrink-0 flex`}>
      <Menu onClick={toggle} />

      <Link
        to={"/driver"}
        className="first-letter:font-medium first-letter:text-xl "
      >
        Cabby
      </Link>
    </div>
  );
}
