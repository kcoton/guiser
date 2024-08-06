/* eslint-disable react/prop-types */
import { Modal, Box, TextField, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Delete from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/Save';
import AlternateEmail from '@mui/icons-material/AlternateEmail';
import { useSelector } from 'react-redux';
import LinkToThreads from './LinkToThreads';
import { Platform } from '../../enum/common.enum';
import { isPlatformConnected } from './Common';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '90%',
        sm: 600,
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: {
        xs: 2,
        sm: 4,
    },
    borderRadius: '8px',
};

export default function PersonaModal({
    open,
    handleClose,
    persona,
    setPersonaName,
    setPersonaText,
    handleUpdatePersona,
    handleDeletePersona,
}) {
    const isMediumUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const user = useSelector((state) => state?.user);

    async function handleLinkedInClick(personaId) {
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: import.meta.env.VITE_LINKED_IN_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_LINKED_IN_REDIRECT_URI,
            state: personaId,
            scope: 'w_member_social profile openid',
        });

        const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
        sessionStorage.setItem('resolverData', JSON.stringify(user));
        window.location.href = linkedInAuthUrl;
    }

    async function handleTwitterClick(personaId) {
        try {
            const baseUrl = import.meta.env.VITE_BASEURL_BACK_ALIAS;
            sessionStorage.setItem('resolverData', JSON.stringify(user));
            const state = `${user.user.externalId}:${personaId}`;

            const url = `${baseUrl}/auth/twitter/code?state=${state}`;
            window.location.href = url;
        } catch (error) {
            console.error('Error fetching Twitter auth code:', error);
        }
    }

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby='modal-title' aria-describedby='modal-description'>
            <Box sx={style}>
                <Stack direction='row' sx={{ mb: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='overline' noWrap component='div' sx={{ letterSpacing: 2, fontSize: { xs: 14, sm: 24 }}}>
                        <span style={{ color: '#A688FA' }}>Edit</span> Your Persona
                    </Typography>
                    <Box>
                        {isMediumUp && <Button
                            variant='contained'
                            color='error'
                            size='medium'
                            startIcon={<Delete />}
                            onClick={handleDeletePersona}
                        >
                            Delete Persona
                        </Button>}
                    </Box>
                </Stack>
                <Stack direction='column' spacing={isMediumUp ? 3 : 2}>
                    <TextField
                        label="What's your persona's name?"
                        variant='outlined'
                        value={persona.name}
                        onChange={(e) => setPersonaName(e.target.value)}
                    />
                    <TextField
                        label="What personality does your persona have?"
                        variant='outlined'
                        multiline
                        rows={4}
                        value={persona.text}
                        onChange={(e) => setPersonaText(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        size={isMediumUp ? 'large' : 'small'}
                        startIcon={<Save />}
                        onClick={handleUpdatePersona}
                        >
                        Save Changes
                    </Button>
                    {!isMediumUp && <Button
                        variant='contained'
                        fullWidth='true'
                        color='error'
                        size='small'
                        startIcon={<Delete />}
                        onClick={handleDeletePersona}
                    >
                        Delete Persona
                    </Button>}
                    <Stack direction='row' spacing={3} justifyContent='center'>
                        <Button
                            variant='outlined'
                            startIcon={isMediumUp && <TwitterIcon />}
                            disabled={isPlatformConnected(persona, Platform.TWITTER)}
                            onClick={() => handleTwitterClick(persona._id)}
                        >
                            {isMediumUp ? 'Connect Twitter' : <TwitterIcon />}
                        </Button>
                        <Button
                            variant='outlined'
                            startIcon={isMediumUp && <LinkedInIcon />}
                            disabled={isPlatformConnected(persona, Platform.LINKEDIN)}
                            onClick={() => handleLinkedInClick(persona._id)}
                        >
                            {isMediumUp ? 'Connect LinkedIn' : <LinkedInIcon />}
                        </Button>
                        <LinkToThreads
                            personaID={persona._id}
                            variant='outlined'
                            startIcon={isMediumUp && <AlternateEmail />}
                            disabled={isPlatformConnected(persona, Platform.THREADS)}
                            displayText={
                                isMediumUp ? 'Connect Threads' : <AlternateEmail />
                            }
                        />
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
