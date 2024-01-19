import React, { ChangeEvent, useCallback, useState } from "react";
import CabbyNav from "../auth/CabbyNav";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { cabby } from "../../services/firebase/config";
import { Camera } from "lucide-react";

const VehicleDetails = ({
  role,
  setInput,
}: {
  role: "Licence" | "Aadhar" | "Registration";
  setInput: React.Dispatch<
    React.SetStateAction<{ number: string; photo: string } | null>
  >;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [inputNumber,setInputNumber]=useState("")

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
    setInputNumber(e.target.value)
  };

  const handleSubmit = async () => {
    try {
      const imageRef = ref(cabby, `${role}/${Date.now()}`);
      if (file) {
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        console.log(downloadURL)
        setInput({number:inputNumber,photo:downloadURL})
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[480px] h-[570px] bg-secondary">
      <CabbyNav />
      <div className="p-3 ms-10 my-5">
        <p className="font-bold text-2xl">Upload Photo of your {role}</p>
      </div>
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
      <div className="flex flex-col p-3 ms-10 gap-y-2 w-[82%] my-5">
        <label htmlFor="cabtype" className="font-bold">
          {role} Number
        </label>
        <input
          onChange={handleChange}
          name="cabType"
          className="border p-2 rounded-lg"
          type="text"
          placeholder={`Please Enter you ${role} number`}
        />
      </div>
      <div className="flex justify-center items-center shadow-[0px_-8px_20px_0px_rgba(0,0,0,0.08)] p-3">
        <button onClick={handleSubmit} className={`w-[77%] bg-primary rounded-md py-1 text-white`}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default VehicleDetails;
