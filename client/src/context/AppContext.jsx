import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/getUserData");
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  const value = {
    backendUrl,
    isLoggedIn,
    userData,
    setIsLoggedIn,
    setUserData,
    getUserData
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
