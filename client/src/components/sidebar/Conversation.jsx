import React from "react";
import UserProfile from "../navbar/UserProfile";

const Conversation = () => {
  return (
    <div className="user d-flex gap-2 align-items-center p-2">
      <div className="user-image">
        <UserProfile />
        <div className="online-status"></div>
      </div>
      <div className="user-name">
        <h6>Adarsh</h6>
      </div>
    </div>
  );
};

export default Conversation;

/* <div className="user d-flex gap-2 align-items-center p-2">
        <div className="user-image">
          <img
            src="https://avatar.iran.liara.run/public"
            alt=""
            width={45}
            height={45}
          />
          <div className="online-status"></div>
        </div>
        <div className="user-name">
          <h6>Suraj</h6>
        </div>
      </div> */
