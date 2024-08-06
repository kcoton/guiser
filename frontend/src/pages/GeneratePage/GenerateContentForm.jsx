/* eslint-disable react/prop-types */
import { TextField, Stack, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { Fragment } from 'react';

export default function GenerateContentForm({ onSubmit, generatedContent, selectedPersona }) {
    const isLargeUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const isMediumUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    return (
        selectedPersona && !generatedContent && (
            <form onSubmit={onSubmit}>
                <Stack direction='row' sx={{ mx: { xs: 5, md: 5, lg: 10 }, mb: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='overline' noWrap component='div' sx={{ letterSpacing: 2, fontSize: { xs: 10.5, sm: 16, md: 20, lg: 24 } }}>
                        {isMediumUp ? (
                            <Fragment>
                                <span style={{ color: '#A688FA' }}>Describe</span> the content you want to generate
                            </Fragment>
                            ) : 
                            <Fragment>
                                <span style={{ color: '#A688FA' }}>Describe</span> content to generate
                            </Fragment>
                        }                    
                    </Typography>
                    <Box>
                        {isLargeUp && <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            size='large'
                            startIcon={<AutoAwesome />}
                        >
                            Generate Content
                        </Button>}
                    </Box>
                </Stack>
                <Box sx={{ mx: { xs: 5, md: 5, lg: 10 }, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <TextField
                        name='context'
                        variant='outlined'
                        fullWidth
                        multiline
                        rows={5}
                        required
                        disabled={!!generatedContent} 
                    />
                    {!isLargeUp && <Button
                        type='submit'
                        fullWidth='true'
                        variant='contained'
                        color='primary'
                        size={isMediumUp ? 'large' : 'small'}
                        startIcon={<AutoAwesome />}
                        sx={{ mt: 2 }}
                    >
                        Generate Content
                    </Button>}
                </Box>
            </form>
        )
    );
}
