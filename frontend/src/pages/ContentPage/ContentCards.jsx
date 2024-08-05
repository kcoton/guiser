/* eslint-disable react/prop-types */
import { Box, Card, Stack, Button, Typography, Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight';
import { useDispatch, useSelector } from 'react-redux';
import { updatePosted } from '../../redux/userSlice';
import { postToApp } from '../../services/ContentService';
import { isTokenValid } from '../PersonasPage/Common';

export default function ContentCards({ socialApps, selectedContent, setSelectedContent }) {
    const userId = useSelector((state) => state.user.db?._id);
    const tokens = useSelector((state) => 
        state.user.db?.personas?.find(p => p._id === selectedContent.personaId)?.authTokens
    ) ?? [];
    const dispatch = useDispatch();

    async function handlePostButtonClick(userId, personaId, contentId, appSeqNo) {
        let response; 
        try {
            response = await postToApp(userId, personaId, contentId, appSeqNo);
        } catch (err) {
            alert('Sorry, this content could not be posted. Please retry later.');
            return;
        }
        setSelectedContent((prev) => ({
            ...prev,
            posted: response,
        }));
        dispatch(updatePosted({ personaId, contentId, posted: response }));
    }

    function cardAlertMessage(contentTooLong, token, tokenIsExpired) {
        if (contentTooLong) {
            return 'Content too long for app';
        }
        if (!token) {
            return 'Not connected to app. Connect using Personas page.';
        }
        if (tokenIsExpired) {
            return 'Token is expired. Reconnect using Personas page.';
        }
    }

    return (
        <Grid container spacing={4} sx={{ mt: 1, mb: 10 }}>
            {socialApps.map((app) => {
                const isPostedToSite = selectedContent.posted & (2 ** (app.seqNo - 1));
                const contentTooLong = selectedContent.text.normalize("NFC").length > app.maxTextLength;
                const token = tokens.find(t => t.platform === app.name);
                const tokenIsExpired = token && token.expiry && !isTokenValid(token.expiry);
                return (
                    <Grid item xs={12} sm={6} md={4} key={app.seqNo}>
                        <Card sx={{ p: 3, minWidth: 20, height: 120 }}>
                            <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                                {isPostedToSite ? 
                                    <CheckIcon color='success' sx={{ fontSize: 16 }} /> : 
                                    <CloseIcon color='error' sx={{ fontSize: 16 }} />
                                }
                                <Typography variant='caption'>Posted {contentTooLong ? '-> Too Long for App' : ''}</Typography>
                            </Stack>
                            <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant='h6' component='div'>
                                    {app.name}
                                </Typography>
                                {!isPostedToSite && !contentTooLong && token && !tokenIsExpired ? (
                                    <Button
                                        variant='outlined'
                                        color='secondary'
                                        size='medium'
                                        endIcon={<ArrowCircleRight />}
                                        onClick={() =>
                                            handlePostButtonClick(
                                                userId,
                                                selectedContent.personaId,
                                                selectedContent.id,
                                                app.seqNo,
                                            )
                                        }
                                    >
                                        Post
                                    </Button>
                                ) : (
                                    <Box sx={{ ml: 4 }}>
                                        <Typography sx={{ fontSize: 12 }} color='text.secondary' gutterBottom>
                                            {isPostedToSite ? '' : cardAlertMessage(contentTooLong, token, tokenIsExpired)}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}
