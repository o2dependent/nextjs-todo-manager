const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
	title: { type: String, required: true },
	todos: {
		type: [{ type: mongoose.Types.ObjectId, ref: 'Todo' }],
		required: false,
	},
	owners: { type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] },
});

module.exports =
	mongoose.models.TodoList || mongoose.model('TodoList', TodoListSchema);
