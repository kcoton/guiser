import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function PersonaCardGrid({ personas, onShowPersonaContentClick, onSelectPersonaClick }) {
    return (
        <Grid container spacing={3}>
            {personas.map(p => (
                <Grid item xs={12} sm={6} md={4} key={p.id}>
                    <Card sx={{ minWidth: 20 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Persona {p.id}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {p.name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => onShowPersonaContentClick(p)}>Show Persona Content</Button>
                            <Button size="small" onClick={() => onSelectPersonaClick(p)}>Select Persona</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
