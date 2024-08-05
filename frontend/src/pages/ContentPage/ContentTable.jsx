/* eslint-disable react/prop-types */
import { DataGrid } from '@mui/x-data-grid';
import TwitterIcon from '@mui/icons-material/Twitter';
import AlternateEmail from '@mui/icons-material/AlternateEmail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Tooltip, Box } from '@mui/material';
import { useSelector } from 'react-redux';

function getIcon(appName) {
    const iconMap = {
        Twitter: <TwitterIcon sx={{ marginLeft: '5px', marginRight: '5px' }} />,
        Threads: <Box sx={{ display: 'flex', alignItems: 'center' }}>
		     <i className={'fab fa-threads'}
			style={{ fontSize: '20px',
				 marginBottom: '12px',
				 marginLeft: '5px',
				 marginRight: '5px' }}></i>
		 </Box>,
        LinkedIn: <LinkedInIcon sx={{ marginLeft: '5px', marginRight: '5px' }} />,
    };
    return iconMap[appName];
}

function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
}

export default function ContentTable({ socialApps, onRowClick }) {
    const content = useSelector((state) => state.user.db?.personas ?? []).reduce((acc, persona) => {
        const personaName = persona.name;
        const personaId = persona._id;
        if (!persona.deleted) {
            persona.content.forEach((contentEntry) => {
                if (!contentEntry.isRejected) {
                    acc.push({ ...contentEntry, personaName, personaId, id: contentEntry._id });
                }
            });
        }
        return acc;
    }, []).sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt));

    const columns = [
        { field: 'personaName', headerName: 'Persona Name', width: 200 },
        {
            field: 'createdAt',
            headerName: 'Created Date',
            width: 250,
            renderCell: (params) => formatDate(params.value),
        },
        {
            field: 'text',
            headerName: 'Text',
            width: 500,
            renderCell: (params) => (
                <Tooltip
                title={params.value}
                placement="top"
                followCursor
                PopperProps={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 10],
                            },
                        },
                        {
                            name: 'preventOverflow',
                            options: {
                                boundary: 'viewport',
                            },
                        },
                    ],
                }}
            >
                <span>{params.value}</span>
            </Tooltip>
            ),
        },
        {
            field: 'posted',
            headerName: 'Posted To',
            width: 100,
            renderCell: (params) => {
                return (
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        mt: 0.8,
                        mx: 1,
                    }}
                    >
                        {socialApps.map((app) =>
                            params.row.posted & (2 ** (app.seqNo - 1)) ? (
                                <span key={app.seqNo}>{getIcon(app.name)}</span>
                            ) : (
                                ''
                            ),
                        )}
                    </Box>
                );
            },
        },
    ];

    return (
        <>
            {content?.length ? (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={content}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        onRowClick={onRowClick}
                        disableSelectionOnClick={true}
                    />
                </div>
            ) : (
                <span>Generate some content first to see it here!</span>
            )}
        </>
    );
}