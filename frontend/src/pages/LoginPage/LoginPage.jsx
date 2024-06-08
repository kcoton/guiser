import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from './guiser-logo.png';

const LoginPage = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleGetStarted = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className = "login-page-container">
            <div className="login-page">
                <div className="background-image"></div>
                <div className="login-form">
                    <img src={logo} alt="Logo" className="logo" />
                    <h2>Welcome to Guiser</h2>
                    <p></p>
                    <form className="form" onSubmit={handleGetStarted}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder="username" required />
                        </div>
                        <p></p>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type={passwordVisible ? "text" : "password"} 
                                placeholder="Password" 
                                required 
                            />
                            <span 
                                className="eye-icon" 
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? "👁️" : "🙈"}
                            </span>
                        </div>  
                        <p></p>                 
                        <a href="#" className="forgot-password">Forgot your password?</a>
                        <p></p>
                        <button type="submit" className="login-button">Login</button>
                        <div className="or-divider">OR</div>
                        <button type="button" className="google-button">
                            <i className="fab fa-google google-logo"></i>
                            Continue with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;