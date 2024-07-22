import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sync } from '../redux/userSlice'

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
    dispatch(sync(state));
    sessionStorage.removeItem("resolverData");

    const qstr = new URLSearchParams(passParams).toString();
    if (qstr && dest) {
      navigate(`${dest}?${qstr}`);
    } else if (dest) {
      navigate(dest);
    } else {
      navigate('/'); 
    }
  }, []);

  return ( <div> Resolving. </div> );
}

export default ResolverPage;
