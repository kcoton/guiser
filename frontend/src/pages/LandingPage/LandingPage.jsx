import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, ThemeProvider, createTheme, Typography, Box } from '@mui/material';
import './LandingPage.css';
import SocialMediaIcon from '../SocialMediaIcon/SocialMediaIcon';
import GoogleSignIn from '../../components/GoogleSignIn';
import { themeOptions } from '../../style';

const LandingPage = () => {
    const theme = createTheme(themeOptions);
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <div className='landing-page-container'>
                <div className='background-image' />
                <Stack
                    direction='column'
                    sx={{
                        width: '100vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        pt: 12,
                    }}
                >
                    <Typography variant='h1' sx={{ letterSpacing: 1 }}>
                        GUISER
                    </Typography>
                    <Typography variant='h5' sx={{ m: 1, color: '#4B59AF' }}>
                        Boost your online presence with the power of AI
                    </Typography>
                    <Box sx={{ p: 2 }}>
                        <GoogleSignIn continuation={() => navigate('/dashboard')} />
                    </Box>
                </Stack>
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
        </ThemeProvider>
    );
};

export default LandingPage;
