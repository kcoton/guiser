import { useNavigate } from 'react-router-dom';
import { Card, List, ListItem, ListItemText, Typography, Button } from '@mui/material';

export default function HomePage() {
    const navigate = useNavigate();

    const handleButtonClick = (route) => () => {
      navigate(route);
    };

    return (
        <Card sx={{ p: 5, m: 8, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant='h5'>
                Hey! Welcome to Guiser. We help you be anyone, on social media. Here's how to get started:
            </Typography>
            <List sx={{ mb: 1 }}>
            <ListItem>
                <ListItemText
                    primary={
                        <Typography variant='body1' lineHeight={2}>
                            Go to
                            <Button color='secondary' variant='outlined' onClick={handleButtonClick('/personas')} sx={{ mx: 1 }}>Personas</Button> 
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
                            <Button color='secondary' variant='outlined' onClick={handleButtonClick('/generate')} sx={{ mx: 1 }}>Generate</Button> 
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
                            <Button color='secondary' variant='outlined' onClick={handleButtonClick('/content')} sx={{ mx: 1 }}>Content</Button> 
                            to view your library and publish to your personas' associated social media accounts.
                        </Typography>
                    }
                />
            </ListItem>
        </List>
        <Typography variant='body1'>
            You can click the menu at the top left to jump around or log out. Have fun!
        </Typography>
        </Card>
    );
}
