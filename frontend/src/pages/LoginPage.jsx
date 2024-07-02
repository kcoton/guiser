import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, init } from '../redux/userSlice.js';
import axios from 'axios';

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const requestUser = async () => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        const baseURL = import.meta.env.VITE_BASEURL_BACK;
        const endpoint = baseURL + "/auth/uid";        
        try {
            const res = await axios.get(endpoint, {
                headers: { token: token }
            });
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        const thunk = async () => {
            const sessionUser = await requestUser();
            dispatch(login(sessionUser));
            dispatch(init());
            navigate('/dashboard');
        }
        thunk();        
    }, [])

    return ( <div> Logged in. </div> );
}

export default LoginPage;
