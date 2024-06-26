import React from "react";
import useConversation from "../../zustand/useConversation";

const ConversationPopup = ({ popup, onClose }) => {
  const { selectedConversation } = useConversation();
  console.log(selectedConversation);
  if (!popup) {
    return null;
  }
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="popup-content d-flex flex-column justify-content-between gap-4">
          <div className="user-name">
            <h3>{selectedConversation.fullName}</h3>
          </div>
          <div className="user-profilePic">
            <img
              src={selectedConversation.profilePic}
              alt=""
              width={80}
              height={80}
            />
          </div>
          <div className="user-details">
            <p>
              <span>Username: </span> {selectedConversation.username}
            </p>
            <p>
              <span>Gender: </span> {selectedConversation.gender}
            </p>
          </div>
          <button
            className="btn primary-btn"
            style={{ background: "#ff4141", color: "white" }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationPopup;
