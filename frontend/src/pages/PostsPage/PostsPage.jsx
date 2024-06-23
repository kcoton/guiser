import React, { useState } from 'react';
import PostsTable from './PostsTable';
import PostCards from './PostCards';

export default function PostsPage() {
    const [selectedPost, setSelectedPost] = useState(undefined);

    function handleRowClick(params) {
        setSelectedPost(params.row);
    }

    return (
        <div className="page-container">
            <PostsTable onRowClick={handleRowClick} />
            {selectedPost && <PostCards selectedPost={selectedPost} />}
        </div>
    );
}
