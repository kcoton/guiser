import React from 'react';
import { useSelector } from 'react-redux';

export default function HomePage() {
    
    const user = useSelector(s => s.user.user);

    console.log(user);
    
    return <div className="page-container">
     	       <p>Hello{!user ? "" : ", " + user.name}</p>
    	   </div>;
}
