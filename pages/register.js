import React, { useState } from 'react';

export default function register() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const register = async (e) => {
		e.preventDefault();
		if (username.length > 25 || username.length < 3) {
			setError('Username must be between 3 and 25 characters');
			return;
		}
		if (password.length < 6) {
			setError('Password must be at least 6 characters');
			return;
		}
		const response = await fetch(`${process.env.URL}/api/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});
		const data = await response.json();
		if (data.message !== 'success') {
			setError(data.message);
			return;
		}
		setError('');
		setUsername('');
		setPassword('');
	};

	return (
		<div>
			<h1>Register</h1>
			{error && <p>{error}</p>}
			<form onSubmit={register}>
				<label>
					Username
					<input
						name='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label>
					Password
					<input
						name='password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
}
