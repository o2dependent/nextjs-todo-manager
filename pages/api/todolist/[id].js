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
		// Get todo list and todos inside
		case 'GET':
			try {
				await TodoList.findById(id)
					.populate('todos')
					.exec((err, todoList) => {
						if (!todoList || err) {
							return res.status(400).json({ success: false });
						}

						res.status(200).json({ success: true, todoList });
					});
			} catch (err) {
				console.error(err);
				return res.status(400).json({ success: false });
			}
			break;
		// Edit todo list title
		case 'POST':
			try {
				const newTodo = await Todo.create(JSON.parse(req.body));
				await TodoList.findById(id)
					.populate('todos')
					.exec(async (err, todoList) => {
						if (!todoList || !newTodo || err) {
							return res.status(400).json({ success: false });
						}

						todoList.todos.push(newTodo);
						await todoList.save();
						await todoList.populate('todos');
						res.status(200).json({ success: true, todoList });
					});
			} catch (err) {
				console.error(err);
				return res.status(400).json({ success: false });
			}
			break;
		// Delete todo list
		case 'DELETE':
			try {
				await TodoList.deleteOne({ _id: id })
					.populate('todos')
					.exec((err, newTodoList) => {
						if (err || !newTodoList) {
							res.status(400).json({ success: false });
						}
						res.status(200).json({ success: true, data: {} });
					});
			} catch (err) {
				console.error(err);
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
	}
};
