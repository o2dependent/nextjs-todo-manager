import TodoList from '../../../models/TodoList';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';
import auth0 from '../utils/auth0';

dbConnect();

export default auth0.requireAuthentication(async (req, res) => {
	const { method } = req;
	const { user } = await auth0.getSession(req);

	switch (method) {
		case 'GET':
			try {
				const reqUser = await User.findOne({ sub: user.sub });
				if (!reqUser) {
					return req
						.status(400)
						.json({ success: false, message: 'Requesting user not found' });
				}
				const todoLists = await TodoList.find({ owners: reqUser._id });
				res.status(200).json({ success: true, todoLists });
			} catch (err) {
				console.error(err);
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const reqUser = await User.findOne({ sub: user.sub });
				if (!reqUser) {
					return req
						.status(400)
						.json({ success: false, message: 'Requesting user not found' });
				}
				const todoList = await TodoList.create({ title: req.body.title });
				todoList.owners.push(reqUser);
				todoList.save();
				res.status(201).json({ success: true, data: todoList });
			} catch (err) {
				console.error(err);
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400);
			break;
	}
});
