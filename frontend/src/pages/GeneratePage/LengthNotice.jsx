import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function LengthNotice({ socialApps, contentLength }) {
    return (
        contentLength > 0 && (
            <Box className='generate-page-pane'>
                <span>Verify that the length of your content meets platform requirements</span>
                <ul>
                    <li>Content Length: {contentLength}</li>
                    {socialApps.map(app => {
                        const icon = contentLength <= app.maxTextLength ? 
                            <CheckIcon style={{ color: 'green' }} /> : 
                            <CloseIcon style={{ color: 'red' }} />;
                        return <li key={app.seqNo}>{app.name}: {app.maxTextLength} {icon}</li>
                    })}
                </ul>
            </Box>
        )
    );
}