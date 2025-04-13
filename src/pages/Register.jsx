import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { AuthLayout } from "../components/AuthLayout";
import { toast } from "react-toastify";


const URL = `${import.meta.env.VITE_API_BASE_URL}/auth/register`;

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    //handling the input values
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value, //in name attribute there is dynamic value
        });
    };

    //handling the form submission 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                //store token in local storage
                setUser({ username: "", email: "", password: "" });
                toast.success("Registration successful. Please login.");
                navigate("/login");
            }
        } catch (error) {
            toast.error("Registration failed. Please try again.");
            console.log("register", error);
        }
    };

    return (
        <>
            <AuthLayout title="Register">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        id="username"
                        required
                        autoComplete="off"
                        value={user.username}
                        onChange={handleInput} />

                    <label htmlFor="email">email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        id="email"
                        required
                        autoComplete="off"
                        value={user.email}
                        onChange={handleInput} />

                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        id="password"
                        required
                        autoComplete="off"
                        value={user.password}
                        onChange={handleInput} />

                    <button type="submit" className="btn btn-submit">Register</button>
                </form>
            </AuthLayout>
        </>

    )
}