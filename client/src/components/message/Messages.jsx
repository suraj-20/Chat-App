import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import Skeleton from "react-loading-skeleton";

const Messages = () => {
  const { message, loading } = useGetMessages();
  // console.log("Messages: ", message);
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [message]);
  return (
    <div className="messages py-3 px-2 d-flex flex-column gap-3 overflow-auto h-80">
      {!loading &&
        message.length > 0 &&
        message.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3).map((_, idx) => <Skeleton key={idx} />)]}

      {!loading && message.length === 0 && (
        <p className="text-center">Send a message to start conversation.</p>
      )}
    </div>
  );
};

export default Messages;
