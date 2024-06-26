import React from "react";
import "./Sidebar.css";
import Conversations from "./Conversations";
import SearchInput from "../navbar/SearchInput";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className="sidebar d-flex gap-4 p-3">
      <div className="chat-heading d-flex align-items-center justify-content-between">
        <h4>Chat</h4>
        <button className="create-group d-flex align-items-center gap-2">
          <h6 className="d-lg-flex d-none">New Group Chat </h6>{" "}
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="line"></div>
      <div className="d-lg-none d-flex search-container">
        <SearchInput />
      </div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
