import { Modal, Box, TextField, Button, Stack } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ForumIcon from "@mui/icons-material/Forum";
import { useSelector } from "react-redux";
import LinkToThreads from "./LinkToThreads";
import { Platform } from "../../enum/common.enum";
import { isPlatformConnected } from "./Common";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const buttonStyle = {
  minWidth: "150px",
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
  const user = useSelector((state) => state?.user);

  async function handleLinkedInClick(personaId) {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.VITE_LINKED_IN_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_LINKED_IN_REDIRECT_URI,
      state: personaId,
      scope: "w_member_social profile openid",
    });

    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
    sessionStorage.setItem("resolverData", JSON.stringify(user));
    window.location.href = linkedInAuthUrl;
  }

  async function handleTwitterClick(personaId) {
    try {
      const baseUrl = import.meta.env.VITE_BASEURL_BACK_ALIAS;
      sessionStorage.setItem("resolverData", JSON.stringify(user));
      const state = `${user.user.externalId}:${personaId}`;

      const url = `${baseUrl}/auth/twitter/code?state=${state}`
      window.location.href = url;
    } catch (error) {
      console.error("Error fetching Twitter auth code:", error);
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <h2 id="modal-title">Edit Persona</h2>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeletePersona}
          >
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdatePersona}
          >
            Update Persona
          </Button>
          <Stack direction="row" spacing={3} justifyContent="center">
          <Button
              variant="outlined"
              startIcon={<TwitterIcon />}
              style={buttonStyle}
              disabled={isPlatformConnected(persona, Platform.TWITTER)}
              onClick={() => handleTwitterClick(persona._id)}
            >
              {isPlatformConnected(Platform.TWITTER)
                ? "Connected Twitter"
                : "Connect Twitter"}
            </Button>
            <Button
              variant="outlined"
              startIcon={<LinkedInIcon />}
              style={buttonStyle}
              disabled={isPlatformConnected(persona, Platform.LINKEDIN)}
              onClick={() => handleLinkedInClick(persona._id)}
            >
              {isPlatformConnected(Platform.LINKEDIN)
                ? "Connected LinkedIn"
                : "Connect LinkedIn"}
            </Button>
            <LinkToThreads
              personaID={persona._id}
              variant="outlined"
              startIcon={<ForumIcon />}
              style={buttonStyle}
              disabled={isPlatformConnected(persona, Platform.THREADS)}
              displayText={
                isPlatformConnected(Platform.THREADS)
                  ? "Connected Threads"
                  : "Connect Threads"
              }
            />
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
