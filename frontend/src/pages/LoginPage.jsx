import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sync, init } from '../redux/userSlice.js';
import { fetchPersonas } from '../redux/personaSlice';

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
    
    useEffect(() => {
        const thunk = async () => {
            const session = await requestSession();
            dispatch(sync(session));
            dispatch(init());
            dispatch(fetchPersonas());
            navigate('/dashboard');
            }
        thunk();        
    }, [dispatch, navigate])

    return ( <div> Logged in. </div> );
}

export default LoginPage;
