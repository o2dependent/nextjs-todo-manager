import React, { useState } from 'react';
import auth0 from '../api/utils/auth0';

export default function settings({ user }) {
	const [friendIdName, setFriendIdName] = useState('');
	const [friendIdNumbers, setFriendIdNumbers] = useState(1001);

	const handleNumberChange = (e) => {
		if (e.target.value.length === 5) {
			const newValue = e.target.value;
			console.log(e.target.value);
			return;
		}
		setFriendIdNumbers(e.target.value);
	};

	return (
		<div>
			<input
				type='text'
				value={friendIdName}
				onChange={(e) => setFriendIdName(e.target.value)}
			/>
			<input
				type='number'
				value={friendIdNumbers}
				onChange={handleNumberChange}
			/>
		</div>
	);
}

export async function getServerSideProps({ res, req }) {
	// Get auth0 session
	const session = await auth0.getSession(req);
	if (session?.user) {
		// Return user's todo lists
		return {
			props: {
				user: session?.user,
			},
		};
	} else {
		res.setHeader('location', '/');
		res.statusCode = 302;
		res.end();
		return;
	}
}
