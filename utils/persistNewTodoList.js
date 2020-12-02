const persistNewTodoList = async (data) => {
	const url = `/api/todolist`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

export default persistNewTodoList;
