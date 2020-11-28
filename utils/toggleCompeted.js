require('dotenv').config();

const toggleCompleted = async (id, curCompleted) => {
	const url = `${process.env.URL}/`;
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({ id, completed: !curCompleted }),
	});
	return response;
};

export default toggleCompleted;
