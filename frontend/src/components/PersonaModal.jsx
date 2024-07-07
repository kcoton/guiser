import React from 'react';
import { Modal, Box, TextField, Button, Stack } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ForumIcon from '@mui/icons-material/Forum'; // Change icon to ForumIcon for Threads

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
  setPersonaDescription,
  handleUpdatePersona,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">Edit Persona</h2>
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
            value={persona.description}
            onChange={(e) => setPersonaDescription(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleUpdatePersona}>
            Update Persona
          </Button>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Button
              variant="outlined"
              startIcon={<TwitterIcon />}
              style={buttonStyle}
              disabled={persona.connections.twitter} 
            >
              {persona.connections.twitter ? 'Connected Twitter' : 'Connect Twitter'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<LinkedInIcon />}
              style={buttonStyle}
              disabled={persona.connections.linkedin} 
            >
              {persona.connections.linkedin ? 'Connected LinkedIn' : 'Connect LinkedIn'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<ForumIcon />}
              style={buttonStyle}
              disabled={persona.connections.threads} 
            >
              {persona.connections.threads ? 'Connected Threads' : 'Connect Threads'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}