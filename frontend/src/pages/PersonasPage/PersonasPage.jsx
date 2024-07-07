import React, { useState } from "react";
import { Avatar, Stack, TextField, Button } from "@mui/material";
import PersonaModal from "../../components/PersonaModal";
import ForumIcon from '@mui/icons-material/Forum'; 
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { personas } from "../../mock/mock-personas";
import "./PersonasPage.css";

export default function PersonasPage() {
  const [activePersona, setActivePersona] = useState(personas[0]);
  const [newPersonaName, setNewPersonaName] = useState("");
  const [newPersonaDescription, setNewPersonaDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePersonaClick = (persona) => {
    setActivePersona(persona);
    setIsModalOpen(true); // Open modal when a persona tile is clicked
  };

  const handleSavePersona = () => {
    // TODO: use redux to save persona
  };

  const handleUpdatePersona = () => {
    // TODO: use redux to update persona
    setIsModalOpen(false); // Close modal after updating persona
  };

  return (
    <div className="page-container">
      <Stack direction="row" spacing={5}>
        {personas.map((persona, index) => (
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
              {persona.connections.twitter && <TwitterIcon style={{ color: 'blue', marginRight: '5px' }} />}
              {persona.connections.linkedin && <LinkedInIcon style={{ color: 'blue', marginRight: '5px' }} />}
              {persona.connections.threads && <ForumIcon style={{ color: 'blue' }} />}
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
      <PersonaModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        persona={activePersona}
        setPersonaName={(name) => setActivePersona({ ...activePersona, name })}
        setPersonaDescription={(description) =>
          setActivePersona({ ...activePersona, description })
        }
        handleUpdatePersona={handleUpdatePersona}
      />
    </div>
  );
}