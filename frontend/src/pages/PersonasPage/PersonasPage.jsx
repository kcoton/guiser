import { useEffect, useState } from 'react';
import { Avatar, Stack, TextField, Button, Card, Typography, Box } from '@mui/material';
import PersonaModal from './PersonaModal';
import ForumIcon from '@mui/icons-material/Forum';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useDispatch, useSelector } from 'react-redux';
import PersonaService from '../../services/PersonaService';
import { addPersona, updatePersona, deletePersona } from '../../redux/userSlice';
import { Platform } from '../../enum/common.enum';
import { isPlatformConnected } from './Common';
import './PersonasPage.css';
import Save from '@mui/icons-material/Save';

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
            {/* TODO: refactor into custom component */}
            <Typography variant='overline' noWrap component='div' sx={{ letterSpacing: 2, fontSize: 24, mx: 10 }}>
                Your Personas
            </Typography>
            <Card sx={{ p: 5, mx: 8, mb: 4, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Stack direction='row' spacing={5}>
                    {personas?.map((persona, index) => (
                        <div
                            key={index}
                            className={`persona-tile ${persona === activePersona ? 'active' : ''}`}
                            onClick={() => handlePersonaClick(persona)}
                        >
                            <Avatar
                                variant='rounded'
                                className={`persona-avatar ${persona === activePersona ? 'active' : ''}`}
                            >
                                {persona.name[0]}
                            </Avatar>
                            <p>{persona.name}</p>
                            <SocialMediaIcons persona={persona} />
                        </div>
                    ))}
                </Stack>
            </Card>

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

const SocialMediaIcons = ({ persona }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
            {isPlatformConnected(persona, Platform.TWITTER) && (
                <TwitterIcon style={{ color: 'blue', marginRight: '5px' }} />
            )}
            {isPlatformConnected(persona, Platform.LINKEDIN) && (
                <LinkedInIcon style={{ color: 'blue', marginRight: '5px' }} />
            )}
            {isPlatformConnected(persona, Platform.THREADS) && <ForumIcon style={{ color: 'blue' }} />}
        </div>
    );
};
