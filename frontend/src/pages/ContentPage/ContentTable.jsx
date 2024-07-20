import { DataGrid } from '@mui/x-data-grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React from 'react';
import { useSelector } from 'react-redux';
// import SocialSiteService from '../../services/SocialSiteService';

function getIcon(website) {
    const iconMap = {
        'Twitter': <TwitterIcon />,
        'Facebook': <FacebookIcon />,
        'LinkedIn': <LinkedInIcon />,
        'Instagram': <InstagramIcon />
    }

    return iconMap[website];
}

export default function ContentTable({ onRowClick }) {
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
    // const socialSites = new SocialSiteService().get();

    const columns = [
        { field: 'personaName', headerName: 'Persona Name', width: 200 },
        { field: 'createdAt', headerName: 'Created Date', width: 200 },
        { field: 'text', headerName: 'Text', width: 400 }
        // ,
        // { 
        //     field: 'posted', 
        //     headerName: 'Posted To', 
        //     width: 400, 
        //     flex: 1,
        //     renderCell: (params) => {
        //         return (
        //           <div>
        //             {socialSites.map(site => 
        //                 params.row.posted & (2 ** (site.id - 1)) ? 
        //                 <span key={site.id}>{getIcon(site.website)}</span>
        //                 : ''
        //             )}
        //           </div>
        //         );
        //     }
        // }
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            { content ?
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
                /> :
                ''
            }
        </div>
    );
}
