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
  const fromMe = message.senderId === authUser.user?._id && authUser.user._id;
  // console.log(message.senderId, authUser.newUser?._id || authUser.user?._id);
  console.log(fromMe);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.newUser?.profilePic || authUser.user?.profilePic
    : selectedConversation.profilePic;
  const bubbleBgColor = fromMe
    ? "rgba(250, 45, 250, 0.568)"
    : "rgba(232, 231, 232, 0.568)";

  const fomatedTime = extractTime(message.createdAt);

  return (
    <>
      <div className={`chat ${chatClassName} gap-3`}>
        <div className="chat-image avatar">
          <img src={profilePic} alt="" width={40} height={40} />
        </div>
        <div className="chat-bubble" style={{ background: `${bubbleBgColor}` }}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50 d-flex gap-1 align-items-center">
          {fomatedTime}
        </div>
      </div>
    </>
  );
};

export default Message;
