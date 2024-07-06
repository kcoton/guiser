import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import SocialSiteService from '../../services/SocialSiteService';
import React from 'react';

export default function ContentCards({ selectedContent }) {
    const socialSites = new SocialSiteService().get();

    return (
        <Grid container spacing={4} style={{ marginTop: 10 }}>
            {socialSites.map(site => {
                const isPostedToSite = selectedContent.posted & (2 ** (site.id - 1));
                return (
                    <Grid item xs={12} sm={6} md={4} key={site.id}>
                        <Card sx={{ minWidth: 20 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {isPostedToSite ? '' : 'Not'} Posted
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {site.website}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {!isPostedToSite ?
                                    <Button size="small" onClick={() => console.log('posted...')}>Post</Button> : ''}
                                {isPostedToSite ?
                                    <Button size="small" onClick={() => console.log('updated...')}>Update</Button> : ''}
                                {isPostedToSite ?
                                    <Button size="small" onClick={() => console.log('deleted...')}>Delete</Button> : ''}
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}
