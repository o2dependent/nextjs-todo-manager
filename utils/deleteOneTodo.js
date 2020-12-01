const deleteOneTodo = async (todoId, todoListId) => {
	const url = `${process.env.URL}/api/todo/${todoId}`;
	const data = { todoListId };
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

export default deleteOneTodo;
