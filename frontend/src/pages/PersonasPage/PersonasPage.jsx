/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Stack, TextField, Button, Typography, Box, useMediaQuery } from '@mui/material';
import PersonaModal from './PersonaModal';
import { useDispatch, useSelector } from 'react-redux';
import PersonaService from '../../services/PersonaService';
import { addPersona, updatePersona, deletePersona } from '../../redux/userSlice';
import '../../App.css';
import Save from '@mui/icons-material/Save';
import Slider from 'react-slick';
import { sliderSettings } from '../Common';
import { PersonaCard } from '../../components/PersonaComponent';

export default function PersonasPage() {
    const isMediumUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

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
            if (!newPersonaName) {
                alert('Persona name is required.');
                return;
            }
            if (!newPersonaText) {
                alert('Persona content is required.');
                return;
            }
            const MAX_NAME_LENGTH = 20;
            if (newPersonaName.length > MAX_NAME_LENGTH) {
                alert(`Persona name should not exceed ${MAX_NAME_LENGTH} characters.`);
                return;
            }
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
            if (!activePersona.name) {
                alert('Persona name is required.');
                return;
            }
            if (!activePersona.text) {
                alert('Persona content is required.');
                return;
            }
            const MAX_NAME_LENGTH = 20;
            if (activePersona.name.length > MAX_NAME_LENGTH) {
                alert(`Persona name should not exceed ${MAX_NAME_LENGTH} characters.`);
                return;
            }
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
            <Typography
                variant='overline'
                noWrap
                component='div'
                sx={{ letterSpacing: 2, fontSize: { xs: 10.5, sm: 24 }, mx: 10 }}
            >
                <span style={{ color: '#A688FA' }}>View</span> Your Personas
            </Typography>

            <Box sx={{ mx: 8, mb: 4 }}>
                <Slider {...sliderSettings(personas?.length)}>
                    {personas?.map((persona, index) => (
                        <div key={index}>
                            <PersonaCard
                                persona={persona}
                                selectedPersona={activePersona}
                                handlePersonaClick={handlePersonaClick}
                            />
                        </div>
                    ))}
                </Slider>
            </Box>

            <Stack
                direction='row'
                sx={{ mx: { xs: 6, sm: 10 }, mb: 1, justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Typography
                    variant='overline'
                    noWrap
                    component='div'
                    sx={{ letterSpacing: 2, fontSize: { xs: 10.5, sm: 24 } }}
                >
                    <span style={{ color: '#A688FA' }}>Create</span> Your New Persona
                </Typography>
                <Box>
                    {isMediumUp && (
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            startIcon={<Save />}
                            onClick={handleSavePersona}
                        >
                            Create Persona
                        </Button>
                    )}
                </Box>
            </Stack>
            <Box sx={{ mx: { xs: 5, sm: 10 }, mt: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
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
                        onChange={(e) => setNewPersonaText(e.target.value)}
                    />
                </Stack>
                {activePersona && (
                    <PersonaModal
                        open={isModalOpen}
                        handleClose={() => setIsModalOpen(false)}
                        persona={activePersona}
                        setPersonaName={(name) => setActivePersona({ ...activePersona, name })}
                        setPersonaText={(text) => setActivePersona({ ...activePersona, text })}
                        handleUpdatePersona={handleUpdatePersona}
                        handleDeletePersona={handleDeletePersona}
                    />
                )}
                {!isMediumUp && (
                    <Button
                        variant='contained'
                        fullWidth='true'
                        color='primary'
                        size='small'
                        startIcon={<Save />}
                        onClick={handleSavePersona}
                        sx={{ mt: 2 }}
                    >
                        Create Persona
                    </Button>
                )}
            </Box>
        </>
    );
}
