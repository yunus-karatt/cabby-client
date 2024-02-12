import { useEffect, useState } from "react";
import VehicleDetails from "../../components/driver/VehicleDetails";
import VehiclePhoto from "../../components/driver/VehiclePhoto";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { useNavigate } from "react-router";
import { Driver } from "../../interface/driver/driverInterface";
import { setDriverCredentials } from "../../services/redux/slices/driverAuthSlice";

const VehicleInput = () => {
  const { driverInfo } = useSelector((state: rootState) => state.driverAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [aadhar, setAadhar] = useState<{
    number: string;
    photo: string;
  } | null>(null);
  const [licence, setLicence] = useState<{
    number: string;
    photo: string;
  } | null>(null);
  const [registration, setRegistration] = useState<{
    number: string;
    photo: string;
  } | null>(null);
  // const [vehiclePhoto1, setVehiclePhot1] = useState<string>("");
  // const [vehiclePhoto2, setVehiclePhot2] = useState<string>("");
  // const [vehicleType, setVehicleType] = useState<string>("");
  const [vehicleDetails, setVehicleDetails] = useState({
    imag1: "",
    imag2: "",
    type: "",
  });
  // const [driver, setDriver] = useState<Driver>(); 
  // const setVehiclePhot1Function=(state:string)=>{
  //     setVehiclePhot1(state)
  // }
  const postDetails = async (url1: string, url2: string, model: string) => {
    console.log(
      vehicleDetails.imag1,
      vehicleDetails.imag2,
      vehicleDetails.type
    );
    const data = {
      id: driverInfo.id,
      aadhar: {
        aadharId: aadhar?.number,
        aadharImage: aadhar?.photo,
      },
      licence: {
        licenceId: licence?.number,
        licenceImage: licence?.photo,
      },
      vehicleDocuments: {
        registration: {
          registrationId: registration?.number,
          registrationImage: registration?.photo,
        },
        vehicleImage1: url1,
        vehicleImage2: url2,
      },
      cabModel: model,
    };
    // console.log({vehicleType})
    await driverAxios.post(driverApi.registerVehicle, { ...data });
    const response = await driverAxios.post(driverApi.isDriverExist, {
      mobile: driverInfo.mobile,
    });
    
    const res = await driverAxios.post(driverApi.loginWithMobile, {
      mobile: driverInfo.mobile,
    });
    const { token } = res.data;
    dispatch(setDriverCredentials(response.data));
    localStorage.setItem("driverToken", token);
    navigate("/driver");
  };
  useEffect(() => {
    console.log("rendered");
  }, []);

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        {aadhar === null && licence === null && registration === null && (
          <VehicleDetails role="Aadhar" setInput={setAadhar} />
        )}
        {aadhar !== null && licence === null && registration === null && (
          <VehicleDetails role="Licence" setInput={setLicence} />
        )}
        {aadhar !== null && licence !== null && registration === null && (
          <VehicleDetails role="Registration" setInput={setRegistration} />
        )}
        {aadhar !== null && licence !== null && registration !== null && (
          <VehiclePhoto
            setVehicleData={setVehicleDetails}
            // setVehiclePhot1Prop={setVehiclePhot1}
            // setVehiclePhot2Prop={setVehiclePhot2}
            // setVehicleTypeProp={setVehicleType}
            postDetails={postDetails}
          />
        )}
      </div>
    </>
  );
};

export default VehicleInput;
