const mongoose = require('mongoose');

const TodoListSchema = new mongoose.Schema({
	title: { type: String, required: true },
	todos: {
		type: [{ type: mongoose.Types.ObjectId, ref: 'Todo' }],
		required: false,
	},
});

module.exports =
	mongoose.models.TodoList || mongoose.model('TodoList', TodoListSchema);
