const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	sub: String,
	name: String,
	picture: String,
	friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	friend_id: {
		nickname: String,
		number: Number,
	},
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
