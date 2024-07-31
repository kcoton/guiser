import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

const LinkToThreads = ({ personaID, variant, startIcon, style, disabled, displayText }) => {

    const REDIRECT_URI = import.meta.env.VITE_THREADS_REDIRECT_URI;
    const APP_ID = import.meta.env.VITE_THREADS_APP_ID;    
    const AUTH_API_BASEURL = 'https://www.threads.net';
    const SCOPES = ['threads_basic', 'threads_content_publish'];

    const state = useSelector((state) => state.user);

	const handleLink = () => {
		sessionStorage.setItem("resolverData",
			JSON.stringify(state));	  
	
	var url = AUTH_API_BASEURL + "/oauth/authorize";
	url += "?client_id=" + APP_ID;
	url += "&redirect_uri=" + REDIRECT_URI;
	url += "&scope=" + encodeURIComponent(SCOPES);
	url += "&response_type=code";
	url += "&state=" + personaID;
	
	location.href=url;
    };

    return (
        <div>
		<Button
		variant = {variant}
		startIcon={startIcon}
		style={style}
		disabled={disabled}
		onClick={handleLink}
		> {displayText}
		</Button>
	</div>
    );
};

export default LinkToThreads;
