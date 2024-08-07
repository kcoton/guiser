/* eslint-disable react/prop-types */
import { Card, Typography, Stack, Box, Tooltip } from '@mui/material';
import { Twitter, LinkedIn } from '@mui/icons-material';
import { isPlatformConnected } from '../pages/PersonasPage/Common';
import { Platform } from '../enum/common.enum';

export const PersonaCard = ({ persona, selectedPersona, handlePersonaClick }) => {
    return (
        <Card
            onClick={() => {
                handlePersonaClick(persona);
            }}
            sx={{
                p: {
                    xs: 2,
                    sm: 2,
                    md: 3,
                },
                width: '100%',
                height: '100px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: selectedPersona?._id === persona._id ? '1px solid white' : 'none',
            }}
        >
            <Typography
                variant='body1'
                sx={{
                    mb: 1,
                    mt: -1,
                    fontWeight: 500,
                    letterSpacing: 0.5,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                }}
            >
                {persona.name}
            </Typography>
            <SocialMediaIcons persona={persona} />
        </Card>
    );
};

export const SocialMediaIcons = ({ persona }) => {
    return (
        <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-evenly' }}>
            {isPlatformConnected(persona, Platform.TWITTER) && <Twitter sx={{ color: '#A688FA' }} />}
            {isPlatformConnected(persona, Platform.THREADS) && (
                <Box sx={{ color: '#A688FA', display: 'flex', alignItems: 'center' }}>
                    <i className={'fab fa-threads'} style={{ fontSize: '20px' }} />
                </Box>
            )}
            {isPlatformConnected(persona, Platform.LINKEDIN) && <LinkedIn sx={{ color: '#A688FA' }} />}
        </Stack>
    );
};
