import Todo from '../../../models/Todo';
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
		case 'GET':
			try {
				const todo = await Todo.findById(id);

				if (!todo) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: todo });
			} catch (err) {
				console.error(err);
				return res.status(400).json({ success: false });
			}
			break;
		case 'PUT':
			try {
				const todo = await Todo.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});

				if (!todo) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: todo });
			} catch (err) {
				console.error(err);
				return res.status(400).json({ success: false });
			}
			break;
		case 'DELETE':
			try {
				const deletedTodo = await Todo.deleteOne({ _id: id });

				if (!deletedTodo) {
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
