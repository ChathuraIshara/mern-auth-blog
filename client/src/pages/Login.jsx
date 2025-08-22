import React, { useContext } from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("");

  const navigate = useNavigate();
  const {backendUrl, setIsLoggedIn,getUserData} = useContext(AppContent)
  
  const handleSubmit = async (e) =>{
    try {
      e.preventDefault(); // To prevent default submision of js,when reload the page
      axios.defaults.withCredentials = true; //tells axios to include cookies
      if(state == 'Sign Up')
      {
         const {data} = await axios.post(backendUrl+'/api/auth/register',{
          name,email,password
         })
         if(data.success)
         {
          setIsLoggedIn(true);
          getUserData();
          navigate('/All-blogs')
          toast.success('successfully Logged In!')
         }
         else{
          toast.error(error.message); // Show error message if registration fails
         }
      }
      else{
        const {data}= await axios.post(backendUrl+'/api/auth/login',{
          email,password
         })
         if(data.success)
         {
          setIsLoggedIn(true);
          getUserData();
          navigate('/All-blogs')
          toast.success('successfully Logged In!')
         }
         else{
          toast.error(data.message); // Show error message if registration fails
         }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={()=>{navigate('/')}}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      ></img>
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state == "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center mb-3 text-sm">
          {state == "Sign Up"
            ? "Create Your Account"
            : "Login to your account!"}
        </p>
        <form onSubmit={handleSubmit}>
          {state == "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon}></img>
              <input
                className="bg-transparent outline-none text-white"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon}></img>
            <input
              className="bg-transparent outline-none text-white"
              type="email"
              placeholder="Email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon}></img>
            <input
              className="bg-transparent outline-none text-white"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <p onClick={()=>{navigate('/password-reset')}} className="mb-4 text-indigo-500 cursor-pointer">
            Forgot password?
          </p>
          <button className="w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>
        {state == "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span onClick={()=>{setState('Login')}} className="text-blue-400 cursor-pointer underline">
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span onClick={()=>{setState('Sign Up')}} className="text-blue-400 cursor-pointer underline">
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
