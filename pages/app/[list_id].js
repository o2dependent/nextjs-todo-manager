import React, { useEffect, useState } from 'react';
import deleteOneTodo from '../../utils/deleteOneTodo';
import persistNewTodo from '../../utils/persistNewTodo';
import updateTodo from '../../utils/updateTodo';
import auth0 from '../api/utils/auth0';

export default function list_id({ user, _id }) {
	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState('');
	const [todos, setTodos] = useState([]);
	const [todoText, setTodoText] = useState('');
	const [editingTodoIdx, setEditingTodoIdx] = useState(null);
	const [editingTodoText, setEditingTodoText] = useState('');

	useEffect(async () => {
		// Get user's todo list
		const res = await fetch(`http://localhost:3000/api/todolist/${_id}`);
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
	}, []);

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

	return (
		<div>
			<div key={_id}>
				<h4>{title}</h4>
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
		</div>
	);
}

export async function getServerSideProps({ req, params }) {
	// Get auth0 session
	const session = await auth0.getSession(req);
	if (session?.user) {
		// Return user's todo lists
		return {
			props: {
				user: session?.user,
				_id: params.list_id,
			},
		};
	} else {
		res.setHeader('location', '/register');
		res.statusCode = 302;
		res.end();
		return;
	}
}
