import React, { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  // console.log(sendMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="my-2">
      <form
        className="w-100 position-relative message-field d-flex align-items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="message"
          id=""
          placeholder="Type a message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit" className="position-absolute">
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <i className="fa-solid fa-paper-plane"></i>
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
