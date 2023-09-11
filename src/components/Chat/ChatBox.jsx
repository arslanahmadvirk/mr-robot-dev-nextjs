import React, { useEffect, useRef, useState } from "react";
import { FileMessageWithProgress } from "./FileMessageWithProgress";
import { ImAttachment } from "react-icons/im";
import InputEmoji from "react-input-emoji";
import { IoPaperPlaneSharp, IoPaperPlane } from "react-icons/io5";
import chatsRepository from "@/repositories/chatsRepository";
import { convertDateAndTime } from "@/helpers/chatHelpers";

export function ChatBox({ chat, socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const [fileName, setFileName] = useState();
  const [file, setFile] = useState();
  const [currentUser, setCurrentUser] = useState();

  const handleSend = async (e) => {
    e && e.preventDefault();
    if (message !== "") {
      const messageObj = {
        chatId: chat?.id,
        messageBody: {
          author: currentUser,
          message,
          time: new Date().toISOString(),
        },
      };
      try {
        const { result } = await chatsRepository.createMessage(messageObj);
        socket.emit("send-message-staff", chat?.receiverId?.id, result);
        setMessages((list) => [...list, result]);
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      const messageObj = {
        chatId: chat.id,
        messageBody: {
          author: currentUser,
          attachment: "attachment",
          message: file.name,
          time: new Date().toISOString(),
        },
      };
      setFileName(file.name);
      setFile(file);
      setMessages((list) => [...list, messageObj.messageBody]);
    }
  }

  useEffect(() => {
    setCurrentUser(chat?.senderId?.id);
    const getMessages = async () => {
      try {
        const { result } = await chatsRepository.getMessages(chat.id);
        setMessages(result);
      } catch (err) {
        setMessages([]);
        console.log(err);
      }
    };
    if (chat !== null) getMessages();
    return () => {
      setMessages([]);
    };
  }, [chat]);

  useEffect(() => {
    socket.once("receive-message", (data) => {
      setMessages([...messages, data]);
    });
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEnterPress = (e) => {
    handleSend();
  };
  return (
    <>
      <div
        id="messages"
        className="flex flex-col h-96 space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messages.map((message, index) => (
          <div ref={scroll} key={index} className="chat-message">
            <div
              className={`flex items-end ${
                message.author == currentUser && "justify-end"
              }`}
            >
              <div className="flex flex-col space-y-2 text-xs max-w-xs order-1 items-end">
                <div>
                  {message.attachment ? (
                    <span
                      className={`px-4 py-2 rounded-lg inline-block  ${
                        message.author == currentUser
                          ? "bg-[#D32A3D]  text-white rounded-br-none"
                          : "bg-gray-200  text-gray-700 rounded-bl-none"
                      }`}
                    >
                      <FileMessageWithProgress
                        chatId={chat?.id}
                        message={message}
                        file={file}
                        socket={socket}
                        userId={chat?.receiverId?.id}
                      />
                    </span>
                  ) : (
                    <>
                      <span
                        className={`px-4 py-2 rounded-lg inline-block  ${
                          message.author == currentUser
                            ? "bg-[#D32A3D]  text-white rounded-br-none"
                            : "bg-gray-200  text-gray-700 rounded-bl-none"
                        }`}
                      >
                        {message?.message}
                        <span className="block text-right">
                          {convertDateAndTime(message?.time)}
                        </span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!chat?.isClosed ? (
        <div className="border-t-2 border-gray-200 px-4 py-4 mb-2 sm:mb-0 flex items-center">
          <InputEmoji
            className="w-48"
            borderColor={"#b9b2b2"}
            value={message}
            onChange={setMessage}
            onEnter={handleEnterPress}
          />
          <label
            for="file-input"
            class="relative inline-block cursor-pointer mr-1"
          >
            <ImAttachment className="w-6 h-6 cursor-pointer" />
            <input
              id="file-input"
              type="file"
              class="hidden"
              onChange={handleFileSelect}
              accept="image/jpeg, image/png, image/gif"
              maxLength={1}
            />
          </label>
          <button
            onClick={(e) => handleSend(e)}
            className=" rounded-full p-1 bg-primary-red-dark"
          >
            <IoPaperPlane className="w-5 h-5 fill-white" />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
