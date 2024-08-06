/* eslint-disable react/prop-types */
import { Box, Typography, Stack, useMediaQuery } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function LengthNotice({ socialApps, contentLength }) {
    const isMediumUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    return (
        contentLength > 0 && (
        <Box sx={{ mx: { xs: 5, md: 5, lg: 10 }, mt: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Stack direction={isMediumUp ? 'row' : 'column'} spacing={2}>
                <Typography variant='caption' color='secondary'>
                    Verify that the length of your content meets platform requirements:
                </Typography>
                <Typography variant='caption' sx={{ fontSize: { xs: 10, sm: 12 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        Content Length: {contentLength} {'->'}
                        {socialApps.map((app) => {
                            const icon =
                                contentLength <= app.maxTextLength ? (
                                    <CheckIcon color='success' sx={{ fontSize: 16 }} />
                                ) : (
                                    <CloseIcon color='error' sx={{ fontSize: 16 }} />
                                );
                            return (
                                <Box key={app.seqNo} sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                    {app.name}: {app.maxTextLength}{icon}
                                </Box>
                            );
                        })}
                    </Box>
                </Typography>
            </Stack>
        </Box>
        )
    );
}
