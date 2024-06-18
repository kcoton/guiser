import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decodeJwt } from 'jose';
import { login } from '../redux/actions.js';

const GoogleSignIn = ({ continuation }) => {

    const dispatch = useDispatch();

    useEffect(() => {
	window.handleCredentials = (response) => {
	    const idToken = (decodeJwt(response.credential));
	    const user = {
		uid: idToken.sub,
		name_full: idToken.name,
		name_given: idToken.given_name,
		name_family: idToken.family_name,
		email: idToken.email,
		picture: idToken.picture
	    };
	    dispatch(login(user));
	    continuation();
	};

	const script = document.createElement('script');
	script.src = "https://accounts.google.com/gsi/client";
	script.async = true;
	script.defer = true;
	document.body.appendChild(script);

	return () => {
	    document.body.removeChild(script);
	    window.handleCredentials = undefined;
	};
    }, [continuation]);

    const oauthClientID = "96978990905-stipuuf5cubcs5v5ecpupj5plc3jthfp.apps.googleusercontent.com";
    return (
	<>
	    <div id="g_id_onload"
		 data-client_id={oauthClientID}
		 data-context="signin"
		 data-ux_mode="popup"
		 data-itp_support="true"
		 data-auto_prompt="false"
		 data-callback="handleCredentials">
	    </div>
	    {/* data-auto_prompt="true" for popup everywhere */}
	    <div className="g_id_signin"
		 data-type="standard"
		 data-shape="pill"
		 data-theme="outline"
		 data-text="continue_with"
		 data-size="large"
		 data-logo_alignment="left">
	    </div>
	</>
  );
};

export default GoogleSignIn;
