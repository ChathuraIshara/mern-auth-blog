import { createContext } from "react";
import { useState } from "react";

const AppContent = createContext();

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn,setIsLoggedIn] = useState(false)  
    const [userData,setUserData] = useState(null)

    const values = {
        backendUrl,
        isLoggedIn,
        userData,
        setIsLoggedIn,
        setUserData
    }
    return (
        <AppContent.Provider  value={{values}}>
            {props.children}
        </AppContent.Provider>
    )
}
