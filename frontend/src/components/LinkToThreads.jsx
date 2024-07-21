import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@mui/material';

const LinkToThreads = ({ personaID, variant, startIcon, style, disabled, displayText }) => {

    const BASEURL_BACK = import.meta.env.VITE_BASEURL_BACK_ALIAS;    
    const REDIRECT_URI = import.meta.env.VITE_THREADS_REDIRECT_URI;
    const APP_ID = import.meta.env.VITE_THREADS_APP_ID;    
    const AUTH_API_BASEURL = 'https://www.threads.net';
    const SCOPES = ['threads_basic', 'threads_content_publish'];

    //const sessionID = useSelector(s => s.user.sid);
    //const user = useSelector(s => s.user.user);
    const state = useSelector((state) => state.user);

    const handleLink = () => {
	sessionStorage.setItem("resolverData",
			       JSON.stringify(state));
			       //JSON.stringify({sid: sessionID, user: user}));
	
	var url = AUTH_API_BASEURL + "/oauth/authorize";
	url += "?client_id=" + APP_ID;
	url += "&redirect_uri=" + REDIRECT_URI;
	url += "&scope=" + encodeURIComponent(SCOPES);
	url += "&response_type=code";
	url += "&state=" + state.user.uid + ":" + personaID;
	
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
	    {/*
	    <form onSubmit={(e) => {
		      e.preventDefault();
		      publishPost(content);
		  }}>
		<input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
		<button type="submit">Post</button>
	    </form>
	     */}
	</div>
    );
};

export default LinkToThreads;
