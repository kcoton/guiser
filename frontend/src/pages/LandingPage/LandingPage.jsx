import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import SocialMediaIcon from '../SocialMediaIcon/SocialMediaIcon';
import GoogleSignIn from '../../components/GoogleSignIn';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className='landing-page-container'>
            <div className='landing-page'>
                <div className='background-image'></div>
                <div className='content'>
                    <h1>Guiser</h1>
                    <p>Create presence with AI</p>
		    <div style={{visibility: 'hidden'}}> "It uses AI to bring AI":
			https://youtu.be/-P-ein58laA?si=X-alIOu4PVlQn0cl</div>
                    <p></p>
                    <GoogleSignIn continuation={() => navigate('/dashboard')} />
                </div>
                <div className='social-media-icons'>
                    <SocialMediaIcon
                        iconClass='fab fa-twitter'
                        title='Twitter'
                        description='Stay connected with your audience through tweets.'
                        link='https://x.com/'
                    />
                    <SocialMediaIcon
                        iconClass='fab fa-threads'
                        title='Threads'
                        description='Start a conversation and attract new followers.'
                        link='https://www.threads.net/'
                    />		    
                    <SocialMediaIcon
                        iconClass='fab fa-linkedin-in'
                        title='LinkedIn'
                        description='Expand your professional network and engage with your audience.'
                        link='https://www.linkedin.com/'
                    />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
