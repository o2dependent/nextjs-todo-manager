const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	sub: String,
	name: String,
	picture: String,
	friends: [{ sub: String }],
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
