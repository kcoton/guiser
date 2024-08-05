/* eslint-disable react/prop-types */
import { TextField, Stack, Typography, Button, Box } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';

export default function GenerateContentForm({ onSubmit, generatedContent, selectedPersona }) {
    return (
        selectedPersona && !generatedContent && (
            <form onSubmit={onSubmit}>
                <Stack direction='row' sx={{ mx: 10, mb: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='overline' noWrap component='div' sx={{ letterSpacing: 2, fontSize: 24 }}>
                        <span style={{ color: '#A688FA' }}>Describe</span> the content you want to generate
                    </Typography>
                    <Box>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            size='large'
                            startIcon={<AutoAwesome />}
                        >
                            Generate Content
                        </Button>
                    </Box>
                </Stack>
                <Box sx={{ mx: 10, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <TextField
                        name='context'
                        variant='outlined'
                        fullWidth
                        multiline
                        rows={5}
                        required
                        disabled={!!generatedContent} 
                    />
                </Box>
            </form>
        )
    );
}
