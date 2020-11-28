import Todo from '../../../models/Todo';
import TodoList from '../../../models/TodoList';
import dbConnect from '../../../utils/dbConnect';

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const todoLists = await TodoList.find({});
				res.status(200).json({ success: true, data: todoLists });
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
};
