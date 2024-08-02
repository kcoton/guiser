import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice.js';
import { persistor } from '../redux/store';

const LogoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        persistor.purge();
        navigate('/');
    }, [navigate]);

    return <div>User should never see this.</div>;
};

export default LogoutPage;
