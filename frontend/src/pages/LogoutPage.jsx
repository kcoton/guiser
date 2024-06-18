import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions.js';

const LogoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
	dispatch(logout());
	navigate('/');
    }, [navigate]);

  return <div>User should never see this.</div>;
};

export default LogoutPage;
