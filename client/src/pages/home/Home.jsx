import React, { useState } from "react";
// import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message/MessageContainer";

const Home = ({ handlePopup }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleConversationSelect = () => {
    // console.log("Before setting state:", isSidebarVisible);
    setIsSidebarVisible(false);
    // console.log("after setting state:", isSidebarVisible);
  };

  // console.log(handleConversationSelect);

  const handleBackToSidebar = () => {
    // console.log("Before setting state:", isSidebarVisible);
    setIsSidebarVisible(true);
    // console.log("after setting state:", isSidebarVisible);
  };

  return (
    <div className="home">
      <div className="header">
        <Navbar handlePopup={handlePopup} />
      </div>
      <div className="main-content d-flex gap-4 p-3">
        <Sidebar
          handleConversationSelect={handleConversationSelect}
          className={isSidebarVisible ? "visible" : ""}
          handlePopup={handlePopup}
        />
        <MessageContainer
          handlePopup={handlePopup}
          onBack={handleBackToSidebar}
          className={isSidebarVisible ? "hidden" : ""}
        />
      </div>
    </div>
  );
};

export default Home;
