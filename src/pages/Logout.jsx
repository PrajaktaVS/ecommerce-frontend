import { useEffect, useRef } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Logout = () => {
    const { LogoutUser } = useAuth();
    const hasLoggedOut = useRef(false);


    useEffect(() => {
        if(!hasLoggedOut.current){
            LogoutUser();
            toast.success("You have been logged out.");
            hasLoggedOut.current = true;
        }
    }, [LogoutUser]);

    return <Navigate to="/Login" replace/>
};