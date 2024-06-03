import { useState } from "react";
import { Avatar, Button, TextField, Stack } from "@mui/material";
import "../App.css";
import { profiles } from "../mock/mock-profiles";

function Profiles() {
  const [activeProfile, setActiveProfile] = useState(profiles[0]);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileDescription, setNewProfileDescription] = useState("");

  const handleProfileClick = (profile) => {
    setActiveProfile(profile);
  };

  const handleSaveProfile = () => {
    // TODO: use redux to save profile
  };

  return (
    <div>
      <Stack direction="row" spacing={5}>
        {profiles.map((profile, index) => (
          <div
            key={index}
            onClick={() => handleProfileClick(profile)}
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
                profile === activeProfile ? { border: "2px solid blue" } : {}
              }
            >
              {profile[0]}
            </Avatar>
            <p>{profile}</p>
          </div>
        ))}
      </Stack>
      <h2>Create a new profile</h2>
      <Stack direction="column" spacing={3}>
        <TextField
          label="Profile Name"
          variant="outlined"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
        />
        <TextField
          label="Describe your new profile"
          variant="outlined"
          multiline
          rows={4}
          value={newProfileDescription}
          onChange={(e) => setNewProfileDescription(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSaveProfile}>
          Save Profile
        </Button>
      </Stack>
    </div>
  );
}

export default Profiles;
