import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sync, storeDbUser } from '../redux/userSlice'
import { requestSession, getDbUser } from './Common';

const ResolverPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dest = new URLSearchParams(location.search).get('dest');
  const state = JSON.parse(sessionStorage.getItem("resolverData"));
  const params = new URLSearchParams(location.search);

  const passParams = {};
  for(let [key, value] of params) {
    if(key !== 'dest') {
      passParams[key] = value;
    }
  }

  useEffect(() => {
    const thunk = async () => {
      const session = await requestSession();
      const dbUser = await getDbUser(session.user.uid);
      sessionStorage.removeItem("resolverData");
      dispatch(sync(state));
      dispatch(sync(session));
      dispatch(storeDbUser(dbUser));

      const qstr = new URLSearchParams(passParams).toString();
      if (qstr && dest) {
        navigate(`${dest}?${qstr}`);
      } else if (dest) {
        navigate(dest);
      } else {
        navigate('/'); 
      }
    }
    thunk();
  }, [dest, dispatch, navigate, passParams, state]);

  return ( <div> Resolving. </div> );
}

export default ResolverPage;
