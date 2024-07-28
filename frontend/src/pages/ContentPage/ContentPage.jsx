import { useState, useEffect } from 'react';
import ContentTable from './ContentTable';
import ContentCards from './ContentCards';
import { getSocialApps } from '../../services/SocialAppService';

export default function ContentPage() {
    const [selectedContent, setSelectedContent] = useState(undefined);
    const [socialApps, setSocialApps] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const apps = await getSocialApps();
            setSocialApps(apps);
        }
        fetchData();
    }, []);

    function handleRowClick(params) {
        setSelectedContent(params.row);
    }

    return (
        <div className="page-container">
            <ContentTable socialApps={socialApps} onRowClick={handleRowClick} />
            {selectedContent && 
                <ContentCards 
                    setSelectedContent={setSelectedContent} 
                    socialApps={socialApps} 
                    selectedContent={selectedContent} />}
        </div>
    );
}
