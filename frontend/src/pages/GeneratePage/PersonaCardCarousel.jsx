import React from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './GeneratePage.css';

export default function PersonaCardCarousel({ personas, selectedPersona, onSelectPersonaClick }) {

    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <ArrowRight
            className={className}
            style={{ ...style, color: "black" }}
            onClick={onClick}
          />
        );
      }

    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <ArrowLeft
            className={className}
            style={{ ...style, color: "black" }}
            onClick={onClick}
          />
        );
      }
    
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Box className='generate-page-pane'>
            {personas ?
                <>
                    <span>Select a persona</span>
                    <Slider {...settings}>
                        {personas.map((p, idx) => (
                            <div key={p.id}>
                                <Card 
                                    key={p.id}
                                    className='generate-page-persona-card'
                                    onClick={() => onSelectPersonaClick(p)}
                                    style={{border: selectedPersona?.id === p.id ? '2px solid blue' : '1px solid #ccc'}}
                                >
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Persona {idx + 1}
                                        </Typography>
                                        <Typography variant="h6">
                                            {p.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </Slider> 
                </>:
                <span>You must add at least one persona to generate content!</span>
            }
        </Box>
    );
}
