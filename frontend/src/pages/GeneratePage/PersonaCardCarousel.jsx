/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { sliderSettings } from '../Common';
import { PersonaCard } from '../../components/PersonaComponent';

export default function PersonaCardCarousel({ personas, selectedPersona, onSelectPersonaClick }) {    
    return (
        <>
            <Typography variant='overline' noWrap component='div' sx={{ letterSpacing: 2, fontSize: { xs: 10.5, sm: 16, md: 20, lg: 24 }, mx: { xs: 5, md: 5, lg: 10 }, mb: 1 }}>
              <span style={{ color: '#A688FA' }}>Generate</span> Content for which persona?
            </Typography>
            <Box sx={{ mx: 8, mb: 4 }}>
                {personas?.length ? (
                    <Slider {...sliderSettings(personas?.length)}>
                        {personas.map((persona, index) => (
                            <div key={index}>
                                <PersonaCard
                                    persona={persona}
                                    selectedPersona={selectedPersona}
                                    handlePersonaClick={onSelectPersonaClick}
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <span>You must add at least one persona to generate content!</span>
                )}
            </Box>
        </>
    );
}
