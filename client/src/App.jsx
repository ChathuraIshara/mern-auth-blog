import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import PasswordReset from "./pages/PasswordReset";  

const App = () => {
  return <div className="">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/email-verify" element={<EmailVerify />} />
    </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
