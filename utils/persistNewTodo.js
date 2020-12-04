const persistNewTodo = async (todoListId, data) => {
	const url = `/api/todolist/${todoListId}`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

export default persistNewTodo;
