import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";

const Conversations = ({ handleConversationSelect }) => {
  const { loading, conversations } = useGetConversation();
  // console.log(conversations);
  return (
    <div className="all-users d-flex flex-column gap-2 overflow-auto">
      {conversations.map((conversation) => (
        <div key={conversation._id} onClick={handleConversationSelect}>
          <Conversation conversation={conversation} />
        </div>
      ))}

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
    </div>
  );
};

export default Conversations;
