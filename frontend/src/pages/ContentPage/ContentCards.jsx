import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import React from 'react';

export default function ContentCards({ socialApps, selectedContent }) {

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
                                    <Button size="small" onClick={() => console.log('posted...')}>Post</Button> : ''}
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}
