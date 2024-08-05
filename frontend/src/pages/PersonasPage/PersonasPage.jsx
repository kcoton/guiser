/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Stack, TextField, Button, Card, Typography, Box } from '@mui/material';
import PersonaModal from './PersonaModal';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AlternateEmail from '@mui/icons-material/AlternateEmail';
import { useDispatch, useSelector } from 'react-redux';
import PersonaService from '../../services/PersonaService';
import { addPersona, updatePersona, deletePersona } from '../../redux/userSlice';
import { Platform } from '../../enum/common.enum';
import { isPlatformConnected } from './Common';
import './PersonasPage.css';
import Save from '@mui/icons-material/Save';
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

export default function PersonasPage() {
    const dispatch = useDispatch();
    const userDB = useSelector((state) => state.user?.db);
    const personaService = new PersonaService(userDB?.externalId, userDB?._id);
    const [personas, setPersonas] = useState([]);
    const [activePersona, setActivePersona] = useState(null);
    const [newPersonaName, setNewPersonaName] = useState('');
    const [newPersonaText, setNewPersonaText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const validPersonas = userDB?.personas?.filter((persona) => !persona.deleted);
        setPersonas(validPersonas);
    }, [personas, userDB]);

    const handlePersonaClick = (persona) => {
        setActivePersona(persona);
        setIsModalOpen(true);
    };

    const handleSavePersona = async () => {
        try {
            const newPersona = await personaService.create(newPersonaName, newPersonaText);
            setNewPersonaName('');
            setNewPersonaText('');
            dispatch(addPersona(newPersona));
        } catch (e) {
            console.error('Error creating new persona:', e);
        }
    };

    const handleUpdatePersona = async () => {
        try {
            const updatedPersona = await personaService.update(
                activePersona._id,
                activePersona.name,
                activePersona.text,
            );
            dispatch(updatePersona(updatedPersona));
        } catch (e) {
            console.error('Error updating persona:', e);
        }
        setIsModalOpen(false);
    };

    const handleDeletePersona = async () => {
        try {
            await personaService.delete(activePersona._id);
            dispatch(deletePersona(activePersona._id));
        } catch (e) {
            console.error('Error deleting persona:', e);
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <Typography variant='overline' noWrap component='div' sx={{ letterSpacing: 2, fontSize: 24, mx: 10 }}>
                Your Personas
            </Typography>

            <Box sx={{ mx: 8, mb: 4 }}>
                <Slider {...settings}>
                    {personas?.map((persona, index) => (
                        <div key={index}>
                            <PersonaCard persona={persona} handlePersonaClick={handlePersonaClick} />
                        </div>
                    ))}
                </Slider>
            </Box>

            <Stack direction='row' sx={{ mx: 10, mb: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='overline' noWrap component='div' sx={{ letterSpacing: 2, fontSize: 24 }}>
                    Create New Persona
                </Typography>
                <Box>
                    <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    startIcon={<Save />}
                    onClick={handleSavePersona}
                    >
                    Create Persona
                    </Button>
                </Box>
            </Stack>
            <Card sx={{ p: 5, mx: 8, mb: 10, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Stack direction='column' spacing={4}>
                    <TextField
                        required
                        variant='outlined'
                        label="What's your persona's name?"
                        value={newPersonaName}
                        onChange={(e) => setNewPersonaName(e.target.value)} 
                    />
                    <TextField
                        required
                        label='What personality does your persona have?'
                        variant='outlined'
                        multiline
                        rows={4}
                        value={newPersonaText}
                        onChange={(e) => setNewPersonaText(e.target.value)} />
                </Stack>
                {activePersona && (
                    <PersonaModal
                        open={isModalOpen}
                        handleClose={() => setIsModalOpen(false)}
                        persona={activePersona}
                        setPersonaName={(name) => setActivePersona({ ...activePersona, name })}
                        setPersonaText={(text) => setActivePersona({ ...activePersona, text })}
                        handleUpdatePersona={handleUpdatePersona}
                        handleDeletePersona={handleDeletePersona} />
                )}
            </Card>
        </>
    );
}

const PersonaCard = ({ persona, handlePersonaClick }) => {
    return (
        <Card 
            onClick={() => handlePersonaClick(persona)}
            sx={{ 
                p: 3, 
                width: '17vw',
                height: '100px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
            }}>
            <Typography variant='body1' sx={{ mb: 1, fontWeight: 500, letterSpacing: 0.5 }}>
                {persona.name}
            </Typography>
            <SocialMediaIcons persona={persona} />
        </Card>
    );
};

const SocialMediaIcons = ({ persona }) => {
    return (
        <Stack direction='row' sx={{ justifyContent: 'space-evenly' }}>
            {isPlatformConnected(persona, Platform.TWITTER) && (
                <TwitterIcon sx={{ color: '#A688FA' }} />
            )}
            {isPlatformConnected(persona, Platform.LINKEDIN) && (
                <LinkedInIcon sx={{ color: '#A688FA' }} />
            )}
            {isPlatformConnected(persona, Platform.THREADS) && <AlternateEmail sx={{ color: '#A688FA' }} />}
        </Stack>
    );
};
