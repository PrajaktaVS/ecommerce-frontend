import React from "react";
import "./AuthLayout.css";

export const AuthLayout = ({ title, children }) => {
    return (
        <section className="auth-section">
            <main className="auth-main">
                <div className="auth-container">
                    <div className="auth-image">
                        <img src="/images/registration.png" alt="Auth" />
                    </div>
                    <div className="auth-form-box">
                        <h1 className="auth-title">{title}</h1>
                        {children}
                    </div>
                </div>
            </main>
        </section>
    );
};
