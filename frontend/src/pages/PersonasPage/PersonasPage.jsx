import React, { useEffect, useState } from "react";
import { Avatar, Stack, TextField, Button } from "@mui/material";
import PersonaModal from "../../components/PersonaModal";
import ForumIcon from '@mui/icons-material/Forum'; 
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import { personas } from "../../mock/mock-personas";
import { useDispatch, useSelector } from 'react-redux';
import PersonaService from '../../services/PersonaService';
import { createPersona, updatePersona, deletePersona, fetchPersonas } from '../../redux/personaSlice';
import "./PersonasPage.css";

export default function PersonasPage() {
  const dispatch = useDispatch();
  const personas = useSelector((state) => state.personas);
  const personaService = new PersonaService('106396242553744029996', '668c7ce0fc7c063ca7021e5b');
  const [activePersona, setActivePersona] = useState(personas[0]);
  const [newPersonaName, setNewPersonaName] = useState("");
  const [newPersonaDescription, setNewPersonaDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPersonas());
  }, [dispatch]);

  const handlePersonaClick = (persona) => {
    setActivePersona(persona);
    setIsModalOpen(true); // Open modal when a persona tile is clicked
  };

  const handleSavePersona = async () => {
    try {
      const newPersona = await personaService.create(newPersonaName, newPersonaDescription);
      dispatch(createPersona(newPersona));
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
    setIsModalOpen(false); // Close modal after updating persona
  };

  const handleDeletePersona = async () => {
    try {
      await personaService.delete(activePersona._id);
      dispatch(deletePersona(activePersona._id));
    } catch (e) {
      console.error('Error deleting persona:', e);
    } 
    setIsModalOpen(false); // Close modal after deleting persona
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
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
              {persona.connections?.twitter && <TwitterIcon style={{ color: 'blue', marginRight: '5px' }} />}
              {persona.connections?.linkedin && <LinkedInIcon style={{ color: 'blue', marginRight: '5px' }} />}
              {persona.connections?.threads && <ForumIcon style={{ color: 'blue' }} />}
            </div>
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
          value={newPersonaDescription}
          onChange={(e) => setNewPersonaDescription(e.target.value)}
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
        setPersonaDescription={(text) =>
          setActivePersona({ ...activePersona, text })
        }
        handleUpdatePersona={handleUpdatePersona}
        handleDeletePersona={handleDeletePersona}
      />}
    </div>
  );
}