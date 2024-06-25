import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message/MessageContainer";

const Home = () => {
  return (
    <div className="home">
      <div className="header">
        <Navbar />
      </div>
      <div className="main-content d-flex gap-4 p-3">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
