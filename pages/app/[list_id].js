import Link from 'next/link';
import React from 'react';
import TodoPreview from '../../components/TodoPreview';

export default function index({ data }) {
	const { id, title, todos } = data;

	return (
		<div>
			<div key={id}>
				<h4>{title}</h4>
				<ul>
					{todos.map((todo) => (
						<li key={todo.id}>
							<p>{todo.desc}</p>
							<button onClick={() => toggleCompleted(todo.id, todo.completed)}>
								{todo.completed ? 'X' : 'O'}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export async function getServerSideProps(ctx) {
	// Get user's todo lists
	const res = await fetch(
		`http://localhost:3000/api/todolist/${ctx.params.list_id}`
	);
	const data = await res.json();
	// Check if data exists
	if (!data) {
		return {
			notFound: true,
		};
	}
	// Return user's todo lists
	return {
		props: {
			data,
		},
	};
}
