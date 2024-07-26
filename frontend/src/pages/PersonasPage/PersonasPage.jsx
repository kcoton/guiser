import { useEffect, useState } from "react";
import { Avatar, Stack, TextField, Button } from "@mui/material";
import PersonaModal from "../../components/PersonaModal";
import ForumIcon from '@mui/icons-material/Forum'; 
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useDispatch, useSelector } from 'react-redux';
import PersonaService from '../../services/PersonaService';
import { addPersona, updatePersona, deletePersona } from '../../redux/userSlice';
import { Platform } from '../../enum/common.enum'
import { isPlatformConnected } from "./Common";
import "./PersonasPage.css";

export default function PersonasPage() {
  const dispatch = useDispatch();
  const userDB = useSelector((state) => state.user?.db);
  const [personas, setPersonas] = useState([]);
  // TODO: create redux store for PersonaService to use across the same instance of the app
  const personaService = new PersonaService(userDB?.externalId, userDB?._id);
  const [activePersona, setActivePersona] = useState();
  const [newPersonaName, setNewPersonaName] = useState("");
  const [newPersonaText, setNewPersonaText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setPersonas(userDB?.personas);
    setActivePersona(personas?.length > 0 && personas[0]);
  }, [personas, userDB])

  const handlePersonaClick = (persona) => {
    setActivePersona(persona);
    setIsModalOpen(true);
  };

  const handleSavePersona = async () => {
    try {
      const newPersona = await personaService.create(newPersonaName, newPersonaText);
      dispatch(addPersona(newPersona));
    } catch (e) {
      console.error('Error creating new persona:', e);
    }
  };

  const handleUpdatePersona = async () => {
    try {
      const updatedPersona = await personaService.update(activePersona._id, activePersona.name, activePersona.text);
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
    <div className="page-container">
      <Stack direction="row" spacing={5}>
        {personas?.map((persona, index) => (
          <div
            key={index}
            className={`persona-tile ${persona === activePersona ? 'active' : ''}`}
            onClick={() => handlePersonaClick(persona)}
          >
            <Avatar
              variant="rounded"
              className={`persona-avatar ${persona === activePersona ? 'active' : ''}`}
            >
              {persona.name[0]}
            </Avatar>
            <p>{persona.name}</p>
            <SocialMediaIcons persona={persona} />
          </div>
        ))}
      </Stack>
      <h2>Create a new persona</h2>
      <Stack direction="column" spacing={3}>
        <TextField
          label="Persona Name"
          variant="outlined"
          value={newPersonaName}
          onChange={(e) => setNewPersonaName(e.target.value)}
        />
        <TextField
          label="Describe your new persona"
          variant="outlined"
          multiline
          rows={4}
          value={newPersonaText}
          onChange={(e) => setNewPersonaText(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSavePersona}>
          Save Persona
        </Button>
      </Stack>
      {activePersona && <PersonaModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        persona={activePersona}
        setPersonaName={(name) => setActivePersona({ ...activePersona, name })}
        setPersonaText={(text) =>
          setActivePersona({ ...activePersona, text })
        }
        handleUpdatePersona={handleUpdatePersona}
        handleDeletePersona={handleDeletePersona}
      />}
    </div>
  );
}

const SocialMediaIcons = ({ persona }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
      {isPlatformConnected(persona, Platform.TWITTER) && <TwitterIcon style={{ color: 'blue', marginRight: '5px' }} />}
      {isPlatformConnected(persona, Platform.LINKEDIN) && <LinkedInIcon style={{ color: 'blue', marginRight: '5px' }} />}
      {isPlatformConnected(persona, Platform.THREADS) && <ForumIcon style={{ color: 'blue' }} />}
  </div>
  )
}