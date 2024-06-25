import React from "react";
import UserProfile from "../navbar/UserProfile";

const Message = () => {
  return (
    <>
      <div className="chat chat-end d-flex flex-row-reverse align-items-center gap-3">
        <div className="chat-image avatar">
          <UserProfile />
        </div>
        <div className="chat-bubble">Hi, What's Up!</div>
        <div className="chat-footer opacity-50 d-flex gap-1 align-items-center">
          12:00
        </div>
      </div>

      <div className="chat chat-start d-flex align-items-center gap-3">
        <div className="chat-image avatar">
          <UserProfile />
        </div>
        <div className="chat-bubble">Hi, What's Up!</div>
      </div>
    </>
  );
};

export default Message;
