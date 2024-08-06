import { useNavigate } from 'react-router-dom';
import { Stack, Box, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { Flare } from '@mui/icons-material'

export default function HomePage() {
    const navigate = useNavigate();

    const handleButtonClick = (route) => () => {
      navigate(route);
    };

    return (
        <>
        <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            sx={{ display: 'flex', alignItems: 'center', mx: { xs: 2, sm: 10 }, textAlign: { xs: 'center', sm: 'left' } }}
        >
            <Flare />
            <Typography 
                variant='overline' 
                noWrap 
                component='div' 
                sx={{ letterSpacing: 2, fontSize: { xs: 16, sm: 24 }, fontWeight: 700 }}
            >
                <span style={{ color: '#A688FA' }}>Welcome</span> to Guiser
            </Typography>
        </Stack>
        <Box sx={{ mx: { xs: 2, sm: 10 }, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant='h5'>
                You can be <span style={{ color: '#A688FA' }}>anyone</span> on social media. Here's how to get started:
            </Typography>
            <Box sx={{ mb: 1, border: 1, borderRadius: 1, m: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                <List>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography variant='body1' lineHeight={2}>
                                    Go to
                                    <Button color='secondary' variant='outlined' size='small' onClick={handleButtonClick('/personas')} sx={{ mx: 1 }}>Personas</Button> 
                                    to create a persona and link them to social media accounts. More detail is better here.
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography variant='body1' lineHeight={2}>
                                    Go to
                                    <Button color='secondary' variant='outlined' size='small' onClick={handleButtonClick('/generate')} sx={{ mx: 1 }}>Generate</Button> 
                                    select a persona and describe a topic and/or style of social media post. We'll create the content.
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography variant='body1' lineHeight={2}>
                                    Go to
                                    <Button color='secondary' variant='outlined' size='small' onClick={handleButtonClick('/content')} sx={{ mx: 1 }}>Content</Button> 
                                    to view your library and publish to your personas' associated social media accounts.
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </Box>
            <Typography variant='body1' color='secondary' sx={{ ml: 2 }}>
                You can click the menu at the top left to jump around or log out. Have fun!
            </Typography>
        </Box>
        </>
    );
}
