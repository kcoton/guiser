import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice'
import axios from 'axios';

const ThreadsResolverPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const resolverData = sessionStorage.getItem("threadsResolverData");
    const user = JSON.parse(resolverData).uid;    
    const sessionID = JSON.parse(resolverData).sid;
    const personaID = JSON.parse(resolverData).pid;   
    
    const waitFn = async () => {
        const query = new URLSearchParams(window.location.search);
        const reqID = query.get('reqID');
	if (reqID) {
	    const baseURL = import.meta.env.VITE_BASEURL_BACK;
            const endpoint = baseURL + "/auth/threads";
            try {
		const res = await axios.post(endpoint, {
		    sid: sessionID,
                    pid: personaID,
                    reqID: reqID
		});		
		return res.data;
            } catch (error) {
		console.error(error);
		navigate('/');
            }
	} else {
	    console.error("Error resolving threads login.");
	    navigate('/');
	}	
    }
    
    useEffect(() => {
        const thunk = async () => {
            const newdata = await waitFn();
	    const state = {sid: sessionID, uid: user};
	    dispatch(login(state));
	    // dispatch actions on newdata here if needed
	    sessionStorage.removeItem("threadsResolverData");
            navigate('/dashboard');
        }
        thunk();
    }, [])

    return ( <div> Resolving. </div> );
}

export default ThreadsResolverPage;
