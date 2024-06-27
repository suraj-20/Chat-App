import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import Skeleton from "react-loading-skeleton";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessage();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="messages py-3 px-2 d-flex flex-column gap-1 overflow-auto h-80">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3).map((_, idx) => <Skeleton key={idx} />)]}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start conversation.</p>
      )}
    </div>
  );
};

export default Messages;
