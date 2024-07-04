import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function ProcessContentForm({ onSubmit, onAccept, onReject, generatedContent }) {
    return (
        generatedContent && (
            <Box className='generate-page-pane'>
                <span>Edit, keep, or discard the post</span>
                <form>
                    <TextField
                        name='post'
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                        required
                        defaultValue={generatedContent}
                    />
                    <Button type='submit' onClick={onAccept}>Keep Post</Button>
                    <Button type='submit' onClick={onReject}>Discard Post</Button>
                </form>
            </Box>
        )
    );
}
