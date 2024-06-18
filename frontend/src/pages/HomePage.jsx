import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function HomePage() {
    
    const user = useSelector(s => s.user.user);
    
    return <div className="page-container">
	       <img src={!user ? "" : user.picture} />
	       <p>Hello{!user ? "" : ", " + user.name_given}</p>
	   </div>;
}
