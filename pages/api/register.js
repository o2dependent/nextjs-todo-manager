import User from '../../models/User';
import dbConnect from '../../utils/dbConnect';

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case 'POST':
			try {
				const { username, password } = req.body;
				const user = await User.findOne({ username });
				if (user) {
					return res.status(409).json({ message: 'User already exists' });
				}
				await User.create({ username, password });
				res.status(201).json({ message: 'success' });
			} catch (err) {
				console.error(err);
				res.status(400);
			}
			break;

		default:
			res.status(400);
			break;
	}
};
