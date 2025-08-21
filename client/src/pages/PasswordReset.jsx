import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";


const PasswordReset = () => {
  axios.defaults.withCredentials=true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword,setNewPassword] = useState("")
  const [isEmailSent,setIsEmailSent] = useState("")
  const [otp,setOtp] = useState(0)
  const [isOtpSubmitted,setIsOtpSubmitted] = useState(false);

  const {backendUrl} = useContext(AppContent)

  const handleEmailSubmit = async(e) => {
    e.preventDefault();
    try{
        const {data} = await axios.post(backendUrl+"/api/auth/send-reset-otp",{email})
        if(data.success)
        {
          toast.success(data.message);
          setIsEmailSent(true);
        }
        else{
          toast.error(data.message)
        }
    }catch(error){
            toast.error(error.message);
    }

  };
  const handleOtpSubmit = async(e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(ref => ref.value);
    setOtp(otpArray.join(''));
    setIsOtpSubmitted(true);

  };
  const inputRefs = React.useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e, index) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.foreach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };
  const handlePasswordSubmit =  async (e)=>{
    e.preventDefault();
    try{
       const {data} = await axios.post(backendUrl+"/api/auth/reset-password",{email,otp,newPassword})
       if(data.success)
       {
         toast.success(data.message);
         navigate("/login");
       }
       else{
         toast.error(data.message)
       }
    }catch(error)
    {
      toast.error(error.message)
    }

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => {
          navigate("/");
        }}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      ></img>
      {/*enter email id*/}
      {!isEmailSent && ( <form
        onSubmit={handleEmailSubmit}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Reset password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your registered email address
        </p>
        <div className="flex items-center mb-4  gap-3 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
          <img src={assets.mail_icon} className="w-3 h-3"></img>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-white outline-none bg-transparent"
            placeholder="Email id"
            type="email"
          ></input>
        </div>
        <button className="w-full py-3 bg-gradient-to-r rounded-full from-indigo-500 to-indigo-900">
          Submit
        </button>
      </form>)}
     {!isOtpSubmitted && isEmailSent && (  <form
        onSubmit={handleOtpSubmit}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Reset password OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the -digit code sent to your email id{" "}
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                onKeyDown={(e) => handleKeyDown(e, index)}
                onInput={(e) => handleInput(e, index)}
                ref={(e) => (inputRefs.current[index] = e)}
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md "
                type="text"
                maxLength="1"
                required
                key={index}
              ></input>
            ))}
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r rounded-full from-indigo-500 to-indigo-900">
          Submit
        </button>
      </form>)}
      {/*otp input form*/}
      {/*new password form*/}
      {isOtpSubmitted && isEmailSent &&( <form
        onSubmit={handlePasswordSubmit}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          New password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your new password
        </p>
        <div className="flex items-center mb-4  gap-3 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
          <img src={assets.lock_icon} className="w-3 h-3"></img>
          <input
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="text-white outline-none bg-transparent"
            placeholder="New password"
            type="password"
          ></input>
        </div>
        <button className="w-full py-3 bg-gradient-to-r rounded-full from-indigo-500 to-indigo-900">
          Submit
        </button>
      </form>)}
      

    </div>
  );
};

export default PasswordReset;
