import React, { useState } from 'react';
import ContentTable from './ContentTable';
import ContentCards from './ContentCards';

export default function ContentPage() {
    const [selectedContent, setSelectedContent] = useState(undefined);

    function handleRowClick(params) {
        setSelectedContent(params.row);
    }

    return (
        <div className="page-container">
            <ContentTable onRowClick={handleRowClick} />
            {selectedContent && <ContentCards selectedContent={selectedContent} />}
        </div>
    );
}
