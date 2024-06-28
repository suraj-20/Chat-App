import React from "react";
// import UserProfile from "../navbar/UserProfile";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";
// const groupProfile = "https://avatar.iran.liara.run/public";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { authUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const isGroupChat = conversation.isGroupChat;
  const displayName = isGroupChat ? conversation.name : conversation.fullName;
  const profilePic = isGroupChat
    ? authUser.profilePic
    : conversation.profilePic;

  return (
    <div
      className={`user d-flex gap-2 align-items-center p-2 ${
        isSelected ? "selected-chat" : ""
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className="user-image">
        <img src={profilePic} alt="" width={40} height={40} />
        <div className={`${isOnline ? "online-status" : ""}`}></div>
      </div>
      <div className="user-name">
        <h6>{displayName}</h6>
      </div>
    </div>
  );
};

export default Conversation;

/* <div className="user d-flex gap-2 align-items-center p-2">
        <div className="user-image">
          <img
            src="https://avatar.iran.liara.run/public"
            alt=""
            width={45}
            height={45}
          />
          <div className="online-status"></div>
        </div>
        <div className="user-name">
          <h6>Suraj</h6>
        </div>
      </div> */
