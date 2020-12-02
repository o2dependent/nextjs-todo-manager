import TodoList from '../../../models/TodoList';
import dbConnect from '../../../utils/dbConnect';
import auth0 from '../utils/auth0';

dbConnect();

export default auth0.requireAuthentication(async (req, res) => {
	const { method } = req;
	const { user } = await auth0.getSession(req);

	switch (method) {
		case 'GET':
			try {
				const todoLists = await TodoList.find({});
				res.status(200).json({ success: true, todoLists });
			} catch (err) {
				console.error(err);
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const todo = await TodoList.create(req.body);
				res.status(201).json({ success: true, data: todo });
			} catch (err) {
				console.error(err);
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400);
			break;
	}
});
