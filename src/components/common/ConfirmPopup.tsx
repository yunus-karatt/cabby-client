import React from "react";
import CabbyNav from "../auth/CabbyNav";
import { AlertTriangle } from "lucide-react";

const ConfirmPopup = ({
  setConfirmPop,
  setNextPopup,
}: {
  setConfirmPop: React.Dispatch<React.SetStateAction<boolean>>;
  setNextPopup?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleConfirm = () => {
    setConfirmPop(false);
    setNextPopup && setNextPopup(true);
  };

  return (
    <div className="absolute bg-white rounded-md border w-[450px] h-[400px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
      <div className="">
        <CabbyNav />
      </div>
      <div className="flex flex-col gap-y-7 justify-evenly items-center h-[50%]">
        <h1 className="font-bold text-4xl">Are You Sure?!</h1>
        <AlertTriangle color="#8b0000" size={80} />
      </div>
      <div className="h-[50%] flex justify-evenly items-center">
        <button
          onClick={handleConfirm}
          className="bg-success text-white py-3 px-7 rounded-md font-semibold w-[35%] hover:bg-opacity-90"
        >
          Confirm
        </button>
        <button
          onClick={() => setConfirmPop(false)}
          className="bg-danger text-white py-3 px-7 rounded-md font-semibold w-[35%] hover:bg-opacity-90"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmPopup;
