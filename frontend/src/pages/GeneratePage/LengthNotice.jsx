/* eslint-disable react/prop-types */
import { Box, Typography, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function LengthNotice({ socialApps, contentLength }) {
    return (
        contentLength > 0 && (
        <Box sx={{ mx: 11, mt: 1, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Stack direction='row' spacing={2}>
                <Typography variant='caption' color='secondary'>
                    Verify that the length of your content meets platform requirements:
                </Typography>
                <Typography variant='caption'>
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
