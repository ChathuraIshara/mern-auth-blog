import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContent);

  const logout = async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setUserData(null);
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full p-4 absolute left-0 right-0 top-0 sm:p-6 sm:px-24 ">
      <img src={assets.logo} width={170} height={150}></img>
      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0  z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li onClick={()=>sendVerificationOtp()} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">
                  Verfiy Email
                </li>
              )}
              <li
                onClick={() => logout()}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="flex items-center gap-2 border border-gray-500 rounded-full py-2 px-6 text-gray-800 hover:bg-gray-100"
        >
          Login<img src={assets.arrow_icon}></img>
        </button>
      )}
    </div>
  );
};

export default Navbar;
