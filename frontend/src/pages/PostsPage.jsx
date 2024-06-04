import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useState } from 'react';
import PostService from '../services/PostService';
import SocialSiteService from '../services/SocialSiteService';

export default function PostsPage() {
    const posts = new PostService(1).get(); // TODO: change arg once auth figured out
    const socialSiteService = new SocialSiteService(1); // TODO: change arg once auth figured out
    const [selectedPost, setSelectedPost] = useState(undefined);
    
    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'timestamp', headerName: 'Date', width: 200 },
        { field: 'post', headerName: 'Post', width: 400, flex: 1 }
    ];

    function handleRowClick(params) {
        setSelectedPost(params.row);
    }

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={posts}
                    columns={columns}
                    initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    onRowClick={handleRowClick}
                    disableSelectionOnClick={true}
                />
            </div>
            {selectedPost && <Grid container spacing={4} style={{ marginTop: 10 }}>
                {socialSiteService.get().map(site => (
                    <Grid item xs={12} sm={6} md={4} key={site.id}>
                        <Card sx={{ minWidth: 20 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {selectedPost.posted & (2 ** (site.id - 1)) ? '' : 'Not'} Posted
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {site.website}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {!(selectedPost.posted & (2 ** (site.id - 1))) ?
                                    <Button size="small" onClick={() => console.log('posted...')}>Post</Button> : ''}
                                {selectedPost.posted & (2 ** (site.id - 1)) ? 
                                    <Button size="small" onClick={() => console.log('updated...')}>Update</Button> : ''}
                                {selectedPost.posted & (2 ** (site.id - 1)) ?
                                    <Button size="small" onClick={() => console.log('deleted...')}>Delete</Button> : ''}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            }
        </>
    );
}