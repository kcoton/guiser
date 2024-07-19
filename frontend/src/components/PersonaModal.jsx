import React from 'react';
import { Modal, Box, TextField, Button, Stack } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ForumIcon from '@mui/icons-material/Forum'; // Change icon to ForumIcon for Threads
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const buttonStyle = {
  minWidth: '150px', 
};

export default function PersonaModal({
  open,
  handleClose,
  persona,
  setPersonaName,
  setPersonaText,
  handleUpdatePersona,
  handleDeletePersona,
}) {
  const user = useSelector((state) => state.user);

  async function handleLinkedInClick(personaId) {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_LINKED_IN_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_LINKED_IN_REDIRECT_URI,
      state: personaId,
      scope: 'w_member_social'
    });
  
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
    sessionStorage.setItem('user', JSON.stringify(user));
    window.location.href = linkedInAuthUrl;
  }
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Stack direction="row" spacing={3} justifyContent="space-between" sx={{ mb: 3 }}>
        <h2 id="modal-title">Edit Persona</h2>
        <Button variant="contained" color="error" onClick={handleDeletePersona}>
          Delete Persona
        </Button>
        </Stack>
        <Stack direction="column" spacing={3}>
          <TextField
            label="Persona Name"
            variant="outlined"
            value={persona.name}
            onChange={(e) => setPersonaName(e.target.value)}
          />
          <TextField
            label="Describe your persona"
            variant="outlined"
            multiline
            rows={4}
            value={persona.text}
            onChange={(e) => setPersonaText(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleUpdatePersona}>
            Update Persona
          </Button>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Button
              variant="outlined"
              startIcon={<TwitterIcon />}
              style={buttonStyle}
              disabled={persona.connections?.twitter} 
            >
              {persona.connections?.twitter ? 'Connected Twitter' : 'Connect Twitter'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<LinkedInIcon />}
              style={buttonStyle}
              disabled={persona.connections?.linkedin}
              onClick={() => handleLinkedInClick(persona._id)}
            >
              {persona.connections?.linkedin ? 'Connected LinkedIn' : 'Connect LinkedIn'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<ForumIcon />}
              style={buttonStyle}
              disabled={persona.connections?.threads} 
            >
              {persona.connections?.threads ? 'Connected Threads' : 'Connect Threads'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}