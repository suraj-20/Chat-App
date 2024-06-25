import React from "react";
import Conversation from "./Conversation";

const Conversations = () => {
  return (
    <div className="all-users d-flex flex-column gap-2">
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};

export default Conversations;
