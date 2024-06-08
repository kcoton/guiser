import { useState } from "react";
import { Avatar, Button, TextField, Stack } from "@mui/material";
import "../App.css";
import { personas } from "../mock/mock-personas";

export default function PersonasPage() {
  const [activePersona, setActivePersona] = useState(personas[0]);
  const [newPersonaName, setNewPersonaName] = useState("");
  const [newPersonaDescription, setNewPersonaDescription] = useState("");

  const handlePersonaClick = (persona) => {
    setActivePersona(persona);
  };

  const handleSavePersona = () => {
    // TODO: use redux to save persona
  };

  return (
    <div className="page-container">
      <Stack direction="row" spacing={5}>
        {personas.map((persona, index) => (
          <div
            key={index}
            onClick={() => handlePersonaClick(persona)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              variant="rounded"
              sx={{ width: 75, height: 75 }}
              style={
                persona === activePersona ? { border: "2px solid blue" } : {}
              }
            >
              {persona[0]}
            </Avatar>
            <p>{persona}</p>
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
    </div>
  );
}
