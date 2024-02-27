import { useEffect, useState } from "react";
import avathar from "../../assets/avatar 1.png";
import { DriverProfile } from "../../interface/driver/driverInterface";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { cabby } from "../../services/firebase/config";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

const ProfileData = ({ driverData }: { driverData: DriverProfile }) => {
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { driverInfo } = useSelector((state: rootState) => state.driverAuth);

  const [firstName, setFirstName] = useState(driverData.firstName);
  const [lastName, setLastName] = useState(driverData.lastName);
  const [email, setEmail] = useState(driverData.email);
  const [mobile, setMobile] = useState(driverData.mobile);
  const [showPhotoSubmitBtn,setShowPhotoSubmitBtn]=useState(false)

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setShowPhotoSubmitBtn(true)

    if (file) {
      setSelectedImage(file);
    }
  };

  // Function to trigger file selection dialog
  const handleUploadButtonClick = () => {
    setSelectedImage(null)
    document.getElementById("fileInput")?.click(); // Trigger click on hidden file input
  };
  const handlePhotoSubmission = async () => {
    try {
      const imageRef = ref(cabby, `driver-profile/${Date.now()}`);
      if (selectedImage) {
        await uploadBytes(imageRef, selectedImage);
        const downloadURL = await getDownloadURL(imageRef);
        await driverAxios.post(`${driverApi.updateProfile}/${driverInfo.id}`, {
          profileImage: downloadURL,
        });
        setShowPhotoSubmitBtn(false)
 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (
        firstName === driverData.firstName &&
        lastName === driverData.lastName &&
        email === driverData.email &&
        mobile == driverData.mobile
      ) {
        return;
      }
      await driverAxios.post(`${driverApi.updateProfile}/${driverInfo.id}`, {
        firstName,
        lastName,
        email,
        mobile,
      });
      toast.success("profile updated");
      setIsInputDisabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-end  justify-between gap-x-20 md:w-2/4">
        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : driverData?.profileImage
              ? driverData.profileImage
              : avathar
          }
          alt="avatar"
          className="w-24 h-24 rounded-full"
        />
        {!showPhotoSubmitBtn ? (
          <button
            onClick={handleUploadButtonClick}
            className="bg-primary w-36 h-12 p-3 rounded text-white"
          >
            Upload New
          </button>
        ) : (
          <div className=" flex gap-x-5">
            <button
              className="bg-success w-36 h-12 p-3 rounded text-white"
              onClick={handlePhotoSubmission}
            >
              Submit Photo
            </button>
            <button
              className="bg-danger w-36 h-12 p-3 rounded text-white"
              onClick={() =>{ 
                setSelectedImage(null)
                setShowPhotoSubmitBtn(false)
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col md:w-2/4 gap-y-5">
        <div
          onClick={() => setIsInputDisabled(false)}
          className="cursor-pointer ms-auto hover:bg-primary hover:text-white rounded-md p-3"
        >
          <Pencil />
        </div>
        <label htmlFor="">First Name</label>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          disabled={isInputDisabled}
          type="text"
          className="p-2 h-10 border-2 border-text-secondary rounded-md"
        />
        <label htmlFor="">Last Name</label>
        <input
          value={lastName}
          disabled={isInputDisabled}
          type="text"
          className="p-2 h-10 border-2 border-text-secondary rounded-md"
        />
        <label htmlFor="">Email</label>
        <input
          value={email}
          disabled={isInputDisabled}
          type="text"
          className="p-2 h-10 border-2 border-text-secondary rounded-md"
        />
        <label htmlFor="">Mobile</label>
        <input
          value={mobile}
          disabled={isInputDisabled}
          type="text"
          className="p-2 h-10 border-2 border-text-secondary rounded-md"
        />
        <div className="w-full flex justify-center p-5">
          <button
            onClick={handleFormSubmit}
            disabled={isInputDisabled}
            className={`bg-primary w-1/2 p-2 rounded text-white ${
              isInputDisabled && "opacity-50"
            } `}
          >
            Submit
          </button>
        </div>
      </div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
    </>
  );
};

export default ProfileData;
