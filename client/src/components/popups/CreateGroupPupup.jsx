import React from "react";

const CreateGroupPupup = ({ popup, onClose }) => {
  if (!popup) {
    return null;
  }
  return (
    <div className="popup-overlay">
      <div className="popup-container creategroup-popup-container">
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="popup-content creategroup-popup-content d-flex flex-column justify-content-between gap-4">
          <div className="popup-heading">
            <h2>Create Group Chat</h2>
          </div>
          <form
            action=""
            className="d-flex flex-column align-items-center justify-content-between gap-3"
          >
            <div className="search-user">
              <input type="text" placeholder="Group Name" />
            </div>
            <div className="search-user">
              <input type="text" name="" id="" placeholder="Add Users" />
            </div>
            <button
              className="create-btn btn primary-btn"
              style={{ background: "#ff4141", color: "white" }}
              onClick={""}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPupup;
