import { Button } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhotoIcon from "@mui/icons-material/Photo";
import { Stack } from "@mui/material";
import { connectedAccounts } from "../mock/mock-personas";

export default function ConnectPage() {
  return (
    <div className="page-container">
      <h1>Let&apos;s add some social accounts</h1>
      <Stack direction="row" spacing={5}>
        <Button variant="outlined" startIcon={<TwitterIcon />}>
          Connect Twitter
        </Button>
        <Button variant="outlined" startIcon={<LinkedInIcon />}>
          Connect LinkedIn
        </Button>
        <Button variant="outlined" startIcon={<InstagramIcon />}>
          Connect Instagram
        </Button>
      </Stack>
      <div>
        <h2>Connected Accounts:</h2>
        {connectedAccounts.map((account, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <PhotoIcon sx={{ width: 75, height: 75 }} />
            <p>{account}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
