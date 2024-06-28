import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";

const Conversations = ({ handleConversationSelect }) => {
  const { loading, conversations, groupConversations } = useGetConversation();
  const [allConversations, setAllConversations] = useState([]);

  useEffect(() => {
    if (!loading) {
      setAllConversations([...conversations, ...groupConversations]);
    }
  }, [loading, conversations, groupConversations]);

  return (
    <div className="all-users d-flex flex-column gap-2 overflow-auto">
      {allConversations.map((conversation) => (
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
