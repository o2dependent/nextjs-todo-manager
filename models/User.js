const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username required'],
		minlength: [3, 'Username must be longer than 3 characters'],
		maxlength: [25, 'Username cannot be longer than 25 characters'],
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'Password required'],
		minlength: [6, 'Password must be longer than 6 characters'],
		trim: true,
	},
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
