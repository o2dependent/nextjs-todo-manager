import React, { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import deleteOneTodoList from '../../utils/deleteOneTodoList';
import persistNewTodoList from '../../utils/persistNewTodoList';
import styles from '../../styles/ListDisplay.module.css';
import SearchUsers from './SearchUsers';

export default function ListDisplay({ setDisplayListId, displayListId, user }) {
	const [newListName, setNewListName] = useState('');
	const [todoLists, setTodoLists] = useState([]);
	const [isNewListOpen, setIsNewListOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	console.log(user);

	useEffect(async () => {
		// Get user's todo lists
		const res = await fetch('/api/todolist');
		const returned = await res.json();
		// Check if data exists
		if (!returned) {
			setLoading(false);
			return;
		}
		setLoading(false);
		setTodoLists(returned.todoLists);
	}, []);

	const submitNewTodoList = async (e) => {
		e.preventDefault();
		if (!newListName) return;
		const newList = { title: newListName, sub: user.sub };
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
			if (displayListId === todoLists[idx]._id) {
				setDisplayListId(null);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={styles.ListDisplay__container}>
			<div className={styles.ListDisplay__profile}>
				<img
					className={styles.ListDisplay__profile_picture}
					src={user.picture}
				/>
				<div>
					<h4>{user.name.split('@')[0]}</h4>
					<a className={styles.ListDisplay__profile_logout} href='/api/logout'>
						Logout
					</a>
				</div>
			</div>
			<SearchUsers />
			{todoLists.length !== 0 &&
				todoLists.map((todoList, idx) => (
					<div
						key={todoList._id}
						className={styles.List__container}
						onClick={() => setDisplayListId(todoList._id)}
					>
						<h4>{todoList.title}</h4>
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
			<button
				className={styles.ListDisplay__add_btn}
				onClick={() => setIsNewListOpen(true)}
			>
				Add new List
			</button>
		</div>
	);
}
