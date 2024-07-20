import { DataGrid } from '@mui/x-data-grid';
import TwitterIcon from '@mui/icons-material/Twitter';
import ForumIcon from '@mui/icons-material/Forum';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React from 'react';
import { useSelector } from 'react-redux';

function getIcon(appName) {
    const iconMap = {
        'Twitter': <TwitterIcon />,
        'Threads': <ForumIcon />,
        'LinkedIn': <LinkedInIcon />
    }

    return iconMap[appName];
}

export default function ContentTable({ socialApps, onRowClick }) {
    const content = useSelector((state) => state.user.db?.personas)
        .reduce((acc, persona) => {
            const personaName = persona.name;
            persona.content.forEach(contentEntry => {
                if (!contentEntry.isRejected) {
                    acc.push({ ...contentEntry, personaName, id: contentEntry._id })
                }
            });
            return acc;
        }, []);

    const columns = [
        { field: 'personaName', headerName: 'Persona Name', width: 200 },
        { field: 'createdAt', headerName: 'Created Date', width: 200 },
        { field: 'text', headerName: 'Text', width: 400 },
        { 
            field: 'posted', 
            headerName: 'Posted To', 
            width: 400, 
            flex: 1,
            renderCell: (params) => {
                return (
                  <div>
                    {socialApps.map(app => 
                        params.row.posted & (2 ** (app.seqNo - 1)) ? 
                        <span key={app.seqNo}>{getIcon(app.name)}</span>
                        : ''
                    )}
                  </div>
                );
            }
        }
    ];

    return (
        <>
        { content?.length ?
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
            </div> :
            <span>Generate some content first to see it here!</span>
        }
        </>
    );
}
