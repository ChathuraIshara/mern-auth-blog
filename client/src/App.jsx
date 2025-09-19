import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import PasswordReset from "./pages/PasswordReset";
import { ToastContainer, toast } from 'react-toastify';
import AllBlogs from "./pages/AllBlogs";
import Myblogs from "./pages/myblogs";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
    <div className="">
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/All-blogs" element={<AllBlogs />} />
        <Route path="/my-blogs" element={<Myblogs />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};
export default App;
