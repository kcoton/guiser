import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decodeJwt } from 'jose';
import { login, init } from '../redux/userSlice.js';
import * as keys from '../../../keys';

const GoogleSignIn = ({ continuation }) => {

    const isFrontal = false; // determines if we use front or back end for login

    const dispatch = useDispatch();

    useEffect(() => {
        window.handleCredentials = async (response) => {
            const idToken = (decodeJwt(response.credential));
            const user = {
                uid: idToken.sub,
                name: idToken.name,
                name_given: idToken.given_name,
                name_family: idToken.family_name,
                email: idToken.email,
                picture: idToken.picture
            };
            dispatch(login(user));
            dispatch(init());
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

    return (
        <>
        <div id="g_id_onload"
         data-client_id={keys.google_clientID}
         data-context="signin"
         data-ux_mode={isFrontal ? "popup" : "redirect"}
         data-login_uri="http://localhost:3001/auth/gid"
         data-itp_support="true"
         data-auto_prompt="false"
         data-callback="handleCredentials">
        </div>
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
