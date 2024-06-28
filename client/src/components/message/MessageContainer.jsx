import React, { useEffect } from "react";
import "./MessageContainer.css";
// import UserProfile from "../navbar/UserProfile";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import useCreate from "../../hooks/useCreateGroup";

const MessageContainer = ({ handlePopup, onBack, className }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  console.log(selectedConversation);
  const { authUser } = useAuthContext();

  useEffect(() => {
    // Cleanup function
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  // const noChatSelected = false;

  // const isGroupChat = selectedConversation.isGroupChat;
  // const profilePic = selectedConversation.participants[0]?.profilePic;
  return (
    <div className={`message-container p-3 ${className}`}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="message-header d-flex gap-3 align-items-center justify-content-between">
            <div className="d-lg-none back-button" onClick={onBack}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="conversation d-flex align-items-center gap-2">
              <img
                src={selectedConversation.profilePic || authUser.profilePic}
                alt=""
                width={40}
                height={40}
              />
              <span>
                {selectedConversation.fullName || selectedConversation.name}
              </span>
            </div>
            <div className="conversation-details">
              <button
                onClick={() => handlePopup("conversation")}
                className="conversation-detail"
              >
                <i className="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <div className="px-4 text-center d-flex align-items-center flex-column gap-2">
        <p style={{ fontSize: "1.5rem" }}>Welcome 👋 {authUser.fullName} *</p>
        <p style={{ fontSize: "2rem" }}>Select a chat to start messaging</p>
        <i style={{ fontSize: "2rem" }} className="fa-solid fa-message"></i>
      </div>
    </div>
  );
};

// export default NoChatSelected;
