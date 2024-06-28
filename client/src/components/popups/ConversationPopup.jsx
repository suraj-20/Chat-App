import React from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import useLeaveGroupConversation from "../../hooks/useLeaveConversation";
import toast from "react-hot-toast";
import useRemoveMemberFromGroup from "../../hooks/useRemoveMemberFromGroup";

const ConversationPopup = ({ popup, onClose }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { loading, leaveGroupConversation } = useLeaveGroupConversation();
  const isGroupChat = selectedConversation.isGroupChat;
  const { authUser } = useAuthContext();
  const { removeMemberFromGroup } = useRemoveMemberFromGroup();

  const handleRemoveMember = async (memberId) => {
    try {
      await removeMemberFromGroup(selectedConversation._id, memberId);
      window.location.replace("/");
    } catch (error) {
      toast.error("Failed to remover member");
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroupConversation(selectedConversation._id);
      setSelectedConversation(null);
      window.location.replace("/");
    } catch (error) {
      toast.error("Error leaving group:", error.message);
    }
  };

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
            <h3>
              {selectedConversation.fullName || selectedConversation.name}
            </h3>
          </div>
          <div className="user-profilePic">
            <img
              src={selectedConversation.profilePic || authUser.profilePic}
              alt=""
              width={80}
              height={80}
            />
          </div>
          <div className="user-details">
            {!isGroupChat && (
              <>
                <p>
                  <span>Username: </span> {selectedConversation.username}
                </p>
                <p>
                  <span>Gender: </span> {selectedConversation.gender}
                </p>
              </>
            )}

            {isGroupChat && (
              <div className="group-members">
                <h4>Members:</h4>
                <ul
                  style={{ textAlign: "center", padding: "0px", margin: "0px" }}
                >
                  {selectedConversation.participants.map((participant) => (
                    <p style={{ margin: "0" }} key={participant._id}>
                      {participant.username}
                      <button
                        className="btn remove-btn"
                        onClick={() => handleRemoveMember(participant._id)}
                        disabled={loading}
                      >
                        {loading ? (
                          "Removing..."
                        ) : (
                          <i
                            style={{ color: "red" }}
                            className="fa-solid fa-xmark"
                          ></i>
                        )}
                      </button>
                    </p>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {isGroupChat && (
            <button
              className="btn primary-btn"
              style={{ background: "#ff4141", color: "white" }}
              onClick={handleLeaveGroup}
              disabled={loading}
            >
              {loading ? "Leaving..." : "Leave Group"}
            </button>
          )}
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
