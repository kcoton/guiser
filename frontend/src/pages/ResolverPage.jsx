import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sync } from '../redux/userSlice'

const ResolverPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dest = new URLSearchParams(location.search).get('dest');
    const state = JSON.parse(sessionStorage.getItem("resolverData"));
    useEffect(() => {
	dispatch(sync(state));
	sessionStorage.removeItem("resolverData");
        navigate(dest);
    }, [])

    return ( <div> Resolving. </div> );
}

export default ResolverPage;
