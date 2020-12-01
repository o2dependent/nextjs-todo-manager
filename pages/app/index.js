import Link from 'next/link';
import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import deleteOneTodoList from '../../utils/deleteOneTodoList';
import persistNewTodoList from '../../utils/persistNewTodoList';

export default function index({ data }) {
	const [newListName, setNewListName] = useState('');
	const [todoLists, setTodoLists] = useState(data.todoLists);
	const [isNewListOpen, setIsNewListOpen] = useState(false);

	const submitNewTodoList = async (e) => {
		e.preventDefault();
		if (!newListName) return;
		const newList = { title: newListName };
		const { data } = await persistNewTodoList(newList);
		setTodoLists([...todoLists, data]);
		setNewListName('');
		setIsNewListOpen(false);
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
