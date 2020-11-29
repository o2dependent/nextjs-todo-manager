const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
	desc: {
		type: String,
		required: [true, 'Please add a title'],
		maxlength: [100, 'Title cannot be more than 100 characters'],
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
		required: false,
	},
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

module.exports = Todo;
