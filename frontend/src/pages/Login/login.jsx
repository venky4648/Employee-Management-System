/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Login.css'; // Import the CSS file
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate(); // Move inside the component

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
            console.log(response.data);

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);

                if (response.data.user.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/employee-dashboard");
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server error");
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Employee Management System</h1>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input type="email" id="Email" placeholder="Enter Email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input type="password" id="Password" placeholder="Enter Password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <div className="remember-forgot">
                    <div className="remember-me">
                        <input type="checkbox" id="RememberMe" />
                        <label htmlFor="RememberMe">Remember Me</label>
                    </div>
                    <a href="#">Forgot password?</a>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
