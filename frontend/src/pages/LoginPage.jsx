import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sync } from '../redux/userSlice.js';
import { getDbUser } from './Common.jsx';

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    
    useEffect(() => {
        const thunk = async () => {
	    const params = new URLSearchParams(location.search);
            const uid = params.get('uid');

	    const dbUser = await getDbUser(uid);
            dispatch(sync({user: {externalId: uid}, db: dbUser}));
            navigate('/dashboard');
        }
        thunk();        
    }, [dispatch, navigate])

    return ( <div> Logged in. </div> );
}

export default LoginPage;
