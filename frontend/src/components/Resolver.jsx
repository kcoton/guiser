import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, init } from '../redux/userSlice.js';
import axios from 'axios';

// state : object | null
// wait : async (window) => X
// exit : route (string)
const Resolver = ({state, waitFn, exitAct, exitPt}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(s => s.resolver.data);
    
    useEffect(() => {
	const thunk = async () => {
	    if (state && !data) { // entering resolver
		dispatch(storeResolverData(state));
		const newdata = await waitFn(window, state);
		// server redirects client to same page w/ new query params
	    } else if (!state && data) { // exiting resolver
		const newdata = await waitFn(window, state);
		dispatch(exitAct(newdata));
		dispatch(storeResolverData(null));
		navigate(exitPt);
	    } else {
		console.error("Resolver error");
	    }
	}
	thunk();
    }, []);
}
