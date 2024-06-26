import React from "react";
// import UserProfile from "../navbar/UserProfile";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  // console.log(authUser);
  // console.log(message);
  const { selectedConversation } = useConversation();

  const fromMe =
    (typeof message.senderId === "object"
      ? message.senderId?._id
      : message.senderId) === authUser._id;

  // console.log(
  //   typeof message.senderId === "object"
  //     ? message.senderId._id
  //     : message.senderId,
  //   authUser._id
  // );

  // console.log("fromMe", fromMe);

  const chatClassName = fromMe ? "chat-end" : "chat-start";

  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation.profilePic;

  const bubbleBgColor = fromMe
    ? "rgba(250, 45, 250, 0.568)"
    : "rgba(232, 231, 232, 0.568)";

  const fomatedTime = extractTime(
    message.createdAt || message.newMessage.createdAt
  );

  return (
    <>
      <div className={`chat ${chatClassName} gap-2`}>
        <div className="chat-image avatar">
          <img src={profilePic} alt="" width={40} height={40} />
        </div>
        <div className="chat-bubble" style={{ background: `${bubbleBgColor}` }}>
          {message.message || message.newMessage.message}
        </div>
      </div>
      <div className={`chat-footer  opacity-50`}>
        <span className={`${chatClassName}`}>{fomatedTime}</span>
      </div>
    </>
  );
};

export default Message;
