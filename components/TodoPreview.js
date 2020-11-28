import React from 'react';
import Link from 'next/link';

export default function TodoPreview({ todo }) {
	const { title, id, list } = todo;

	return (
		<div>
			<h4>{title}</h4>
			<ul>
				{list.map((item) => (
					<li>
						<p>{item.content}</p>
						<button>{item.completed}</button>
					</li>
				))}
			</ul>
			<Link href={`/app/${id}`}>
				<a>See List</a>
			</Link>
		</div>
	);
}
