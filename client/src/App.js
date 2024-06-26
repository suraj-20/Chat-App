import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginSignUp from "./pages/login/LoginSignUp";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import LoggedInProfile from "./components/popups/LoggedInProfile";
import { useState } from "react";
import ConversationPopup from "./components/popups/ConversationPopup";
import CreateGroupPupup from "./components/popups/CreateGroupPupup";

function App() {
  const { authUser } = useAuthContext();
  const [popup, setPopup] = useState(false);
  const [popupType, setPopupType] = useState(null);

  const handlePopup = (type = null) => {
    setPopupType(type);
    setPopup(type != null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <Home handlePopup={handlePopup} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        ></Route>
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <LoginSignUp />}
        ></Route>
      </Routes>
      <Toaster />
      {popupType === "profile" && (
        <LoggedInProfile popup={popup} onClose={() => handlePopup(null)} />
      )}
      {popupType === "conversation" && (
        <ConversationPopup popup={popup} onClose={() => handlePopup(null)} />
      )}
      {popupType === "groupchat" && (
        <CreateGroupPupup popup={popup} onClose={() => handlePopup(null)} />
      )}
    </BrowserRouter>
  );
}

export default App;
