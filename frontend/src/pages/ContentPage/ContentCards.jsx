/* eslint-disable react/prop-types */
import { Box, Card, Stack, CardContent, Button, Typography, Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight';
import { useDispatch, useSelector } from 'react-redux';
import { updatePosted } from '../../redux/userSlice';
import { postToApp } from '../../services/ContentService';

export default function ContentCards({ socialApps, selectedContent, setSelectedContent }) {
    const userId = useSelector((state) => state.user.db?._id);
    const dispatch = useDispatch();

    async function handlePostButtonClick(userId, personaId, contentId, appSeqNo) {
        const response = await postToApp(userId, personaId, contentId, appSeqNo);
        setSelectedContent((prev) => ({
            ...prev,
            posted: response,
        }));
        dispatch(updatePosted({ personaId, contentId, posted: response }));
    }

    return (
        <Grid container spacing={4} sx={{ mt: 1, mb: 10 }}>
            {socialApps.map((app) => {
                const isPostedToSite = selectedContent.posted & (2 ** (app.seqNo - 1));
                const contentTooLong = selectedContent.text.length > app.maxTextLength;
                return (
                    <Grid item xs={12} sm={6} md={4} key={app.seqNo}>
                        <Card sx={{ p: 1, minWidth: 20, height: 120 }}>
                            <CardContent>
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
                                        {!isPostedToSite && !contentTooLong ? (
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
                                            ''
                                        )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}
