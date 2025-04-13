import { useEffect } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Logout = () => {
    const { LogoutUser } = useAuth();


    useEffect(() => {
        LogoutUser();
        toast.success("You have been logged out.")
    }, [LogoutUser]);

    return <Navigate to="/Login" replace/>
};