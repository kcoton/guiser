import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingOverlay({ showLoadingOverlay }) {
    return (
        <>
            {showLoadingOverlay && (
                <Box className='generate-page-loading-modal'>
                    <CircularProgress />
                </Box>
            )}
        </>
    );
}
