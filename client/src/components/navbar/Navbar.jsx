import React from "react";
import "./Navbar.css";
import SearchInput from "./SearchInput";
// import UserProfile from "./UserProfile";
import { useAuthContext } from "../../context/AuthContext";
// import LoggedInProfile from "../popups/LoggedInProfile";

const Navbar = ({ handlePopup }) => {
  const { authUser } = useAuthContext();
  const user = authUser;

  return (
    <div className="navbar d-flex align-items-center justify-content-between">
      <div className="chat-logo">
        <h4>Chat-App</h4>
      </div>
      <div className="d-lg-flex d-none">
        <SearchInput />
      </div>
      <div className=" d-flex gap-2">
        <button className="notification">
          <i className="fa-solid fa-bell"></i>
        </button>
        <button
          onClick={() => handlePopup("profile")}
          type="submit"
          className="user-profile d-flex gap-2 align-items-center"
        >
          <img src={user.profilePic} alt="" width={40} height={40} />
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
