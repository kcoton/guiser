/* eslint-disable react/prop-types */
import { TextField, Button, Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { CheckCircle, Delete } from '@mui/icons-material';
import { Fragment } from 'react';

export default function ProcessContentForm({ onSubmit, onAccept, onReject, onContentChange, generatedContent }) {
    const isLargeUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const isMediumUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    return (
        generatedContent && (
            <form>
                <Stack
                    direction='row'
                    sx={{ mx: { xs: 5, md: 5, lg: 10 }, mb: 1, justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography
                        variant='overline'
                        noWrap
                        component='div'
                        sx={{ letterSpacing: 2, fontSize: { xs: 10.5, sm: 16, md: 20, lg: 24 } }}
                    >
                        {isLargeUp ? (
                            <Fragment>
                                <span style={{ color: '#A688FA' }}>Decide</span> to keep, delete, or edit your content
                            </Fragment>
                        ) : (
                            <Fragment>
                                <span style={{ color: '#A688FA' }}>Decide</span> to keep, delete, or edit
                            </Fragment>
                        )}
                    </Typography>
                    {isMediumUp && (
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
                    )}
                </Stack>
                <Box sx={{ mx: { xs: 5, md: 5, lg: 10 }, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
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
                    {!isMediumUp && (
                        <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
                            <Button
                                type='submit'
                                variant='contained'
                                color='success'
                                size={isMediumUp ? 'large' : 'small'}
                                startIcon={<CheckCircle />}
                                onClick={onAccept}
                            >
                                Keep
                            </Button>
                            <Button
                                type='submit'
                                variant='contained'
                                color='error'
                                size={isMediumUp ? 'large' : 'small'}
                                startIcon={<Delete />}
                                onClick={onReject}
                            >
                                Delete
                            </Button>
                        </Stack>
                    )}
                </Box>
            </form>
        )
    );
}
