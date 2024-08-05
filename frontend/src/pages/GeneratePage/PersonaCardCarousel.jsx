/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './GeneratePage.css';
import { sliderSettings } from '../Common';
import { PersonaCard } from '../../components/PersonaComponent';

export default function PersonaCardCarousel({ personas, selectedPersona, onSelectPersonaClick }) {    
    return (
        <>
            <Typography variant='overline' noWrap component='div' sx={{ letterSpacing: 2, fontSize: 24, mx: 10 }}>
                <span style={{ color: '#A688FA' }}>Generate</span> Content for Who?
            </Typography>
            <Box sx={{ mx: 8, mb: 4 }}>
                {personas?.length ? (
                    <Slider {...sliderSettings}>
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