import React, { useState } from 'react';

export default function SearchUsers({ user }) {
	const [friendIdSearch, setFriendIdSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = async (e) => {
		e.preventDefault();
		if (!friendIdSearch) return;
		const [nickname, number] = friendIdSearch.split('#');
		console.log({ nickname, number: Number(number), isNan: isNaN(number) });
		if (!nickname || isNaN(number)) return;
		const data = await fetch(`/api/user/friends`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ friend_id: { nickname, number: Number(number) } }),
		});
		console.log({ data: await data.json() });
	};

	return (
		<div>
			<form onSubmit={handleSearch}>
				<input
					type='text'
					value={friendIdSearch}
					onChange={(e) => setFriendIdSearch(e.target.value)}
				/>
				<button type='submit'>Add friend by sub id</button>
			</form>
		</div>
	);
}
