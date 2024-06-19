import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import SocialMediaIcon from '../SocialMediaIcon/SocialMediaIcon';
import GoogleSignIn from '../../components/GoogleSignIn';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="landing-page-container">
            <div className="landing-page">
                <div className="background-image"></div>
                <div className="content">
                    <h1>Guiser</h1>
                    <p>Manage your social media with ease</p>
                    <p></p>
                    {/* <button className="get-started-button" onClick={handleGetStarted}>Get Started</button> */}
		            <GoogleSignIn continuation={() => navigate('/dashboard')}/>
                </div>
                <div className="social-media-icons">
                    <SocialMediaIcon
                        iconClass="fab fa-instagram"
                        title="Instagram"
                        description="Edit and plan photos, reels, carousels, and stories with ease."
                        link="https://www.instagram.com/"
                    />
                    <SocialMediaIcon
                        iconClass="fab fa-facebook-f"
                        title="Facebook"
                        description="Get more engagement and build your Facebook following."
                        link="https://www.facebook.com/"
                    />
                    <SocialMediaIcon
                        iconClass="fab fa-twitter"
                        title="Twitter"
                        description="Stay connected with your audience through tweets."
                        link="https://x.com/"
                    />
                    <SocialMediaIcon
                        iconClass="fab fa-linkedin-in"
                        title="LinkedIn"
                        description="Expand your professional network and engage with your audience."
                        link="https://www.linkedin.com/"
                    />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
