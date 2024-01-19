import { Camera, XCircle } from "lucide-react";
import { ChangeEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PriceModelPopupProps } from "../../interface/admin/adminInterface";
import { cabby } from "../../services/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";

const PriceModelPopup = ({
  setPreview,
  setPopup,
  preview,
  setNewCab
}: PriceModelPopupProps) => {
  const [file, setFile] = useState<File | null>(null);
  // const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cabType: "",
    maxPersons: "",
    basePrice: "",
    pricePerKm: "",
    image: "",
  });

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    setFile(acceptedFiles[0]);

    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const imageRef = ref(cabby, `cab-types/${formData.cabType}`);
      if (file) {
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        console.log(downloadURL);
        setFormData((state) => {
          return { ...state, image: downloadURL };
        });
        console.log({formData})
       const cab= await adminAxios.post(adminApi.cab,{...formData,image:downloadURL})
        setNewCab(cab.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white min-w-[475px] max-h-[600px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-md overflow-auto no-scrollbar">
      <div className="flex justify-between p-3">
        <p>New Cab Type</p>
        <XCircle
          onClick={() => setPopup(false)}
          className="text-primary cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm"
        />
      </div>
      <hr />
      <div className="flex justify-center w-full mt-5">
        <div
          {...getRootProps()}
          className="p-3 outline-dashed outline-2 outline-offset-2 w-3/4 h-[230px] flex justify-center items-center"
        >
          <input {...getInputProps()} />
          {preview ? (
            <img
              src={preview as string}
              className="max-h-full max-w-full object-contain"
              alt="Upload preview"
            />
          ) : isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <Camera className="w-1/2 h-1/2" />
          )}
        </div>
      </div>
      <div className="flex flex-col p-3 ms-10 gap-y-2 w-[82%]">
        <label htmlFor="cabtype" className="font-bold">
          Cab Type
        </label>
        <input
          onChange={handleChange}
          name="cabType"
          className="border p-2 rounded-lg"
          type="text"
          placeholder="Enter cab type EX. XL"
        />
        <label htmlFor="cabtype" className="font-bold">
          Seats
        </label>
        <input
          onChange={handleChange}
          name="maxPersons"
          className="border p-2 rounded-lg"
          type="number"
          placeholder="Enter Maximum passenger count"
        />
        <label htmlFor="cabtype" className="font-bold">
          Base Price
        </label>
        <input
          onChange={handleChange}
          name="basePrice"
          className="border p-2 rounded-lg"
          type="number"
          placeholder="Enter Minimum charge"
        />
        <label htmlFor="cabtype" className="font-bold">
          KM price
        </label>
        <input
          onChange={handleChange}
          name="pricePerKm"
          className="border p-2 rounded-lg"
          type="number"
          placeholder="Enter Price per KM"
        />
      </div>
      <div className="flex justify-center mb-3">
        <button
          onClick={handleSubmit}
          className="bg-primary text-white py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PriceModelPopup;
