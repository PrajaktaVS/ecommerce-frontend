import { NavLink } from "react-router-dom"
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { useState } from "react";

export const Navbar = () => {
    const { isLoggedIn, user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="navbar-container">
                <div className="navbar">
                    <div className="navbar-logo">
                        <NavLink to="/">Shopi</NavLink>
                    </div>

                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        &#9776;
                    </div>

                    <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
                        <ul>
                            <li><NavLink to="/AllProducts">All</NavLink></li>
                            <li><NavLink to="/Clothes">Clothes</NavLink></li>
                            <li><NavLink to="/Electronics">Electronics</NavLink></li>
                            <li><NavLink to="/Furnitures">Furnitures</NavLink></li>
                            <li><NavLink to="/Shoes">Shoes</NavLink></li>
                            <li><NavLink to="/Miscellaneous">Miscellaneous</NavLink></li>
                        </ul>
                    </nav>
                    <div className={`auth-links ${menuOpen ? "open" : ""}`}>
                        {!isLoggedIn ? (
                            <>
                                <NavLink to="/Register">Register</NavLink>
                                <NavLink to="/Login">Login</NavLink>
                            </>
                        ) : (
                            <div className="dropdown">
                                <button className="dropbtn">My Account</button>
                                <div className="dropdown-content">
                                    <span><strong>Email:</strong> {user?.email}</span>
                                    <span><strong>Username:</strong> {user?.username}</span>
                                    <NavLink to="/My-Cart">My Cart</NavLink>
                                    <NavLink to="/Logout">Logout</NavLink>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}