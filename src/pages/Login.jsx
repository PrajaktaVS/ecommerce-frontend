import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { AuthLayout } from "../components/AuthLayout";
import { toast } from "react-toastify";


const URL = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;


export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { storeTokenInLS, userAuthentication } = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };


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
                toast.success("Login successful");
                const res_data = await response.json();
                storeTokenInLS(res_data.token);
                await userAuthentication();
                setUser({ email: "", password: "" });
                navigate("/");
            } else {
                toast.error("Invalid credentials");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AuthLayout title="Login">
                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className="btn btn-submit">Login</button>
                </form>
            </AuthLayout>
        </>
    )
}