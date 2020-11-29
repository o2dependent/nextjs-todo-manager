import Todo from '../../../models/Todo';
import TodoList from '../../../models/TodoList';
import dbConnect from '../../../utils/dbConnect';

dbConnect();

export default async (req, res) => {
	// Get id from query string
	const {
		query: { id },
		method,
	} = req;
	// Find db entry with id
	switch (method) {
		// Edit todo list title
		case 'PUT':
			try {
				await Todo.findOneAndUpdate(
					{ _id: id },
					JSON.parse(req.body),
					(err, todoObj) => {
						if (err) {
							console.error(err);
							return;
						}
						res.status(200).json({ success: true, todo: todoObj });
					}
				);
			} catch (err) {
				console.error(err);
				return res.status(400).json({ success: false });
			}
			break;
		// Delete todo
		case 'DELETE':
			try {
				const deletedTodoList = await Todo.deleteOne({ _id: id });

				if (!deletedTodoList) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: {} });
			} catch (err) {
				console.error(err);
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
	}
};
