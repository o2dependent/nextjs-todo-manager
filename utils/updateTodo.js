const updateTodo = async (todoId, data) => {
	const url = `${process.env.URL}/api/todo/${todoId}`;
	const response = await fetch(url, {
		method: 'PUT',
		body: JSON.stringify(data),
	});
	return response.json();
};

export default updateTodo;
