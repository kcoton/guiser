import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAuthToken, storeUser } from '../redux/userSlice';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function LinkedInAuthHandler() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [message, setMessage] = useState(
        "Sorry, we were unable to connect your LinkedIn account. Please retry later."
    );

    function userIdValid(user) {
        if (!user) {
            console.error('No user to recover from local storage');
            return false;
        }

        if (!user.db) {
            console.error('Recovered user does not have db prop');
            return false;
        }

        if (!user.db._id) {
            console.error('Recovered user does not have Mongo id');
            return false;
        }

        return true;
    }

    function responseIsValid(response) {
        if (!response.data) {
            console.error('Malformed response does not contain data key');
            return false;
        }

        if (!response.data.result) {
            console.error('Malformed data in response does not contain result key');
            return false;
        }

        return true;
    }

    useEffect(() => {
        const handleLinkedInAuth = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            localStorage.removeItem('user');

            if (!userIdValid(user)) { return; }
            dispatch(storeUser(user));

            const urlParams = new URLSearchParams(location.search);
            const code = urlParams.get('code');
            const personaId = urlParams.get('state');

            const baseUrl = import.meta.env.VITE_BASEURL_BACK;
            const url = `${baseUrl}/user/${user.db._id}/persona/${personaId}/authtoken/linkedin`;

            let response;
            try {
                response = await axios.post(
                    url, 
                    { code }
                );
            } catch (err) {
                console.error('Error registering LinkedIn token on backend');
                return;
            }

            if (!responseIsValid(response)) { return; }

            try {
                dispatch(addAuthToken({
                    personaId, 
                    authToken: response.data.result
                }));
            } catch (err) {
                console.error('Error storing auth token in Redux');
            }
            
            setMessage("Your LinkedIn account has been successfully connected!");
        };

        handleLinkedInAuth();
    }, [dispatch, location]);

    return (
        <div className="page-container">
            <p>{message}</p>
        </div>
    );
}
