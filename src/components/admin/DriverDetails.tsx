import { useState } from "react";
import avatar from "../../assets/avatar 1.png";
import { DriverData } from "../../interface/driver/driverInterface";
const DriverDetails = ({ driverData }: { driverData: DriverData }) => {
  
  const [license, setLicense] = useState<boolean>(true);
  const [showRc,setShowRc]=useState<boolean>(false)

  return (
    <div className="bg-white mx-2 rounded-md p-10 ">
      <div className="w-full flex justify-between">
        <div className="flex gap-x-8">
          <div>
            <img src={avatar} alt="" />
          </div>
          <div>
            <p className="font-bold">
              {driverData.firstName} {driverData.lastName}
            </p>
          </div>
        </div>
        <div>
          <div
            className={`bg-secondary font-bold rounded py-2 px-3 ${
              driverData.isAvailable ? "text-success" : "text-danger"
            }`}
          >
            {driverData.isAvailable ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className="mt-20 flex justify-between md:flex-row flex-col">
        <div className="flex flex-col gap-y-3">
          <p className="text-text-secondary">Driver ID</p>
          <p className="font-bold">{driverData._id}</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="text-text-secondary">Mobile</p>
          <p className="font-bold">{driverData.mobile}</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="text-text-secondary">Email</p>
          <p className="font-bold">{driverData.email}</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="text-text-secondary">Cab Type</p>
          <p className="font-bold">{driverData.cabModel[0].cabType}</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="text-text-secondary">Register Date</p>
          <p className="font-bold">{driverData.joinedAt.split("T")[0]}</p>
        </div>
      </div>
      <div className="mt-10 w-full flex md:flex-row flex-col md:items-center gap-x-9">
        <h1 className="text-4xl font-bold">Driver Documents</h1>
        <hr className="md:w-[70%] h-1 mt-2 bg-gray-100 border-0 rounded  dark:bg-gray-700"></hr>
      </div>
      <div className="mt-20 flex md:flex-row flex-col gap-y-8 justify-evenly md:items-center ">
        <div className="border-4 border-text-secondary border-opacity-50 w-[250px] h-[150px] ">
          <div
            onClick={() => setLicense(() => true)}
            className={`cursor-pointer h-1/2 border-b-4 border-text-secondary border-opacity-50 flex p-5 items-center hover:bg-secondary ${
              license && "bg-secondary"
            }`}
          >
            <p className={`text-3xl ${license && "text-black font-bold "}`}>
              License
            </p>
          </div>
          <div
            onClick={() => setLicense(() => false)}
            className={`cursor-pointer h-1/2 flex p-5 items-center hover:bg-secondary ${
              !license && "bg-secondary"
            }`}
          >
            <p className={`text-3xl ${!license && "text-black font-bold "}`}>
              Aadhar
            </p>
          </div>
        </div>
        <div className="">
          {license ? (
            <div className="flex flex-col gap-y-5">
              <p className="font-bold text-xl">
                <span className="text-text-secondary">License No. : </span>
                {driverData.licence.licenceId}
              </p>
              <img src={driverData.licence.licenceImage} alt="" />
            </div>
          ) : (
            <div className="flex flex-col gap-y-5 ">
              <p className="font-bold text-xl">
                {" "}
                <span className="text-text-secondary">Aadhar No. : </span>
                {driverData.aadhar.aadharId}
              </p>
              <img src={driverData.aadhar.aadharImage} alt="" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 w-full flex md:flex-row flex-col md:items-center gap-x-9">
        <h1 className="text-4xl font-bold">Vehicle Documents</h1>
        <hr className="md:w-[70%] h-1 mt-2 bg-gray-100 border-0 rounded  dark:bg-gray-700"></hr>
      </div>
      <div className="mt-20 flex md:flex-row flex-col gap-y-10 justify-evenly items-center">
        <div className="border-4 border-text-secondary border-opacity-50 w-[250px] h-[150px] ">
          <div
            onClick={() => setShowRc(() => true)}
            className={`cursor-pointer h-1/2 border-b-4 border-text-secondary border-opacity-50 flex p-5 items-center hover:bg-secondary ${
              showRc && "bg-secondary"
            }`}
          >
            <p className={`text-3xl ${showRc && "text-black font-bold "}`}>
              Registration
            </p>
          </div>
          <div
            onClick={() => setShowRc(() => false)}
            className={`cursor-pointer h-1/2 flex p-5 items-center hover:bg-secondary ${
              !showRc && "bg-secondary"
            }`}
          >
            <p className={`text-3xl ${!showRc && "text-black font-bold "}`}>
              Vehicle Photo
            </p>
          </div>
        </div>
        <div className="">
          {showRc ? (
            <div className="flex flex-col gap-y-5">
              <p className="font-bold text-xl">
                <span className="text-text-secondary">Registration Number : </span>
                {driverData.vehicleDocuments.registration.registrationId}
              </p>
              <img src={driverData.vehicleDocuments.registration.registrationImage} alt="" />
            </div>
          ) : (
            <div className="flex flex-col gap-y-5 w-[320px] h-[320px]">
              
              <img src={driverData.vehicleDocuments.vehicleImage1} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
