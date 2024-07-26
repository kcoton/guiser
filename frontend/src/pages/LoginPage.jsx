import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sync, storeDbUser } from '../redux/userSlice.js';
import { getUser, createUser } from '../services/UserService.js'

import axios from 'axios';

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const requestSession = async () => {
        const reqID = sessionStorage.getItem("reqID");
        const baseURL = import.meta.env.VITE_BASEURL_BACK;
        const endpoint = baseURL + "/auth/login";
        try {
            const res = await axios.get(endpoint, {
                headers: { token: reqID }
            });
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const getDbUser = async (externalId) => {
        try {
            return await getUser(externalId) ?? await createUser(externalId);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    useEffect(() => {
        const thunk = async () => {
            const session = await requestSession();
            const dbUser = await getDbUser(session.user.uid);
            dispatch(sync(session));
            dispatch(storeDbUser(dbUser));
            navigate('/dashboard');
            }
        thunk();        
    }, [dispatch, navigate])

    return ( <div> Logged in. </div> );
}

export default LoginPage;
