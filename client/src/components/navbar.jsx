import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import AddBlogModal from "./AddBlogModal";


const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent);
  const [showAddModal, setShowAddModal] = useState(false);

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
    <>
      <div className="flex justify-between items-center w-full p-4 fixed left-0 right-0 top-0 sm:p-6 sm:px-24 z-40">
        <img src={assets.logo} width={170} height={150} alt="Logo" />
        {userData ? (
          <div className="flex items-center gap-6">
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full py-2 px-6 shadow-md hover:scale-105 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              onClick={() => setShowAddModal(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
              Add Blog
            </button>
            <div className="w-11 h-11 flex justify-center items-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative group text-xl font-bold shadow-lg cursor-pointer border-2 border-white hover:scale-105 transition-transform duration-200">
              {userData.name[0].toUpperCase()}
              <div className="absolute hidden group-hover:block group-focus-within:block top-full right-0 z-20 text-gray-800 rounded-lg shadow-2xl min-w-[150px] bg-white border border-gray-200 animate-fade-in">
                <ul className="list-none m-0 p-2 text-base">
                  {!userData.isAccountVerified && (
                    <li
                      onClick={() => sendVerificationOtp()}
                      className="py-2 px-4 hover:bg-blue-50 hover:text-blue-700 rounded-md cursor-pointer transition-colors"
                    >
                      <svg className="inline w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.88 3.549A9 9 0 1021 12.41"></path></svg>
                      Verify Email
                    </li>
                  )}
                  <li
                    onClick={() => navigate('/my-blogs')}
                    className="py-2 px-4 hover:bg-purple-100 hover:text-purple-700 rounded-md cursor-pointer transition-colors"
                  >
                    <svg className="inline w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    My Blogs
                  </li>
                  {userData.role === 'admin' && (
                    <li
                      onClick={() => navigate('/admin')}
                      className="py-2 px-4 hover:bg-indigo-100 hover:text-indigo-700 rounded-md cursor-pointer transition-colors"
                    >
                      <svg className="inline w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      Admin Panel
                    </li>
                  )}
                  <li
                    onClick={() => logout()}
                    className="py-2 px-4 hover:bg-red-100 hover:text-red-700 rounded-md cursor-pointer transition-colors"
                  >
                    <svg className="inline w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7"></path></svg>
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="flex items-center gap-2 border border-gray-500 rounded-full py-2 px-6 text-gray-800 hover:bg-gray-100"
          >
            Login<img src={assets.arrow_icon} alt="arrow" />
          </button>
        )}
      </div>
      <AddBlogModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(blog) => {
          // TODO: handle blog submission (e.g., send to backend or update state)
          console.log('Blog submitted:', blog);
        }}
      />
    </>
  );
};

export default Navbar;
