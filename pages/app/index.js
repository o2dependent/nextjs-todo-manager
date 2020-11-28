import Link from 'next/link';
import React from 'react';
import TodoPreview from '../../components/TodoPreview';

export default function index({ data }) {
	const { todoLists } = data;
	console.log(data);

	return (
		<div>
			{typeof todoLists !== 'undefined' &&
				todoLists.map((todoList) => (
					<div key={todoList.id}>
						<h4>{todoList.title}</h4>
						<ul>
							{todoList.todos.map((todo) => (
								<li key={todo.id}>
									<p>{todo.desc}</p>
									<button>{todo.completed ? 'X' : 'O'}</button>
								</li>
							))}
						</ul>
						<Link href={`/app/${todoList.id}`}>
							<a>Go to list</a>
						</Link>
					</div>
				))}
		</div>
	);
}

export async function getServerSideProps(ctx) {
	// Get user's todo lists
	const res = await fetch('http://localhost:3000/api/todolist');
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
			data: data,
		},
	};
}
