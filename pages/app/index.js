import React, { useEffect, useState } from 'react';
import ListDisplay from '../../components/app/ListDisplay';
import TodosDisplay from '../../components/app/TodosDisplay';
import styles from '../../styles/ListDisplay.module.css';

import auth0 from '../api/utils/auth0';

export default function index({ user }) {
	const [displayListId, setDisplayListId] = useState('');

	useEffect(async () => {
		const data = await fetch('/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				sub: user.sub,
				name: user.name,
				picture: user.picture,
			}),
		});
	}, []);

	return (
		<div className={styles.App__container}>
			<ListDisplay
				user={user}
				setDisplayListId={setDisplayListId}
				displayListId={displayListId}
			/>
			{displayListId && <TodosDisplay _id={displayListId} />}
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
