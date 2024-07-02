import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decodeJwt } from 'jose';
import { login, init } from '../redux/userSlice.js';

const GoogleSignIn = ({ continuation }) => {
    const BASEURL_BACK = import.meta.env.VITE_BASEURL_BACK;
    const GOOGLE_CLIENID = import.meta.env.VITE_GOOGLE_CLIENTID;
    const GOOGLE_GSI_SOURCE = import.meta.env.VITE_GOOGLE_GSI_SOURCE;

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
        script.src = GOOGLE_GSI_SOURCE;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            window.handleCredentials = undefined;
        };
    }, [continuation]);

    // TODO - manage protocol and host with .env
    return (
        <>
        <div id="g_id_onload"
         data-client_id={GOOGLE_CLIENID}
         data-context="signin"
         data-ux_mode={isFrontal ? "popup" : "redirect"}
         data-login_uri={BASEURL_BACK + "/auth/gid"}
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
