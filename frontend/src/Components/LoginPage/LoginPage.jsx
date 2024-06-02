import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-form">
                <h1>APP NAME</h1>
                <div className="logo">logo</div>
                <form>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <a href="#" className="forgot-password">Forgot your password?</a>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            <div className="image-placeholder">
                Image Placeholder
            </div>
        </div>
    );
};

export default LoginPage;