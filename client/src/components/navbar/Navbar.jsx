import React from "react";
import "./Navbar.css";
import SearchInput from "./SearchInput";
import UserProfile from "./UserProfile";

const Navbar = () => {
  return (
    <div className="navbar d-flex align-items-center justify-content-between">
      <div className="chat-logo">
        <h4>Chat-App</h4>
      </div>
      <SearchInput />
      <div className=" d-flex gap-2">
        <button className="notification">
          <i className="fa-solid fa-bell"></i>
        </button>
        <button className="user-profile d-flex gap-2 align-items-center">
          <UserProfile />
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
