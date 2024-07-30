import React, { useEffect } from 'react';
import * as util from '../util.js'

const GoogleSignIn = () => {
    const BASEURL_BACK = import.meta.env.VITE_BASEURL_BACK;
    const GOOGLE_CLIENID = import.meta.env.VITE_GOOGLE_CLIENTID;
    const GOOGLE_GSI_SOURCE = import.meta.env.VITE_GOOGLE_GSI_SOURCE;
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = GOOGLE_GSI_SOURCE;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);	
	
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const reqID = util.requestID();
    //sessionStorage.setItem("reqID", reqID);
    return (
        <>
            <div id="g_id_onload"
		 data-client_id={GOOGLE_CLIENID}
		 data-context="signin"
		 data-ux_mode="redirect"
		 data-login_uri={BASEURL_BACK + "/auth/login"}		 
		 data-itp_support="true"
		 data-auto_prompt="false"
		 data-state={reqID}>
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
