import React from 'react';
import { useSelector } from 'react-redux';
import LinkToThreads from '../components/LinkToThreads';

export default function HomePage() {  
	const user = useSelector(s => s.user.user);

	return <div className="page-container">
				<p>Hello{!user ? "" : ", " + user.name}</p>
			<LinkToThreads personaID="timmy"/>
			</div>;
}
