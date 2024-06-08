import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function PersonaContentModal({ open, onClose, persona }) {
    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>{persona && persona.name}</DialogTitle>
            <DialogContent>
                <Typography>{persona && persona.content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
