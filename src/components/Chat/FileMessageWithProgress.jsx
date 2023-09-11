import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsDownload, BsFileImage } from "react-icons/bs";
import { uploadImage } from "../FileUploader/ImageUpload";
import alert from "../Notification/Alert";
import chatsRepository from "@/repositories/chatsRepository";
import {
  convertDateAndTime,
  convertMessageToShortName,
} from "@/helpers/chatHelpers";

export function FileMessageWithProgress({
  socket,
  chatId,
  message,
  file,
  userId,
}) {
  const [progress, setProgress] = useState();
  const [url, setUrl] = useState("");
  const downlaodFile = (e) => {
    e.preventDefault();
    if (message.attachment !== "attachment") window.open(message.attachment);
    else {
      window.open(url);
    }
  };
  const uploadFile = async () => {
    await uploadImage(
      file,
      async (url, success) => {
        if (success) {
          const newObj = {
            chatId,
            messageBody: {
              ...message,
              ...{
                attachment: url,
              },
            },
          };
          setUrl(url);
          try {
            const { result } = await chatsRepository.createMessage(newObj);
            console.log(userId);
            socket.emit("send-message-staff", userId, result);
          } catch (error) {
            alert.showErrorAlert(error);
          }
        }
      },
      setProgress
    );
  };

  useEffect(() => {
    if (file && message.attachment === "attachment") uploadFile();
  }, []);
  return (
    <div className="w-32 relative">
      <BsFileImage className="inline w-6 h-6 justify-end" />
      <span className="ml-2 w-10">
        {convertMessageToShortName(message?.message)}
      </span>
      <BsDownload
        onClick={downlaodFile}
        className=" cursor-pointer inline w-5 h-5 absolute right-0 "
      />
      <span className="block text-right">
        {convertDateAndTime(message?.time)}
      </span>

      {progress < 100 && (
        <div className="relative h-2 bg-gray-300">
          <div
            className="absolute top-0 left-0 h-2 bg-green-500"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
