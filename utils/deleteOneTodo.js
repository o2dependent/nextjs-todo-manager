const deleteOneTodo = async (todoId) => {
	const url = `${process.env.URL}/api/todo/${todoId}`;
	const response = await fetch(url, {
		method: 'DELETE',
	});
	return response.json();
};

export default deleteOneTodo;
