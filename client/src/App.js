import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignUp from "./pages/login/LoginSignUp";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginSignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
