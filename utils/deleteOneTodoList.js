const deleteOneTodoList = async (todoListId, todoIdArray) => {
	const url = `${process.env.URL}/api/todolist/${todoListId}`;
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ todos: todoIdArray }),
	});
	return response;
};

export default deleteOneTodoList;
