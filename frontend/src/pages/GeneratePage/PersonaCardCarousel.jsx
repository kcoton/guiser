/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import { Box, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import { sliderSettings } from '../Common';
import { PersonaCard } from '../../components/PersonaComponent';
import { Fragment } from 'react';

export default function PersonaCardCarousel({ personas, selectedPersona, onSelectPersonaClick }) {    
    const isMediumUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    return (
        <>
            <Typography variant='overline' noWrap component='div' sx={{ letterSpacing: 2, fontSize: { xs: 10.5, sm: 16, md: 20, lg: 24 }, mx: { xs: 5, md: 5, lg: 10 }, mb: 1 }}>
            {isMediumUp ? (
                <Fragment>
                    <span style={{ color: '#A688FA' }}>Generate</span> content for which persona?
                </Fragment>
                ) : 
                <Fragment>
                    <span style={{ color: '#A688FA' }}>Generate</span> content for who?
                </Fragment>
            }   
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
