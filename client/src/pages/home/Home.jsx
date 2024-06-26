import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message/MessageContainer";

const Home = ({ handlePopup }) => {
  return (
    <div className="home">
      <div className="header">
        <Navbar handlePopup={handlePopup} />
      </div>
      <div className="main-content d-flex gap-4 p-3">
        <Sidebar handlePopup={handlePopup} />
        <MessageContainer handlePopup={handlePopup} />
      </div>
    </div>
  );
};

export default Home;
