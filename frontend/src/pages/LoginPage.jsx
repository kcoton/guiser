import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions.js';
import axios from 'axios';

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const requestUser = async () => {        
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        // TODO - find better way to manage protocol and host
        const baseURL = "http://localhost:3001";        
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

    // TODO - add state handling for sessionID
    
    
    useEffect(() => {
        const thunk = async () => {
            const user = await requestUser();
            dispatch(login(user));
            navigate('/dashboard');
        }
        thunk();        
    }, [])

    return ( <div> Logged in. </div> );
}

export default LoginPage;
