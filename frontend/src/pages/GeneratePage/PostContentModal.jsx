import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

export default function PostContentModal({ open, proceedBtnText, onProceed, rejectBtnText, onReject, content, persona }) {
    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>Generate{content ? 'd' : ''} Post as {persona && persona.name}</DialogTitle>
            <form onSubmit={onProceed}>
                <DialogContent>
                    <TextField
                        name={content ? 'post' : 'context'}
                        label="Write prompt context"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                        defaultValue={content ?? ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type='submit'>{proceedBtnText}</Button>
                    <Button type='button' onClick={onReject}>{rejectBtnText}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
