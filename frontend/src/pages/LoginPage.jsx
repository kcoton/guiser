import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sync, storeDbUser } from '../redux/userSlice.js';
import { requestSession, getDbUser } from './Common.jsx';

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
