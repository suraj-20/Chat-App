import React from "react";
import "./popup.css";
import { useAuthContext } from "../../context/AuthContext";
// import useConversation from "../../zustand/useConversation";
// import Popup from "reactjs-popup";

const LoggedInProfile = ({ popup, onClose }) => {
  const { authUser } = useAuthContext();
  console.log(authUser);
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
            <h3>{authUser.fullName}</h3>
          </div>
          <div className="user-profilePic">
            <img src={authUser.profilePic} alt="" width={80} height={80} />
          </div>
          <div className="user-details">
            <p>
              <span>Username: </span> {authUser.username}
            </p>
            <p>
              <span>Gender: </span> {authUser.gender}
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

export default LoggedInProfile;
