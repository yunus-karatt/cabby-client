import { ArrowLeft, ArrowUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import avathar from "../../assets/avatar 1.png";

const Chat = ({
  setShowChat,
}: {
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [inputMsg, setInputMsg] = useState<string>("");
  const [sendMessage, setSendMessage] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{inputRef.current?.focus()},[])

  useEffect(() => {
    console.log(inputMsg.length);
    if (inputMsg.length > 0) setSendMessage(true);
    else setSendMessage(false)
  }, [inputMsg]);

  return (
    <>
      <div className="relative h-[85vh] flex flex-col">
        <div>
          <div className="flex gap-x-5 items-center bg-secondary rounded p-2">
            <ArrowLeft onClick={() => setShowChat(false)} />
            <p className="text-2xl font-semibold">Chat</p>
          </div>
          <div className="mt-10 flex gap-x-5 items-center">
            <img
              className="rounded-full w-[65px] h-[65px]"
              src={avathar}
              alt="avatar"
            />
            <div>
              <p className="text-text-secondary">Your Driver</p>
              <p className="text-xl font-bold">Alex Smith</p>
            </div>
          </div>
          <div className="mt-10">
            <p className="bg-secondary w-[70%] p-3 rounded-md">hi how are y </p>
          </div>
          <div className="mt-5 ">
            <p className="bg-secondary w-[70%] p-3 rounded-md ml-auto">
              hfsdfdsfdsfdsfdsfsdfdfdsf sdsffds fsdffdsfdsff fdfdfdff how are y{" "}
            </p>
          </div>
          <div className="mt-10">
            <p className="bg-secondary w-[70%] p-3 rounded-md">hi how are y </p>
          </div>
          <div className="mt-5 ">
            <p className="bg-secondary w-[70%] p-3 rounded-md ml-auto">
              hfsdfdsfdsfdsfdsfsdfdfdsf sdsffds fsdffdsfdsff fdfdfdff how are y{" "}
            </p>
          </div>
          <div className="mt-10">
            <p className="bg-secondary w-[70%] p-3 rounded-md">hi how are y </p>
          </div>
          <div className="mt-5 ">
            <p className="bg-secondary w-[70%] p-3 rounded-md ml-auto">
              hfsdfdsfdsfdsfdsfsdfdfdsf sdsffds fsdffdsfdsff fdfdfdff how are y{" "}
            </p>
          </div>
          <div className="mt-10">
            <p className="bg-secondary w-[70%] p-3 rounded-md">hi how are y </p>
          </div>
          <div className="mt-5 ">
            <p className="bg-secondary w-[70%] p-3 rounded-md ml-auto">
              hfsdfdsfdsfdsfdsfsdfdfdsf sdsffds fsdffdsfdsff fdfdfdff how are y{" "}
            </p>
          </div>
          <div className="mt-10">
            <p className="bg-secondary w-[70%] p-3 rounded-md">hi how are y </p>
          </div>
          <div className="mt-5 ">
            <p className="bg-secondary w-[70%] p-3 rounded-md ml-auto">
              hfsdfdsfdsfdsfdsfsdfdfdsf sdsffds fsdffdsfdsff fdfdfdff how are y{" "}
            </p>
          </div>
          <div className="mt-10">
            <p className="bg-secondary w-[70%] p-3 rounded-md">hi how are y </p>
          </div>
          <div className="mt-5 ">
            <p className="bg-secondary w-[70%] p-3 rounded-md ml-auto">
              hfsdfdsfdsfdsfdsfsdfdfdsf sdsffds fsdffdsfdsff fdfdfdff how are y{" "}
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center gap-x-1">
          <input
            ref={inputRef}
            value={inputMsg}
            onChange={(e)=>setInputMsg(e.target.value)}
            type="text"
            placeholder="Text Message..."
            className="w-[85%] p-3 bg-text-secondary text-white font-semibold rounded z-50 opacity-90 outline-none"
          />

          {sendMessage && (
            <div className="bg-text-secondary p-3 rounded-full opacity-80 cursor-pointer hover:opacity-100 ">
              <ArrowUp color="white" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
