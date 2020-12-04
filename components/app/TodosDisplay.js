import React, { useEffect, useState } from 'react';
import deleteOneTodo from '../../utils/deleteOneTodo';
import persistNewTodo from '../../utils/persistNewTodo';
import updateTodo from '../../utils/updateTodo';
import styles from '../../styles/TodosDisplay.module.css';
import Modal from '../ui/Modal';

export default function TodosDisplay({ _id }) {
	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState('');
	const [todos, setTodos] = useState([]);
	const [todoText, setTodoText] = useState('');
	const [editingTodoIdx, setEditingTodoIdx] = useState(null);
	const [editingTodoText, setEditingTodoText] = useState('');
	const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
	const [friends, setFriends] = useState([]);

	useEffect(async () => {
		// Get user's todo list
		const res = await fetch(`/api/todolist/${_id}`);
		// Get data
		const returned = await res.json();
		// Check if data exists
		if (!returned) {
			data = { title: 'No data found' };
			return;
		}
		// Set todos
		setTodos(returned.todoList.todos);
		// Set title
		setTitle(returned.todoList.title);
		// Set loading
		setLoading(false);
	}, [_id]);

	const toggleTodo = (idx) => {
		const newTodoList = [...todos];
		newTodoList[idx].completed = !newTodoList[idx].completed;
		setTodos(newTodoList);
		if (newTodoList[idx]._id) {
			updateTodo(newTodoList[idx]._id, {
				completed: newTodoList[idx].completed,
			});
		}
	};

	const submitNewTodo = async (e) => {
		e.preventDefault();
		if (!todoText) return;
		const newTodo = { desc: todoText, completed: false };
		const {
			todoList: { todos },
		} = await persistNewTodo(_id, newTodo);
		setTodos(todos);
		setTodoText('');
	};

	const deleteTodo = async (idx, id) => {
		try {
			await deleteOneTodo(id, _id);
			const newTodos = [...todos];
			newTodos.splice(idx, 1);
			setTodos(newTodos);
		} catch (err) {
			console.error(err);
		}
	};

	const submitTodoEdit = async (e) => {
		try {
			e.preventDefault();
			const newTodos = [...todos];
			const id = todos[editingTodoIdx]._id;
			await updateTodo(id, { desc: editingTodoText });
			newTodos[editingTodoIdx].desc = editingTodoText;
			setTodos(newTodos);
			setEditingTodoIdx(null);
			setEditingTodoText('');
		} catch (err) {
			console.error(err);
		}
	};

	const handleEdit = (idx) => {
		if (idx !== editingTodoIdx) {
			setEditingTodoIdx(idx);
			setEditingTodoText(todos[idx].desc);
		} else {
			setEditingTodoIdx(null);
		}
	};

	const getFriendsData = async () => {
		const res = await fetch('/api/user/friends');
		const data = await res.json();
		setFriends(data.friends);
	};

	const handleAddFriendToList = async (user_id) => {
		const res = await fetch(`/api/todolist/${_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user_id }),
		});
		const data = await res.json();
		console.log({ data });
	};

	return (
		<div className={styles.TodosDisplay__container} key={_id}>
			<h4>{title}</h4>
			<button
				onClick={() => {
					setIsAddFriendOpen(true);
					getFriendsData();
				}}
			>
				Add friend to list
			</button>
			{/* // TODO : implement adding friends to list */}
			{isAddFriendOpen && friends && (
				<Modal closeModal={() => setIsAddFriendOpen(false)}>
					{friends.map((friend) => (
						<div key={friend._id}>
							<h4>{friend.name}</h4>
							<img src={friend.picture} alt={`${friend.name} profile photo`} />
							<button onClick={() => handleAddFriendToList(friend._id)}>
								Add to list
							</button>
						</div>
					))}
				</Modal>
			)}
			<ul>
				{todos.map((todo, idx) => (
					<li key={todo._id}>
						{editingTodoIdx === idx ? (
							<form onSubmit={submitTodoEdit}>
								<input
									type='text'
									value={editingTodoText}
									onChange={(e) => setEditingTodoText(e.target.value)}
								/>
								<button type='submit'>Submit changes</button>
							</form>
						) : (
							<p>{todo.desc}</p>
						)}
						<button onClick={() => toggleTodo(idx)}>
							{todo.completed ? 'X' : 'O'}
						</button>
						<button onClick={() => deleteTodo(idx, todo._id)}>Delete</button>
						<button onClick={() => handleEdit(idx)}>Edit</button>
					</li>
				))}
			</ul>
			<form onSubmit={submitNewTodo}>
				<input
					type='text'
					value={todoText}
					onChange={(e) => setTodoText(e.target.value)}
				/>
				<button type='submit'>Add</button>
			</form>
		</div>
	);
}
