/* eslint-disable react/prop-types */
import { TextField, Button, Box, Stack, Typography } from '@mui/material';
import { CheckCircle, Delete } from '@mui/icons-material';

export default function ProcessContentForm({ onSubmit, onAccept, onReject, onContentChange, generatedContent }) {
    return (
        generatedContent && (
            <form>
                <Stack direction='row' sx={{ mx: 10, mb: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='overline' noWrap component='div' sx={{ letterSpacing: 2, fontSize: 24 }}>
                        <span style={{ color: '#A688FA' }}>Decide</span> to keep, delete, or edit your content
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        <Button
                            type='submit'
                            variant='contained'
                            color='success'
                            size='large'
                            startIcon={<CheckCircle />}
                            onClick={onAccept}
                        >
                            Keep
                        </Button>
                        <Button
                            type='submit'
                            variant='contained'
                            color='error'
                            size='large'
                            startIcon={<Delete />}
                            onClick={onReject}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Stack>
                <Box sx={{ mx: 10, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <TextField
                        name='content'
                        variant='outlined'
                        fullWidth
                        multiline
                        rows={5}
                        required
                        defaultValue={generatedContent}
                        onChange={onContentChange} 
                    />
                </Box>
            </form>
        )
    );
}
