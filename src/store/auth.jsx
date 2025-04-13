import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");

    const URL = import.meta.env.VITE_API_BASE_URL;

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken);
    };

    let isLoggedIn = !!token;

//logout function
const LogoutUser = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
};

 //jwt authentication - to get currently login user data
const userAuthentication = async() => {
    try {
        const response = await fetch(`${URL}/auth/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if(response.ok){
            const data = await response.json();
            setUser(data.userData);
        }
    } catch (error) {
        console.error("Error fetching user data");
    }
}


 useEffect(() => {
    if(token){
        userAuthentication();
    }else{
        setUser("");
    }
 }, [token]);

    return (
        <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, userAuthentication}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext)
}