import React, { useEffect } from "react";
import "./MessageContainer.css";
// import UserProfile from "../navbar/UserProfile";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  // console.log(selectedConversation);

  useEffect(() => {
    // Cleanup function
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  // const noChatSelected = false;
  return (
    <div className="message-container p-3">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="message-header d-flex gap-3 align-items-center justify-content-between">
            <div className="conversation d-flex align-items-center gap-3">
              <img
                src={selectedConversation.profilePic}
                alt=""
                width={40}
                height={40}
              />
              <span>{selectedConversation.fullName}</span>
            </div>
            <div className="conversation-details">
              <button className="conversation-detail">
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
  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <div className="px-4 text-center d-flex align-items-center flex-column gap-2">
        <p style={{ fontSize: "1.5rem" }}>Welcome 👋 John Doe *</p>
        <p style={{ fontSize: "2rem" }}>Select a chat to start messaging</p>
        <i style={{ fontSize: "2rem" }} className="fa-solid fa-message"></i>
      </div>
    </div>
  );
};

// export default NoChatSelected;
