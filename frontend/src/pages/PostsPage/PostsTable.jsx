import { DataGrid } from '@mui/x-data-grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React from 'react';
import { useSelector } from 'react-redux';
import SocialSiteService from '../../services/SocialSiteService';

function getIcon(website) {
    const iconMap = {
        'Twitter': <TwitterIcon />,
        'Facebook': <FacebookIcon />,
        'LinkedIn': <LinkedInIcon />,
        'Instagram': <InstagramIcon />
    }

    return iconMap[website];
}

export default function PostsTable({ onRowClick }) {
    const posts = useSelector(s => s.user.user.personas)
        .reduce((acc, persona) => {
            const personaName = persona.name;
            persona.posts.forEach(post => {
                if (!post.isRejected) {
                    acc.push({ ...post, personaName })
                }
            });
            return acc;
        }, []);
    const socialSites = new SocialSiteService().get();

    const columns = [
        { field: 'personaName', headerName: 'Persona Name', width: 200 },
        { field: 'timestamp', headerName: 'Date', width: 200 },
        { field: 'content', headerName: 'Content', width: 400 },
        { 
            field: 'posted', 
            headerName: 'Posted To', 
            width: 400, 
            flex: 1,
            renderCell: (params) => {
                return (
                  <div>
                    {socialSites.map(site => 
                        params.row.posted & (2 ** (site.id - 1)) ? 
                        <span key={site.id}>{getIcon(site.website)}</span>
                        : ''
                    )}
                  </div>
                );
            }
        }
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={posts}
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
    );
}
