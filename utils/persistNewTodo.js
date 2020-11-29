const persistNewTodo = async (todoListId, data) => {
	const url = `${process.env.URL}/api/todolist/${todoListId}`;
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
	});
	return response.json();
};

export default persistNewTodo;
