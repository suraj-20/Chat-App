import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginSignUp from "./pages/login/LoginSignUp";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <LoginSignUp />}
        ></Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
