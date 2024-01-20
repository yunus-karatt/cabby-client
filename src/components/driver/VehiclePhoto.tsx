import { useEffect, useState } from "react";
import CabbyNav from "../auth/CabbyNav";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { cabby } from "../../services/firebase/config";

const VehiclePhoto = ({
  setVehicleData,
  postDetails,
}: {
  setVehicleData: React.Dispatch<
    React.SetStateAction<{
      imag1: string;
      imag2: string;
      type: string;
    }>
  >;
  postDetails: (url1:string,url2:string,model:string) => void;
}) => {
  const [cabType, setCabType] = useState<
    { cabType: string; maxPersons: number; _id: string }[]
  >([]);

  const [file1, setFile1] = useState<File | undefined>();
  const [file2, setFile2] = useState<File | undefined>();
  const [preview1, setPreview1] = useState<string | ArrayBuffer | null>(null);
  const [preview2, setPreview2] = useState<string | ArrayBuffer | null>(null);
  const [vehicleCat, setVehicleCat] = useState<string>("");

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const file = new FileReader();
    if (target.name === "vehicleImage1") {
      setFile1(target.files[0]);
      file.onload = function () {
        setPreview1(file.result);
      };
    } else {
      setFile2(target.files[0]);
      file.onload = function () {
        setPreview2(file.result);
      };
    }

    file.readAsDataURL(target.files[0]);
  }

  const handleSubmit = async () => {
    let downloadURL1:string;
    let downloadURL2:string
    try {
      const imageRef1 = ref(cabby, `vehicle-photo/${Date.now()}`);
      const imageRef2 = ref(cabby, `vehicle-photo/${Date.now() + 1}`);
      if (file1 && file2) {
        await uploadBytes(imageRef1, file1);
        await uploadBytes(imageRef2, file2);
         downloadURL1 = await getDownloadURL(imageRef1);
         downloadURL2 = await getDownloadURL(imageRef2);
        setVehicleData(() => {
          return {
            imag1: downloadURL1,
            imag2: downloadURL2,
            type: vehicleCat,
          };
        });
         postDetails(downloadURL1,downloadURL2,vehicleCat);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const cab = await driverAxios.get(driverApi.getCabs);
      setCabType(cab.data);
    };
    fetch();
  }, []);

  return (
    <div className="w-[480px] h-[570px] bg-secondary overflow-auto">
      <CabbyNav />
      <div className="p-3 ms-10 my-5">
        <p className="font-bold text-2xl">Upload Photo of your Vehicle</p>
      </div>

      <div className="flex flex-col p-3 ms-10 gap-y-2 w-[82%] my-5">
        <label className="font-bold" htmlFor="vehicleImage1">
          Photo 1
        </label>
        <input
          onChange={handleOnChange}
          className="border p-2 rounded-lg bg-white"
          type="file"
          name="vehicleImage1"
        />
        {preview1 && (
          <p>
            <img src={preview1 as string} alt="Upload preview" />
          </p>
        )}
        <label className="font-bold" htmlFor="vehicleImage2">
          Photo 2
        </label>
        <input
          onChange={handleOnChange}
          className="border p-2 rounded-lg bg-white"
          type="file"
          name="vehicleImage2"
        />
        {preview2 && (
          <p>
            <img src={preview2 as string} alt="Upload preview" />
          </p>
        )}
        <label htmlFor="cabtype" className="font-bold">
          Select Vehicle Category
        </label>
        <select
          value={vehicleCat}
          onChange={(e) => setVehicleCat(e.target.value)}
          className="border p-2 rounded-lg bg-white"
          name="cabtype"
          id="cabtype"
        >
          {cabType &&
            cabType.map((cab) => {
              return (
                <option key={cab._id} value={cab._id}>
                  {cab.cabType}
                </option>
              );
            })}
        </select>
      </div>
      <div className="flex justify-center items-center shadow-[0px_-8px_20px_0px_rgba(0,0,0,0.08)] p-3">
        <button
          onClick={handleSubmit}
          className={`w-[77%] bg-primary rounded-md py-1 text-white`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default VehiclePhoto;
