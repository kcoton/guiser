import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function PersonaContentModal({ open, onClose}) {
    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <Typography>
                    Sorry, content generation is curently unavailble. Please try again later.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
