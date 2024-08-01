import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function GenerateContentForm({ onSubmit, generatedContent, selectedPersona }) {
    return (
        selectedPersona && (
            <Box className='generate-page-pane'>
                <span>Describe the content you want generated</span>
                <form onSubmit={onSubmit}>
                    <TextField
                        name='context'
                        variant='outlined'
                        fullWidth
                        multiline
                        rows={5}
                        required
                        disabled={!!generatedContent}
                    />
                    {!generatedContent && <Button type='submit'>Generate Content</Button>}
                </form>
            </Box>
        )
    );
}
