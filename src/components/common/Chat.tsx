import { ArrowLeft, ArrowUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import avathar from "../../assets/avatar 1.png";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import { Message } from "../../interface/common/common";
import { Socket } from "socket.io-client";

const Chat = ({
  setShowChat,
  role,
  rideId,
  isScheduled,
}: {
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
  role: "Driver" | "User";
  rideId: string;
  isScheduled: boolean;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMsg, setInputMsg] = useState<string>("");
  const [sendMessage, setSendMessage] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  let socketIO: Socket | null;

  if (role === "Driver")
    socketIO = useSelector((state: rootState) => state.driverSocket.socketIO);
  else socketIO = useSelector((state: rootState) => state.userSocket.socketIO);

  const handleSendMessage = () => {
    const message: Message = {
      sender: role,
      content: inputMsg,
      timestamp: new Date(),
    };
    // console.log({ fromHandleSendMessageFunction: message });
    socketIO?.emit("update-chat-message", { rideId, message, isScheduled });
    // setMessages((prevMessages) => [...prevMessages, message]);
    setInputMsg("");
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (inputMsg.length > 0) setSendMessage(true);
    else setSendMessage(false);
  }, [inputMsg]);

  useEffect(() => {
    socketIO?.emit("join-chat", { rideId, isScheduled });

    socketIO?.on(
      "chat-message",
      (message: Message[], messageRideId: string) => {
        if (message && messageRideId == rideId) {
          setMessages(message);
        }
      }
    );
  }, []);
  return (
    <>
      <div className="relative flex flex-col w-full">
        <div className="min-h-[80vh]">
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
              <p className="text-text-secondary">
                {role === "User" ? "Your Driver" : "Your Rider"}
              </p>
              <p className="text-xl font-bold">Alex Smith</p>
            </div>
          </div>
          {messages.map((message) => {
            return (
              <div className="mt-3">
                <p
                  className={`bg-secondary w-[70%] p-2 rounded-md ${
                    role === message.sender && "ml-auto"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-5 flex items-center gap-x-1 mt-5">
          <input
            ref={inputRef}
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            type="text"
            placeholder="Text Message..."
            className="w-[85%] p-3 bg-text-secondary text-white font-semibold rounded z-50 opacity-90 outline-none"
          />

          {sendMessage && (
            <div
              className="bg-text-secondary p-3 rounded-full opacity-80 cursor-pointer hover:opacity-100 "
              onClick={handleSendMessage}
            >
              <ArrowUp color="white" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
