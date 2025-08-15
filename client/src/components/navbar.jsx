import {useNavigate} from "react-router-dom";
import React from "react";
import {assets} from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full p-4 absolute left-0 right-0 top-0 sm:p-6 sm:px-24 ">
      <img src={assets.logo} width={170} height={150}></img>
      <button onClick={()=>{navigate("/login")}} className="flex items-center gap-2 border border-gray-500 rounded-full py-2 px-6 text-gray-800 hover:bg-gray-100">Login<img src={assets.arrow_icon}></img></button>
    </div>
  );
};

export default Navbar;
