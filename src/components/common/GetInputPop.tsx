import { useEffect, useRef } from "react";
import CabbyNav from "../auth/CabbyNav";

const GetInputPop = ({
  input,
  setInputPop,
  setInput,
  submit,
}: {
  input: string;
  setInputPop: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  submit: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    setInputPop(false);
    submit();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="absolute bg-white rounded-md border w-[450px] h-[300px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
      <div className="">
        <CabbyNav />
      </div>
      <div className="flex flex-col justify-evenly items-center h-[50%]">
        <p className="text-xl">Tell us why !</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          ref={inputRef}
          type="text"
          className="border w-3/4 p-3"
        />
      </div>
      <div className="flex justify-evenly items-center">
        <button
          onClick={handleSubmit}
          className="bg-success text-white py-3 px-7 rounded-md font-semibold w-[35%] hover:bg-opacity-90"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GetInputPop;
