import { useState, useEffect } from 'react';
import ContentTable from './ContentTable';
import ContentCards from './ContentCards';
import { getSocialApps } from '../../services/SocialAppService';
import { Box, Typography, useMediaQuery } from '@mui/material';

export default function ContentPage() {
    const isMediumUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const [selectedContent, setSelectedContent] = useState(undefined);
    const [socialApps, setSocialApps] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const apps = await getSocialApps();
            setSocialApps(apps);
        }
        fetchData();
    }, []);

    function handleRowClick(params) {
        setSelectedContent(params.row);
    }

    return (
        <>
            <Typography
                variant='overline'
                noWrap
                component='div'
                sx={{ letterSpacing: 2, fontSize: { xs: 10.5, sm: 16, md: 24 }, mx: { xs: 3, md: 5, lg: 10 } }}
            >
                <span style={{ color: '#A688FA' }}>Post</span> To Social Media
            </Typography>
            <Box sx={{ mx: { xs: 3, md: 5, lg: 10 }, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <ContentTable socialApps={socialApps} onRowClick={handleRowClick} />
                {selectedContent && (
                    <ContentCards
                        setSelectedContent={setSelectedContent}
                        socialApps={socialApps}
                        selectedContent={selectedContent}
                    />
                )}
            </Box>
        </>
    );
}
