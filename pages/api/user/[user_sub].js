import Todo from '../../../models/Todo';
import TodoList from '../../../models/TodoList';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';
import auth0 from '../utils/auth0';

dbConnect();

export default auth0.requireAuthentication(async (req, res) => {
	// Get id from query string
	const {
		query: { user_sub },
		method,
	} = req;
	const { user } = await auth0.getSession(req);

	// Find db entry with id
	switch (method) {
		// Get todo list and todos inside
		case 'GET':
			try {
				const foundUsers = await User.findMany({ name: user_sub });
				if (!foundUsers) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, foundUsers });
			} catch (err) {
				console.error(err);
				return res.status(400).json({ success: false });
			}
			break;
		// Edit todo list title
		case 'PUT':
			try {
				if (user.sub === user_sub) {
					return res.status(400).json({ success: false });
				}
				const reqUser = await User.findOne({ sub: user.sub });
				const foundUser = await User.findOne({ sub: user_sub });
				if (!foundUser || !reqUser) {
					return res.status(400).json({ success: false });
				}
				reqUser.friends.push({ sub: user_sub });
				foundUser.friends.push({ sub: user.sub });
				await foundUser.save();
				await reqUser.save();
				res.status(200).json({ success: true, foundUser });
			} catch (err) {
				console.error(err);
				return res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
	}
});
