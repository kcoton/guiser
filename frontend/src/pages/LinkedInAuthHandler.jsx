import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAuthToken, storeUser } from '../redux/userSlice';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function LinkedInAuthHandler() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [message, setMessage] = useState('');

    function handleReportedError(error) {
        if (error === 'user_cancelled_login' || error === 'user_cancelled_authorize') {
            setMessage("As requested, your connection to LinkedIn has been cancelled.");
        } else {
            throw new Error("Auth code acquisition failed for reason other than user cancellation");
        }
    };

    function restoreUserFromLocalStorage() {
        const user = JSON.parse(localStorage.getItem('user'));
        localStorage.removeItem('user');
        if (!user) {
            throw new Error('Unable to retrieve user from local storage');
        }
        dispatch(storeUser(user));
        const userId = user.db._id;
        if (!userId) {
            throw new Error('Retrieved user does not contain id prop');
        }
        return user.db._id;
    };

    function getRedirectParams(urlParams) {
        const code = urlParams.get('code');
        const personaId = urlParams.get('state');
        if (!code || !personaId) {
            throw new Error('Expected redirect params not present');
        }
        return { code, personaId };
    };

    async function resolveCodeToToken(userId, personaId, code) {
        const baseUrl = import.meta.env.VITE_BASEURL_BACK;

        const response = await axios.post(
            `${baseUrl}/user/${userId}/persona/${personaId}/authtoken/linkedin`,
            { code }
        );
        if (!response?.data?.result) {
            throw new Error('Malformed backend response');
        }
        return response.data.result;
    };

    useEffect(() => {
        const handleLinkedInAuth = async () => {
            try {
                const urlParams = new URLSearchParams(location.search);
                const error = urlParams.get('error');
                if (error) {
                    handleReportedError(error);
                    return;
                }
                
                const userId = restoreUserFromLocalStorage();
                const { code, personaId } = getRedirectParams(urlParams);
                const authToken = await resolveCodeToToken(userId, personaId, code);
                dispatch(addAuthToken({ personaId, authToken }));
                setMessage("Your LinkedIn account has been successfully connected!");
            } catch (err) {
                console.error(err);
                setMessage("Sorry, we were unable to connect your LinkedIn account. Please retry later.");
            }
        };

        handleLinkedInAuth();
    }, [dispatch, location]);

    return (
        <div className="page-container">
            <p>{message}</p>
        </div>
    );
}
