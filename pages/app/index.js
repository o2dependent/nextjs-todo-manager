import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal';
import deleteOneTodoList from '../../utils/deleteOneTodoList';
import persistNewTodoList from '../../utils/persistNewTodoList';
import auth0 from '../api/utils/auth0';

export default function index({ user }) {
	const [newListName, setNewListName] = useState('');
	const [todoLists, setTodoLists] = useState([]);
	const [isNewListOpen, setIsNewListOpen] = useState(false);
	let data = { todoLists: [], loading: true };

	useEffect(async () => {
		// Get user's todo lists
		const res = await fetch('http://localhost:3000/api/todolist');
		const returned = await res.json();
		// Check if data exists
		if (!returned) {
			data = { todoLists: [], loading: false };
		}
		data = { todoLists: returned.todoLists, loading: false };
		setTodoLists(returned.todoLists);
	}, []);

	const submitNewTodoList = async (e) => {
		e.preventDefault();
		if (!newListName) return;
		const newList = { title: newListName };
		const { data } = await persistNewTodoList(newList);
		if (data && !data?.error) {
			setTodoLists([...todoLists, data]);
			setNewListName('');
			setIsNewListOpen(false);
		}
	};

	const deleteTodoList = async (idx, id) => {
		try {
			const todosIdArray = todoLists[idx].todos;
			await deleteOneTodoList(id, todosIdArray);
			const newTodoLists = [...todoLists];
			newTodoLists.splice(idx, 1);
			setTodoLists(newTodoLists);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			{typeof todoLists !== 'undefined' &&
				todoLists.map((todoList, idx) => (
					<div key={todoList._id}>
						<h4>{todoList.title}</h4>
						<Link href={`/app/${todoList._id}`}>
							<a>Go to list</a>
						</Link>
						<button onClick={() => deleteTodoList(idx, todoList._id)}>
							Delete
						</button>
					</div>
				))}
			{isNewListOpen && (
				<Modal closeModal={() => setIsNewListOpen(false)}>
					<form onSubmit={submitNewTodoList}>
						<input
							type='text'
							value={newListName}
							onChange={(e) => setNewListName(e.target.value)}
						/>
						<button type='submit'>Create list</button>
					</form>
				</Modal>
			)}
			<button onClick={() => setIsNewListOpen(true)}>Add new List</button>
		</div>
	);
}

// TODO : extract out data fetching to client
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
		res.setHeader('location', '/register');
		res.statusCode = 302;
		res.end();
		return;
	}
}
