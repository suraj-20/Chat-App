import React from "react";

const MessageInput = () => {
  return (
    <div className="my-2">
      <div className="w-100 position-relative message-field d-flex align-items-center">
        <input
          value=""
          onChange=""
          type="text"
          name=""
          id=""
          placeholder="Type a message"
        />
        <button type="submit" className="position-absolute">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
