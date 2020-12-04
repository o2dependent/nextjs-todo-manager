const updateTodo = async (todoId, data) => {
	const url = `/api/todo/${todoId}`;
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

export default updateTodo;
