import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updatePosted } from '../../redux/userSlice';
import { postToApp } from '../../services/ContentService';

export default function ContentCards({ socialApps, selectedContent, setSelectedContent }) {
    const userId = useSelector((state) => state.user.db?._id);
    const dispatch = useDispatch();

    async function handlePostButtonClick(userId, personaId, contentId, appSeqNo) {
        const response = await postToApp(userId, personaId, contentId, appSeqNo);
        setSelectedContent(prev => ({
            ...prev,
            posted: response
        }));
        selectedContent.posted = response;
        dispatch(updatePosted({ personaId, contentId, posted: response }));
    }

    return (
        <Grid container spacing={4} style={{ marginTop: 10 }}>
            {socialApps.map(app => {
                const isPostedToSite = selectedContent.posted & (2 ** (app.seqNo - 1));
                return (
                    <Grid item xs={12} sm={6} md={4} key={app.seqNo}>
                        <Card sx={{ minWidth: 20 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {isPostedToSite ? '' : 'Not'} Posted
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {app.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {!isPostedToSite ?
                                    <Button size="small" 
                                        onClick={() => handlePostButtonClick(
                                            userId, selectedContent.personaId, selectedContent.id, app.seqNo
                                        )}>Post</Button> : ''}
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}
