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

		default:
			res.status(400).json({ success: false });
	}
});
