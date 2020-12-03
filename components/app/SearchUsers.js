import React, { useState } from 'react';

export default function SearchUsers() {
	const [subSearch, setSubSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = async () => {
		if (!subSearch) return;
		const data = await fetch(`/api/user/${subSearch}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ sub: subSearch }),
		});
		console.log({ data: await data.json() });
	};

	return (
		<div>
			<form onSubmit={handleSearch}>
				<input
					type='text'
					value={subSearch}
					onChange={(e) => setSubSearch(e.target.value)}
				/>
				<button type='submit'>Add friend by sub id</button>
			</form>
		</div>
	);
}
